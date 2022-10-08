/* 图相关配置 */
import _ from 'lodash'
import series from '../series'

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
    // formatter:function(params) {
    //   console.log(params)
    //   var result = "";
    //   params.forEach(function(item, index) {
    //     console.log(item);
    //     let color = [];
    //     let bg = "background-color:#1197b8";
    //     if (item.color) {
    //       if (item.color.colorStops) {
    //         color.push(item.color.colorStops[0].color);
    //         color.push(item.color.colorStops[1].color);
    //       } else {
    //         color.push(item.color);
    //       }
    //     }
    //     if (color.length) {
    //       let c1 = color[0];
    //       let c2 = color[1] ? color[1] : color[0];
    //       bg = "linear-gradient(90deg, " + c1 + ", " + c2 + ")";
    //     }
    //     let dotHtml =
    //       '<span style="display:inline-block;' +
    //       "margin-right:5px;border-radius:100%;width:10px;height:10px;" +
    //       bg +
    //       '"></span>';
    //     if (index === 0) {
    //       result += item.name + "</br>";
    //     }
    //     result += dotHtml + '<span>'+item.seriesName + '</span><span style="padding-left:30px;">'+item.value+'</span>' + "</br>";
    //   });
    //   return result;
    // }
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
    data: [
      {
          "id":29,
          "name":"商品",
          "isVisible":true,
          "child":[
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002180000,
                  "authorMonitor":"资讯编辑：徐攀 0533-7026586\r\n资讯监督：王涛 0533-7026866\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775532,
                  "source":"我的农产品网",
                  "title":"Mysteel：濮阳南乐县某食品公司白条市场最新动态",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/DE15F5E0CA791121.html",
                  "content":"3月23日，南乐县食品公司817冻品价格下调，西装鸡14-28只对外报价123-133元/箱，9.5公斤/件。白条鸡整箱9.5公斤/件5-6只120元，7-8只119元，9只119元，12-13只115元，15-18只115元，以上为厂家报价，实际成交以单谈为主。今日上游毛鸡价格小幅走低，市场需求减少，产品承压下滑，预计短期产品价格弱势调整。\r\n\r\n",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002180000,
                  "authorMonitor":"资讯编辑：吴梦雷 021-26094311\r\n资讯监督：朱喜安 021-26093675\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775536,
                  "source":"我的钢铁网",
                  "title":"Mysteel：广东和佑50kg母猪价格持平",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/A73885F4F4E94A90.html",
                  "content":"3月23日，广东和佑二元母猪1700元/头，稳定，体重50公斤；三元母猪2560元/头，走货一般；成年公猪8000元/头。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002180000,
                  "authorMonitor":"资讯编辑：朱晓辉 0533-7026536\r\n资讯监督：王涛 0533-7026866\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775535,
                  "source":"我的农产品网",
                  "title":"Mysteel：河北富鑫马铃薯淀粉价格下调",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/29D170682324BBA8.html",
                  "content":"3月23日，河北富鑫马铃薯淀粉价格下调，一级粉含税出厂报价6200元/吨，价格下调200元/吨；企业走货情况良好，实际成交具体商谈。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002120000,
                  "authorMonitor":"资讯编辑：陈丽君 0533-7026579\r\n资讯监督：王涛 0533-7026866\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775496,
                  "source":"我的农产品网",
                  "title":"Mysteel：安徽六安霍山市场丰两优稻米价格稳定",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/F2A2E3F7FA3AAAEB.html",
                  "content":"3月23日，安徽六安霍山地区丰两优稻谷余粮充足，部分地区发运不畅，大米走货不快，米厂基本加工库存为主，丰两优稻谷收购价格在1.28元/斤左右；大米出厂价格1.85元/斤左右。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002120000,
                  "authorMonitor":"资讯编辑：朱宏 0533-7026572\r\n资讯监督：王涛 0533-7026866\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775522,
                  "source":"我的钢铁网",
                  "title":"Mysteel：山东青岛市场泰国麒麟木薯淀粉价格维稳",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/C80DD074CAACD19F.html",
                  "content":"3月23日，山东青岛市场泰国麒麟木薯淀粉供应尚可，走货一般。装车不含税报价3850-3860元/吨，报价维稳，实际成交可议。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002120000,
                  "authorMonitor":"资讯编辑：程婧 0533-7860047\r\n资讯监督：王涛 0533-7026866\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775530,
                  "source":"我的农产品网",
                  "title":"Mysteel：辽宁沈阳万全种禽大肉食鸡苗最新报价维持稳定",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/7D93E908146F3CA0.html",
                  "content":"3月24日，辽宁沈阳万全种禽大肉食鸡苗开票价0.90-1.00元/羽，价格稳定，企业按计划出苗。当前市场饲料价格高位，加上疫情影响，交通管制较为严格，养殖端补栏情绪不高，日出苗量12万羽左右。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002120000,
                  "authorMonitor":"资讯编辑：朱宏 0533-7026572\r\n资讯监督：王涛 0533-7026866\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775534,
                  "source":"我的农产品网",
                  "title":"Mysteel：上海市场泰国木薯淀粉价格维稳",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/A6FCE9AC12167ACF.html",
                  "content":"3月22日，上海市场泰国木薯淀粉货源供应尚可，走货情况一般。其中，三角港口自提含税报价4000-4050元/吨，麒麟港口自提不含税报价3900-3920元/吨，tcs港口不含税报价3820-3850元/吨，pqs港口不含税报价3900元/吨左右，玫瑰25kg仓库不含税报4050-4150元/吨，普罗星25kg仓库不含税报价4150-4200元/吨，报价维稳，实际成交可商议。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002060000,
                  "authorMonitor":"资讯编辑：杨莉莎 0533-7860071\r\n资讯监督：王涛 0533-7026866\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775510,
                  "source":"我的农产品网",
                  "title":"Mysteel：河北保定冀花葵花籽油价格报道",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/EBFF93274DABE711.html",
                  "content":"3月23日，河北保定冀花油脂毛葵今日暂停报价，货源紧张，目前暂无最新价格。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002060000,
                  "authorMonitor":"资讯编辑：郭丹丹 0533-7027097\r\n资讯监督：王涛 0533-7026866\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775518,
                  "source":"我的钢铁网",
                  "title":"Mysteel：广西正邦生猪价格上行",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/12AAE0DA98E6508A.html",
                  "content":"3月23日，广西正邦报价上涨0.4元/公斤，外三元生猪报价12.3元/公斤，体重在115公斤左右。养殖场走货尚可。",
                  "isCollection":0
              },
          ]
      },
      {
          "id":6,
          "name":"要闻",
          "isVisible":true,
          "child":[
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002120000,
                  "authorMonitor":"资讯编辑：刘佳惠 021-26093916\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775516,
                  "source":"财联社",
                  "title":"美联储重新转鹰有助于储备政策空间",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/3A11DDF92D0F1802.html",
                  "content":"在美联储宣布加息25个基点一周之后，鲍威尔主席却公开表示目前的通胀率太高了（much too high），不排除在未来一次或多次会议上加息超过25个基点。几乎同时，欧洲央行管委兼法国央行行长维勒鲁瓦和德国央行行长向外界重新释放了年底加息的操作预期。\r\n\r\n如此快速而明显的向鹰派立场转变，令市场多少有些措手不及，这也显示欧美央行决策的核心考虑依旧是通胀，此前短暂转鸽是一个小插曲。笔者认为，条件允许的情况下抓紧回归正常货币政策是务实之举，欧美央行急需向外界展示压制通胀的强硬立场，这也有助于为后续降息周期尽早储备政策空间。\r\n\r\n事实上，在2月底俄乌冲突发生之前，欧美央行早已摩拳擦掌，当时市场普遍预期3月份美联储大概率会加息50个基点，只是局部战争爆发给欧美经济恢复带来了不确定因素，美联储才“被迫”转而温和加息25个基点。过去一周俄乌冲突局势进一步趋缓，在伊朗、委内瑞拉和美国的石油供应逐步增加情况下，国际油价预期已经回落到90-110美元等，这些都给欧美央行货币政策回归正常化创造条件。\r\n\r\n美联储本月的“加息周期首秀”被市场视为犹豫不决，在通胀面前甚至稍显软弱，恶果就是通胀预期继续不受控制。包括野村证券在内的机构预测，美国上半年CPI将达到同比涨8%-8.5%左右的峰值，对应的时间点恰好就是下一次美联储FOMC召开会议的5月份。\r\n\r\n不少市场观点认为快速加息会引发经济衰退。但美联储主席鲍威尔表示，1965年、1984年和1994年，美联储都曾大幅提高了联邦基金利率，也都在不引发经济衰退的情况下成功应对了经济过热。笔者认为，历史能否再度重演目前还存在不确定性，而摆在联储面前的现实是——无论从三大股市屡创历史新高，还是从劳动力处于供不应求的状态，包括无风险国债收益率攀升等，美国经济增长的已经呈现过热征兆。不管美国经济能不能承受货币政策收缩的压力，美联储都需要用更强硬的态度应对通胀。\r\n\r\n从过往加息操作历史来看，如果政策犹豫和摇摆，必然会给市场带来模糊的预期，从而失去控制通胀的宝贵的时间和空间，甚至出现沃尔克时刻的极端情况。另一个很现实的考虑，就是本轮加息周期越早见效，美联储在面对下一轮的经济周期的政策主动性和操作空间就越大。从2020年疫情爆发时的情况来看，如果不是此前果断加息储备了相当的政策空间，我们看到的美联储政策宽松或许会是另外一个版本。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001880000,
                  "authorMonitor":"资讯编辑：王婉宁 021-26096785\r\n资讯监督：徐艳俊 021-26093191\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775477,
                  "source":"我的钢铁网",
                  "title":"23日江苏科能无锡废钢基地采购价格调整信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/F60E045139F99CAE.html",
                  "content":"23日江苏科能无锡废钢基地采购执行价：新钢板毛料、圆钢切头3480-3530，钢筋头毛料34500，钢立柱毛料3450，冷热轧冲子3400-3430，打包钢筋3320-3380，下船重废3350-3400，下船中废3300-3350，下船剪料3200-3260，汽割重废毛料3250-3350，楼板筋、钢窗3100-3150，冷热轧冲皮、冷热轧扁丝、电脑板3350-3380，镀锌扁丝、镀锌冲皮3150-3200，轻钢龙骨、通风管、镀锌圈、白铁皮3000-3100，桥架、新冰箱洗衣机铁皮2750-2850，剪切料毛料3150-3250，工角槽钢、重废毛料3400-3450，车床大件生铁3250-3350，清一色彩钢瓦、打包铁皮、打包带2600-2800，钢丝绳2130-2230，不含税，单位：元/吨。地址：江苏省无锡市新吴区城南路引航储运码头。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001820000,
                  "authorMonitor":"资讯编辑：曹浩 021-26093031\r\n资讯监督：徐艳俊 021-26093191\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775527,
                  "source":"我的钢铁网",
                  "title":"23日东北某厂废钢采购价格调整信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/A68B7215DC443F8E.html",
                  "content":"23日东北某钢厂重中型3700元/吨，不含税。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001820000,
                  "authorMonitor":"资讯编辑：王丽丽 021-26094036\r\n资讯监督：徐艳俊 021-26093191\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775462,
                  "source":"我的钢铁网",
                  "title":"23日城矿京唐港基地废钢采购价格调整信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/B4F053F19CA142D7.html",
                  "content":"23日城矿京唐港基地废钢采购价格执行：直钢筋毛料3660，钢筋团子3560，龙门剪料3520，不含税，单位：元/吨。联系方式：王瑞刚13180402203；孙华文13180402205。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001760000,
                  "authorMonitor":"资讯编辑：刘振兴 021-26093779\r\n资讯监督：万超 021-26093676\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775450,
                  "source":"我的钢铁网",
                  "title":"3月23日包头大安钢厂调价信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/54FEC29D1267B51C.html",
                  "content":"3月23日，包头大安钢厂建筑钢材出厂价格统一下调30元/吨：\r\n\r\n盘螺：盘螺HRB400E材质8-10mm价格4850元/吨；\r\n\r\n螺纹钢：HRB400E16-25mm螺纹钢4820元/吨，小螺纹12、14mm加140元/吨，16加30元/吨，28-32加价50元/吨。\r\n\r\n备注：以上价格均过磅含税。",   
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001640000,
                  "authorMonitor":"资讯编辑：王婉宁 021-26096785\r\n资讯监督：徐艳俊 021-26093191\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775432,
                  "source":"我的钢铁网",
                  "title":"23日无锡新大中码头废钢采购价格调整信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/C3EE3B0C51F50AF1.html",
                  "content":"23日无锡新大中码头废钢采购执行价：厚钢板料3600，龙门剪加工料最高3450，模具钢3570，马蹄铁最高3450，钢筋颗粒3550，直钢筋3450，优质重废3450，工角槽3350，生熟铁大件3300，加工料下浮50-100，6个厚以下停收，带油拒收，不含税，单位：元/吨。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001520000,
                  "authorMonitor":"资讯编辑：刘一丁 021-26093713\r\n资讯监督：温晓娟 021-26093319\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775411,
                  "source":"我的钢铁网",
                  "title":"Mysteel快讯：3月23日新兴铸管（武安）工业线材出厂价格调整信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/10393AFC1AFB9EF2.html",
                  "content":"\r\n\t\r\n\t\t\r\n\t\t\t3月23日新兴铸管（武安）工业线材价格调整信息\r\n\t\t\r\n\t\t\r\n\t\t\t品种\r\n\t\t\t牌号\r\n\t\t\t规格/mm\r\n\t\t\t出厂价格\r\n\t\t\t调整幅度\r\n\t\t\r\n\t\t\r\n\t\t\t冷镦钢\r\n\t\t\t35K\r\n\t\t\tφ8-20\r\n\t\t\t5330\r\n\t\t\t--\r\n\t\t\r\n\t\t\r\n\t\t\tML08Al\r\n\t\t\tφ16-20\r\n\t\t\t5330\r\n\t\t\t--\r\n\t\t\r\n\t\t\r\n\t\t\t10B21\r\n\t\t\tφ10-20\r\n\t\t\t5450\r\n\t\t\t--\r\n\t\t\r\n\t\r\n\r\n\r\n\r\n\r\n",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001460000,
                  "authorMonitor":"资讯编辑：娄智莹 021-26094487\r\n资讯监督：温晓娟 021-26093608\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775401,
                  "source":"我的钢铁网",
                  "title":"Mysteel快讯：3月23日山西新泰工业线材出厂价格调整信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/B9BB28C2BF0B9451.html",
                  "content":"3月23日山西新泰线材价格持稳，具体规格价格如下：\r\n\r\nQ195材质6.5mm线材现出厂价格执行5050元/吨，含税出厂。",
                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648000560000,
                  "authorMonitor":"资讯编辑：杨雪 021-66896727\r\n资讯监督：周丽华 021-26093780\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775240,
                  "source":"我的钢铁网",
                  "title":"3月23日中能源能钢中厚板出厂价格调整信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/BE97060F6B07428A.html",
                  "content":"3月23日，中能源能钢中厚板出厂基价报5130元/吨（14≤t≤22；2000≤W≤2500），较上一交易日持稳。非标宽度+30 元/吨，低合金+200 元/吨。\r\n\r\n以上调整均为含税价格，执行日期从2022年3月23日起。\r\n\r\n",
                  "isCollection":0
              }
          ]
      },
      {
          "id":5,
          "name":"宏观",
          "isVisible":true,
          "child":[
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001880000,
                  "authorMonitor":"资讯编辑：王婉宁 021-26096785\r\n资讯监督：徐艳俊 021-26093191\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775477,
                  "source":"我的钢铁网",
                  "title":"23日江苏科能无锡废钢基地采购价格调整信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/F60E045139F99CAE.html",
                  "content":"23日江苏科能无锡废钢基地采购执行价：新钢板毛料、圆钢切头3480-3530，钢筋头毛料34500，钢立柱毛料3450，冷热轧冲子3400-3430，打包钢筋3320-3380，下船重废3350-3400，下船中废3300-3350，下船剪料3200-3260，汽割重废毛料3250-3350，楼板筋、钢窗3100-3150，冷热轧冲皮、冷热轧扁丝、电脑板3350-3380，镀锌扁丝、镀锌冲皮3150-3200，轻钢龙骨、通风管、镀锌圈、白铁皮3000-3100，桥架、新冰箱洗衣机铁皮2750-2850，剪切料毛料3150-3250，工角槽钢、重废毛料3400-3450，车床大件生铁3250-3350，清一色彩钢瓦、打包铁皮、打包带2600-2800，钢丝绳2130-2230，不含税，单位：元/吨。地址：江苏省无锡市新吴区城南路引航储运码头。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001820000,
                  "authorMonitor":"资讯编辑：陈群 021-26096771\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775463,
                  "source":"我的钢铁网",
                  "title":"荣泰健康：近期公司推出新产品8900AI版按摩椅",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/D17BCFBC25CDF814.html",
                  "content":"3月22日，荣泰健康在投资者互动平台表示，公司研发主要包括四个方向：一是加强对按摩椅前沿技术的研究，包括机芯、导轨、按摩工艺手法等方面；二是通过产品外观设计、材料等方面的不断创新，创造消费需求、引领行业趋势；三是以按摩椅为载体，对外部技术的应用，诸如智能语音交互、VR、健康数据采集等新技术进行转化，以丰富按摩椅的功能，提高用户黏性；四是通过流水线排布及生产动作优化，在保证质量的前提下，提升产品的制造效率。近期公司推出的新产品8900AI版按摩椅，除双子座按摩椅已拥有的技术外，还包含公司和上海中医药大学合作开发的酸痛检查模块，与上海复旦大学合作开发的AI算法，实现从健康检查、身体疲劳数据分析到智能按摩等。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648000860000,
                  "authorMonitor":"资讯编辑：栗铭铧 021-26093566\r\n资讯监督：徐艳俊 021-26093191\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775294,
                  "source":"我的钢铁网",
                  "title":"23日宁波兴誉废钢集团废钢采购价格调整信息",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/E58A1778FC089F2F.html",
                  "content":"23日宁波兴誉废钢集团废钢采购执行价：钢刨（0.5毫米以上）2900，混剪铁皮、电缆铁皮、杂铁丝等2670，锌冲（＋60元）锌包壳，厚包带3240，普碳沫，建筑铁丝2900，0.8一1.5＂配电柜“、工具柜，无漆瓦口铁，剪刀料2930，新油漆瓦囗铁冲件，一色干净食品罐头2800，新板料：板厚二公分以上，长宽50厘米以内3450，钢筋切粒3550，炉一：外径12毫米以上，长40厘米以下3430，模具钢，长宽80厘米以下3460，新板二类：板厚5mm-1cm，长宽50cm以下3430，炉二，外径8毫米以上，12毫米以下，长40毫米以下3380，红冲、冲豆：长宽20厘米以内，厚2毫米以上3410，生铁类：机床等3320直径20公分以上水泥旧墨管3050，生铁粪管、钳锅2930，熟铁精重废：二公分以上无油无锌3330元，重废，厚1公分以上，长丶宽80公分以內，熟铁铸件3220，中废、唐山剪刀料头3220元。剪中料：麻化钢筋、厚2-3毫米3060，打包钢筋3220，普中废一：允许有油丶锌，厚3一6毫米3100，普中废二：允许有油锌，7毫米以上3150，炉三类：3一6亳米以下，长宽35毫米剪切料，无油螺毛切边3220，直螺纹钢12一20毫米3350，颗粒油子3270元，小块冲件料：厚度1.2毫米以下，长70米以下，宽70厘米以下、纯净冲子、冷轧板块状3480，唐山小冲块、矽片不限厚度，长、宽70厘米以上大块冷热轧板大块包皮料3420元，\r\n钢带冲3000，无锈管子头，四十公分以内，厚二毫米以下3170，三山料：无锈保装带、胖子丝网、新镀锌大件壳，罩子，伞骨子，工业铁皮，3-5毫米钢筋铁丝2950，卜料：家电（电瓶车架、柴油桶丶自行车，彩瓦丶圈帘门＋700）1750，一色无锈彩瓦、干净似锌压块料2350-2450元，钢绳类：2500，单位：元/吨，不含税。联系方式：周13566010739",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648000560000,
                  "authorMonitor":"资讯编辑：陈群 021-26096771\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775243,
                  "source":"我的钢铁网",
                  "title":"小熊电器再次通过高新技术企业认定",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/D7F85A42641CBE48.html",
                  "content":"3月22日晚间，小熊电器发布公告，于近日收到广东省科学技术厅、广东省财政厅、国家税务总局广东省税务局联合颁发的《高新技术企业证书》，发证时间：2021年12月20日，有效期：三年。\r\n\r\n本次是公司持有的原高新技术企业证书有效期满后进行的重新认定，根据《中华人民共和国企业所得税法》《高新技术企业认定管理办法》等相关规定，公司自本次通过高新技术企业认定起连续三年（即2021年-2023年）继续享受国家关于高新技术企业的相关税收优惠政策，即按15%的税率缴纳企业所得税。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648000320000,
                  "authorMonitor":"资讯编辑：祝蓉 021-66896654\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775211,
                  "source":"河钢承钢",
                  "title":"河钢承钢公司第二代含钒高强耐候钢批量化供货中集集团",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/5D4DA012469AA80F.html",
                  "content":"3月15日，河钢承钢公司1500吨第二代含钒高强耐候钢发往中集集团。经严苛检验，表面质量和内在性能均达标，将用于铁路运输集装箱制造。全月订单量达8500吨，质量合格率保持在百分之百。\r\n\r\n今年以来，公司聚焦深度优化“两个结构”，加强与战略客户中集集团的深层次对接，在敏锐捕捉到铁路运输集装箱需求量快速增大实际，大力实施技术创新，研发团队定向研发强度更高、韧性更好、耐腐蚀性更强、更具轻量化特征的第二代含钒高强耐候钢，全力以赴构建战略合作利益共同体。生产过程中，公司紧密结合客户对表面质量的特殊要求，依托多元技术平台，制定行业领先的技术保障措施，实现了全流程精准控制，确保了产品在完全满足客户个性化和差异化需求的基础上，实现整体减重目标，赢得了客户青睐。\r\n\r\n据悉，中集集团是集团战略客户，是世界领先的物流装备和能源装备供应商，主要业务领域有集装箱、道路运输车辆、能源化工及食品装备、海洋工程、重型卡车、物流服务、空港设备等，在亚洲、北美、欧洲、澳洲等地区拥有\r\n\r\n300余家成员企业及3家上市公司，客户和销售网络分布在全球100多个国家和地区。\r\n\r\n",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1647999900000,
                  "authorMonitor":"资讯编辑：周小燕 021-26096760\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775157,
                  "source":"国家住建部",
                  "title":"邢台稳步推进棚户区改造，将开工棚改安置房8264套",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/2853A5E91AD51F99.html",
                  "content":"近日，河北省邢台市住房和城乡建设局坚持因城施策、因地制宜，稳步推进棚户区改造，将开工棚改安置房8264套、建成棚改安置房6985套，新开工棚改项目已全部落实到具体地块。\r\n\r\n据了解，邢台市严把棚改范围和标准，合理确定年度棚改目标任务，将目标任务落实到县（市、区）、具体项目、地块。棚改安置房将配套建设城市道路、供电、供水、供气、供热、停车库（场）、污水和垃圾处理等城市基础设施项目。邢台市将全面落实建设、勘察、设计、监理、施工单位的工程质量终身负责制，建设精品工程。在资金筹集方面，积极争取中央财政补助资金、棚改专项债券和中央预算内投资支持，各县（市、区）政府按照规定渠道和既定计划安排项目资金投入，督促项目实施主体切实承担社会责任。\r\n\r\n此外，邢台市将强化政策落实，依法加快土地手续办理，对棚改项目用地做到应保尽保。压实责任，发挥协同作用，形成合力。严格按照相关规定，落实棚户区改造安置住房税收优惠政策，免收城市基础设施配套费等各种行政事业性收费和政府性基金，所涉及的经营服务性收费，按相关标准的下限收费或给予减免。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1647999900000,
                  "authorMonitor":"资讯编辑：祝蓉 021-66896654\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775158,
                  "source":"中国冶金报",
                  "title":"太钢纳米晶超薄带材在新能源汽车市场占有率大幅提升",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/9483B36639E8DF13.html",
                  "content":"今年初以来，太钢加大纳米晶超薄带研发力度，目前太钢生产的纳米晶超薄带材在新能源汽车领域的市场占有率大幅提升到30%。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1647999900000,
                  "authorMonitor":"资讯编辑：李玟 021-26095597\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775159,
                  "source":"国际船舶网",
                  "title":"国内首批三峡低碳节能型130米LNG双燃料江海直达船开工",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/22871C21B624A7B4.html",
                  "content":"3月22日，湖北省武穴市开阳星造船有限公司举行国内首批2艘万吨级三峡低碳节能型LNG柴油双燃料江海直达船开工仪式。\r\n\r\n海南创远海运有限公司董事长袁厚安、武汉创新江海运输有限公司总经理朱志群、武穴市海铭星（集团）企业投资有限责任公司董事长王水泉；武穴市海铭星（集团）企业投资有限责任公司副总经理叶涛；武汉理工大学绿色智能江海直达船舶与邮轮游艇研究中心副主任裴志勇；宁波中策动力机电集团有限公司总经理娄华；杭州前进齿轮箱集团股份有限公司总经理周焕辉、长航凤凰股份有限公司总经理王涛、CCS武汉分社副总经理唐建、武汉市交通局港航事业中心领导、武穴市政府领导等共计70余人出席了开工仪式，共同见证了绿色智能江海直达运输发展史上的重要里程碑。\r\n\r\n该船由武汉创新江海运输有限公司斥资建造。该船总长130米、型宽16.20米、型深8.50米、设计吃水6.10米，载货量9832吨，主机采用双电控、双燃料（LNG/柴油）动力系统，入级中国船级社（CCS），可从舟山海域进长江过三峡直航到重庆，开创了我国万吨级江海直达船舶从华东沿海直航大西南的历史先河。\r\n\r\n该船型是根据工信部关于推进长江内河绿色船舶产业发展的要求，作为湖北省推进长江内河绿色船舶创新发展示范工程而研发的。其由武汉理航智能船舶科技有限公司签约并与武汉理工大学绿色智能江海直达船舶与邮轮游艇研究中心联合设计，采用了型线优化、高效推进、结构轻量化船舶技术。\r\n\r\n据悉，三峡低碳节能型130M江海直达LNG双燃料船，将创造江海直达航线纵深2428公里和开创万吨海船过三峡大坝到重庆的世界之最。该船的开发突破一系列关键技术，节能型线优化，垂直艏、外旋双尾鳍线型，具有低阻、抗砰击、低推力减额、高推进效率的特点；结构和舱盖减重10.1%，有效提升能效；并将应用一系列智能技术，包括表面减阻、经济航速、航态感知、风险控制、智能能效管理、智能机舱等，将有效通过江海直达运输模式提升长江干线货运周转效率。\r\n\r\n武汉创新江海运输有限公司董事长袁厚安被誉为我国“大吨位江海直达第一人”，他深耕江海直达运输事业三十二载，他在点火开工仪式上介绍：该船型是基于优化长江船型运力结构，化解三峡船闸拥堵，避免建设三峡船闸第二通道而研发的，船舶从舟山特定海域航行过三峡至重庆，首开沿海直达我国西南地区的水路运输通道，创造了江海直达航线的纵深和吨位世界之最，还减少了货物中转和货物资金占用成本，可促进大西南和沿海地区经济的深度融合发展，其具有良好的市场前景、经济效益和社会效益。该船型首批计划建造30艘，今天开工2艘拉开了建造序幕，下一步将会有更多的船舶动工兴建。\r\n\r\n武穴市开阳星造船有限责任公司总经理王水泉介绍，三峡低碳节能型LNG双燃料江海直达船点火开工，对开阳星支持未来退城进园，打造智能船舶制造产业进一步夯实了基础。该船设计采用较多的国内领先技术，开阳星造船一定能高质量、低成本、保周期完成该船的建造工作，预计该船可在2023年2月底建成投产。\r\n\r\n中国船级社武汉分社副总经理唐建在开工仪式上致辞：该船型采用CCS审图和检验，为建造船舶“高标准、优质量”打下了坚实的基础，在长江水运市场上将会有较强的市场竞争力，我们安排精兵强将全力以赴审图和检验，保质保量地为企业服好务。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1647999480000,
                  "authorMonitor":"资讯编辑：刘思琪 021-26096532\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775084,
                  "source":"财联社",
                  "title":"理想汽车：4月1日起理想ONE售价上调至34.98万元",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/A0D375BAC208D772.html",
                  "content":"3月23日，理想汽车公告，受上游原材料持续大幅上涨的影响，自4月1日起，理想汽车将会对理想ONE的售价进行调整，全国统一零售价格将由目前的338000元上调至349800元。",

                  "isCollection":0
              }
          ]
      },
      {
          "id":7,
          "name":"政策",
          "isVisible":true,
          "child":[
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002120000,
                  "authorMonitor":"资讯编辑：陈荣 021-26094319\r\n资讯监督：朱喜安 021-26093675\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775519,
                  "source":"生态环境部",
                  "title":"第二轮第六批中央生态环境保护督察启动",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/7229ACE5D72A898C.html",
                  "content":"为深入贯彻习近平生态文明思想，根据《中央生态环境保护督察工作规定》，经党中央、国务院批准，第二轮第六批中央生态环境保护督察全面启动。组建5个中央生态环境保护督察组（以下简称督察组），分别对河北、江苏、内蒙古、西藏、新疆5个省（区）和新疆生产建设兵团开展为期约1个月的督察进驻工作，具体如下：\r\n\r\n　　第一组：河北省，组长蒋巨峰，副组长左力；\r\n\r\n　　第二组：江苏省，组长宋秀岩，副组长张雪樵；\r\n\r\n　　第三组：内蒙古自治区，组长黄龙云，副组长林山青；\r\n\r\n　　第四组：西藏自治区，组长李家祥，副组长邱启文；\r\n\r\n　　第五组：新疆维吾尔自治区和新疆生产建设兵团，组长刘伟平，副组长翟青。\r\n\r\n　　督察组始终坚持服务大局，坚持系统观念，坚持严的基调，坚持问题导向，坚持精准科学依法督察。重点督察省级党委政府贯彻落实习近平生态文明思想和党中央、国务院生态环境保护决策部署情况；省级有关部门生态环境保护责任落实和担当作为情况，地市级党委政府生态环境保护工作推进落实情况。\r\n\r\n　　在督察中，重点关注习近平总书记有关生态环境保护重要指示批示办理情况；立足新发展阶段、贯彻新发展理念、构建新发展格局、推动高质量发展情况；京津冀协同发展、长江经济带发展、长三角一体化发展、黄河流域生态保护和高质量发展等重大国家战略实施中生态环境保护要求落实情况；严格控制“两高”（高耗能、高排放）项目盲目上马，以及去产能“回头看”落实情况；重大生态破坏、环境污染、生态环境风险及处理情况；上一轮督察发现问题整改落实情况；人民群众反映突出的生态环境问题立行立改情况；生态环境保护思想认识、工作推进和“党政同责、一岗双责”落实情况等。\r\n\r\n　　督察组严肃纪律规矩，增强“四个意识”、坚定“四个自信”、做到“两个维护”，坚持以人民为中心，认真贯彻落实《中央生态环境保护督察工作规定》要求。进驻期间，各督察组分别设立联系电话和邮政信箱，受理被督察对象生态环境保护方面的来信来电举报。\r\n\r\n来源：生态环境部",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648002120000,
                  "authorMonitor":"资讯编辑：刘佳惠 021-26093916\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775516,
                  "source":"财联社",
                  "title":"美联储重新转鹰有助于储备政策空间",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/3A11DDF92D0F1802.html",
                  "content":"在美联储宣布加息25个基点一周之后，鲍威尔主席却公开表示目前的通胀率太高了（much too high），不排除在未来一次或多次会议上加息超过25个基点。几乎同时，欧洲央行管委兼法国央行行长维勒鲁瓦和德国央行行长向外界重新释放了年底加息的操作预期。\r\n\r\n如此快速而明显的向鹰派立场转变，令市场多少有些措手不及，这也显示欧美央行决策的核心考虑依旧是通胀，此前短暂转鸽是一个小插曲。笔者认为，条件允许的情况下抓紧回归正常货币政策是务实之举，欧美央行急需向外界展示压制通胀的强硬立场，这也有助于为后续降息周期尽早储备政策空间。\r\n\r\n事实上，在2月底俄乌冲突发生之前，欧美央行早已摩拳擦掌，当时市场普遍预期3月份美联储大概率会加息50个基点，只是局部战争爆发给欧美经济恢复带来了不确定因素，美联储才“被迫”转而温和加息25个基点。过去一周俄乌冲突局势进一步趋缓，在伊朗、委内瑞拉和美国的石油供应逐步增加情况下，国际油价预期已经回落到90-110美元等，这些都给欧美央行货币政策回归正常化创造条件。\r\n\r\n美联储本月的“加息周期首秀”被市场视为犹豫不决，在通胀面前甚至稍显软弱，恶果就是通胀预期继续不受控制。包括野村证券在内的机构预测，美国上半年CPI将达到同比涨8%-8.5%左右的峰值，对应的时间点恰好就是下一次美联储FOMC召开会议的5月份。\r\n\r\n不少市场观点认为快速加息会引发经济衰退。但美联储主席鲍威尔表示，1965年、1984年和1994年，美联储都曾大幅提高了联邦基金利率，也都在不引发经济衰退的情况下成功应对了经济过热。笔者认为，历史能否再度重演目前还存在不确定性，而摆在联储面前的现实是——无论从三大股市屡创历史新高，还是从劳动力处于供不应求的状态，包括无风险国债收益率攀升等，美国经济增长的已经呈现过热征兆。不管美国经济能不能承受货币政策收缩的压力，美联储都需要用更强硬的态度应对通胀。\r\n\r\n从过往加息操作历史来看，如果政策犹豫和摇摆，必然会给市场带来模糊的预期，从而失去控制通胀的宝贵的时间和空间，甚至出现沃尔克时刻的极端情况。另一个很现实的考虑，就是本轮加息周期越早见效，美联储在面对下一轮的经济周期的政策主动性和操作空间就越大。从2020年疫情爆发时的情况来看，如果不是此前果断加息储备了相当的政策空间，我们看到的美联储政策宽松或许会是另外一个版本。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648001100000,
                  "authorMonitor":"资讯编辑：刘佳惠 021-26093916\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775332,
                  "source":"新华财经",
                  "title":"埃及央行宣布加息，埃镑跌至5年新低",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/10/9E4F3C8C61DFFF55.html",
                  "content":"埃及中央银行21日宣布将基准利率提高100个基点，当天，埃镑对美元汇率下跌超15%，创下自2016年11月以来最大跌幅。\r\n\r\n分析人士认为，俄乌冲突对埃及经济外溢效应明显，外资持续流出，埃镑面临贬值压力，央行加息符合此前市场预期。加息可能刺激外资流入，同时，埃及有望因此获得国际货币基金组织（IMF）新的贷款项目。\r\n\r\n埃镑对美元跌至5年新低\r\n\r\n埃及央行货币政策委员会（MPC）在21日举行的临时会议上宣布，将基本利率上调100个基点至9.75%，隔夜存贷款利率也分别上调100个基点至9.25%和10.25%。央行加息消息公布不久，埃镑对美元汇率下跌，从前一天的15.7比1跌至当天收盘时的18.2比1，跌幅超15%。据了解，自2020年11月以来，埃镑对美元汇率一直维持在15.7比1左右。\r\n\r\n据埃及《金字塔报》报道，这是埃及央行自2017年以来首次加息，央行将加息原因归结于新冠疫情和俄乌冲突影响叠加引发的全球通胀压力增加。\r\n\r\n“供应链进一步中断导致国际大宗商品价格上涨，加上市场避险情绪上升，埃及国内的通胀压力增加，并导致外部失衡。”埃及央行在一份声明中解释道。\r\n\r\n埃镑下跌后，埃及央行行长塔里克·阿米尔在新闻发布会上表示，埃镑经历了一次“调整”，将更加反映世界和埃及发展状况，使埃及出口更具竞争力。\r\n\r\n埃镑上一次大跌是在五年前。埃及央行2016年11月3日宣布，为摆脱国内经济困境，并更好履行与IMF的贷款承诺，允许埃镑汇率自由浮动。当天，埃镑对美元汇率从之前的8.8比1下跌至13比1，跌幅为48%。\r\n\r\n埃镑下跌或为埃及获IMF贷款铺平道路\r\n\r\n观察人士认为，自2月24日俄乌爆发冲突以来，以埃及为代表的新兴市场面临外资大规模外流压力。埃及当前货币贬值符合市场预期。埃镑贬值不仅有望吸引外资流入，同时，贬值有望赢得IMF进一步的贷款支持。\r\n\r\n3月2日，路透社援引匿名消息人士的话报道称，自2月24日以来，埃及外国资本外流总额已达30亿美元。埃及交易所的数据显示，自2022年初以来，看跌的外国投资者已经卖出了价值30.68亿埃镑的股票。\r\n\r\n3月8日，总部位于纽约的投资银行摩根大通表示，埃镑面对越来越大的压力，埃及将有必要进行货币贬值。\r\n\r\n埃及央行行长阿米尔在新闻发布会上透露，加息的决定“与我们的国际伙伴进行了协调，我们的许多需求都要依靠他们提供资金”。\r\n\r\n彭博新闻社此前报道称，埃及正在与IMF就可能的支持进行谈判，其中可能包括一笔贷款。\r\n\r\n凯投宏观研究公司经济学家詹姆斯·斯旺斯顿表示，利率上升和埃及镑贬值“可能为埃及从IMF获得新融资计划铺平道路”。\r\n\r\n阿联酋迪拜国民银行（EmiratesNBD）中东和北非经济学家丹尼尔·理查兹表示，埃及央行加息将增加未来几周内埃及与IMF达成新的贷款计划的可能性。“有意义的加息和更便宜的货币，这是重新获得基金组织财政支持的一些可能的先决条件，而现在已经得到满足。”理查兹表示。\r\n\r\n不过，埃镑大幅贬值可能会对埃及的穷人和中产阶级造成沉重负担。自政府2016年启动经济改革计划，获取IMF贷款以来，埃及百姓一直遭受价格上涨的困扰。\r\n\r\n高盛高级经济学家法鲁克·苏萨也警示道，埃镑贬值也可能加剧通货膨胀和可能的本土美元化。“最大的问题是，（埃镑当前的贬值）是否足够/到位，或者是否可能需要更多措施来吸引投资者。”苏萨表示。\r\n\r\n2016年8月，埃及政府与IMF签署了一项120亿美元贷款的初步协议，以帮助埃及摆脱经济困境。该贷款要求埃及政府降低财政赤字以及实行更为市场化的汇率机制。\r\n\r\n俄乌冲突外溢效应令埃及财政持续承压\r\n\r\n能源和食品价格大幅上涨，以及今年俄罗斯和乌克兰在埃及度假人数大幅下降的前景，将加大埃及财政的压力。此前有分析人士认为，很少有非战斗国家能比埃及更直接地受到俄乌冲突对其人民生活水平的打击。\r\n\r\n惠誉国际评级3月15日表示，俄乌冲突将给埃及这个阿拉伯世界人口最多的国家带来“旅游流入减少、食品价格上涨和更大的融资挑战”。\r\n\r\n埃及是世界上最大的小麦进口国，其小麦进口的80%来自俄罗斯和乌克兰。冲突爆发扰乱了小麦全球供应，推高了粮食价格。根据国际粮食政策研究所的研究显示，小麦价格上涨可能会使埃及每年的小麦进口支出增加近一倍，达到57亿美元，这将使政府财政紧张，并加剧通胀压力。\r\n\r\n自俄乌冲突爆发以来，由于价格高企和缺乏投标，埃及商品供应总局取消了两次小麦供应招标；同时，由于国际市场上小麦价格上涨了50%，预计埃及今年面向百姓的粮食补贴预算拨款将额外增加150亿埃镑。\r\n\r\n埃及总理穆斯塔法·马德布利表示，埃及政府一直在努力遏制当前的通货膨胀浪潮。\r\n\r\n除了粮食之外还有石油。由于俄乌冲突有效阻止了俄罗斯对市场的供应，油价飙升。埃及作为原油和石油衍生品的净进口国，每年进口超过1.2亿桶原油，当前油价几乎是埃及2021-2022财年预算石油60美元基准的两倍，给埃及财政进一步造成负担。\r\n\r\n根据埃及中央公共动员和统计局(CAPMAS)的数据，该国2月份的年度总体通胀率从1月份的8%跃升至10%，超过央行设定的5%-9%目标区间的上限，达到近30个月来的最高水平。\r\n\r\n阿联酋迪拜国民银行理查兹预计，埃及央行今年将进一步加息200个基点，而这与其他经济学家认为可能会进一步收紧利率相呼应。\r\n\r\n埃及央行货币政策委员会方面则强调，未来政策利率的路径“主要取决于通胀预期，而不是当前通胀率。”货币政策委员会补充说，它将继续密切关注经济发展，并致力于利用所有可用工具来实现中期内物价稳定任务。委员会定于24日再次召开会议，以评估基本利率。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648000740000,
                  "authorMonitor":"资讯编辑：陈颖颖 021-26094037\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775271,
                  "source":"期货日报",
                  "title":"《“十四五”现代能源体系规划》：适时推动成品油、天然气等期货交易",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/A1E0B030ADAD7522.html",
                  "content":"日前，国家发改委、国家能源局印发《“十四五”现代能源体系规划》（简称《规划》）。《规划》指出，到2025年，国内能源年综合生产能力达到46亿吨标准煤以上，原油年产量回升并稳定在2亿吨水平，天然气年产量达到2300亿立方米以上，发电装机总容量达到约30亿千瓦，能源储备体系更加完善，能源自主供给能力进一步增强。到2025年，非化石能源消费比重提高到20%左右，非化石能源发电量比重达到39%左右，电气化水平持续提升，电能占终端用能比重达到30%左右。\r\n\r\n《规划》提出，增强能源供应链稳定性和安全性。增强油气供应能力。加大国内油气勘探开发，坚持常非并举、海陆并重，强化重点盆地和海域油气基础地质调查和勘探，夯实资源接续基础。积极扩大非常规资源勘探开发，加快页岩油、页岩气、煤层气开发力度。石油产量稳中有升，力争2022年回升到2亿吨水平并较长时期稳产。天然气产量快速增长，力争2025年达到2300亿立方米以上。按照不与粮争地、不与人争粮的原则，提升燃料乙醇综合效益，大力发展纤维素燃料乙醇、生物柴油、生物航空煤油等非粮生物燃料。加强煤炭安全托底保障。优化煤炭产能布局，建设山西、蒙西、蒙东、陕北、新疆五大煤炭供应保障基地，完善煤炭跨区域运输通道和集疏运体系，增强煤炭跨区域供应保障能力。持续优化煤炭生产结构，以发展先进产能为重点，布局一批资源条件好、竞争能力强、安全保障程度高的大型现代化煤矿，强化智能化和安全高效矿井建设，禁止建设高危矿井，加快推动落后产能、无效产能和不具备安全生产条件的煤矿关闭退出。建立健全以企业社会责任储备为主体、地方政府储备为补充、产品储备与产能储备有机结合的煤炭储备体系。发挥煤电支撑性调节性作用。提升天然气储备和调节能力。统筹推进地下储气库、液化天然气（LNG）接收站等储气设施建设。\r\n\r\n《规划》指出，建设现代能源市场。优化能源资源市场化配置。深化电力体制改革，加快构建和完善中长期市场、现货市场和辅助服务市场有机衔接的电力市场体系。按照支持省域、鼓励区域、推动构建全国统一市场体系的方向推动电力市场建设。深化配售电改革，进一步向社会资本放开售电和增量配电业务，激发存量供电企业活力。创新有利于非化石能源发电消纳的电力调度和交易机制，推动非化石能源发电有序参与电力市场交易，通过市场化方式拓展消纳空间，试点开展绿色电力交易。引导支持储能设施、需求侧资源参与电力市场交易，促进提升系统灵活性。加快完善天然气市场顶层设计，构建有序竞争、高效保供的天然气市场体系，完善天然气交易平台。完善原油期货市场，适时推动成品油、天然气等期货交易。推动全国性和区域性煤炭交易中心协调发展，加快建设统一开放、层次分明、功能齐全、竞争有序的现代煤炭市场体系。\r\n\r\n《规划》提出，深化价格形成机制市场化改革。进一步完善省级电网、区域电网、跨省跨区专项工程、增量配电网价格形成机制，加快理顺输配电价结构。持续深化燃煤发电、燃气发电、水电、核电等上网电价市场化改革，完善风电、光伏发电、抽水蓄能价格形成机制，建立新型储能价格机制。建立健全电网企业代理购电机制，有序推动工商业用户直接参与电力市场，完善居民阶梯电价制度。研究完善成品油价格形成机制。稳步推进天然气价格市场化改革，减少配气层级。落实清洁取暖电价、气价、热价等政策。\r\n\r\n《规划》还指出，健全能源法律法规体系，建立以能源法为统领，以煤炭、电力、石油天然气、可再生能源等领域单项法律法规为支撑，以相关配套规章为补充的能源法律法规体系。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648000560000,
                  "authorMonitor":"资讯编辑：陈群 021-26096771\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775243,
                  "source":"我的钢铁网",
                  "title":"小熊电器再次通过高新技术企业认定",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/D7F85A42641CBE48.html",
                  "content":"3月22日晚间，小熊电器发布公告，于近日收到广东省科学技术厅、广东省财政厅、国家税务总局广东省税务局联合颁发的《高新技术企业证书》，发证时间：2021年12月20日，有效期：三年。\r\n\r\n本次是公司持有的原高新技术企业证书有效期满后进行的重新认定，根据《中华人民共和国企业所得税法》《高新技术企业认定管理办法》等相关规定，公司自本次通过高新技术企业认定起连续三年（即2021年-2023年）继续享受国家关于高新技术企业的相关税收优惠政策，即按15%的税率缴纳企业所得税。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648000020000,
                  "authorMonitor":"资讯编辑：冯诗奇 021-26093556\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775149,
                  "source":"山东省铝业协会",
                  "title":"滨州邹平市轻量化铝新材料产业集群入选山东省战略性新兴产业集群名单",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/7EA24F03B9D48839.html",
                  "content":"\r\n为深入实施战略性新兴产业集群建设工程，加快提升产业集群的引领力和竞争力，3月22日，山东省发展改革委公布了13个省级战略性新兴产业集群名单，滨州邹平市轻量化铝新材料产业集群成功入选。\r\n\r\n省发改委要求，要切实加大战略性新兴产业集群培育支持力度，完善配套政策措施，吸引集聚科技、资金等要素资源，培育壮大龙头企业，优化产业集群生态，加强重点项目谋划、建设和储备，保持产业链供应链稳定。省发展改革委将会同有关部门，适时对集群建设情况开展评估，对发展成效显著的集群将优先推荐申报国家级战略性新兴产业集群。\r\n",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1648000020000,
                  "authorMonitor":"资讯编辑：祝蓉 021-66896654\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775168,
                  "source":"中国冶金报",
                  "title":"陕钢汉钢积极参与固废资源综合利用产业建设",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/268056B62DD0ED17.html",
                  "content":"日前，国家发展改革委发布《关于加快推进大宗固体废弃物综合利用示范建设的通知》，公布了40个大宗固体废弃物综合利用示范基地和60家大宗固体废弃物综合利用骨干企业。其中，陕西省汉中市入选国家大宗固体废弃物综合利用示范基地，也是陕西省此次唯一入选的基地。陕西省汉中市入选国家大宗固体废弃物综合利用示范基地，为陕钢汉钢充分利用废旧钢铁再生资源，实现水渣、钢渣、热熔渣、含铁低品位除尘灰、石膏等固废的消纳和资源化利用创造了发展机遇。\r\n\r\n面对新形势、新机遇，陕钢汉钢系统谋划，积极参与固废资源综合利用产业建设，提高固废利用产品附加值。该公司加强政策解读，明确发展定位；积极推动高炉渣、钢渣及尾渣深度研究、分级利用、优质优用和规模化利用；推广脱硫石膏等工业副产石膏替代天然石膏的资源化利用和分级利用；建立和完善符合固废产业化发展、分工合理、责任明确的协同推进机制，在该公司内部形成强大合力；强化关键技术的研发和引进，掌握固废资源综合利用核心技术，为该公司多元化发展奠定基础；发挥西北联钢优势，联合兄弟单位协同实施固废综合利用项目，发挥聚集效应；以固废综合利用项目为纽带，加强固废产业上下游衔接，大幅提高资源综合利用效率，建立循环型工业体系。\r\n\r\n下一步，陕钢汉钢将加快产业转型升级，助推陕西省汉中市大宗固废综合利用产业布局集聚化、利用方式低碳化、技术装备先进化和运营管理规范化，实现大宗固废绿色、高效、规模化利用。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1647999900000,
                  "authorMonitor":"资讯编辑：李玟 021-26095597\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775159,
                  "source":"国际船舶网",
                  "title":"国内首批三峡低碳节能型130米LNG双燃料江海直达船开工",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/22871C21B624A7B4.html",
                  "content":"3月22日，湖北省武穴市开阳星造船有限公司举行国内首批2艘万吨级三峡低碳节能型LNG柴油双燃料江海直达船开工仪式。\r\n\r\n海南创远海运有限公司董事长袁厚安、武汉创新江海运输有限公司总经理朱志群、武穴市海铭星（集团）企业投资有限责任公司董事长王水泉；武穴市海铭星（集团）企业投资有限责任公司副总经理叶涛；武汉理工大学绿色智能江海直达船舶与邮轮游艇研究中心副主任裴志勇；宁波中策动力机电集团有限公司总经理娄华；杭州前进齿轮箱集团股份有限公司总经理周焕辉、长航凤凰股份有限公司总经理王涛、CCS武汉分社副总经理唐建、武汉市交通局港航事业中心领导、武穴市政府领导等共计70余人出席了开工仪式，共同见证了绿色智能江海直达运输发展史上的重要里程碑。\r\n\r\n该船由武汉创新江海运输有限公司斥资建造。该船总长130米、型宽16.20米、型深8.50米、设计吃水6.10米，载货量9832吨，主机采用双电控、双燃料（LNG/柴油）动力系统，入级中国船级社（CCS），可从舟山海域进长江过三峡直航到重庆，开创了我国万吨级江海直达船舶从华东沿海直航大西南的历史先河。\r\n\r\n该船型是根据工信部关于推进长江内河绿色船舶产业发展的要求，作为湖北省推进长江内河绿色船舶创新发展示范工程而研发的。其由武汉理航智能船舶科技有限公司签约并与武汉理工大学绿色智能江海直达船舶与邮轮游艇研究中心联合设计，采用了型线优化、高效推进、结构轻量化船舶技术。\r\n\r\n据悉，三峡低碳节能型130M江海直达LNG双燃料船，将创造江海直达航线纵深2428公里和开创万吨海船过三峡大坝到重庆的世界之最。该船的开发突破一系列关键技术，节能型线优化，垂直艏、外旋双尾鳍线型，具有低阻、抗砰击、低推力减额、高推进效率的特点；结构和舱盖减重10.1%，有效提升能效；并将应用一系列智能技术，包括表面减阻、经济航速、航态感知、风险控制、智能能效管理、智能机舱等，将有效通过江海直达运输模式提升长江干线货运周转效率。\r\n\r\n武汉创新江海运输有限公司董事长袁厚安被誉为我国“大吨位江海直达第一人”，他深耕江海直达运输事业三十二载，他在点火开工仪式上介绍：该船型是基于优化长江船型运力结构，化解三峡船闸拥堵，避免建设三峡船闸第二通道而研发的，船舶从舟山特定海域航行过三峡至重庆，首开沿海直达我国西南地区的水路运输通道，创造了江海直达航线的纵深和吨位世界之最，还减少了货物中转和货物资金占用成本，可促进大西南和沿海地区经济的深度融合发展，其具有良好的市场前景、经济效益和社会效益。该船型首批计划建造30艘，今天开工2艘拉开了建造序幕，下一步将会有更多的船舶动工兴建。\r\n\r\n武穴市开阳星造船有限责任公司总经理王水泉介绍，三峡低碳节能型LNG双燃料江海直达船点火开工，对开阳星支持未来退城进园，打造智能船舶制造产业进一步夯实了基础。该船设计采用较多的国内领先技术，开阳星造船一定能高质量、低成本、保周期完成该船的建造工作，预计该船可在2023年2月底建成投产。\r\n\r\n中国船级社武汉分社副总经理唐建在开工仪式上致辞：该船型采用CCS审图和检验，为建造船舶“高标准、优质量”打下了坚实的基础，在长江水运市场上将会有较强的市场竞争力，我们安排精兵强将全力以赴审图和检验，保质保量地为企业服好务。",

                  "isCollection":0
              },
              {
                  "copyright":"免责声明：Mysteel发布的原创及转载内容，仅供客户参考，不作为决策建议。原创内容版权归Mysteel所有，转载需取得Mysteel书面授权，且Mysteel保留对任何侵权行为和有悖原创内容原意的引用行为进行追究的权利。转载内容来源于网络，目的在于传递更多信息，方便学习与交流，并不代表Mysteel赞同其观点及对其真实性、完整性负责。申请授权及投诉，请联系Mysteel（021-26093397）处理。",
                  "articleTime":1647999720000,
                  "authorMonitor":"资讯编辑：刘佳惠 021-26093916\r\n资讯监督：乐卫扬 021-26093827\r\n资讯投诉：陈杰 021-26093100\r\n",
                  "articleId":31775135,
                  "source":"新华财经",
                  "title":"服务业扩大开放综合试点扩容加速",
                  "class":"com.mysteel.article.domain.model.ArticleInfo",
                  "url":"/22/0323/09/8EBF01891DFC3657.html",
                  "content":"“增设服务业扩大开放综合试点”是今年政府工作报告提出的任务之一。中国证券报记者日前获悉，相关部门正加快推进增设服务业扩大开放综合试点相关工作。\r\n\r\n专家表示，服务业扩大开放综合试点是推动服务业开放发展的重要载体。加快增设新的试点，有利于进一步优化试点布局，让制度创新更好服务于服务业扩大开放，促进我国服务业高质量发展。\r\n\r\n扩容步伐加快\r\n\r\n试点效应叠加市场空间，坚定了服务业扩大开放综合试点扩容的步伐。\r\n\r\n从试点效应看，开展试点扩容，可以加强与之前试点地区的开放协同，形成多点位、错位化的发展布局，形成综合效应。\r\n\r\n从市场空间看，我国服务业开放发展有差距，也是潜力。一方面，目前我国存在与制造业融合发展不够、现代服务业发展动能不足等问题，服务业增加值约占GDP的55%，比发达国家低20个百分点左右，有较大提升空间。另一方面，我国消费形态正在由实物消费为主加快向服务消费为主转变。伴随服务型消费较快增长，我国服务型、创新型、绿色型与开放型经济形态将逐步形成，由此带来相当大的市场空间。\r\n\r\n“综合考虑，我国服务业扩大开放综合试点进一步扩容时机逐步成熟。”商务部研究院服务贸易研究所所长李俊在接受中国证券报记者采访时表示。\r\n\r\n从之前试点城市看，服务业扩大开放综合试点主要选择在直辖市和海南自贸港。对于下一步试点扩容方向，李俊认为，服务业扩大开放综合试点城市需要有一定的发展基础和开放经验，未来试点范围将在考量开放的协同性和区域的协调性基础上进行选择。\r\n\r\n优化试点布局\r\n\r\n服务业扩大开放综合试点扩容有利于优化试点布局，积累更多试点经验。\r\n\r\n从近年来试点进展看，“1+N”的试点格局初步形成，试点布局持续优化。2015年5月，服务业扩大开放综合试点在北京率先实施。2021年4月试点首次扩围，将天津、上海、海南、重庆4省市纳入，形成“1+4”格局。\r\n\r\n试点布局的优化彰显了服务业扩大开放综合试点作为高水平开放平台对稳外资的重要作用。商务部数据显示，2021年，我国服务业实际使用外资9064.9亿元，同比增长16.7%，占全国实际使用外资的比重为78.9%。其中，服务业扩大开放试点示范地区服务业引资占全国的33.4%。今年1月至2月服务业实际使用外资1757亿元，同比增长24%，占比超过70%，其中，高技术服务业增长74.9%。\r\n\r\n“与现有的其他开放平台相比，服务业扩大开放综合试点增强了服务业吸收外资的能力，对稳外资做出重要贡献。”商务部研究院国际市场研究所副所长白明在接受中国证券报记者采访时说，未来服务业扩大开放综合试点应继续采取边评估边推进的方式，在先行先试和差异化探索基础上，积累更多试点经验，为全国服务业开放发展提供示范，促进我国服务业高质量发展。\r\n\r\n推动重点领域突破\r\n\r\n“增设服务业扩大开放综合试点，能够让制度创新更好服务于服务业扩大开放。”上海金融与发展实验室副主任张湧说。\r\n\r\n在服务业扩大开放已成为我国新一轮对外开放的重中之重背景下，推动服务业重点领域开放是重点。中国服务外包研究中心副研究员郑伟认为，推动服务业重点领域开放应继续压缩现有全国版和自贸试验区版外商投资准入负面清单特别管理措施条目，特别是在金融、电信等敏感领域，在风险可控和保证国家经济安全前提下，不断降低服务业外资市场准入门槛，吸引更多高质量国际服务业企业来华投资。\r\n\r\n改革和开放相辅相成，以改革促开放是服务业扩大开放的必由之选。“我国服务业扩大开放还需重点推进四方面改革。”国务院发展研究中心原副主任张军扩认为，一是进一步放宽服务领域市场准入。二是加强营商环境体制机制改革，落实准入后国民待遇，促进内外资企业公平竞争。三是深化与数字贸易相关的体制机制改革。四是加强与负面清单管理模式相衔接的事中事后监管能力建设。平衡好服务业高水平开放、服务贸易便利化与高效监管的关系，推进法治化市场监管体系建设等。",

                  "isCollection":0
              }
          ]
      }
    ],
    transformedData: '',
    dataTransform: {
      type: 'none',
      numberType: 'int',
      effective: 1,
      dateFormatter: 'YYYY-MM-DD HH:mm:ss'
    },
    columnNum:'1',
    fontFamily: '微软雅黑',
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
      fontWeight: 'bold',
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
