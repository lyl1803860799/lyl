import _ from 'lodash'

// 数据
const DATA_BASE = {
  dataMap: {},
  data: [
    {
      factory: "邢钢",
      address: ["114.471857", "37.048061"],
      city: "邢台",
      citytype:"1",
      province: "河北",
      raise: "0",
      value: "5000"
    },
    {
      factory: "太钢",
      address: ["112.553459", "37.906912"],
      city: "太原",
      citytype:"1",
      province: "山西",
      raise: "-10",
      value: "5010"
    },
    {
      factory: "鞍钢",
      address: ["122.936257", "41.153031"],
      city: "鞍山市",
      citytype:"1",
      province: "辽宁",
      raise: "9",
      value: "5002"
    },
    {
      factory: "马钢",
      address: ["117.370493", "31.846079"],
      city: "马鞍山",
      citytype:"1",
      province: "安徽",
      raise: "15",
      value: "5389"
    },
    {
      factory: "济钢",
      address: ["117.185142", "36.726947"],
      city: "济南",
      citytype:"1",
      province: "山东",
      raise: "27",
      value: "5210"
    },
    {
      factory: "鄂钢",
      address: ["115.265465", "30.455899"],
      city: "武汉",
      citytype:"1",
      province: "湖北",
      raise: "-8",
      value: "5010"
    },
    {
      factory: "涟钢",
      address: ["111.983907", "27.753313"],
      city: "娄底",
      citytype:"1",
      province: "湖南",
      raise: "39",
      value: "4811"
    },
    {
      factory: "裕丰",
      address: ["113.208607", "21.96789"],
      city: "广州",
      citytype:"1",
      province: "广东",
      raise: "0",
      value: "5233"
    },
    {
      factory: "柳钢",
      address: ["109.406071", "24.381339"],
      city: "柳州",
      citytype:"1",
      province: "广西",
      raise: "0",
      value: "5016"
    },
    {
      factory: "宝钢",
      address: ["121.466695", "31.415172"],
      city: "上海",
      citytype:"1",
      province: "上海",
      raise: "-15",
      value: "5019"
    }
  ],
  maxData:{
    factory: "马钢",
    address: ["117.370493", "31.846079"],
    city: "马鞍山",
    citytype:"1",
    province: "安徽",
    raise: "15",
    value: "5389"
  },
  minData:{
    factory: "涟钢",
    address: ["111.983907", "27.753313"],
    city: "娄底",
    citytype:"1",
    province: "湖南",
    raise: "39",
    value: "4811"
  },
  averageVal:'2070',
  riseVal:'5.7',
  dataSource: {
    dataSourceCheckId: 1,
    dataSourceDictId: undefined,
    dataSourceId: undefined,
    editorContent: null,
    interval: 30,
    method: 'get',
    apiUrl: '',
    body: '',
    headers: [],
    wsUrl: '',
    wsMaxLength: 1000,
    sourceMode: 0,
    dataTableName: undefined,
    columns: {},
    sort: { orderColumns: undefined, orderBy: 'asc' },
    queryStr: ''
  }
}

const CHART_MAP_BASE = {
  dataMap: {
    name: '',
    x: '',
    y: ''
  }
}

// 柱状图
const barSimpleData = function() {
  const data = [
    {
      name: '产量（万吨）',
      x: '2020/01',
      y: 214.22
    },
    {
      name: '产量（万吨）',
      x: '2020/02',
      y: 215.22
    },
    {
      name: '产量（万吨）',
      x: '2020/03',
      y: 216.22
    },
    {
      name: '产量（万吨）',
      x: '2020/04',
      y: 117.22
    },
    {
      name: '产量（万吨）',
      x: '2020/05',
      y: 218.22
    },
    {
      name: '产量（万吨）',
      x: '2020/06',
      y: 219.22
    },
    {
      name: '产量（万吨）',
      x: '2020/07',
      y: 250.22
    },
    {
      name: '产量（万吨）',
      x: '2020/08',
      y: 221.22
    },
    {
      name: '产量（万吨）',
      x: '2020/09',
      y: 292.22
    },
    {
      name: '产量（万吨）',
      x: '2020/10',
      y: 203.22
    },
    {
      name: '库存（万吨）',
      x: '2020/01',
      y: 46.9
    },
    {
      name: '库存（万吨）',
      x: '2020/02',
      y: 57.9
    },
    {
      name: '库存（万吨）',
      x: '2020/03',
      y: 48.9
    },
    {
      name: '库存（万吨）',
      x: '2020/04',
      y: 49.9
    },
    {
      name: '库存（万吨）',
      x: '2020/05',
      y: 50.9
    },
    {
      name: '库存（万吨）',
      x: '2020/06',
      y: 51.9
    },
    {
      name: '库存（万吨）',
      x: '2020/07',
      y: 42.9
    },
    {
      name: '库存（万吨）',
      x: '2020/08',
      y: 33.9
    },
    {
      name: '库存（万吨）',
      x: '2020/09',
      y: 54.9
    },
    {
      name: '库存（万吨）',
      x: '2020/10',
      y: 65.9
    }
  ]
  return _.merge({}, DATA_BASE, CHART_MAP_BASE, {
    data,
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 柱状折线图
const barLineData = function() {
  const data = [
    {
      name: '交易分期交易额',
      y: 100,
      x: '09:00',
      type: 'bar'
    },
    {
      name: '交易分期交易额',
      y: 200,
      x: '10:00',
      type: 'bar'
    },
    {
      name: '交易分期交易额',
      y: 250,
      x: '11:00',
      type: 'bar'
    },
    {
      name: '交易分期交易额',
      y: 300,
      x: '12:00',
      type: 'bar'
    },
    {
      name: '交易分期交易额',
      y: 280,
      x: '13:00',
      type: 'bar'
    },
    {
      name: '自由分析交易额',
      y: 130,
      x: '09:00',
      type: 'bar'
    },
    {
      name: '自由分析交易额',
      y: 200,
      x: '10:00',
      type: 'bar'
    },
    {
      name: '自由分析交易额',
      y: 330,
      x: '11:00',
      type: 'bar'
    },
    {
      name: '自由分析交易额',
      y: 250,
      x: '12:00',
      type: 'bar'
    },
    {
      name: '自由分析交易额',
      y: 200,
      x: '13:00',
      type: 'bar'
    },
    {
      name: '访问量',
      y: 160,
      x: '09:00',
      type: 'line'
    },
    {
      name: '访问量',
      y: 220,
      x: '10:00',
      type: 'line'
    },
    {
      name: '访问量',
      y: 130,
      x: '11:00',
      type: 'line'
    },
    {
      name: '访问量',
      y: 260,
      x: '12:00',
      type: 'line'
    },
    {
      name: '访问量',
      y: 230,
      x: '13:00',
      type: 'line'
    }
  ]
  return _.merge({}, DATA_BASE, CHART_MAP_BASE, {
    data,
    dataMap: { type: '' },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 折线图
const lineSimpleData = function() {
  const data = [
    {
      name: '1产量（万吨）',
      x: '2020/01',
      y: 214.22
    },
    {
      name: '1产量（万吨）',
      x: '2020/02',
      y: 215.22
    },
    {
      name: '1产量（万吨）',
      x: '2020/03',
      y: 216.22
    },
    {
      name: '1产量（万吨）',
      x: '2020/04',
      y: 117.22
    },
    {
      name: '1产量（万吨）',
      x: '2020/05',
      y: 218.22
    },
    {
      name: '1产量（万吨）',
      x: '2020/06',
      y: 219.22
    },
    {
      name: '1产量（万吨）',
      x: '2020/07',
      y: 210.22
    },
    {
      name: '1产量（万吨）',
      x: '2020/08',
      y: 221.22
    },
    {
      name: '1产量（万吨）',
      x: '2020/09',
      y: 192.22
    },
    {
      name: '1产量（万吨）',
      x: '2020/10',
      y: 203.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/01',
      y: 154.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/02',
      y: 115.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/03',
      y: 146.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/04',
      y: 117.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/05',
      y: 138.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/06',
      y: 119.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/07',
      y: 110.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/08',
      y: 121.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/09',
      y: 112.22
    },
    {
      name: '2产量（万吨）',
      x: '2020/10',
      y: 123.22
    }
  ]
  return _.merge({}, DATA_BASE, CHART_MAP_BASE, {
    data,
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 面积图
const areaData = function() {
  const data = [
    {
      name: '全额业务投资者总量',
      y: 2000,
      x: '1月'
    },
    {
      name: '全额业务投资者总量',
      y: 1600,
      x: '2月'
    },
    {
      name: '全额业务投资者总量',
      y: 1800,
      x: '3月'
    },
    {
      name: '全额业务投资者总量',
      y: 1000,
      x: '4月'
    },
    {
      name: '全额业务投资者总量',
      y: 1500,
      x: '5月'
    },
    {
      name: '全额业务投资者总量',
      y: 1300,
      x: '6月'
    },
    {
      name: '全额业务投资者总量',
      y: 1800,
      x: '7月'
    },
    {
      name: '全额业务投资者总量',
      y: 1500,
      x: '8月'
    },
    {
      name: '全额业务投资者总量',
      y: 1700,
      x: '9月'
    },
    {
      name: '全额业务投资者总量',
      y: 1500,
      x: '10月'
    },
    {
      name: '全额业务投资者总量',
      y: 1900,
      x: '11月'
    },
    {
      name: '全额业务投资者总量',
      y: 1400,
      x: '12月'
    }
  ]
  return _.merge({}, DATA_BASE, CHART_MAP_BASE, {
    data,
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 堆叠面积图
const areaStackData = function() {
  const data = [
    {
      name: '日志1',
      x: '字段1',
      y: 100
    },
    {
      name: '日志1',
      x: '字段2',
      y: 150
    },
    {
      name: '日志1',
      x: '字段3',
      y: 130
    },
    {
      name: '日志1',
      x: '字段4',
      y: 140
    },
    {
      name: '日志1',
      x: '字段5',
      y: 120
    },
    {
      name: '日志1',
      x: '字段6',
      y: 160
    },
    {
      name: '日志1',
      x: '字段7',
      y: 140
    },
    {
      name: '日志2',
      x: '字段1',
      y: 120
    },
    {
      name: '日志2',
      x: '字段2',
      y: 170
    },
    {
      name: '日志2',
      x: '字段3',
      y: 150
    },
    {
      name: '日志2',
      x: '字段4',
      y: 160
    },
    {
      name: '日志2',
      x: '字段5',
      y: 140
    },
    {
      name: '日志2',
      x: '字段6',
      y: 180
    },
    {
      name: '日志2',
      x: '字段7',
      y: 160
    },
    {
      name: '日志3',
      x: '字段1',
      y: 140
    },
    {
      name: '日志3',
      x: '字段2',
      y: 190
    },
    {
      name: '日志3',
      x: '字段3',
      y: 170
    },
    {
      name: '日志3',
      x: '字段4',
      y: 180
    },
    {
      name: '日志3',
      x: '字段5',
      y: 160
    },
    {
      name: '日志3',
      x: '字段6',
      y: 200
    },
    {
      name: '日志3',
      x: '字段7',
      y: 180
    }
  ]
  return _.merge({}, DATA_BASE, CHART_MAP_BASE, {
    data,
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 饼图图
const pieSimpleData = function() {
  const data = [
    {
      name: '邮件告警',
      y: 1310
    },
    {
      name: '短信告警',
      y: 234
    },
    {
      name: 'HTTP告警',
      y: 135
    },
    {
      name: '其他',
      y: 548
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      name: '',
      y: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 圆环图
const pieDoughnutData = function() {
  const data = [
    {
      name: '证券公司资产管理计划',
      y: 15
    },
    {
      name: '保险类金融机构',
      y: 25
    },
    {
      name: '基金公司特定客户资产管理组合',
      y: 35
    },
    {
      name: '基金管理公司',
      y: 25
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      name: '',
      y: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 双轴柱状图
const doubleBarData = function() {
  const data = [
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 214.22,
      x: '2020/01',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 215.22,
      x: '2020/02',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 216.22,
      x: '2020/03',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 117.22,
      x: '2020/04',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 218.22,
      x: '2020/05',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 219.22,
      x: '2020/06',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 250.22,
      x: '2020/07',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 221.22,
      x: '2020/08',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 2992.22,
      x: '2020/09',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 203.22,
      x: '2020/10',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 17,
      x: '2020/01',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 15,
      x: '2020/02',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 14,
      x: '2020/03',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 7,
      x: '2020/04',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 9,
      x: '2020/05',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 15,
      x: '2020/06',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 13,
      x: '2020/07',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 11,
      x: '2020/08',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 8,
      x: '2020/09',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 10,
      x: '2020/10',
      type: 'line'
    }
  ]
  return _.merge({}, DATA_BASE, CHART_MAP_BASE, {
    data,
    dataMap: {
      axis_index: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 双轴折线图
const lineDoubleData = function() {
  const data = [
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 200000,
      x: '1月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 160000,
      x: '2月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 180000,
      x: '3月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 100000,
      x: '4月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 150000,
      x: '5月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 130000,
      x: '6月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 180000,
      x: '7月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 150000,
      x: '8月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 170000,
      x: '9月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 150000,
      x: '10月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 190000,
      x: '11月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 140000,
      x: '12月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 17,
      x: '1月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 15,
      x: '2月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 14,
      x: '3月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 7,
      x: '4月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 9,
      x: '5月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 15,
      x: '6月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 13,
      x: '7月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 11,
      x: '8月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 8,
      x: '9月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 120000,
      x: '10月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 150000,
      x: '11月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 170000,
      x: '12月',
      type: 'line'
    }
  ]
  return _.merge({}, DATA_BASE, CHART_MAP_BASE, {
    data,
    dataMap: {
      axis_index: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 双轴面积图
const areaDoubleData = function() {
  const data = [
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 200000,
      x: '1月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 160000,
      x: '2月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 180000,
      x: '3月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 100000,
      x: '4月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 150000,
      x: '5月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 130000,
      x: '6月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 180000,
      x: '7月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 150000,
      x: '8月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 170000,
      x: '9月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 150000,
      x: '10月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 190000,
      x: '11月',
      type: 'line'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 140000,
      x: '12月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 150000,
      x: '1月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 130000,
      x: '2月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 140000,
      x: '3月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 180000,
      x: '4月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 120000,
      x: '5月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 170000,
      x: '6月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 120000,
      x: '7月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 110000,
      x: '8月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 160000,
      x: '9月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 120000,
      x: '10月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 150000,
      x: '11月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 170000,
      x: '12月',
      type: 'line'
    }
  ]
  return _.merge({}, DATA_BASE, CHART_MAP_BASE, {
    data,
    dataMap: {
      axis_index: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 双轴柱状折线图
const barLineDoubleData = function() {
  const data = [
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 200000,
      x: '1月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 160000,
      x: '2月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 180000,
      x: '3月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 100000,
      x: '4月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 150000,
      x: '5月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 130000,
      x: '6月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 180000,
      x: '7月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 150000,
      x: '8月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 170000,
      x: '9月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 150000,
      x: '10月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 190000,
      x: '11月',
      type: 'bar'
    },
    {
      name: '产量（万吨）',
      axis_index: 0,
      y: 140000,
      x: '12月',
      type: 'bar'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 17,
      x: '1月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 15,
      x: '2月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 14,
      x: '3月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 7,
      x: '4月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 9,
      x: '5月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 15,
      x: '6月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 13,
      x: '7月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 11,
      x: '8月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 8,
      x: '9月',
      type: 'line'
    },
    {
      name: '环比（%）',
      axis_index: 1,
      y: 10,
      x: '10月',
      type: 'line'
    }
  ]
  return _.merge({}, DATA_BASE, CHART_MAP_BASE, {
    data,
    dataMap: {
      axis_index: '',
      type: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

//动态柱状图
const dynamicBarData = function() {
  const data = [
    {
      date: '2016',
      name: 'Apple',
      category: 'Technology',
      value: 180276
    },
    {
      date: '2016',
      name: 'Google',
      category: 'Technology',
      value: 120914
    },
    {
      date: '2016',
      name: 'Coca-Cola',
      category: 'Beverages',
      value: 7723
    },
    {
      date: '2016',
      name: 'Microsoft',
      category: 'Technology',
      value: 17670
    },
    {
      date: '2016',
      name: 'IBM',
      category: 'Business Services',
      value: 95095
    },
    {
      date: '2016',
      name: 'Toyota',
      category: 'Automotive',
      value: 29048
    },
    {
      date: '2016',
      name: 'Samsung',
      category: 'Technology',
      value: 65297
    },
    {
      date: '2016',
      name: 'GE',
      category: 'Diversified',
      value: 82267
    },
    {
      date: '2016',
      name: "McDonald's",
      category: 'Restaurants',
      value: 30809
    },
    {
      date: '2016',
      name: 'Amazon',
      category: 'Technology',
      value: 39948
    },
    {
      date: '2016',
      name: 'BMW',
      category: 'Automotive',
      value: 31212
    },
    {
      date: '2016',
      name: 'Mercedes-Benz',
      category: 'Automotive',
      value: 37711
    },

    {
      date: '2017',
      name: 'Apple',
      category: 'Technology',
      value: 80276
    },
    {
      date: '2017',
      name: 'Google',
      category: 'Technology',
      value: 100914
    },
    {
      date: '2017',
      name: 'Coca-Cola',
      category: 'Beverages',
      value: 78723
    },
    {
      date: '2017',
      name: 'Microsoft',
      category: 'Technology',
      value: 17670
    },
    {
      date: '2017',
      name: 'IBM',
      category: 'Business Services',
      value: 65095
    },
    {
      date: '2017',
      name: 'Toyota',
      category: 'Automotive',
      value: 39048
    },
    {
      date: '2017',
      name: 'Samsung',
      category: 'Technology',
      value: 45297
    },
    {
      date: '2017',
      name: 'GE',
      category: 'Diversified',
      value: 42267
    },
    {
      date: '2017',
      name: "McDonald's",
      category: 'Restaurants',
      value: 31809
    },
    {
      date: '2017',
      name: 'Amazon',
      category: 'Technology',
      value: 49948
    },
    {
      date: '2017',
      name: 'BMW',
      category: 'Automotive',
      value: 91212
    },
    {
      date: '2017',
      name: 'Mercedes-Benz',
      category: 'Automotive',
      value: 17711
    },

    {
      date: '2018',
      name: 'Apple',
      category: 'Technology',
      value: 130276
    },
    {
      date: '2018',
      name: 'Google',
      category: 'Technology',
      value: 120914
    },
    {
      date: '2018',
      name: 'Coca-Cola',
      category: 'Beverages',
      value: 48723
    },
    {
      date: '2018',
      name: 'Microsoft',
      category: 'Technology',
      value: 67670
    },
    {
      date: '2018',
      name: 'IBM',
      category: 'Business Services',
      value: 61095
    },
    {
      date: '2018',
      name: 'Toyota',
      category: 'Automotive',
      value: 31048
    },
    {
      date: '2018',
      name: 'Samsung',
      category: 'Technology',
      value: 48297
    },
    {
      date: '2018',
      name: 'GE',
      category: 'Diversified',
      value: 49267
    },
    {
      date: '2018',
      name: "McDonald's",
      category: 'Restaurants',
      value: 35809
    },
    {
      date: '2018',
      name: 'Amazon',
      category: 'Technology',
      value: 149948
    },
    {
      date: '2018',
      name: 'BMW',
      category: 'Automotive',
      value: 21212
    },
    {
      date: '2018',
      name: 'Mercedes-Benz',
      category: 'Automotive',
      value: 27711
    },
    {
      date: '2019',
      name: 'Apple',
      category: 'Technology',
      value: 170276
    },
    {
      date: '2019',
      name: 'Google',
      category: 'Technology',
      value: 120314
    },
    {
      date: '2019',
      name: 'Coca-Cola',
      category: 'Beverages',
      value: 78423
    },
    {
      date: '2019',
      name: 'Microsoft',
      category: 'Technology',
      value: 67670
    },
    {
      date: '2019',
      name: 'IBM',
      category: 'Business Services',
      value: 65095
    },
    {
      date: '2019',
      name: 'Toyota',
      category: 'Automotive',
      value: 49048
    },
    {
      date: '2019',
      name: 'Samsung',
      category: 'Technology',
      value: 45297
    },
    {
      date: '2019',
      name: 'GE',
      category: 'Diversified',
      value: 42267
    },
    {
      date: '2019',
      name: "McDonald's",
      category: 'Restaurants',
      value: 39809
    },
    {
      date: '2019',
      name: 'Amazon',
      category: 'Technology',
      value: 37948
    },
    {
      date: '2019',
      name: 'BMW',
      category: 'Automotive',
      value: 37212
    },
    {
      date: '2019',
      name: 'Mercedes-Benz',
      category: 'Automotive',
      value: 36711
    },

    {
      date: '2020',
      name: 'Apple',
      category: 'Technology',
      value: 370276
    },
    {
      date: '2020',
      name: 'Google',
      category: 'Technology',
      value: 290314
    },
    {
      date: '2020',
      name: 'Coca-Cola',
      category: 'Beverages',
      value: 98423
    },
    {
      date: '2020',
      name: 'Microsoft',
      category: 'Technology',
      value: 187670
    },
    {
      date: '2020',
      name: 'IBM',
      category: 'Business Services',
      value: 85095
    },
    {
      date: '2020',
      name: 'Toyota',
      category: 'Automotive',
      value: 19048
    },
    {
      date: '2020',
      name: 'Samsung',
      category: 'Technology',
      value: 15297
    },
    {
      date: '2020',
      name: 'GE',
      category: 'Diversified',
      value: 52267
    },
    {
      date: '2020',
      name: "McDonald's",
      category: 'Restaurants',
      value: 49809
    },
    {
      date: '2020',
      name: 'Amazon',
      category: 'Technology',
      value: 17948
    },
    {
      date: '2020',
      name: 'BMW',
      category: 'Automotive',
      value: 67212
    },
    {
      date: '2020',
      name: 'Mercedes-Benz',
      category: 'Automotive',
      value: 36311
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      date: '',
      name: '',
      value: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 地图
const mapData = function() {
  const data = []
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      name: '',
      level: '',
      from_name: '',
      from_level: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}
// 滚动列表
const scrollBoradData = function() {
  const data = [
    {
      名称: '',
      最新值: '',
      涨跌:'',
      涨跌幅:'',
      发布日期: ''
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      名称: '',
      最新值: '',
      涨跌:'',
      涨跌幅:'',
      发布日期: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 期货表格滚动列表
const futuresTableData = function() {
  const data = [
    {
      品种名称: '',
      期货合约:'',
      最新值: '',
      涨跌:'',
      涨跌幅:'',
      成交量: ''
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      品种名称: '',
      期货合约:'',
      最新值: '',
      涨跌:'',
      涨跌幅:'',
      成交量: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 期货看板
const futuresBoardData = function() {
  const data = []
  return _.merge({}, {}, {
    data,
    dataMap: {},
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}


// 指标看板
const indexBoardData = function() {
  const data = []
  return _.merge({}, {}, {
    data,
    dataMap: {},
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

//期货看板
const futuresBoardStyleData = function() {
  const data = []
  return _.merge({}, {}, {
    data,
    dataMap: {},
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 文本
const textBlockData = function() {
  const data = [
    {
      value: '文本'
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      value: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 时间
const timeRangeData = function() {
  const data = [
    {
      value: new Date().getTime()
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      value: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 天气
const weatherRangeData = function() {
  const data = [
    {
      value: '上海'
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      value: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 新闻
const newsRangeData = function() {
  const data = [
    {
      value: []
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      value: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 行情
const priceRangeData = function() {
  const data = [
    {
      value: []
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      value: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 热榜
const hotNewsData = function() {
  const data = [
    {
      value: []
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      value: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

//资讯列表
const newsListData = function() {
  const data = [
    {
      value: []
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      value: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}


// 快讯
const flashNewsData = function() {
  const data = [
    {
      value: []
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      value: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 横向轮播
const HorizontalCarouselData = function() {
  const data = [
    {
      taskId: 47,
      itsmNo: '变更2020031017',
      status: 7,
      statusStr: '发布中',
      taskStart: '03-11 01:00',
      taskEnd: '03-13 22:00',
      applyPeopleName: '临时申请人',
      applyOverview: '临时变更简述'
    },
    {
      taskId: 47,
      itsmNo: '变更2020031017',
      status: 7,
      statusStr: '发布中',
      taskStart: '03-11 01:00',
      taskEnd: '03-13 22:00:',
      applyPeopleName: '临时申请人',
      applyOverview: '临时变更简述'
    },
    {
      taskId: 47,
      itsmNo: '变更2020031017',
      status: 7,
      statusStr: '发布中',
      taskStart: '03-11 01:00',
      taskEnd: '03-13 22:00',
      applyPeopleName: '临时申请人',
      applyOverview: '临时变更简述'
    },
    {
      taskId: 47,
      itsmNo: '变更2020031017',
      status: 7,
      statusStr: '发布中',
      taskStart: '03-11 01:00',
      taskEnd: '03-13 22:00',
      applyPeopleName: '临时申请人',
      applyOverview: '临时变更简述'
    },
    {
      taskId: 47,
      itsmNo: '变更2020031017',
      status: 7,
      statusStr: '发布中',
      taskStart: '2020-03-11 01:00:00',
      taskEnd: '2020-03-13 22:00:00',
      applyPeopleName: '临时申请人',
      applyOverview: '临时变更简述'
    }
  ]
  return _.merge({}, DATA_BASE, {
    data,
    dataMap: {
      taskId: '',
      itsmNo: '',
      status: '',
      statusStr: '',
      taskStart: '',
      taskEnd: '',
      applyPeopleName: '',
      applyOverview: ''
    },
    dataSource: {
      dataContent: JSON.stringify(data),
      editorContent: JSON.stringify(data)
    }
  })
}

// 轮播组件配置
const swipeData = function() {
  return {
    list: [],
    autoPlaySpeed: 3,
    show: true
  }
}

// iframe
const webFrameData = function() {
  return null
}

// image
const imageData = function() {
  return null
}

// video
const videoData = function() {
  return null
}

export default {
  'bar-simple': barSimpleData,
  'bar-line': barLineData,
  'line-simple': lineSimpleData,
  'area-simple': areaData,
  'area-stack': areaStackData,
  'pie-simple': pieSimpleData,
  'pie-doughnut': pieDoughnutData,
  'double-bar': doubleBarData,
  'line-double': lineDoubleData,
  'area-double': areaDoubleData,
  'bar-line-double': barLineDoubleData,
  'dynamic-bar': dynamicBarData,
  'map-simple': mapData,

  'scroll-board-style': scrollBoradData,
  'futures-table-style':futuresTableData,
  'futures-board-style':futuresBoardData,
  'text-block-style': textBlockData,
  'time-range-style': timeRangeData,
  'index-board-style':indexBoardData,
  //'futures-board-style':futuresBoardStyleData,
  'weather-range-style': weatherRangeData,
  'news-range-style':newsRangeData,
  'price-range-style':priceRangeData,
  'hot-news-style':hotNewsData,
  'flash-news-style':flashNewsData,
  'news-list-style':newsListData,
  'basic-swipe': swipeData,
  'h-carousel-style': HorizontalCarouselData,
  'web-frame-style': webFrameData,
  'image-style': imageData,
  'video-style': videoData
}
