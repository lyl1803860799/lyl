<template>
  <div class="data-set">
    <a-form
      :form="form"
      :colon="false"
      labelAlign="left"
      class="mutli-frame"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 23 }"
    >
      <a-collapse v-model="activeKey" expandIconPosition="right">
        <a-collapse-panel key="1">
          <template slot="header">
            指标设置
            <span
              style="font-size: 12px;color:#FFA85A;padding-left:6px;"
              v-if="componentType === 'bar-simple'"
            >（最多支持5个单位相同指标）</span>
            <span
              style="font-size: 12px;color:#FFA85A;padding-left:6px;"
              v-if="componentType === 'line-simple'"
            >（最多支持5个指标）</span>
            <span
              style="font-size: 12px;color:#FFA85A;padding-left:6px;"
              v-if="componentType === 'bar-line-double'"
            >（请选择两个指标数据）</span>
          </template>
          <a-form-item class="index-input">
            <a-input placeholder="指标编码" v-model="codeValue" style="float:left;width: 80%"></a-input>
            <span class="confirm-btn" @click="fetchIndexInfo"></span>
            <span class="close-btn" @click="clearInput"></span>
          </a-form-item>
          <!-- <a-form-item label>
            <a-select
              mode="multiple"
              label-in-value
              :value="indexCode"
              placeholder="指标编码"
              style="width: 100%"
              :filter-option="false"
              :not-found-content="fetching ? undefined : null"
              @search="fetchIndexInfo"
              @change="handleChange"
            >
              <a-spin v-if="fetching && !noContent" slot="notFoundContent" size="small" />
              <img :src="noDataIcon" v-if="!fetching && noContent" slot="notFoundContent" />
              <a-select-option v-for="d in data" :key="d.indexCode">{{ d.indexShortName }}</a-select-option>
            </a-select>
          </a-form-item> -->
          <ul class="url-list">
            <draggable
              v-model="indexCode"
              class="drag"
              @end="onEnd"
              animation="300"
              filter=".forbid"
              :move="onMove"
            >
              <transition-group>
                <li v-for="(data,index) in indexCode" :key="data.key">
                  <div>
                    <img :src="moveIcon" class="move-btn" />
                  </div>
                  <div class="url-input">
                    <span class="index-code">{{data.key}}</span>
                    <span class="index-name">{{data.label}}</span>
                  </div>
                  <div>
                    <img :src="deleteIcon" class="delete-btn" @click="delIndexCode(index)" />
                  </div>
                </li>
              </transition-group>
            </draggable>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="2" class="define-collapse-panel" header="数据时间区间">
          <a-form-item label="时间配置" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
            <a-checkbox class="define-radio-btn" v-model="timeType" @change="onChange(1)">指定时长</a-checkbox>
            <a-checkbox class="define-radio-btn" v-model="timeType2" @change="onChange(0)">指定时间区间</a-checkbox>
          </a-form-item>
          <div v-if="timeType">
            <a-form-item label="近" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
              <a-input
                v-model="timeVal"
                class="define-choose-input"
                default-value="1"
                @change="changeNum"
                @blur="getChartData"
                maxlength="8"
              >
                <a-select
                  v-model="fqType"
                  slot="addonAfter"
                  default-value="FQ-YY"
                  style="width: 80px"
                  @change="getChartData"
                >
                  <a-select-option value="FQ-YY">年</a-select-option>
                  <a-select-option value="FQ-MM">月</a-select-option>
                  <a-select-option value="FQ-DD">天</a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
          </div>
          <div v-if="timeType2">
            <a-form-item label="开始时间" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
              <a-date-picker
                v-model="startDate"
                style="width:100%"
                placeholder="请选择开始时间"
                :allowClear="false"
                :disabled-date="disabledStartDate"
                :inputReadOnly="true"
                @change="onChangeTime"
              />
            </a-form-item>
            <a-form-item label="结束时间" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
              <a-date-picker
                v-model="endDate"
                style="width:100%"
                placeholder="请选择结束时间"
                :allowClear="false"
                :disabled-date="disabledEndDate"
                :inputReadOnly="true"
                @change="onChangeTime"
              />
            </a-form-item>
            <!-- <a-range-picker
              :value="dataRangeArr"
              :format="dateFormat"
              size="small"
              @change="TimeChange"
              :allowClear="allowClear"
              :getCalendarContainer="triggerNode => { return triggerNode.parentNode || document.body }"
            ></a-range-picker>-->
          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-form>
  </div>
</template>

<script>
import * as moment from "moment";
import draggable from "vuedraggable";
import _ from "lodash";
import SET_DATA from "@/utils/newSetData";
import { queryIndexInfo, getIndexData } from "@/api/template";
import deleteIcon from "@/assets/images/delete.png";
import moveIcon from "@/assets/images/move.png";
import noDataIcon from "@/assets/images/nodata.png";

export default {
  name: "chartDataSet",
  components: { draggable },
  data() {
    this.lastFetchId = 0;
    const self = this;
    return {
      deleteIcon,
      moveIcon,
      noDataIcon,
      data: [],
      fetching: false,
      noContent: false,
      indexCode: [],
      code: [],
      activeKey: ["1", "2"],
      form: this.$form.createForm(this, {
        name: "data-set"
      }),
      timeType: true,
      timeType2: false,
      checked2: false,
      children: self.value,
      formData: {},
      updateData: JSON.stringify([]),
      timeVal: "1",
      allowClear: false,
      dateFormat: "YYYY-MM-DD",
      dataRangeArr: [],
      startDate: null,
      endDate: null,
      dateStrings: null,
      fqType: "FQ-YY",
      codeValue:''
    };
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: Object,
      default() {
        return {};
      }
    },
    option: {
      type: Object,
      default() {
        return {};
      }
    },
    componentType: String,
    dataConfig: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  // watch: {
  //   children: {
  //     deep: true,
  //     immediate: true,
  //     handler(val) {
  //       console.log(val)
  //       this.getChartData();
  //     }
  //   }
  // },
  created() {
    let end = moment().format("YYYY-MM-DD");
    let currentYear = moment().get("year");
    let start = moment()
      .year(currentYear - 1)
      .format("YYYY-MM-DD");
    this.startDate = moment(start);
    this.endDate = moment(end);
  },
  mounted() {
    this.indexCode = this.value;
    if (this.option.chartParams) {
      this.fqType = this.option.chartParams.frequency;
      this.timeVal = this.option.chartParams.dateValue;
      if (this.option.chartParams.queryType == 1) {
        this.timeType = true;
        this.timeType2 = false;
      } else {
        this.timeType = false;
        this.timeType2 = true;
      }
    }
    //console.log("图形参数", this.option);
  },
  methods: {
    disabledStartDate(current) {
      let endTime = moment(this.endDate).valueOf(); //valueOf()将moment(this.startTime)转化为毫秒数值
      let currentTime = current.valueOf();
      return currentTime > endTime; //禁用小于开始时间的日期
    },
    disabledEndDate(current) {
      let startTime = moment(this.startDate).valueOf(); //valueOf()将moment(this.startTime)转化为毫秒数值
      let currentTime = current.valueOf();
      return currentTime < startTime; //禁用小于开始时间的日期
    },
    changeNum(e) {
      let val = e.target.value;
      let reg = /(^[1-9]\d*$)/;
      if (!reg.test(val)) {
        let len = val.length;
        let v = val.substring(len - 1, len);
        this.timeVal = val.replace(v, "");
        this.$message.warning("请输入正整数");
      }
    },
    onChange(type) {
      if (type == 1) {
        if (this.timeType) {
          this.timeType2 = false;
        } else {
          this.timeType = true;
        }
      } else {
        if (this.timeType2) {
          this.timeType = false;
        } else {
          this.timeType2 = true;
        }
      }
      this.getChartData();
    },
    TimeChange(dates, dateStrings) {
      String(dates);
      this.dataRangeArr = [
        moment(dateStrings[0], "YYYY-MM-DD"),
        moment(dateStrings[1], "YYYY-MM-DD")
      ];
      this.dateStrings = dateStrings;
      this.getChartData();
    },
    onChangeTime() {
      this.getChartData();
    },
    //禁止拖动到id为1的对象
    onMove(e) {
      if (e.relatedContext.element.forbid) return false;
      return true;
    },
    onEnd() {
      this.children = this.indexCode;
      this.getChartData();
    },
    clearInput(){
      this.codeValue = '';
    },
    fetchIndexInfo() {
      let value = this.codeValue;
      let array = this.children.filter(item=>item.key===value);
      if(array.length>0){
        this.codeValue = "";
        this.$message.warning("指标已存在");
        return;
      }
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.data = [];
      this.fetching = true;
      queryIndexInfo([value]).then(res => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        if (res.success) {
          if (res.data && res.data.length) {
            this.data = res.data;
            let list = this.deepClone(this.children);
            let currentData = res.data[0];
            list.push({
              label: currentData.indexShortName,
              key: currentData.indexCode
            });
            this.handleChange(list) 
          } else {
            this.noContent = true;
            this.$message.warning("未查询到该条指标信息");
          }
          this.fetching = false;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    handleChange(indexCode) {
      if (
        this.componentType === "bar-simple" ||
        this.componentType === "line-simple"
      ) {
        if (indexCode.length && indexCode.length > 5) {
          this.$message.warning("最多添加5个指标");
          return;
        }
      } else {
        if (indexCode.length && indexCode.length > 2) {
          this.$message.warning("已有2种指标单位，不支持更多的指标单位");
          return;
        }
      }
      let list = [];
      indexCode.map(item => {
        list.push(item.key);
      });
      let unitName = this.data[0].unitName;
      if (list.length === 0) {
        this.fetching = false;
        return;
      }
      queryIndexInfo(list).then(res => {
        let flag = false;
        let unitList = [];
        if (res.success) {
          let resDatas = res.data;
          if (resDatas) {
            resDatas.map(item => {
              if (item.unitName != unitName) {
                flag = true;
              }
              unitList.push(item.unitName);
              indexCode.map(child => {
                if (child.key === item.indexCode) {
                  child.unitName = item.unitName;
                }
              });
            });
          }
          if (this.componentType === "bar-simple") {
            if (flag) {
              this.$message.warning("指标单位必须保持一致");
              return;
            }
          } else if (this.componentType === "line-simple") {
            let list = _.uniq(unitList);
            console.log(_.uniq(unitList));
            if (list.length > 2) {
              this.$message.warning("指标单位种类不能大于两个");
              return;
            }
          }
          this.codeValue = "";
          //console.log(this.data);
          this.children = indexCode;
          Object.assign(this, {
            indexCode,
            data: [],
            fetching: false
          });
          this.getChartData();
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    getChartData() {
      let _this = this;
      let val = this.timeVal;
      let type = 1;
      let list = [];
      let start = "",
        end = "";
      this.children.map(item => {
        list.push(item.key);
      });

      if (this.timeType) {
        type = 1;
        //年
        if (this.fqType === "FQ-YY") {
          start = moment()
            .subtract("years", val)
            .format("YYYY-MM-DD");
        } else if (this.fqType === "FQ-MM") {
          //月
          start = moment()
            .subtract("months", val)
            .format("YYYY-MM-DD");
        } else if (this.fqType === "FQ-DD") {
          //日
          start = moment()
            .subtract("days", val)
            .format("YYYY-MM-DD");
        }
        end = moment().format("YYYY-MM-DD");
      }
      if (this.timeType2) {
        type = 0;
        val = 0;
        start = this.startDate.format("YYYY-MM-DD");
        end = this.endDate.format("YYYY-MM-DD");
      }
      let params = {
        indexCodes: list,
        beginDate: start,
        endDate: end,
        dateValue: val,
        frequency: this.fqType,
        queryType: type
      };
      getIndexData(params)
        .then(res => {
          const defaultColorList = [
            "#4355FF",
            "#1ADDE6",
            "#0059E4",
            "#628DCE",
            "#BC7A4C",
            "#078BE7",
            "#33B974",
            "#4AB0EC",
            "#13437C",
            "#C7AB5D"
          ];
          console.log("option", this.option);
          if (res.success) {
            let unit = "";
            let unitList = [];
            let dataList = [];
            let legendData = [];
            let xAxisData = [];
            let yAxisData = {
              name: "",
              type: "value",
              min: null,
              max: null,
              splitLine: {
                show: false,
                lineStyle: {
                  type: "dashed",
                  color: "#133C67"
                }
              },
              axisLabel: {
                show: true,
                fontSize: 12,
                fontFamily: "sans-serif",
                fontWeight: "normal",
                rotate: 0,
                color: "#ffffff"
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#133C67"
                }
              },
              markPoint: []
            };
            let seriesParams = [];
            let resDatas = res.data;
            if (resDatas) {
              let sortDatas = {};
              _this.children.map(item => {
                sortDatas[item.key] = resDatas[item.key];
                unit = item.unitName;
                unitList.push(item.unitName);
              });
              let uniqList = _.uniq(unitList);
              let hasColorList = [];
              let xList = [];
              Object.keys(sortDatas).map((item, index) => {
                let name = "";
                let seriesData = [];
                let isHasCorlor = false;
                _this.children.map(child => {
                  if (child.key === item) {
                    name = child.label;
                  }
                });
                legendData.push(name);

                let datas = sortDatas[item];
                if (datas && datas.length > 0) {
                  datas.map(item => {
                    xList.push(item.dataDate);
                    seriesData.push([item.dataDate, item.dataValue]);
                    dataList.push({
                      name: name,
                      x: item.dataDate,
                      y: item.dataValue
                    });
                  });
                }
                if (this.componentType === "bar-simple") {
                  let itemStyle = {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#00C4C1" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#00C4C1" // 100% 处的颜色
                        }
                      ]
                    }
                  };
                  this.option.series.map(optionRes => {
                    if (optionRes.code === item) {
                      isHasCorlor = true;
                      if (
                        optionRes.itemStyle.color.colorStops[0] &&
                        optionRes.itemStyle.color.colorStops[1] &&
                        optionRes.itemStyle.color.colorStops[0].color !==
                          optionRes.itemStyle.color.colorStops[1].color
                      ) {
                        hasColorList.push(
                          optionRes.itemStyle.color.colorStops[0].color
                        );
                        hasColorList.push(
                          optionRes.itemStyle.color.colorStops[1].color
                        );
                      } else {
                        if (optionRes.itemStyle.color.colorStops[0]) {
                          hasColorList.push(
                            optionRes.itemStyle.color.colorStops[0].color
                          );
                        }
                      }
                    }
                  });
                  yAxisData = this.option.yAxis;
                  yAxisData.name = unit;
                  if (!isHasCorlor) {
                    let differenData;
                    if (hasColorList.length) {
                      differenData = _.differenceWith(
                        defaultColorList,
                        hasColorList,
                        _.isEqual
                      );
                    } else {
                      differenData = defaultColorList;
                    }
                    itemStyle.color.colorStops[0].color = differenData[index]
                      ? differenData[index]
                      : "#00C4C1";
                    itemStyle.color.colorStops[1].color = differenData[index]
                      ? differenData[index]
                      : "#00C4C1";
                  }
                  seriesParams.push({
                    type: "bar",
                    name: name,
                    itemStyle: itemStyle,
                    yAxisIndex: 0,
                    barMaxWidth: 50,
                    data: seriesData
                  });
                } else if (this.componentType === "line-simple") {
                  let isShowArea = false;
                  let smooth = true;
                  let symbolSize = [4, 4];
                  let symbol = "none";
                  let connectNulls = true;
                  let itemStyle = {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#30f5ee" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0a72fa" // 100% 处的颜色
                        }
                      ]
                    }
                  };
                  let lineStyle = {
                    width: 4,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#30f5ee" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0a72fa" // 100% 处的颜色
                        }
                      ]
                    }
                  };
                  let areaStyle = {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#30f5ee" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0a72fa" // 0% 处的颜色
                        }
                      ]
                    }
                  };
                  this.option.series.map(optionRes => {
                    if (optionRes.code === item) {
                      isShowArea = optionRes.isShowArea;
                      areaStyle = optionRes.areaStyle;
                      symbolSize = optionRes.symbolSize;
                      smooth = optionRes.smooth;
                      symbol = optionRes.symbol;
                      connectNulls = optionRes.connectNulls;
                      itemStyle = optionRes.itemStyle;
                      lineStyle = optionRes.lineStyle;

                      isHasCorlor = true;
                      if (
                        optionRes.itemStyle.color.colorStops[0] &&
                        optionRes.itemStyle.color.colorStops[1] &&
                        optionRes.itemStyle.color.colorStops[0].color !==
                          optionRes.itemStyle.color.colorStops[1].color
                      ) {
                        hasColorList.push(
                          optionRes.itemStyle.color.colorStops[0].color
                        );
                        hasColorList.push(
                          optionRes.itemStyle.color.colorStops[1].color
                        );
                      } else {
                        if (optionRes.itemStyle.color.colorStops[0]) {
                          hasColorList.push(
                            optionRes.itemStyle.color.colorStops[0].color
                          );
                        }
                      }
                    }
                  });
                  if (uniqList.length > 1) {
                    yAxisData = [
                      {
                        name: uniqList[0],
                        type: "value",
                        min: null,
                        max: null,
                        splitLine: {
                          show: false,
                          lineStyle: {
                            type: "dashed",
                            color: "#133C67"
                          }
                        },
                        axisLabel: {
                          show: true,
                          fontSize: 12,
                          fontFamily: "sans-serif",
                          fontWeight: "normal",
                          rotate: 0,
                          color: "#ffffff"
                        },
                        axisLine: {
                          show: true,
                          lineStyle: {
                            color: "#133C67"
                          }
                        },
                        markPoint: []
                      },
                      {
                        name: uniqList[1],
                        type: "value",
                        min: null,
                        max: null,
                        splitLine: {
                          show: false,
                          lineStyle: {
                            type: "dashed",
                            color: "#133C67"
                          }
                        },
                        axisLabel: {
                          show: true,
                          fontSize: 12,
                          fontFamily: "sans-serif",
                          fontWeight: "normal",
                          rotate: 0,
                          color: "#ffffff"
                        },
                        axisLine: {
                          show: true,
                          lineStyle: {
                            color: "#133C67"
                          }
                        },
                        markPoint: []
                      }
                    ];
                    if (this.option.yAxis[0] && this.option.yAxis[1]) {
                      yAxisData[0] = this.option.yAxis[0];
                      yAxisData[1] = this.option.yAxis[1];
                      yAxisData[0].name = uniqList[0];
                      yAxisData[1].name = uniqList[1];
                    } else {
                      yAxisData[0] = JSON.parse(
                        JSON.stringify(this.option.yAxis)
                      );
                      yAxisData[1] = JSON.parse(
                        JSON.stringify(
                          this.option.yAxis[1] || this.option.yAxis
                        )
                      );
                      yAxisData[0].name = uniqList[0];
                      yAxisData[1].name = uniqList[1];
                    }
                  } else {
                    yAxisData = {
                      name: uniqList[0],
                      type: "value",
                      min: null,
                      max: null,
                      splitLine: {
                        show: false,
                        lineStyle: {
                          type: "dashed",
                          color: "#133C67"
                        }
                      },
                      axisLabel: {
                        show: true,
                        fontSize: 12,
                        fontFamily: "sans-serif",
                        fontWeight: "normal",
                        rotate: 0,
                        color: "#ffffff"
                      },
                      axisLine: {
                        show: true,
                        lineStyle: {
                          color: "#133C67"
                        }
                      },
                      markPoint: []
                    };
                    yAxisData = this.option.yAxis[0] || this.option.yAxis;
                    yAxisData.name = uniqList[0];
                  }
                  if (!isHasCorlor) {
                    let differenData;
                    if (hasColorList.length) {
                      differenData = _.differenceWith(
                        defaultColorList,
                        hasColorList,
                        _.isEqual
                      );
                    } else {
                      differenData = defaultColorList;
                    }

                    itemStyle.color.colorStops[0].color = differenData[index]
                      ? differenData[index]
                      : "#00C4C1";
                    itemStyle.color.colorStops[1].color = differenData[index]
                      ? differenData[index]
                      : "#00C4C1";
                    lineStyle.color.colorStops[0].color = differenData[index]
                      ? differenData[index]
                      : "#00C4C1";
                    lineStyle.color.colorStops[1].color = differenData[index]
                      ? differenData[index]
                      : "#00C4C1";
                    if (isShowArea) {
                      areaStyle.color.colorStops[0].color = differenData[index]
                        ? differenData[index]
                        : "#00C4C1";
                      areaStyle.color.colorStops[1].color = differenData[index]
                        ? differenData[index]
                        : "#00C4C1";
                    }
                  }
                  let params = {
                    type: "line",
                    name: name,
                    code: item,
                    data: seriesData,
                    smooth: smooth,
                    symbolSize: symbolSize,
                    symbol: symbol,
                    connectNulls: connectNulls,
                    itemStyle: itemStyle,
                    lineStyle: lineStyle,
                    isShowArea: isShowArea,
                    areaStyle: areaStyle,
                    yAxisIndex: unitList[index] === uniqList[0] ? 0 : 1
                  };
                  if (!isShowArea) {
                    delete params.areaStyle;
                  }
                  seriesParams.push(params);
                } else if (this.componentType === "bar-line-double") {
                  let isShowArea = false;
                  let smooth = true;
                  let symbolSize = [4, 4];
                  let symbol = "none";
                  let connectNulls = true;
                  let itemStyle = {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#30f5ee"
                        },
                        {
                          offset: 1,
                          color: "#0a72fa"
                        }
                      ]
                    }
                  };
                  let lineStyle = {
                    width: 4,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#30f5ee" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0a72fa" // 100% 处的颜色
                        }
                      ]
                    }
                  };
                  let areaStyle = {
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#30f5ee" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#0a72fa" // 0% 处的颜色
                        }
                      ]
                    }
                  };
                  this.option.series.map(optionRes => {
                    if (optionRes.code === item) {
                      isShowArea = optionRes.isShowArea;
                      areaStyle = optionRes.areaStyle;
                      symbolSize = optionRes.symbolSize;
                      smooth = optionRes.smooth;
                      symbol = optionRes.symbol;
                      connectNulls = optionRes.connectNulls;
                      itemStyle = optionRes.itemStyle;
                      lineStyle = optionRes.lineStyle;

                      isHasCorlor = true;
                      if (
                        optionRes.itemStyle.color.colorStops[0] &&
                        optionRes.itemStyle.color.colorStops[1] &&
                        optionRes.itemStyle.color.colorStops[0].color !==
                          optionRes.itemStyle.color.colorStops[1].color
                      ) {
                        hasColorList.push(
                          optionRes.itemStyle.color.colorStops[0].color
                        );
                        hasColorList.push(
                          optionRes.itemStyle.color.colorStops[1].color
                        );
                      } else {
                        if (optionRes.itemStyle.color.colorStops[0]) {
                          hasColorList.push(
                            optionRes.itemStyle.color.colorStops[0].color
                          );
                        }
                      }
                    }
                  });
                  yAxisData = [
                    {
                      name: uniqList[0],
                      type: "value",
                      min: null,
                      max: null,
                      splitLine: {
                        show: false,
                        lineStyle: {
                          type: "dashed",
                          color: "#133C67"
                        }
                      },
                      axisLabel: {
                        show: true,
                        fontSize: 12,
                        fontFamily: "sans-serif",
                        fontWeight: "normal",
                        rotate: 0,
                        color: "#ffffff"
                      },
                      axisLine: {
                        show: true,
                        lineStyle: {
                          color: "#133C67"
                        }
                      },
                      markPoint: []
                    },
                    {
                      name: uniqList[1] ? uniqList[1] : uniqList[0],
                      type: "value",
                      min: null,
                      max: null,
                      splitLine: {
                        show: false,
                        lineStyle: {
                          type: "dashed",
                          color: "#133C67"
                        }
                      },
                      axisLabel: {
                        show: true,
                        fontSize: 12,
                        fontFamily: "sans-serif",
                        fontWeight: "normal",
                        rotate: 0,
                        color: "#ffffff"
                      },
                      axisLine: {
                        show: true,
                        lineStyle: {
                          color: "#133C67"
                        }
                      },
                      markPoint: []
                    }
                  ];
                  if (this.option.yAxis[0] && this.option.yAxis[1]) {
                    yAxisData[0] = this.option.yAxis[0];
                    yAxisData[1] = this.option.yAxis[1];
                    yAxisData[0].name = uniqList[0];
                    yAxisData[1].name = uniqList[1] ? uniqList[1] : "";
                  }
                  if (index === 0) {
                    if (!isHasCorlor) {
                      let differenData;
                      if (hasColorList.length) {
                        differenData = _.differenceWith(
                          defaultColorList,
                          hasColorList,
                          _.isEqual
                        );
                      } else {
                        differenData = defaultColorList;
                      }
                      itemStyle.color.colorStops[0].color = differenData[index]
                        ? differenData[index]
                        : "#00C4C1";
                      itemStyle.color.colorStops[1].color = differenData[index]
                        ? differenData[index]
                        : "#00C4C1";
                    }
                    let params = {
                      type: "bar",
                      name: name,
                      code: item,
                      data: seriesData,
                      barMaxWidth: 50,
                      markPoint: {
                        data: []
                      },
                      itemStyle: itemStyle,
                      yAxisIndex: 0
                    };
                    seriesParams.push(params);
                  } else {
                    if (!isHasCorlor) {
                      let differenData;
                      if (hasColorList.length) {
                        differenData = _.differenceWith(
                          defaultColorList,
                          hasColorList,
                          _.isEqual
                        );
                      } else {
                        differenData = defaultColorList;
                      }
                      console.log("differenData", differenData);
                      itemStyle.color.colorStops[0].color = differenData[index]
                        ? differenData[index]
                        : "#00C4C1";
                      itemStyle.color.colorStops[1].color = differenData[index]
                        ? differenData[index]
                        : "#00C4C1";
                      lineStyle.color.colorStops[0].color = differenData[index]
                        ? differenData[index]
                        : "#00C4C1";
                      lineStyle.color.colorStops[1].color = differenData[index]
                        ? differenData[index]
                        : "#00C4C1";
                      if (isShowArea) {
                        areaStyle.color.colorStops[0].color = differenData[
                          index
                        ]
                          ? differenData[index]
                          : "#00C4C1";
                        areaStyle.color.colorStops[1].color = differenData[
                          index
                        ]
                          ? differenData[index]
                          : "#00C4C1";
                      }
                    }
                    let params = {
                      type: "line",
                      name: name,
                      code: item,
                      data: seriesData,
                      smooth: smooth,
                      symbolSize: symbolSize,
                      symbol: symbol,
                      connectNulls: connectNulls,
                      itemStyle: itemStyle,
                      lineStyle: lineStyle,
                      isShowArea: isShowArea,
                      areaStyle: areaStyle,
                      yAxisIndex: 1
                    };
                    if (!isShowArea) {
                      delete params.areaStyle;
                    }
                    seriesParams.push(params);
                  }
                }
              });
              let allXList = [...new Set(xList)];
              allXList.sort(function(a, b) {
                let aTime = new Date(a).getTime();
                let bTime = new Date(b).getTime();
                return aTime - bTime;
              });
              xAxisData = allXList;
              this.$emit("data-changed", {
                data: {
                  indexCodeList: list,
                  unitName: unit,
                  uniqList: uniqList,
                  x: xAxisData,
                  y: yAxisData,
                  legend: legendData,
                  series: seriesParams
                },
                chartParams: params,
                indexCodeList: this.children
              });
              this.$emit("update-chart");
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clearInputData() {
      this.indexCode = "";
      this.form.resetFields();
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    // 更新数据
    configData({ option, componentName, type, functionKey }) {
      return SET_DATA[componentName].call(this, option, type, functionKey);
    },
    delIndexCode(index) {
      this.$confirm({
        title: "提示",
        content: "是否确认删除该指标？",
        onOk: async () => {
          this.indexCode.splice(index, 1);
          this.children = this.indexCode;
          this.getChartData();
        },
        onCancel() {}
      });
    },
    //编辑url
    inputBlur(data) {
      data.disabled = true;
    },
    updateNewData(data) {
      this.$emit("data-changed", {
        dataConfig: {
          ...this.formData,
          data: data
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.define-collapse-panel {
  ::v-deep .ant-collapse-content-box {
    height: 400px;
  }
}
.define-choose-input {
  width: 94%;
  ::v-deep .ant-input-group-addon {
    color: #00fcff;
  }
}
input[disabled] {
  border: 0 !important;
  opacity: 1;
  cursor: unset;
}
.mutli-frame {
  ::v-deep .add-data {
    color: #2aa756;
    font-size: 18px;
    padding-left: 10px;
    cursor: pointer;
  }
  ::v-deep .clear-data {
    color: #ff3737;
    font-size: 18px;
    padding-left: 10px;
    cursor: pointer;
  }
  ::v-deep .input-url {
    width: 82%;
  }
}

.url-list {
  list-style: none;
  li {
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #0e3753;
    .url-input {
      float: left;
      width: 86%;
      background-color: transparent;
      color: #00fcff;
      padding: 0 5px;

      border: 0;
      .index-code {
        width: 100%;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        display: block;
      }
      .index-name {
        width: 100%;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #00fcff;
        display: block;
      }
    }
    .edit-btn {
      float: left;
      padding-left: 10px;

      cursor: pointer;
    }
    .delete-btn {
      float: left;
      padding-left: 10px;
      cursor: pointer;
    }
    .move-btn {
      cursor: move;
    }
  }
}

.define-radio-btn {
  ::v-deep .ant-checkbox-inner {
    border: 2px solid #00FCFF;
  }
  ::v-deep .ant-checkbox-checked {
    .ant-checkbox-inner {
      background: unset;
      border: 2px solid #00fcff;

      &::after {
        width: 8px;
        height: 8px;
        border: 0 !important;
        border-radius: 100%;
        background: rgb(0, 252, 255);
        transform: rotate(45deg) scale(1) translate(-38%, -38%);
      }
    }
  }
}

.index-input {
  ::v-deep .ant-form-item-children {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.confirm-btn {
  float: left;
  width: 18px;
  height: 18px;
  margin-left: 20px;
  margin-right: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  background-image: url("../assets/images/confirm-normal.png");
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-image: url("../assets/images/confirm-hover.png");
  }
}

.close-btn {
  float: left;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  background-image: url("../assets/images/close-normal.png");
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-image: url("../assets/images/close-hover.png");
  }
}

::v-deep .ant-form-item-label label {
  color: #fff;
  &::after {
    display: none;
  }
}

::v-deep .ant-select-selection__choice__content {
  color: #fff !important;
}

::v-deep .ant-select-selection__choice__remove {
  color: #fff !important;
}

::v-deep .ant-select-selection__choice {
  background-color: #019ba7 !important;
  border: 1px solid #019ba7 !important;
  display: none;
}

::v-deep .ant-checkbox-wrapper {
  color: #fff;
}

::v-deep .ant-checkbox-wrapper-checked {
  color: #00fcff;
}

::v-deep .ant-checkbox-inner {
  border-radius: 100%;
  background: unset;
  border: 1px solid #00fcff;
}

::v-deep .ant-calendar-range-picker-separator {
  color: #00788e;
}

::v-deep .ant-calendar-picker-clear {
  color: #fff !important;
  background: #0e3753 !important;
}

// ::v-deep .ant-checkbox{

// }

// ::v-deep .ant-checkbox-checked{

// }
</style>
