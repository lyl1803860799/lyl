/* 图相关配置 */
import _ from 'lodash'
import series from '../newSeries'

const base = {
  wholeRender: 0,
  visualMap: null,
  grid: {
    top: '15%',
    left: '5%',
    right: '5%',
    bottom: '5%'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    show: true,
    itemGap: 10,
    orient: 'horizontal',
    textStyle: {
      color: '#ffffff',
      fontSize: 12,
      fontFamily: 'sans-serif',
      fontWeight: 'normal'
    },
    padding: 20,
    x: 'center',
    y: 'top'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      show: true,
      color: '#ffffff',
      fontSize: 12,
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      rotate: 0
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#133C67'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        type: 'solid',
        color: '#ffffff'
      }
    }
  },
  yAxis: {
    name:'',
    type: 'value',
    min: null,
    max: null,
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: '#133C67'
      }
    },
    axisLabel: {
      show: true,
      fontSize: 12,
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      rotate: 0,
      color: '#ffffff'
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#133C67'
      }
    },
    markPoint: []
  }
}
// 柱状图
const defaultOption = function() {
  return _.merge({}, base, {
    xAxis: {
      boundaryGap: true,
      type: 'category',
      data: []
    },
    series: [
      {
        data: [],
        ...series['bar-simple'].call(this)
      }
    ]
  })
}

const barLineOption = function() {
  return _.merge({}, base, {
    xAxis: {
      boundaryGap: true,
      type: 'category',
      data: []
    },
    series: [
      {
        data: [],
        ...series['bar-simple'].call(this)
      },
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        connectNulls: true,
        ...series['line-simple'].call(this)
      }
    ]
  })
}

// 折线图
const defaultLineOption = function() {
  return _.merge({}, base, {
    xAxis: {
      data: []
    },
    series: [
      {
        data: [],
        connectNulls: true,
        ...series['line-simple'].call(this)
      }
    ]
  })
}

// 区域面积图
const defaultAreatOption = function() {
  return _.merge({}, base, {
    xAxis: {
      data: []
    },
    series: [
      {
        data: [],
        connectNulls: true,
        ...series['area-simple'].call(this)
      }
    ]
  })
}

const areaStackOption = function() {
  return _.merge({}, base, {
    xAxis: {
      boundaryGap: false,
      data: []
    },
    series: [
      {
        data: [],
        connectNulls: true,
        ...series['area-stack'].call(this)
      },
      {
        data: [],
        connectNulls: true,
        ...series['area-stack'].call(this)
      },
      {
        data: [],
        connectNulls: true,
        ...series['area-stack'].call(this)
      },
      {
        data: [],
        connectNulls: true,
        ...series['area-stack'].call(this)
      },
      {
        data: [],
        connectNulls: true,
        ...series['area-stack'].call(this)
      }
    ]
  })
}

// 饼图
const pieSimple = function() {
  return {
    color: ['#ad43ff', '#8e76fe', '#8833f8', '#5b90f9'],
    legend: {
      show: true,
      itemGap: 10,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'sans-serif',
        fontWeight: 'normal'
      },
      padding: 20,
      x: 'center',
      y: 'top',
      align: 'left'
    },
    series: [
      {
        ...series['pie-simple'].call(this),
        data: []
      }
    ]
  }
}
const pieDoughnut = function() {
  return {
    color: ['#f1802f', '#ecd63b', '#20d5eb', '#ef3951'],
    legend: {
      show: false
    },
    series: [
      {
        ...series['pie-doughnut'].call(this),
        data: []
      }
    ]
  }
}

// 双轴柱状图
const doubleBar = function() {
  const yAxis = JSON.stringify(base.yAxis)
  return _.merge({}, base, {
    xAxis: {
      boundaryGap: true,
      type: 'category',
      data: []
    },
    yAxis: [JSON.parse(yAxis), JSON.parse(yAxis)],
    series: [
      {
        data: [],
        ...series['double-bar'].call(this)
      }
    ]
  })
}

// 双轴折线图
const lineDouble = function() {
  const yAxis = JSON.stringify(base.yAxis)
  return _.merge({}, base, {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: [JSON.parse(yAxis), JSON.parse(yAxis)],
    series: [
      {
        data: [],
        ...series['line-double'].call(this)
      }
    ]
  })
}

// 双轴面积图
const areaDouble = function() {
  const yAxis = JSON.stringify(base.yAxis)
  return _.merge({}, base, {
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: [JSON.parse(yAxis), JSON.parse(yAxis)],
    series: [
      {
        data: [],
        ...series['area-double'].call(this)
      }
    ]
  })
}

// 双轴面积图
const barLineDouble = function() {
  const yAxis = JSON.stringify(base.yAxis)
  return _.merge({}, base, {
    xAxis: {
      boundaryGap: true,
      type: 'category',
      data: []
    },
    yAxis: [JSON.parse(yAxis), JSON.parse(yAxis)],
    series: [
      {
        data: [],
        ...series['bar-simple'].call(this)
      },
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        connectNulls: true,
        ...series['line-simple'].call(this)
      }
    ]
  })
}
//动态柱状图
const dynamicBarOption = function() {
  return {
    showClose: true
  }
}

// 地图
const mapOption = function() {
  return {
    mapName: 'china',
    startPoint: {
      color: '#88CCE7',
      fontSize: 12,
      show: true,
      symbol: 'circle'
    },
    lines: [
      {
        color: '#88CCE7',
        width: 2,
        name: ''
      },
      {
        color: '#ff0000',
        width: 2,
        name: ''
      }
    ],
    showIcon: false,
    symbolIcon: ''
  }
}

// 轮播组件配置
const swipeOption = function() {
  return {
    list: [],
    autoPlaySpeed: 3,
    show: true
  }
}

// 横向轮播
const HorizontalCarousel = function() {
  return {
    width: 1820,
    height: 200,
    data: [],
    titleStyle: {
      color: '#ffffff',
      fontSize: 18,
      weight: false
    },
    statusStyle: {
      color: '#0ee8e0',
      weight: false,
      fontSize: 16
    },
    contentStyle: {
      color: '#0a69c6',
      weight: false
    },
    interval: 4,
    playDirection: 'left'
  }
}

// iframe
const webFrameOption = function() {
  return {
    showClose: false,
    src: 'http://192.168.200.193/index.php?s=/122&page_id=2640'
  }
}

// 文字
// 滚动列表
const scrollBoradOption = function() {
  return {
    header: [
      { name: '名称', animation: false },
      { name: '最新值', animation: false },
      { name: '涨跌', animation: false },
      { name: '涨跌幅', animation: false },
      { name: '发布日期', animation: false }
    ],
    data: [
      {
        名称: '螺纹钢',
        最新值: '3535.7元/吨',
        涨跌:'100',
        涨跌幅:'2.8',
        发布日期: '8-24'
      },
      {
        名称: '炼焦煤',
        最新值: '1647.6元/吨',
        涨跌:'-50',
        涨跌幅:'-3',
        发布日期: '8-24'
      },
      {
        名称: '喷吹煤',
        最新值: '6235.6元/吨',
        涨跌:'185',
        涨跌幅:'2.9',
        发布日期: '8-24'
      },
      {
        名称: '管坯',
        最新值: '853.5元/吨',
        涨跌:'150',
        涨跌幅:'17.5',
        发布日期: '8-24'
      },
      {
        名称: '电解铜',
        最新值: '423.8元/吨',
        涨跌:'-60',
        涨跌幅:'-14',
        发布日期: '8-24'
      },
      {
        名称: '中厚板',
        最新值: '4211.2元/吨',
        涨跌:'100',
        涨跌幅:'2.37',
        发布日期: '8-24'
      },
      {
        名称: '61.5%PB粉',
        最新值: '1524.2元/吨',
        涨跌:'-36',
        涨跌幅:'2.36',
        发布日期: '8-24'
      },
      {
        名称: '结构钢',
        最新值: '3535.7元/吨',
        涨跌:'80',
        涨跌幅:'2.26',
        发布日期: '8-24'
      },
      {
        名称: '动力煤',
        最新值: '1443.2元/吨',
        涨跌:'-90',
        涨跌幅:'-6.23',
        发布日期: '8-24'
      },
      {
        名称: '无烟煤',
        最新值: '1023.3元/吨',
        涨跌:'100',
        涨跌幅:'9.77',
        发布日期: '8-24'
      }
    ],
    appendHeader: [],
    indexCodeList:[],
    index: false,
    fontSize: 20,
    rowNum: 5,
    start: true,
    carousel: 'single',
    waitTime: 2,
    headerTC: '#00FCFF',
    headerBGC: '#021633',
    headerAlign: 'center',

    bodyAlign: 'center',
    bodyColor: '#fff',
    bodyBGC: '#000000',
    oddRowBGC: '#052B61',
    evenRowBGC: '#041A3D',

    showBorder: false,
    borderColor: '#00052C'
  }
}
// 期货表格
const futuresTableOption = function() {
  return {
    header: [
      { name: '品种名称', animation: false },
      { name: '期货合约', animation: false },
      { name: '最新值', animation: false },
      { name: '涨跌', animation: false },
      { name: '涨跌幅', animation: false },
      { name: '成交量', animation: false }
    ],
    data: [
      {
        品种名称: '螺纹钢',
        期货合约:'RB2201',
        最新值: '4622.00',
        涨跌:'54.00',
        涨跌幅:'1.21',
        成交量: '347'
      },
      {
        品种名称: '螺纹钢',
        期货合约:'RB2202',
        最新值: '4583.00',
        涨跌:'-13.00',
        涨跌幅:'-0.22',
        成交量: '21'
      },
      {
        品种名称: '螺纹钢',
        期货合约:'RB2203',
        最新值: '4782.00',
        涨跌:'0',
        涨跌幅:'0',
        成交量: '-'
      },
      {
        品种名称: '螺纹钢',
        期货合约:'RB2204',
        最新值: '4482.00',
        涨跌:'80.00',
        涨跌幅:'-1.25',
        成交量: '35'
      },
      {
        品种名称: '螺纹钢',
        期货合约:'RB2205',
        最新值: '4542.00',
        涨跌:'73.00',
        涨跌幅:'1.24',
        成交量: '37'
      },
      {
        品种名称: '沪铜',
        期货合约:'CU2201',
        最新值: '69830.00',
        涨跌:'-53.00',
        涨跌幅:'1.2',
        成交量: '47'
      },
      {
        品种名称: '沪铜',
        期货合约:'CU220161000',
        最新值: '9830.00',
        涨跌:'0',
        涨跌幅:'0',
        成交量: '56'
      },
      {
        品种名称: '沪铜',
        期货合约:'CU220162000',
        最新值: '7830.00',
        涨跌:'33.00',
        涨跌幅:'3.2',
        成交量: '347'
      },
      {
        品种名称: '沪铜',
        期货合约:'CU220163000',
        最新值: '4830.00',
        涨跌:'-80.00',
        涨跌幅:'-1.25',
        成交量: '-'
      },
      {
        品种名称: '沪铜',
        期货合约:'CU220164000',
        最新值: '6830.00',
        涨跌:'-73.00',
        涨跌幅:'-1.24',
        成交量: '76'
      }
    ],
    appendHeader: [],
    indexCodeList:[],
    index: false,
    fontSize: 20,
    rowNum: 5,
    start: true,
    carousel: 'single',
    waitTime: 2,
    headerTC: '#00FCFF',
    headerBGC: '#021633',
    headerAlign: 'center',

    bodyAlign: 'center',
    bodyColor: '#fff',
    bodyBGC: '#000000',
    oddRowBGC: '#052B61',
    evenRowBGC: '#041A3D',

    showBorder: false,
    borderColor: '#00052C'
  }
}

// 期货看板
const futuresBoardOption = function(){
  return {
    width:574,
    height: 218,
    data: {
      name:'黄金',
      contact:'NR5276',
      value:236235,
      changeData:1037.34,
      chg:19.02
    },
    transformedData: '文本',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD'
    },
    basicStyle: {
      fontFamily: '微软雅黑',
      fontSize: 30,
      color: '#ffffff',
      fontWeight: 'normal',
      letterSpacing:0,
      url:'',
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
    valueStyle:{
      fontSize: 48,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
    upDownStyle: {
      fontSize: 29,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    }
  }
}

// 指标看板
const indexBoardOption = function(){
  return {
    width:574,
    height: 218,
    data: {
      name:'大宗商品价格指数',
      value:236235,
      unit:'元/吨',
      changeData:1037.34,
      chg:19.02
    },
    transformedData: '文本',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD'
    },
    basicStyle: {
      fontFamily: '微软雅黑',
      fontSize: 30,
      color: '#ffffff',
      fontWeight: 'normal',
      letterSpacing:0,
      url:'',
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
    valueStyle:{
      fontSize: 48,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
    upDownStyle: {
      fontSize: 29,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    }
  }
}

// 文本
const textBlockOption = function() {
  return {
    height: 170,
    data: '文本',
    transformedData: '文本',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD'
    },
    basicStyle: {
      fontFamily: '微软雅黑',
      fontSize: 20,
      color: '#ffffff',
      fontWeight: 'normal',
      lineHeight: '20',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
    transform: {
      type: '',
      x: 0,
      y: 0,
      z: 0
    },
    marquee: {
      show: false,
      direction: 'right'
    },
    superLink: {
      open: false,
      openTarget: '_blank',
      href: ''
    }
  }
}

//时间
const timeRangeOption = function() {
  return {
    height: 170,
    data: new Date().getTime(),
    transformedData: new Date().getTime(),
    dataTransform: {
      type: 'date',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD HH:mm:ss'
    },
    basicStyle: {
      fontFamily: '微软雅黑',
      fontSize: 20,
      color: '#ffffff',
      fontWeight: 'normal',
      backgroundColor:'',
      lineHeight: '20',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: 'center'
      }
    }
  }
}

//天气
const weatherRangeOption = function() {
  return {
    height: 80,
    data: '上海',
    transformedData: '上海',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD HH:mm:ss'
    },
    basicStyle: {
      fontFamily: '微软雅黑',
      fontSize: 20,
      color: '#ffffff',
      bgType:'1',
      bgImg:'',
      bgColor:''
      // fontWeight: 'normal',
      // backgroundColor:'',
      // lineHeight: '20',
      // letterSpacing:0,
      // textStyle: {
      //   fontStyle: '',
      //   textDecoration: 'none',
      //   textAlign: ''
      // }
    }
  }
}

//资讯
const newsRangeOption = function() {
  let w = document.getElementById("scale-box").offsetWidth-100;
  return {
    width:w,
    height: 40,
    data: '',
    transformedData: '',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD HH:mm:ss'
    },
    basicStyle: {
      fontFamily: '微软雅黑',
      fontSize: 20,
      color: '#ffffff',
      fontWeight: 'normal',
      backgroundColor:'',
      lineHeight: '40',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    }
  }
}

//热榜
const hotNewsOption = function() {
  let w = document.getElementById("scale-box").offsetWidth-100;
  let h = document.getElementById("scale-box").offsetHeight-100;
  return {
    width:w,
    height: h,
    data: '',
    transformedData: '',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD HH:mm:ss'
    },
    columnNum:'1',
    oneHeight:'',
    fontFamily: '微软雅黑',
    basicStyle: {
      fontSize: 28,
      color: '#ffffff',
      fontWeight: 'bold',
      backgroundColor:'',
      lineHeight: '40',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
    numberStyle: {
      fontSize: 30,
      color: '#ffffff',
      fontWeight: 'bold',
      backgroundColor:'',
      lineHeight: '40',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
  }
}

//资讯列表
const newsListOption = function() {
  let w = document.getElementById("scale-box").offsetWidth-100;
  let h = document.getElementById("scale-box").offsetHeight-100;
  return {
    width:w,
    height: h,
    data: [],
    transformedData: '',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD HH:mm:ss'
    },
    basicStyle: {
      fontFamily: '微软雅黑',
      backgroundColor:'#002464'
    },
    titleStyle:{
      fontSize: 30,
      color:'#2bf8ff',
      fontWeight:'bold',
    },
    contentStyle:{
      fontSize: 22,
      color:'#fff',
      lineHeight: '40',
      letterSpacing:4
    },
    sourceStyle:{
      fontSize: 22,
      color:'#2bf8ff',
    }
  }
}

//快讯
const flashNewsOption = function() {
  let w = document.getElementById("scale-box").offsetWidth-100;
  let h = document.getElementById("scale-box").offsetHeight-100;
  return {
    width:w,
    height: h,
    data: [
      {
        "id": 1694431,
				"content": "18日山东枣庄市恒仁工贸蛋白粉报价75元/蛋白，价格稳定；玉米喷浆皮报价1520元/吨，价格稳定。",
				"relationBreed": [
					{
						"name": "蛋白粉及其他",
						"id": "070310"
					}
				],
				"publisherTime": 1642467566428,
				"sectionName": "价格速递",
				"categoryName": "农产品"
			},
			{
        "id": 1694430,
				"content": "18日河南地区无烟喷吹煤市场稳，现挂牌价永城报1915元/吨，焦作报1765元/吨，均车板含税价。",
				"relationBreed": [
					{
						"name": "喷吹煤",
						"id": "050203"
					}
				],
				"publisherTime": 1642467513700,
				"sectionName": "价格速递",
				"categoryName": "煤焦"
			},
			{
        "id": 1694429,
				"content": "18日河南永城地区无烟煤市场稳，现无烟洗小块报2250，无烟洗中块报2250，均车板含税价。",
				"relationBreed": [
					{
						"name": "无烟煤",
						"id": "050204"
					}
				],
				"publisherTime": 1642467501463,
				"sectionName": "价格速递",
				"categoryName": "煤焦"
			},
			{
        "id": 1694428,
				"content": "18日河南地区无烟喷吹煤市场稳，现挂牌价永城报1965元/吨，焦作报1765元/吨，均车板含税价。",
				"relationBreed": [
					{
						"name": "喷吹煤",
						"id": "050203"
					}
				],
				"publisherTime": 1642467486082,
				"sectionName": "价格速递",
				"categoryName": "煤焦"
			},
			{
        "id": 1694427,
				"content": "18日山东恒仁工贸玉米淀粉报价3230元/吨，价格稳定。周末期间企业报价上调，今日维持稳定观望。",
				"relationBreed": [
					{
						"name": "玉米淀粉",
						"id": "071101"
					}
				],
				"publisherTime": 1642467412630,
				"sectionName": "价格速递",
				"categoryName": "农产品"
			},
			{
        "id": 1694426,
				"content": "18日迁安首钢废钢采购价格暂稳：打包一级3880，打包二级3850，打包三级3830，一级散料3860，二级散料3830，重型3900，中型一级3870，含税，单位：元/吨。",
				"relationBreed": [
					{
						"name": "炉料",
						"id": "03"
					}
				],
				"publisherTime": 1642467387821,
				"sectionName": "分析解读",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694425,
				"content": "18日唐山槽钢主流市场价格下跌10-20，5#4940，6.3#4860，8-16#4790-4800，18-20#4820-4830，22-28#5100。",
				"relationBreed": [
					{
						"name": "型钢",
						"id": "010107"
					}
				],
				"publisherTime": 1642467383054,
				"sectionName": "价格速递",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694423,
				"content": "18日唐山正丰废钢采购价格暂稳，废钢2-3厚3310，3-5厚3360，6厚以上3390，8厚以上3410，钢筋小压块3380，新带钢丝3220，新冷板压块3220，新铁丝压块3120，新镀锌小料3320，一级破碎料3410，整普销2960，生铁暖气片、面包铁3400，发动机机体3250，一级破碎剪切3270，彩钢瓦打散片2820，自行车小压块2930，摩托车架子2980，不含税，单位：元/吨。",
				"relationBreed": [
					{
						"name": "废钢",
						"id": "0306"
					}
				],
				"publisherTime": 1642467364303,
				"sectionName": "分析解读",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694424,
				"content": "《2022年上海市扩大有效投资稳定经济发展的若干政策措施》印发，其中提出，加快推动能源安全低碳发展。以煤电等容量替代和“三改联动”改造为重点，加快推动全市煤电转型升级。",
				"relationBreed": [
          {
						"name": "炼焦煤",
						"id": "010101"
					}
        ],
				"publisherTime": 1642467360000,
				"sectionName": "产业监测",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694422,
				"content": "18日晨间蒙古国进口煤市场暂稳运行。近期市场成交氛围一般，贸易热情稍减，国内焦钢企业需求预期减弱，蒙煤成交价上涨稍显疲态，阻力渐增。现甘其毛都口岸：蒙5#原煤1950元/吨，蒙5#精煤2265元/吨；满都拉口岸：主焦精煤1700元/吨，1/3焦原煤1300元/吨；均口岸货场提货含税现汇价。17日三大主要口岸总通关车数较上周同期增30车。近日密切关注近期中蒙口岸疫情防控、通关政策、进口商心态及国内煤焦市场走势等对蒙煤市场的影响。",
				"relationBreed": [
					{
						"name": "炼焦煤",
						"id": "050202"
					}
				],
				"publisherTime": 1642467306847,
				"sectionName": "价格速递",
				"categoryName": "煤焦"
			},
			{
        "id": 1694421,
				"content": "18日双焦线路运费持稳。现柳林到古冶运费275元/吨，孝义到日照港运费223元/吨，介休到丰南运费215元/吨，介休到日照港运费240元/吨。",
				"relationBreed": [
					{
						"name": "焦炭",
						"id": "0501"
					}
				],
				"publisherTime": 1642467247413,
				"sectionName": "价格速递",
				"categoryName": "煤焦"
			},
			{
        "id": 1694420,
				"content": "18日唐山松汀废钢采购价格暂稳：冲豆、钢筋头3790，一级3760，二级3730，优质3760，马蹄铁3380，冲料3380，边角料3380，优质重A3590,重A3560,重B3530,重C3470，不含税，单位：元/吨。",
				"relationBreed": [
					{
						"name": "废钢",
						"id": "0306"
					}
				],
				"publisherTime": 1642467235039,
				"sectionName": "分析解读",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694419,
				"content": "18日17日河北唐山首唐宝生废钢采购价格现执行：一级破碎料3410，二级破碎料3260，短尺剪切1-2mm3150、3-5mm3340、6个以上3370、8个上3390，镀锌带钢丝压块3120，铁丝压块2860-3020，碎生铁3240，生铁暖气片3300，面包铁3300，不含税，单位：元/吨。",
				"relationBreed": [
					{
						"name": "废钢",
						"id": "0306"
					}
				],
				"publisherTime": 1642467230080,
				"sectionName": "分析解读",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694417,
				"content": "18日唐山燕钢废钢采购价格暂稳：优质3780，重A3720，重B3620，中A3680，中B3580，优质铸铁3600，大件剪切3700，炉料特级3700，炉一3600，炉二3580，炉三3500，炉四2100，剪切一3580，剪切二3380，剪切三1980，不含税，单位：元/吨。",
				"relationBreed": [
					{
						"name": "废钢",
						"id": "0306"
					}
				],
				"publisherTime": 1642467218852,
				"sectionName": "分析解读",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694416,
				"content": "18日连云港亚新废钢采购调后执行价：一、钢板料，模具钢，3530；二、12毫米厚优质重废A ，3500；三、6毫米厚重废Ｂ，3410，四、4毫米厚中废新料，3280-3310。3毫米厚度以下拒收。单位：元/吨，不含税。",
				"relationBreed": [
					{
						"name": "废钢",
						"id": "0306"
					}
				],
				"publisherTime": 1642467215401,
				"sectionName": "分析解读",
				"categoryName": "黑色金属",
			},
			{
        "id": 1694415,
				"content": "18日沪建材早盘暂稳观望。现螺纹4650-4690，西城抗震4700，其他4570-4620，兴鑫抗震4630，联鑫黄海抗震4640，盘螺4750-4980，高线亚新4650。17日Mysteel上海螺纹钢价格指数4824跌20。",
				"relationBreed": [
					{
						"name": "建筑钢材",
						"id": "010101"
					}
				],
				"publisherTime": 1642467185173,
				"sectionName": "价格速递",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694418,
				"content": "【山煤国际召开2022年春节期间煤矿生产组织工作协调视频会议】要认真贯彻落实国家发改委《关于做好2022年1月份煤炭生产供应工作的通知》要求，积极响应国家“就地过年”和“能源保供”号召，春节期间不放假、不停产、不停工。",
				"relationBreed": [
          {
						"name": "建筑钢材",
						"id": "010101"
					}
        ],
				"publisherTime": 1642467180000,
				"sectionName": "产业监测",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694414,
				"content": "Mysteel数据：卫星数据显示，2022年1月10日-1月16日期间，澳大利亚、巴西七个主要港口铁矿石库存总量1124.4万吨，环比增加58.4万吨，库存总量略高于近期的平均水平。",
				"relationBreed": [
					{
						"name": "铁矿石",
						"id": "0311"
					}
				],
				"publisherTime": 1642467120000,
				"sectionName": "钢联调研",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694413,
				"content": "18日唐山国产矿市场价主稳运行，个别报价偏弱。66%酸粉价格：迁安875-880左右，大矿报价930-940；迁西850-855，遵化850-860；69%酸粉价格：遵化940-950（湿基不含税现汇出厂价；单位：元/吨)。",
				"relationBreed": [
					{
						"name": "铁矿石",
						"id": "0311"
					}
				],
				"publisherTime": 1642467054437,
				"sectionName": "价格速递",
				"categoryName": "黑色金属"
			},
			{
        "id": 1694412,
				"content": "中信特钢1月17日发布业绩快报，公司2021年实现归属于上市公司股东的净利润79.52亿元，同比增长31.82%。",
				"relationBreed": [
          {
						"name": "铁矿石",
						"id": "0311"
					}
        ],
				"publisherTime": 1642466940000,
				"sectionName": "产业监测",
				"categoryName": "黑色金属"
			}
    ],
    transformedData: '',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD HH:mm:ss'
    },
    fontFamily: '微软雅黑',
    basicStyle: {
      fontSize: 28,
      color: '#ffffff',
      fontWeight: 'normal',
      backgroundColor:'',
      lineHeight: '45',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
    breedStyle: {
      fontSize: 22,
      color: '#2BF8FF',
      fontWeight: 'normal',
      backgroundColor:'',
      lineHeight: '40',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
    cloumnStyle: {
      fontSize: 22,
      color: '#2BF8FF',
      fontWeight: 'normal',
      backgroundColor:'',
      lineHeight: '40',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
    timeStyle: {
      fontSize: 32,
      color: '#FFDBB4',
      fontWeight: 'normal',
      backgroundColor:'',
      lineHeight: '40',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    },
  }
}

//行情
const priceRangeOption = function() {
  let w = document.getElementById("scale-box").offsetWidth-100;
  return {
    width:w,
    height: 40,
    data: '',
    transformedData: '',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD HH:mm:ss'
    },
    basicStyle: {
      fontFamily: '微软雅黑',
      fontSize: 20,
      color: '#ffffff',
      fontWeight: 'normal',
      backgroundColor:'',
      lineHeight: '40',
      letterSpacing:0,
      textStyle: {
        fontStyle: '',
        textDecoration: 'none',
        textAlign: ''
      }
    }
  }
}


// 图片
export const imageOption = function() {
  return {
    width: 200,
    height: 200,
    style: {
      rotate: 0,
      borderRadius: 0,
      opacity: 1,
      boxShadow: {
        h: 0,
        v: 0,
        blur: 0,
        color: '#ffffff'
      }
    },
    data: ''
  }
}

// 视频配置
export const videoOption = function() {
  return {
    loop: false,
    data: 'http://oem.mysteel.com/Horizon/static/video/demonstrate.mp4',
    muted: true // 默认为静音播放，在发布页面浏览器会拦截有声音的视频自动播放
  }
}

export default {
  'bar-simple': defaultOption,
  'bar-line': barLineOption,
  'dynamic-bar': dynamicBarOption,
  'line-simple': defaultLineOption,
  'area-simple': defaultAreatOption,
  'area-stack': areaStackOption,
  'pie-simple': pieSimple,
  'pie-doughnut': pieDoughnut,
  'double-bar': doubleBar,
  'line-double': lineDouble,
  'area-double': areaDouble,
  'bar-line-double': barLineDouble,
  'map-simple': mapOption,

  'scroll-board-style': scrollBoradOption,
  'futures-table-style':futuresTableOption,
  'futures-board-style':futuresBoardOption,
  'text-block-style': textBlockOption,
  'time-range-style': timeRangeOption,
  'index-board-style':indexBoardOption,
  'news-range-style': newsRangeOption,
  'price-range-style': priceRangeOption,
  'hot-news-style':hotNewsOption,
  'flash-news-style':flashNewsOption,
  'news-list-style':newsListOption,
  'weather-range-style':weatherRangeOption,
  'basic-swipe': swipeOption,
  'h-carousel-style': HorizontalCarousel,
  'web-frame-style': webFrameOption,
  'image-style': imageOption,
  'video-style': videoOption
}
