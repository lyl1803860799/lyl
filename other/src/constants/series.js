const bar = function() {
  return {
    type: 'bar',
    name: 'test',
    barMaxWidth: 50,
    markPoint: {
      data: []
    },
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: ''
          },
          {
            offset: 1,
            color: ''
          }
        ]
      }
    }
  }
}

const line = function() {
  return {
    name:'test2',
    type: 'line',
    smooth: true,
    symbolSize: [4, 4],
    symbol: 'none',
    connectNulls: true,
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '' // 100% 处的颜色
          }
        ]
      }
    },
    lineStyle: {
      width: 4,
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '' // 100% 处的颜色
          }
        ]
      }
    },
    isShowArea:false
  }
}

const area = function() {
  return {
    type: 'line',
    smooth: true,
    symbolSize: 4,
    symbol: 'emptyCircle',
    connectNulls: true,
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#30f5ee' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0a72fa' // 100% 处的颜色
          }
        ]
      }
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#30f5ee' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0a72fa' // 0% 处的颜色
          }
        ]
      }
    },
    lineStyle: {
      width: 2,
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#30f5ee' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0a72fa' // 100% 处的颜色
          }
        ]
      }
    }
  }
}

const areaStack = function() {
  return {
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    smooth: true,
    symbolSize: [4, 4],
    symbol: 'emptyCircle',
    connectNulls: true,
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#30f5ee' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0a72fa' // 100% 处的颜色
          }
        ]
      }
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#30f5ee' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0a72fa' // 0% 处的颜色
          }
        ]
      }
    },
    lineStyle: {
      width: 2,
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#30f5ee' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0a72fa' // 100% 处的颜色
          }
        ]
      }
    }
  }
}

const pieSimple = function() {
  return {
    type: 'pie',
    center: [25, 50],
    label: {
      color: '#fff',
      show: false
    },
    radius: [0, 70]
  }
}
const pieDoughnut = function() {
  return {
    type: 'pie',
    center: [50, 50],
    radius: ['25', '70'],
    label: {
      show: false
    }
  }
}

export default {
  'bar-simple': bar,
  'line-simple': line,
  'area-simple': area,
  'area-stack': areaStack,
  'pie-simple': pieSimple,
  'pie-doughnut': pieDoughnut,
  'double-bar': bar,
  'line-double': line,
  'area-double': area
}
