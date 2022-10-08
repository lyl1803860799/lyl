<template>
  <div class="data-set">
    <a-form
      :form="form"
      :colon="false"
      labelAlign="left"
      class="mutli-frame"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
    >
      <a-collapse expandIconPosition="right">
        <a-collapse-panel header="商品数据">
          <a-form-item label="品种：">
            <a-select
              v-model="breedInfo"
              placeholder="请选择品种"
              style="width: 100%"
              @change="handleBreedChange"
            >
              <a-select-option v-for="d in breedData" :key="d.value">{{d.tag}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="数据维度：">
            <a-select
              placeholder="维度"
              v-model="dataType"
              style="width: 100%"
              @change="handleDaysChange"
            >
              <a-select-option value="0">日</a-select-option>
              <a-select-option value="1">周</a-select-option>
              <a-select-option value="2">月</a-select-option>
            </a-select>
          </a-form-item>
        </a-collapse-panel>
        <a-collapse-panel header="数据时间区间">
          <a-form-item label="时间配置：">
            <a-checkbox v-model="timeType" @change="onChange(1)">当天</a-checkbox>
            <a-checkbox v-model="timeType2" @change="onChange(0)">指定日期</a-checkbox>
          </a-form-item>
          <div v-if="timeType">
            <a-radio-group
              v-model="updateLong"
              :options="plainOptions"
              :default-value="value1"
              @change="updateTimeChange"
            />
          </div>
          <div v-if="timeType2">
            <a-date-picker
              style="width:96%;"
              v-model="chooseDate"
              :allowClear="allowClear"
              placeholder="请选择时间"
              @change="changeDate"
            />
          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-form>
  </div>
</template>

<script>
import * as moment from "moment";
//import draggable from "vuedraggable";
import { getBreedsInfo, getMapData } from "@/api/template";
const plainOptions = ["1小时", "3小时", "6小时", "12小时"];
export default {
  name: "mapDataSet",
  //components: { draggable },
  data() {
    const self = this;
    return {
      plainOptions,
      allowClear: false,
      value1: "1小时",
      updateLong: "1小时",
      breedInfo: "",
      breedData: [],
      dataType: "0",
      dateFormat: "YYYY-MM-DD",
      data: [],
      timeType: true,
      timeType2: false,
      form: this.$form.createForm(this, {
        name: "data-set"
      }),
      formData: {},
      updateData: JSON.stringify([]),
      chooseDate: moment()
    };
  },
  props: {
    option: {
      type: Object,
      default() {
        return {};
      }
    },
    title: {
      type: Object,
      default() {
        return {};
      }
    },
    componentType: String
  },
  // watch: {
  //   children: {
  //     deep: true,
  //     immediate: true,
  //     handler(val) {
  //       this.fetchIndexData(val);
  //     }
  //   }
  // },
  created() {},
  mounted() {
    this.fetchBreedInfo();
    if (this.option.dataConfig.saveParams) {
      this.breedInfo = this.option.dataConfig.saveParams.option;
      this.dataType = this.option.dataConfig.saveParams.type;
      this.updateLong = this.option.dataConfig.saveParams.updateLong;
      this.chooseDate = moment(this.option.dataConfig.saveParams.chooseDate);
      if (this.option.dataConfig.saveParams.isNowTime) {
        this.timeType = true;
        this.timeType2 = false;
      } else {
        this.timeType = false;
        this.timeType2 = true;
      }
    }
  },
  methods: {
    fetchBreedInfo() {
      getBreedsInfo()
        .then(res => {
          if (res.success) {
            let list = [];
            if (res.data) {
              res.data.map(item => {
                let data = item.data;
                data.map(chidData => {
                  list.push(chidData);
                });
              });
            }
            if (list.length) {
              //this.breedInfo = list.length ? list[0].value : "";
              this.breedData = list;
              this.fetchMapData(this.dataType, list[0].value);
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchMapData(type, value) {
      let datetime = "";
      if (this.timeType) {
        datetime = moment().format("YYYY-MM-DD");
      }
      if (this.timeType2) {
        datetime = this.chooseDate.format("YYYY-MM-DD");
      }
      if (!this.breedInfo.trim()) {
        return;
      }
      let params = {
        type: type,
        dateTime: datetime,
        option: value,
        defaultSign: 0
      };
      let saveParams = {
        type: type,
        option: value,
        isNowTime: this.timeType ? true : false,
        updateLong: this.updateLong,
        chooseDate: datetime
      };
      //console.log(saveParams);
      getMapData(params)
        .then(res => {
          if (res.success) {
            console.log(res);
            let resDatas = res.data.data;
            let averageVal = 0;
            let maxData = null;
            let minData = null;
            let list = [];
            let riseAll = 0;
            let alllVal = 0;
            let riseVal = 0;
            if (resDatas && resDatas.length > 0) {
              resDatas.map(item => {
                list.push(item.value?Number(item.value):item.value);
                riseAll += Number(item.raise);
                alllVal += Number(item.value);
              });
              let maxVal = Math.max(...list);
              let minVal = Math.min(...list);
              console.log(maxVal, minVal);
              maxData = resDatas[list.indexOf(maxVal?Number(maxVal):maxVal)];
              minData = resDatas[list.indexOf(minVal?Number(minVal):minVal)];
              averageVal = alllVal / resDatas.length;
              riseVal = riseAll / resDatas.length;
            }
            this.updateNewData({
              data: resDatas,
              maxData: maxData,
              minData: minData,
              averageVal: Number(averageVal.toFixed(2)),
              riseVal: Number(riseVal.toFixed(2)),
              saveParams: saveParams
            });
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleBreedChange(e) {
      this.breedInfo = e;
      this.fetchMapData(this.dataType, this.breedInfo);
    },
    handleDaysChange() {
      this.fetchMapData(this.dataType, this.breedInfo);
    },
    updateTimeChange() {
      this.fetchMapData(this.dataType, this.breedInfo);
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
      this.fetchMapData(this.dataType, this.breedInfo);
      //this.getChartData();
    },
    onChange1() {},
    changeDate(e) {
      console.log(e);
      this.fetchMapData(this.dataType, this.breedInfo);
    },
    clearInputData() {
      this.indexCode = "";
      this.form.resetFields();
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    updateNewData(obj) {
      this.$emit("data-changed", {
        dataConfig: {
          ...this.formData,
          maxData: obj.maxData,
          minData: obj.minData,
          averageVal: obj.averageVal,
          riseVal: obj.riseVal,
          data: obj.data,
          saveParams: obj.saveParams
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .ant-form-item-label label {
  color: #00fcff;
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
  border: 1px solid #00FCFF;
}

::v-deep .ant-calendar-picker-icon {
  color: #00788e;
}
</style>
