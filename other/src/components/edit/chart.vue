<template>
  <div
    class="chart-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
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
        height: `${options.component.height}px`
      }"
    ></div>
  </div>
</template>

<script>
import * as moment from "moment";
import * as Echarts from "echarts";
import { getIndexData } from "@/api/template";

export default {
  name: "Chart",
  props: {
    showTitle: {
      default: true
    },
    options: {
      required: true,
      type: Object
    },
    isSave: {
      required: false,
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      chartInstance: null,
      resizeTimer: null,
      dataInterval: null
    };
  },
  methods: {
    refresh() {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        this.chartInstance.forEach(instance => {
          const option = {
            ...this.options.contentOption,
            ...{ visualMap: this.options.contentOption.visualMap || [] }
          };

          let newOption = this.setDoubleY(option);
          newOption = this.setYNameStyle(newOption);
          newOption = this.setMarkPoint(newOption);
          newOption = this.setPieLegend(newOption);
          newOption = this.setPiePosition(newOption);
          instance.setOption(newOption, {
            notMerge: true,
            lazyUpdate: false
          });
          instance.resize({ animation: { duration: 300 } });
        });
      }, 100);
    },
    setMarkPoint(option) {
      const newOption = this.deepClone(option);
      const { yAxis, series } = newOption;
      let markPoint = [];
      if (Array.isArray(yAxis)) {
        yAxis.forEach(y => {
          y.markPoint && markPoint.push(...y.markPoint);
        });
        markPoint = [...new Set(markPoint)];
      } else {
        markPoint = yAxis?.markPoint;
      }
      if (markPoint && markPoint.length > 0) {
        const maxMins = series.map((s, index) => {
          const data = (s.data || []).filter(d => d !== null);
          return [Math.min(...data), Math.max(...data), index];
        });
        maxMins.sort((a, b) => {
          return a[0] - b[0];
        });
        const min = maxMins[0];

        maxMins.sort((a, b) => {
          return b[1] - a[1];
        });
        const max = maxMins[0];

        series[min[2]].markPoint = { data: [] };
        series[max[2]].markPoint = { data: [] };
        markPoint.includes("min") &&
          series[min[2]].markPoint.data.push({ type: "min", name: "最小值" });
        markPoint.includes("max") &&
          series[max[2]].markPoint.data.push({ type: "max", name: "最大值" });
      }
      return newOption;
    },
    // 添加双轴
    setDoubleY(option) {
      const newOption = this.deepClone(option);
      let { yAxis, series, legend, xAxis } = newOption;
      const isDouble = (legend.data || [])
        .filter(d => d)
        .some(d => d.includes("右轴"));
      if (yAxis && (isDouble || yAxis.length > 1)) {
        let newY = Array.isArray(yAxis) ? yAxis : [yAxis];
        newY.length === 1 && newY.push({ ...newY[0], name: "" });
        const newSeries = series
          .filter(s => s)
          .map(s => {
            let yAxisIndex = 0;
            if (s.name.includes("右轴")) {
              yAxisIndex = 1;
            } else {
              yAxisIndex = s.yAxisIndex || 0;
            }
            return {
              ...s,
              yAxisIndex
            };
          });
        newOption.yAxis = newY;
        newOption.series = newSeries;
      }

      // 处理x轴跟着0刻度线走
      if (xAxis && xAxis.axisLine) {
        xAxis.axisLine.onZero = false;
      }

      return newOption;
    },
    // 设置Y轴名称样式
    setYNameStyle(option) {
      const newOption = this.deepClone(option);
      let { yAxis } = newOption;
      if (Array.isArray(yAxis)) {
        newOption.yAxis = yAxis.map(y => {
          return {
            ...y,
            nameTextStyle: {
              color: y?.axisLabel?.color,
              fontFamily: y?.axisLabel?.fontFamily,
              fontSize: y?.axisLabel?.fontSize,
              fontWeight: y?.axisLabel?.fontWeight
            }
          };
        });
      } else if (yAxis) {
        newOption.yAxis = {
          ...yAxis,
          nameTextStyle: {
            color: yAxis?.axisLabel?.color,
            fontFamily: yAxis?.axisLabel?.fontFamily,
            fontSize: yAxis?.axisLabel?.fontSize,
            fontWeight: yAxis?.axisLabel?.fontWeight
          }
        };
      }
      return newOption;
    },
    // 设置饼图图例
    setPieLegend(option) {
      if (
        option.legend &&
        option.legend.show &&
        option.series &&
        option.series[0]?.type === "pie"
      ) {
        const newOption = this.deepClone(option);
        const { legend, series } = newOption;
        legend.itemWidth = (legend?.textStyle?.fontSize || 12) * 2;
        legend.itemHeight = (legend?.textStyle?.fontSize || 12) * 1.2;
        legend.formatter = function(name) {
          const data = (series && series[0] && series[0].data) || [];
          const total = data.reduce((pre, next) => {
            return +pre + +next.value;
          }, 0);
          const curData = data.find(d => d.name === name);
          return total
            ? `${name}  ${((curData.value / total) * 100).toFixed(2)}%`
            : name;
        };
        return newOption;
      } else if (option.legend && option.legend.show) {
        const newOption = this.deepClone(option);
        const { legend } = newOption;
        legend.itemWidth = (legend?.textStyle?.fontSize || 12) * 2;
        legend.itemHeight = (legend?.textStyle?.fontSize || 12) * 1.2;
        return newOption;
      }
      return option;
    },
    // 设置饼图位置
    setPiePosition(option) {
      if (option.series && option.series[0]?.type === "pie") {
        const newOption = this.deepClone(option);
        const { series } = newOption;
        series[0].center = (series[0].center || []).map(item => `${item}%`);
        return newOption;
      }
      return option;
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    getChartData(params) {
      //console.log(params);
      let start = "",
        end = "";
      if (params.queryType === 1) {
        if (params.frequency === "FQ-YY") {
          start = moment()
            .subtract("years", params.dateValue)
            .format("YYYY-MM-DD");
        } else if (params.frequency === "FQ-MM") {
          //月
          start = moment()
            .subtract("months", params.dateValue)
            .format("YYYY-MM-DD");
        } else if (params.frequency === "FQ-DD") {
          //日
          start = moment()
            .subtract("days", params.dateValue)
            .format("YYYY-MM-DD");
        }
      } else {
        if (typeof params.beginDate === "string") {
          start = moment(params.beginDate).format("YYYY-MM-DD");
          end = moment(params.endDate).format("YYYY-MM-DD");
        } else {
          start = params.beginDate.format("YYYY-MM-DD");
          end = params.endDate.format("YYYY-MM-DD");
        }
      }
      let allParams = {
        indexCodes: params.indexCodes,
        beginDate: start,
        endDate: end,
        dateValue: params.dateValue,
        frequency: params.frequency,
        queryType: params.queryType
      };
      getIndexData(allParams)
        .then(res => {
          if (res.success) {
            let xAxisData = [];
            let seriesDataList = [];
            let resDatas = res.data;
            if (resDatas) {
              let sortDatas = {};
              let xList = [];
              params.indexCodes.map(item => {
                sortDatas[item] = resDatas[item];
              });
              Object.keys(sortDatas).map(item => {
                let seriesData = [];

                let datas = sortDatas[item];
                if (datas && datas.length > 0) {
                  datas.map(item => {
                    xList.push(item.dataDate);
                    seriesData.push([item.dataDate, item.dataValue]);
                  });
                }
                seriesDataList.push(seriesData);
              });
              let allXList = [...new Set(xList)];
              allXList.sort(function(a, b) {
                let aTime = new Date(a).getTime();
                let bTime = new Date(b).getTime();
                return aTime - bTime;
              });
              xAxisData = JSON.parse(JSON.stringify(allXList));
              if (this.chartInstance && this.chartInstance.length > 0) {
                this.chartInstance.forEach(instance => {
                  let _option = instance.getOption();
                  _option.xAxis[0].data = JSON.parse(JSON.stringify(xAxisData));
                  _option.series.map((res, index) => {
                    if (seriesDataList[index]) {
                      res.data = seriesDataList[index];
                    }
                  });
                  let newOption = this.setDoubleY(_option);
                  newOption = this.setYNameStyle(newOption);
                  newOption = this.setMarkPoint(newOption);
                  newOption = this.setPieLegend(newOption);
                  newOption = this.setPiePosition(newOption);
                  instance.clear(); //清空
                  console.log('newOption',newOption)
                  instance.setOption(newOption);
                });
              }
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.chartInstance = [];
    let myDomList = document.getElementsByClassName(this.options.domId);
    for (let i = 0; i < myDomList.length; i++) {
      let myChart = Echarts.init(myDomList[i]);
      if (this.options.contentOption) {
        const option = {
          ...this.options.contentOption,
          ...{ visualMap: this.options.contentOption.visualMap || [] }
        };
        let newOption = this.setDoubleY(option);
        newOption = this.setYNameStyle(newOption);
        newOption = this.setMarkPoint(newOption);
        newOption = this.setPieLegend(newOption);
        newOption = this.setPiePosition(newOption);
        //console.log('newOption',newOption)
        myChart.clear();
        myChart.setOption(newOption);
      }
      this.chartInstance.push(myChart);
    }

    let chartParams = this.options.contentOption.chartParams;
    console.log("chartParams", chartParams);
    if (this.dataInterval) {
      window.clearInterval(this.dataInterval);
    }
    if (chartParams) {
      let _this = this;
      _this.getChartData(chartParams);
      //30分钟更新一次
      _this.dataInterval = setInterval(() => {
        _this.getChartData(chartParams);
      }, 30 * 60 * 1000);
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler(val) {
        if (this.chartInstance && this.chartInstance.length > 0) {
          this.chartInstance.forEach(instance => {
            const option = {
              ...val.contentOption,
              ...{ visualMap: val.contentOption.visualMap || [] }
            };

            let newOption = this.setDoubleY(option);
            newOption = this.setYNameStyle(newOption);
            newOption = this.setMarkPoint(newOption);
            newOption = this.setPieLegend(newOption);
            newOption = this.setPiePosition(newOption);
            instance.clear();
            console.log("newOption2", newOption);
            instance.setOption(newOption);
          });
        }
      }
    }
  },
  destroyed() {
    window.clearInterval(this.dataInterval);
  }
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
</style>
