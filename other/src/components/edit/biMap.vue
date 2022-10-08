<template>
  <div
    class="chart-container"
    :style="{
      position: 'relative',
      width: `${options.component.width}px`,
      height: `${options.component.height}px`,
    }"
  >
    <!-- <div
      class="chart-header"
      v-show="showTitle"
      :style="{
        fontFamily: options.title.style && options.title.style.fontFamily,
        fontSize: `${options.title.style && options.title.style.fontSize}px`,
        lineHeight: `${(options.title.style && options.title.style.fontSize * 2 + 'px') || 2}`,
        opacity: isSave ? 0 : 1
      }"
    >
      {{ options.title.name }}
    </div>-->
    <div
      :class="options.domId"
      :ref="options.domId"
      class="chart"
      :style="{
        height: `${options.component.height}px`,
      }"
    ></div>
    <div id="legend" class="legend">
      <h3>涨幅值</h3>
      <ul class="legendList">
        <li>
          <span class="color1"></span>
          <span class="legend-val">&gt; 50</span>
        </li>
        <li>
          <span class="color2"></span>
          <span class="legend-val">10 ~ 50</span>
        </li>
        <li>
          <span class="color3"></span>
          <span class="legend-val">1 ~ 9</span>
        </li>
        <li>
          <span class="color4"></span>
          <span class="legend-val">-9 ~ -1</span>
        </li>
        <li>
          <span class="color5"></span>
          <span class="legend-val">-50 ~ -10</span>
        </li>
        <li>
          <span class="color6"></span>
          <span class="legend-val">&lt; -50</span>
        </li>
      </ul>
    </div>
    <div id="overView" class="overView" :class="{ rightLong: !maxData }">
      <div class="view view1">
        <p class="viewTitle" style="margin-top: 31px">平均价</p>
        <p
          class="price-font"
          :style="{ color: riseVal > 0 ? '#ea3b3b' : '#2AA857' }"
        >
          {{ averageVal ? Number(Number(averageVal).toFixed(2)) : "-" }}
          {{ riseVal ? Number(Number(riseVal).toFixed(2)) : "-" }}
        </p>
      </div>
      <div class="split-line"></div>
      <div class="view view2">
        <p class="viewTitle" style="margin-top: 19px">最高价</p>
        <p class="max-city">
          {{ maxData ? maxData.city : "-" }}
          {{ maxData ? maxData.factory : "-" }}
        </p>
        <p
          class="price-font2"
          :style="{
            color: maxData && maxData.raise > 0 ? '#ea3b3b' : '#2AA857',
          }"
        >
          {{ maxData ? maxData.value : "-" }}
          {{ maxData ? maxData.raise : "-" }}
        </p>
      </div>
      <div class="split-line"></div>
      <div class="view view3">
        <p class="viewTitle" style="margin-top: 19px">最低价</p>
        <p class="max-city">
          {{ minData ? minData.city : "-" }}
          {{ minData ? minData.factory : "-" }}
        </p>
        <p
          class="price-font2"
          :style="{
            color: minData && minData.raise > 0 ? '#ea3b3b' : '#2AA857',
          }"
        >
          {{ minData ? minData.value : "-" }}
          {{ minData ? minData.raise : "-" }}
        </p>
      </div>
    </div>

    <div
      class="define-gray-modal"
      :style="{
        width: `${options.component.width}px`,
        height: `${options.component.height}px`,
        cursor: isEdit ? 'move' : 'unset',
      }"
    ></div>

    <div class="map-btn-area">
      <div class="map-move">
        <span class="move-left" @click="mapMove('left')"></span>
        <span class="move-right" @click="mapMove('right')"></span>
        <span class="move-top" @click="mapMove('top')"></span>
        <span class="move-bottom" @click="mapMove('bottom')"></span>
      </div>
      <div class="map-max" @click="mapMax"></div>
      <div class="map-min" @click="mapMin"></div>
    </div>

    <bi-dialog
      v-if="showIframe"
      title="跳转页码"
      @cancel="
        () => {
          showIframe = false;
        }
      "
      :footer="null"
      :noBackgroundImg="true"
      width="100%"
      v-loading="loading"
    >
      <iframe
        :src="options.actionPanel.pageUrl"
        frameborder="0"
        width="100%"
        :height="iframeHeight"
        @load="handleLoad"
      ></iframe>
    </bi-dialog>
  </div>
</template>

<script>
import * as Echarts from "echarts";
import * as moment from "moment";
import _ from "lodash";
import { getMapData } from "@/api/template";
import { optionFactory } from "@/constants/geoJson/cityMap";
import BiDialog from "@/components/biDialog.vue";

export default {
  name: "BiMap",
  props: {
    showTitle: {
      default: true,
    },
    options: {
      required: true,
      type: Object,
    },
    isSave: {
      required: false,
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      isEdit: false,
      averageVal: "",
      riseVal: "",
      minData: "",
      maxData: "",
      chartInstance: null,
      resizeTimer: null,
      option: null,
      showIframe: false,
      loading: false,
      iframeHeight: window.innerHeight + "px",
      dataInterval: null,
      transFormDataInterval: null,
      isReplaceData: false,
    };
  },
  components: { BiDialog },
  methods: {
    mapMax() {
      let option = this.chartInstance[0].getOption();
      let zoom = option.geo[0].zoom;
      option.geo[0].zoom = zoom * 2;
      this.option = option;
      this.chartInstance[0].clear();
      this.chartInstance[0].setOption(this.option);
      window.localStorage.setItem("zoom_" + this.options.domId, zoom * 2);
      console.log(this.chartInstance[0].getOption());
    },
    mapMin() {
      let option = this.chartInstance[0].getOption();
      let zoom = option.geo[0].zoom;
      option.geo[0].zoom = zoom / 2;
      this.option = option;
      this.chartInstance[0].clear();
      this.chartInstance[0].setOption(this.option);
      window.localStorage.setItem("zoom_" + this.options.domId, zoom / 2);
    },
    mapMove(type) {
      console.log(type);
      let option = this.chartInstance[0].getOption();
      let center = option.geo[0].center;
      let changeCener = null;
      if (center) {
        if (type === "left") {
          changeCener = [0.9 * Number(center[0]), Number(center[1])];
        } else if (type === "right") {
          changeCener = [1.1 * Number(center[0]), Number(center[1])];
        } else if (type === "top") {
          changeCener = [Number(center[0]), 1.1 * Number(center[1])];
        } else if (type === "bottom") {
          changeCener = [Number(center[0]), 0.9 * Number(center[1])];
        }
        option.geo[0].center = changeCener;
        this.option = option;
        this.chartInstance[0].clear();
        this.chartInstance[0].setOption(this.option);
        window.localStorage.setItem(
          "center_" + this.options.domId,
          changeCener
        );
      }
    },
    refresh() {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        this.chartInstance.forEach((instance) => {
          instance.setOption(this.option, {
            notMerge: true,
            lazyUpdate: false,
          });
          instance.resize({ animation: { duration: 300 } });
        });
      }, 100);
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    handleLoad() {
      this.loading = false;
    },
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = dataItem.address;
        if (fromCoord) {
          fromCoord[0] = Number(fromCoord[0]);
          fromCoord[1] = Number(fromCoord[1]);
          res.push({
            name: dataItem.city,
            value: fromCoord.concat([Number(dataItem.value)]),
            citytype: dataItem.citytype,
            province: dataItem.province,
            factory: dataItem.factory,
            raise: dataItem.raise,
          });
        }
      }
      return res;
    },
    setSacleData(instance, _option, _zoom, convertData) {
      let _this = this;
      let seriesDatas = [];
      for (let i = 0; i < convertData.length; i++) {
        if (_zoom < 1) {
          if (convertData[i].citytype === "1") {
            seriesDatas.push(convertData[i]);
          }
        } else {
          if (_zoom >= Number(convertData[i].citytype)) {
            seriesDatas.push(convertData[i]);
          }
        }
      }
      let uniqData = _.uniqBy(seriesDatas, "name");
      _option.series[0].data = uniqData;
      instance.clear(); //清空
      instance.setOption(_option);
      let chartOption = instance.getOption();
      console.log(instance, chartOption);
      let geo = chartOption.geo[0];
      window.localStorage.setItem("center_" + _this.options.domId, geo.center);
      window.localStorage.setItem("zoom_" + _this.options.domId, geo.zoom);
      // let oldData = JSON.parse(JSON.stringify(seriesDatas));
      // let uniqData = _.uniqBy(oldData, "name");
      // let differenData = _.differenceWith(oldData, uniqData, _.isEqual);
      // let uniqData2 = _.mergeWith(uniqData, differenData, (a, b) =>
      //   _.isArray(b) ? b : undefined
      // );
      // if (_this.transFormDataInterval) {
      //   window.clearInterval(_this.transFormDataInterval);
      // }
      // if (differenData && differenData.length > 0) {
      //   _this.transFormDataInterval = setInterval(function() {
      //     _this.isReplaceData = !_this.isReplaceData;
      //     instance.clear();
      //     if (_this.isReplaceData) {
      //       _this.option.series[0].data = uniqData;
      //       instance.setOption(_this.option);
      //     } else {
      //       _this.option.series[0].data = uniqData2;
      //       instance.setOption(_this.option);
      //     }
      //   }, 3000);
      // }
      // console.log("seriesDatas", seriesDatas);
      // console.log("uniqData", uniqData);
      // console.log("differenData", differenData);
      // console.log("uniqData2", uniqData2);
    },
    // 防抖函数
    debounce(fn, wait) {
      let timer;
      return function () {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args); // 把参数传进去
        }, wait);
      };
    },
    fetchMapData(saveParams) {
      let _this = this;
      let datetime = moment().format("YYYY-MM-DD");
      let params = {
        type: saveParams.type,
        dateTime: datetime,
        option: saveParams.option,
        defaultSign: 0,
      };
      getMapData(params)
        .then((res) => {
          if (res.success) {
            let resDatas = res.data.data;
            let averageVal = 0;
            let maxData = null;
            let minData = null;
            let list = [];
            let riseAll = 0;
            let alllVal = 0;
            let riseVal = 0;
            if (resDatas && resDatas.length > 0) {
              resDatas.map((item) => {
                list.push(item.value);
                riseAll += Number(item.raise);
                alllVal += Number(item.value);
              });
              let maxVal = Math.max(...list);
              let minVal = Math.min(...list);
              maxData = resDatas[list.indexOf(maxVal + "")];
              minData = resDatas[list.indexOf(minVal + "")];
              averageVal = alllVal / resDatas.length;
              riseVal = riseAll / resDatas.length;
            }
            this.averageVal = averageVal;
            this.riseVal = riseVal;
            this.maxData = maxData;
            this.minData = minData;

            const data = resDatas;
            this.chartInstance.forEach((instance) => {
              instance.clear();
              if (!this.option) {
                this.option = optionFactory.call(
                  this,
                  "china",
                  data,
                  _this.options.contentOption
                );
              }
              let sdatas = [];
              let convertData = this.convertData(data);
              if (data) {
                for (let i = 0; i < convertData.length; i++) {
                  if (convertData[i].citytype === "1") {
                    sdatas.push(convertData[i]);
                  }
                }
              }
              let uniqData = _.uniqBy(sdatas, "name");
              this.option.series[0].data = uniqData;
              instance.setOption(this.option);
              instance.on("georoam", (params) => {
                if (params.dy || params.dx) return; //如果是拖拽事件则退出
                let _option = instance.getOption(); //获取最新的option配制
                let _zoom = _option.geo[0].zoom; //获取当前缩放比例zoom
                _this.getDataDebounce(instance, _option, _zoom, convertData);
              });
            });
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    let _this = this;
    Echarts.registerMap(
      this.options?.contentOption?.mapName || "guangdong",
      require(`@/constants/geoJson/mapJson/${
        this.options?.contentOption?.mapName || "guangdong"
      }.json`)
    );
    this.chartInstance = [];
    let sdatas = [];
    let myDomList = document.getElementsByClassName(this.options.domId);
    const { mapName } = this.options?.contentOption || {};
    const { data } = this.options?.dataConfig || {};
    for (let i = 0; i < myDomList.length; i++) {
      let myChart = Echarts.init(myDomList[i]);
      if (this.options.contentOption) {
        this.option = optionFactory.call(
          this,
          mapName || "guangdong",
          data,
          this.options.contentOption
        );
        let convertData = this.convertData(data);
        if (data) {
          for (let i = 0; i < convertData.length; i++) {
            if (convertData[i].citytype === "1") {
              sdatas.push(convertData[i]);
            }
          }
        }
        if (
          this.options.dataConfig.mapCenter &&
          this.options.dataConfig.mapZoom
        ) {
          if (this.option && this.option.geo) {
            this.option.geo.center = this.options.dataConfig.mapCenter;
            this.option.geo.zoom = Number(this.options.dataConfig.mapZoom);
          }
          if (this.option[0] && this.option[0].geo) {
            this.option[0].geo.center = this.options.dataConfig.mapCenter;
            this.option[0].geo.zoom = Number(this.options.dataConfig.mapZoom);
          }
        }
        let uniqData = _.uniqBy(sdatas, "name");
        this.option.series[0].data = uniqData;
        myChart.clear();
        myChart.setOption(this.option);
        console.log("--------------", this.option);
        window.localStorage.setItem(
          "center_" + this.options.domId,
          this.option.geo.center
        );
        myChart.on("georoam", (params) => {
          if (params.dy || params.dx) return; //如果是拖拽事件则退出
          let _option = myChart.getOption(); //获取最新的option配制
          let _zoom = _option.geo[0].zoom; //获取当前缩放比例zoom
          _this.getDataDebounce(myChart, _option, _zoom, convertData);
        });
      }
      this.chartInstance.push(myChart);
    }

    // if (window.location.href.indexOf("/edit/") > -1) {
    //   this.isEdit = true;
    // } else {
    //   this.isEdit = false;
    // }

    this.getDataDebounce = this.debounce(this.setSacleData, 300); // tab切换时防抖处理
    if (this.dataInterval) {
      window.clearInterval(this.dataInterval);
    }
    let saveParams = this.options.dataConfig.saveParams;
    if (saveParams) {
      _this.fetchMapData(saveParams);
      let updateLong = saveParams.updateLong;
      if (saveParams.isNowTime) {
        if (Number(updateLong)) {
          this.dataInterval = setInterval(() => {
            _this.fetchMapData(saveParams);
          }, Number(updateLong) * 60 * 60 * 1000);
        } else {
          this.dataInterval = setInterval(() => {
            _this.fetchMapData(saveParams);
          }, 1 * 60 * 60 * 1000);
        }
      }
    }

    window.addEventListener("click", function (e) {
      let className = e.target.className;
      if (
        className.indexOf("move-left") > -1 ||
        className.indexOf("move-right") > -1 ||
        className.indexOf("move-top") > -1 ||
        className.indexOf("move-bottom") > -1
      ) {
        let el = document.getElementsByClassName("map-move");
        if (el && el[0]) {
          el[0].classList = "map-move no-shadow";
        }
        let el2 = document.getElementsByClassName("map-max");
        if (el2 && el2[0]) {
          el2[0].classList = "map-max";
        }
        let el3 = document.getElementsByClassName("map-min");
        if (el3 && el3[0]) {
          el3[0].classList = "map-min";
        }
      } else if (
        className.indexOf("map-max") > -1 ||
        className.indexOf("map-min") > -1
      ) {
        if (className.indexOf("map-max") > -1) {
          let el = document.getElementsByClassName("map-max");
          if (el && el[0]) {
            el[0].classList = "map-max no-shadow";
          }
          let el2 = document.getElementsByClassName("map-move");
          if (el2 && el2[0]) {
            el2[0].classList = "map-move";
          }
          let el3 = document.getElementsByClassName("map-min");
          if (el3 && el3[0]) {
            el3[0].classList = "map-min";
          }
        } else {
          let el = document.getElementsByClassName("map-max");
          if (el && el[0]) {
            el[0].classList = "map-max";
          }
          let el2 = document.getElementsByClassName("map-move");
          if (el2 && el2[0]) {
            el2[0].classList = "map-move";
          }
          let el3 = document.getElementsByClassName("map-min");
          if (el3 && el3[0]) {
            el3[0].classList = "map-min no-shadow";
          }
        }
      } else {
        let el = document.getElementsByClassName("map-move");
        if (el && el[0]) {
          el[0].classList = "map-move";
        }

        let el2 = document.getElementsByClassName("map-max");
        if (el2 && el2[0]) {
          el2[0].classList = "map-max";
        }

        let el3 = document.getElementsByClassName("map-min");
        if (el3 && el3[0]) {
          el3[0].classList = "map-min";
        }
      }
    });
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler(val) {
        let _this = this;
        if (!val?.component?.active) return;
        if (this.chartInstance && this.chartInstance.length > 0) {
          if (!Echarts.getMap(val?.contentOption?.mapName)) {
            Echarts.registerMap(
              val?.contentOption?.mapName || "guangdong",
              require(`@/constants/geoJson/mapJson/${
                this.options?.contentOption?.mapName || "guangdong"
              }.json`)
            );
          }
          const { mapName } = val.contentOption || {};
          const { data } = val?.dataConfig || {};
          this.option = optionFactory.call(
            this,
            mapName||"china",
            data,
            _this.options.contentOption
          );
          this.chartInstance.forEach((instance) => {
            instance.clear();
            let sdatas = [];
            let convertData = this.convertData(data);
            if (data) {
              for (let i = 0; i < convertData.length; i++) {
                if (convertData[i].citytype === "1") {
                  sdatas.push(convertData[i]);
                }
              }
            }
            let uniqData = _.uniqBy(sdatas, "name");
            this.option.series[0].data = uniqData;
            instance.setOption(this.option, true);
            instance.on("georoam", (params) => {
              if (params.dy || params.dx) return; //如果是拖拽事件则退出
              let _option = instance.getOption(); //获取最新的option配制
              let _zoom = _option.geo[0].zoom; //获取当前缩放比例zoom
              _this.getDataDebounce(instance, _option, _zoom, convertData);
            });
          });
        }
        console.log(val?.dataConfig)
        const { maxData } = val?.dataConfig || {};
        const { minData } = val?.dataConfig || {};
        const { averageVal } = val?.dataConfig || "";
        const { riseVal } = val?.dataConfig || "";
        this.averageVal = averageVal;
        this.riseVal = riseVal;
        this.maxData = maxData;
        this.minData = minData;
      },
    },
  },
  destroyed() {
    window.clearInterval(this.dataInterval);
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  .chart-header {
    text-align: justify;
    // letter-spacing: 10px;
    font-variant: normal !important;
    color: $white;
    @extend .ft-12;
    line-height: 1.2em;
    padding: 0 10px;
  }
  .chart {
    width: 100%;
    height: 100%;
    flex: "auto";
    position: relative;
  }
}

.legend {
  position: absolute;
  left: -1.6em;
  top: -3.2em;
  width: 150px;
  height: 287px;
  background: #ffffff;
  border: 1px solid #036bc3;
  border-radius: 4px;
  background: #001a52;
  transform: scale(0.65);
}
.legend h3 {
  width: 62px;
  height: 20px;
  margin-left: 18px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
}
.legend ul {
  padding: 0;
  border: none;
}
.legend.type2 {
  height: 8.2rem;
}
.legend.type2 .legendList:first-of-type {
  display: none;
}
.legend.type2 .legendList:last-of-type {
  display: block;
}
.legendList {
  float: left;
  width: 100%;
  margin-top: 19px;
}
.legendList li {
  float: left;
  width: 100%;
  padding-left: 18px;
  font-size: 12px;
  line-height: 22px;
}
.legendList li:not(:first-child) {
  margin-top: 12px;
}
.legendList li span {
  float: left;
  display: inline-block;
  vertical-align: middle;
}
.legendList .color0 {
  background-color: #fd8282;
}
.legendList .color1 {
  float: left;
  width: 26px;
  height: 26px;
  background: #972440;
  border-radius: 2px;
  display: inline-block;
}
.legend-val {
  float: left;
  margin-left: 9px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
}
.legendList .color2 {
  float: left;
  width: 26px;
  height: 26px;
  background-color: #ad3250;
  border-radius: 2px;
  display: inline-block;
}
.legendList .color3 {
  float: left;
  width: 26px;
  height: 26px;
  background-color: #de5b79;
  border-radius: 2px;
  display: inline-block;
}
.legendList .color4 {
  float: left;
  width: 26px;
  height: 26px;
  background-color: #14a880;
  border-radius: 2px;
  display: inline-block;
}
.legendList .color5 {
  float: left;
  width: 26px;
  height: 26px;
  background-color: #14824b;
  border-radius: 2px;
  display: inline-block;
}
.legendList .color6 {
  float: left;
  width: 26px;
  height: 26px;
  background-color: #0e6b30;
  border-radius: 2px;
  display: inline-block;
}
.rightLong {
  left: -48px !important;
}
.overView {
  position: absolute;
  left: -5.7em;
  bottom: -1em;
  min-width: 296px;
  text-align: center;
  height: 114px;
  background-color: #001a52;
  border-radius: 5px;
  border: 1px solid #036bc3;
  box-shadow: 0px 1px 24px 0px #043094;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  transform: scale(0.65);
}
.overView .view {
  float: left;
  position: relative;
  //margin: 5px 1px;
  min-width: 100px;
}
.split-line {
  float: left;
  height: 90px;
  width: 1px;
  margin-left: 21px;
  margin-top: 12px;
  background: #0090ff;
}
.overView .view p {
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.overView .view1 {
  min-width: 75px;
  padding-left: 23px;
}
.overView .view2 {
  min-width: 75px;
  padding-left: 23px;
}
.overView .view3 {
  padding: 0 23px;
  border-right: none;
}
.overView .view .viewTitle {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #4691ed;
}
.overView .view .price-font {
  margin-top: 16px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
}
.overView .view .price-font2 {
  margin-top: 11px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
}
.overView .view .max-city {
  margin-top: 9px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
}
.red {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #ea3b3b;
}
.green {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #2aa857;
}
.define-gray-modal {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.05);
  cursor: move;
}
.map-btn-area {
  position: absolute;
  bottom: 0.5em;
  right: 26px;
  margin-top: -100px;
  z-index: 999;
  .map-move {
    position: relative;
    width: 60px;
    height: 60px;
    background-image: url("../../assets/images/mapMove.png");
    background-size: 32px 32px;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid #036bc3;
    background-color: #001a52;
    box-shadow: 0px 1px 24px 0px #043094;
    border-radius: 4px;
    .move-left {
      position: absolute;
      top: 21px;
      left: 16px;
      width: 10px;
      height: 14px;
      display: inline-block;
      cursor: pointer;
    }
    .move-right {
      position: absolute;
      top: 21px;
      right: 16px;
      width: 10px;
      height: 14px;
      display: inline-block;
      cursor: pointer;
    }
    .move-top {
      position: absolute;
      top: 16px;
      left: 21px;
      width: 14px;
      height: 8px;
      display: inline-block;
      cursor: pointer;
    }
    .move-bottom {
      position: absolute;
      bottom: 16px;
      left: 21px;
      width: 14px;
      height: 8px;
      display: inline-block;
      cursor: pointer;
    }
  }
  .map-max {
    width: 60px;
    height: 60px;
    margin-top: 16px;
    text-align: center;
    background-image: url("../../assets/images/mapMax.png");
    background-size: 32px 32px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #001a52;
    border: 1px solid #036bc3;
    border-bottom: 0;
    box-shadow: 0px 1px 24px 0px #043094;
    border-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    cursor: pointer;
  }
  .map-min {
    width: 60px;
    height: 60px;
    text-align: center;
    background-image: url("../../assets/images/mapMin.png");
    background-size: 32px 32px;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #001a52;
    border: 1px solid #036bc3;
    box-shadow: 0px 1px 24px 0px #043094;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    cursor: pointer;
  }

  .no-shadow {
    box-shadow: none;
  }
}
</style>
