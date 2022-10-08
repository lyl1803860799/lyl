<template>
  <div
    class="dynamic-chart-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <div
      class="dynamic-chart-header"
      v-show="showTitle"
      :style="{
        fontFamily: options.title.style && options.title.style.fontFamily,
        fontSize: `${options.title.style && options.title.style.fontSize}px`,
        lineHeight: `${(options.title.style && options.title.style.fontSize * 2 + 'px') || 2}`,
        opacity: isSave ? 0 : 1
      }"
    >
      {{ options.title.name }}
    </div>
    <div
      :class="options.domId"
      :ref="options.domId"
      class="dynamic-chart"
      :style="{
        height: `${
          showTitle && options.title.name
            ? options.component.height - (options.title.style && options.title.style.fontSize) * 2
            : options.component.height
        }px`
      }"
    ></div>
  </div>
</template>

<script>
import * as Echarts from 'echarts'

export default {
  name: 'DynamicChart',
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
        return false
      }
    }
  },
  data() {
    return {
      chartInstance: null,
      resizeTimer: null,
      yNames: [],
      years: [],
      colorArr: [
        '#5473E6',
        '#22BEC9',
        '#0055CC',
        '#5D76A0',
        '#B4774F',
        '#1C81CF',
        '#399D6D',
        '#003897',
        '#4D98D2',
        '#183E66',
        '#D3AB5D',
        '#d52b1e',
        '#b22234',
        '#4f379a',
        '#85325a'
      ],
      chartOption: {},
      chartData: [],
      timerList: [],
      num: 0
    }
  },
  computed: {
    colors() {
      let obj = {}
      for (let i in this.yNames) {
        obj[this.yNames[i]] = this.colorArr[i] || this.getRandomColor()
      }
      return obj
    }
  },
  methods: {
    //随机色
    getRandomColor() {
      return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
    },
    refresh() {
      // this.stopAnimation()
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer)
      }
      this.resizeTimer = setTimeout(() => {
        this.chartInstance.forEach((instance) => {
          instance.setOption(this.chartOption)
          instance.resize({ animation: { duration: 300 } })
        })
      }, 100)
    },

    // 设置option
    setDynamicOption(options, isDataConfig) {
      const newOption = this.deepClone(options)
      this.chartData = isDataConfig ? newOption?.data || [] : newOption.dataConfig?.data || []
      this.yNames = Array.from(new Set(this.chartData.map((i) => i.name)))
      this.years = Array.from(new Set(this.chartData.map((i) => i.date)))
      this.chartOption = {
        xAxis: {
          max: 'dataMax',
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            color: '#fff'
          }
        },
        yAxis: {
          type: 'category',
          data: this.yNames,
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: this.yNames.length - 1, // only the largest 3 bars will be displayed
          axisLabel: {
            show: true,
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        series: [
          {
            realtimeSort: true,
            name: this.years[0],
            type: 'bar',
            data: [],
            label: {
              show: true,
              position: 'right',
              valueAnimation: true,
              fontFamily: 'sans-serif',
              fontSize: 12,
              borderWidth: 0,
              color: '#fff',
              backgroundColor: 'transparent',
              shadowColor: 'transparent'
            },
            itemStyle: {
              color: (param) => {
                return this.colors[param.name]
              }
            }
          }
        ],
        graphic: {
          elements: [
            {
              type: 'text',
              right: 60,
              bottom: 80,
              style: {
                text: this.years[0],
                font: 'bolder 20px sans-serif',
                fill: 'white'
              },
              z: 100
            }
          ]
        },
        legend: {
          show: false
        },
        animationDuration: 1000,
        animationDurationUpdate: 1000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      }
    },
    updateYear(i) {
      const seriesData = this.chartData
        .filter((item) => item.date == this.years[i])
        .map((j) => j.value)
      this.chartOption.series[0].data = seriesData
      this.chartOption.series[0].name = this.years[i]
      this.chartOption.graphic.elements[0].style.text = this.years[i]
      this.chartInstance.forEach((instance) => {
        instance.setOption(this.chartOption)
      })
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    //开启动画
    startAnimation() {
      for (let i in this.years) {
        const timer = setTimeout(() => {
          if (!this.timerList[i]) return
          this.updateYear(i)
        }, i * 1000)
        this.timerList.push(timer)
      }
    },
    //暂停动画
    stopAnimation() {
      this.timerList = this.timerList
        .map((timer) => {
          if (timer) {
            clearTimeout(this.timer)
          }
          return null
        })
        .filter((item) => item)
      this.updateYear(0)
    }
  },
  mounted() {
    this.chartInstance = []
    this.setDynamicOption(this.options)
    let myDomList = document.getElementsByClassName(this.options.domId)
    for (let i = 0; i < myDomList.length; i++) {
      let myChart = Echarts.init(myDomList[i])
      myChart.setOption(this.chartOption)
      this.chartInstance.push(myChart)
    }
    this.stopAnimation()
    this.startAnimation()
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler(val) {
        if (!val?.component?.active) return
        if (this.chartInstance && this.chartInstance.length > 0) {
          this.setDynamicOption(val)
          this.$nextTick(() => {
            this.stopAnimation()
            if (val.contentOption.showClose) {
              this.startAnimation()
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic-chart-container {
  display: flex;
  flex-direction: column;
  .dynamic-chart-header {
    text-align: justify;
    // letter-spacing: 10px;
    font-constiant: normal !important;
    color: $white;
    @extend .ft-12;
    line-height: 1.2em;
    padding: 0 10px;
  }
  .dynamic-chart {
    width: 100%;
    height: 100%;
    flex: 'auto';
    position: relative;
  }
}
</style>
