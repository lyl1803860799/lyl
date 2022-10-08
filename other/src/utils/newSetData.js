import defaultSeries from '@/constants/newSeries'
import * as moment from 'moment'
const defaultColorList = ['#00C4C1','#5161FF'];

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const chart = (dataOption, type = '', functionKey = '') => {
  let option = deepClone(dataOption)
  let flag = option.contentOption.indexCodeList && option.contentOption.indexCodeList.length;
  if(!flag){
    let data = option?.dataConfig?.data || []
    let legendData = []
    let xData = []
    let series = option?.contentOption?.series || []
    // 首先获取图例数据
    legendData = legendData.concat(...[...new Set(data.map((d) => d.name))])
    // 获取x轴数据
    xData = [...new Set(data.map((d) => d.x))]
    // 处理系列数据
    let result = null
    if (type === 'pie') {
      series[0].data = data.map((d) => ({ value: d.y, name: d.name }))
    } else if (type !== null) {
      result = []
      legendData.forEach((name, i) => {
        let type = data
          .filter((d) => d.name === name)
          .map((d) => d.type)
          .filter((t) => t)[0]
        let axisIndex = data
          .filter((d) => d.name === name)
          .map((d) => d.axis_index)
          .filter((t) => t)[0]
        let sery = series[i] || defaultSeries[functionKey].call(this)
        sery.yAxisIndex = axisIndex || 0
        if(sery.lineStyle){
          if(!sery.lineStyle.color.colorStops[0].color){
            sery.lineStyle.color.colorStops[0].color = defaultColorList[i];
            sery.lineStyle.color.colorStops[1].color = defaultColorList[i];
          }
          sery.itemStyle.color.colorStops[0].color = sery.lineStyle.color.colorStops[0].color;
          sery.itemStyle.color.colorStops[1].color = sery.lineStyle.color.colorStops[1].color;
        }else{
          if(!sery.itemStyle.color.colorStops[0].color){
            sery.itemStyle.color.colorStops[0].color = defaultColorList[i];
            sery.itemStyle.color.colorStops[1].color = defaultColorList[i];
          }
        }
      
        sery.name = name
        sery.data = []
        data
          .filter((d) => d.name === name)
          .forEach((d) => {
            const xIndex = xData.findIndex((x) => x === d.x)
            sery.data[xIndex] = d.y
          })
        sery.data = sery.data.map((item) => {
          if (!item) {
            return null
          }
          return item
        })
        if (type === 'stack') {
          sery.stack = data[0].stack
        }
        result.push(sery)
      })
  } else {
    // bar-line
    result = []
    legendData.forEach((name, i) => {
      let type = data
        .filter((d) => d.name === name)
        .map((d) => d.type)
        .filter((t) => t)[0]
      let axisIndex = data
        .filter((d) => d.name === name)
        .map((d) => d.axis_index)
        .filter((t) => t)[0]
      let sery =
        series[i] && series[i].type === type
          ? series[i]
          : (type && defaultSeries[type + '-simple'].call(this)) || {}
      sery.yAxisIndex = axisIndex || 0
      if(sery.lineStyle){
        if(!sery.lineStyle.color.colorStops[0].color){
          sery.lineStyle.color.colorStops[0].color = defaultColorList[i];
          sery.lineStyle.color.colorStops[1].color = defaultColorList[i];
        }
        sery.itemStyle.color.colorStops[0].color = sery.lineStyle.color.colorStops[0].color;
        sery.itemStyle.color.colorStops[1].color = sery.lineStyle.color.colorStops[1].color;
      }else{
        if(!sery.itemStyle.color.colorStops[0].color){
          sery.itemStyle.color.colorStops[0].color = defaultColorList[i];
          sery.itemStyle.color.colorStops[1].color = defaultColorList[i];
        }
      }
      sery.type = type
      sery.name = name
      sery.data = data.filter((d) => d.name === name).map((d) => d.y)
      result.push(sery)
    })
  }
  option.contentOption.legend.data = legendData
  option.contentOption.xAxis && (option.contentOption.xAxis.data = xData)
  option.contentOption.series = result || series
  }
  
  return option
}

const scrollBoard = (dataOption) => {
  let option = deepClone(dataOption)
  let initData = null;
  if(option.title.name==='实时行情'){
    initData =  [{
      名称: '',
      最新值: '',
      涨跌:'',
      涨跌幅:'',
      发布时间: ''
    }];
  }else{
    initData =  [{
      名称: '',
      最新值: '',
      涨跌:'',
      涨跌幅:'',
      发布日期: ''
    }];
  }
  let data = option ? option.contentOption.data :[];
  if(data.length===0){
    data = initData;
  }

  const lengthIndexArr = data.map((item, index) => [Object.keys(item).length, index])
  const maxLen = Math.max(...lengthIndexArr.map((item) => item[0]))
  const index = lengthIndexArr.findIndex((item) => item[0] === maxLen)
  // 表头数据
  // const headerData = Object.keys(data[index] || {}).map((head) => {
  //   return {
  //     name: head,
  //     animation: false
  //   }
  // })

  // 将没有的key用空填充
  const maxKeys = Object.keys(data[index])
  let rowData = data.map((item) => {
    if (Object.keys(item).length < maxLen) {
      maxKeys.forEach((key) => {
        if (item[key] === undefined) {
          item[key] = ''
        }
      })
    }
    return item
  })

  const contentData = rowData.map((d) => Object.values(d))

  option.contentOption.header = option.title.name==='实时行情'?[
    {name: "名称", animation: false}, 
    {name: "最新值",animation: false}, 
    {name: '涨跌', animation: false },
    {name: '涨跌幅', animation: false },
    {name: "发布时间",animation: false}
  ]:[
    {name: "名称", animation: false}, 
    {name: "最新值",animation: false}, 
    {name: '涨跌', animation: false },
    {name: '涨跌幅', animation: false },
    {name: "发布日期",animation: false}
  ];//headerData
  option.contentOption.data = contentData

  return option
}

const futuresTable = (dataOption) => {
  let option = deepClone(dataOption)
  let initData =  [{
    品种名称: '',
    期货合约:'',
    最新值: '',
    涨跌:'',
    涨跌幅:'',
    成交量: ''
  }];
  let data = option ? option.contentOption.data :[];
  if(data.length===0){
    data = initData;
  }

  const lengthIndexArr = data.map((item, index) => [Object.keys(item).length, index])
  const maxLen = Math.max(...lengthIndexArr.map((item) => item[0]))
  const index = lengthIndexArr.findIndex((item) => item[0] === maxLen)
  // 表头数据
  // const headerData = Object.keys(data[index] || {}).map((head) => {
  //   return {
  //     name: head,
  //     animation: false
  //   }
  // })

  // 将没有的key用空填充
  const maxKeys = Object.keys(data[index])
  let rowData = data.map((item) => {
    if (Object.keys(item).length < maxLen) {
      maxKeys.forEach((key) => {
        if (item[key] === undefined) {
          item[key] = ''
        }
      })
    }
    return item
  })

  const contentData = rowData.map((d) => Object.values(d))

  option.contentOption.header = [
    { name: '品种名称', animation: false },
    { name: '期货合约', animation: false },
    { name: '最新值', animation: false },
    { name: '涨跌', animation: false },
    { name: '涨跌幅', animation: false },
    { name: '成交量', animation: false }
  ];//headerData
  option.contentOption.data = contentData

  return option
}

const futuresBoard = (dataOption) => {
  let option = deepClone(dataOption)
  return option
}

const indexBoard = (dataOption) => {
  let option = deepClone(dataOption)
  return option
}

const textBlock = function(dataOption) {
  const self = this
  const transformData = (options) => {
    const { data, dataTransform } = options?.contentOption || {}
    if (!dataTransform || dataTransform.type === 'none') return data

    if (dataTransform.type === 'number') {
      if (isNaN(data)) {
        self.$message.warning('无法转换为数字类型')
        return data
      }

      if (dataTransform.numberType === 'int') {
        return (+data).toFixed(0)
      }

      return (+data).toFixed(dataTransform.effective || 1)
    }

    if (dataTransform.type === 'date') {
      const date = moment(data).format(dataTransform.dateFormatter)
      if (!/^\d/.test(date)) {
        self.$message.warning('无法转换为时间')
        return data
      }
      return date
    }

    return data
  }
  let option = deepClone(dataOption)
  //const data = option?.dataConfig?.data || []

  //option.contentOption.data = data[0]?.value
  option.contentOption.transformedData = transformData(option)
  return option
}

const timeRange = function(dataOption) {
  const self = this
  const transformData = (options) => {
    const { data, dataTransform } = options?.contentOption || {}
    if (!dataTransform || dataTransform.type === 'none') return data

    if (dataTransform.type === 'number') {
      if (isNaN(data)) {
        self.$message.warning('无法转换为数字类型')
        return data
      }

      if (dataTransform.numberType === 'int') {
        return (+data).toFixed(0)
      }

      return (+data).toFixed(dataTransform.effective || 1)
    }

    if (dataTransform.type === 'date') {
      const date = moment(data).format(dataTransform.dateFormatter)
      if (!/^\d/.test(date)) {
        self.$message.warning('无法转换为时间')
        return data
      }
      return date
    }

    return data
  }
  let option = deepClone(dataOption)
  const data = option?.dataConfig?.data || []

  option.contentOption.data = data[0]?.value
  option.contentOption.transformedData = transformData(option)
  return option
}

const weatherRange  = function(dataOption) {
  let option = deepClone(dataOption);
  return option
}

const priceRange  = function(dataOption) {
  let option = deepClone(dataOption);
  return option
}

const newsRange  = function(dataOption) {
  let option = deepClone(dataOption);
  return option
}

const hotNews  = function(dataOption) {
  let option = deepClone(dataOption);
  return option
}

const flashNews  = function(dataOption) {
  let option = deepClone(dataOption);
  return option
}

const newsList = function(dataOption) {
  let option = deepClone(dataOption);
  return option
}

const horizontalCarousel = (dataOption) => {
  let option = deepClone(dataOption)
  option.contentOption.data = option?.dataConfig?.data || []
  return option
}

const common = (dataOption) => {
  return dataOption
}

export default {
  chart,
  'scroll-board': scrollBoard,
  'futures-table': futuresTable,
  'futures-board': futuresBoard,
  'index-board': indexBoard,
  'text-block': textBlock,
  'time-range': timeRange,
  'weather': weatherRange,
  'price-range': priceRange,
  'news-range': newsRange,
  'hot-news':hotNews,
  'flash-news':flashNews,
  'news-list': newsList,
  'bi-carousel': horizontalCarousel,
  webFrame: common,
  'bi-image': common,
  swipe: common,
  dynamicChart: common,
  'bi-map': common,
  'bi-video': common
}
