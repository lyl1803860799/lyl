let CHINA_MAP = require('@/constants/geoJson/mapJson/china.json')

let geoCoordMap = {};
/*获取地图数据*/
const mapFeatures = CHINA_MAP.features;
mapFeatures.forEach(function (v) {
  // 地区名称
  var name = v.properties.name;
  // 地区经纬度
  geoCoordMap[name] = v.properties.cp;
});

// 转换飞线数据
const convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var fromCoord = dataItem.address;
    if (fromCoord) {
      fromCoord[0] = Number(fromCoord[0]);
      fromCoord[1] = Number(fromCoord[1]);
      res.push({
        name: dataItem.city,
        value: fromCoord.concat([Number(dataItem.value)]),
        citytype:dataItem.citytype,
        province:dataItem.province,
        factory: dataItem.factory,
        raise: dataItem.raise
      })
    }
  }
  return res
}

const convertData2 = function(data){
  let list = [];
  for (var m = 0; m < data.length; m++) {
    if(data[m].province){
      list.push(data[m]);
    }
  }
  var res = [];
  for (var i = 0; i < list.length; i++) {
      var geoCoord = geoCoordMap[list[i].province];
      if (geoCoord) {
          res.push({
              name: list[i].province,
              value: geoCoord.concat(list[i].raise),
          });
      }
  }
  return res;
}

export const generateMapData = function (data) {
  let series = [];

  series.push({
    type: 'scatter',
    coordinateSystem: 'geo',
    label: {
      normal: {
        show: true,
        position: 'right', // 显示位置
        offset: [0, 0], // 偏移设置
        formatter: function (params) {
          //console.log(params)
          return params.data.name + " " + params.data.factory + "\n" + params.value[2] + "   " + params.data.raise;
        },
        fontSize: 12,
        color: '#fff'
      },
    },
    // labelLayout: {
    //   hideOverlap: true
    // },
    symbol: 'circle',
    symbolSize: 10,
    itemStyle: {
      show: false,
      realColor: '#fff',
      color: '#fff'
    },
    data: convertData(data)
  },{
    name: '散点',
    geoIndex: 0,
    type: 'map',
    data: convertData2(data),
    symbolSize: function (val) {
        return val[2] / 10;
    },
    label: {
        normal: {
            formatter: '{b}',
            position: 'right',
            show: true,
        },
        emphasis: {
            show: true,
        },
    },
    itemStyle: {
        normal: {
            color: '#05C3F9',
        },
    },
})
  // 支持自定义icon
  //series.push(CUSTOM_SERIES(data))
  return series
}

export const optionFactory = function (mapName, data) {
  let series = generateMapData(data);

  return {
    title:'',
    visualMap: {
      show:false,
      top: "middle",
      right: 10,
      itemWidth: 40, //图形的宽度，即长条的宽度。
      itemHeight: 30,
      itemGap: 0,
      seriesIndex: [1],
      pieces: [{
          gte: 50,
          label: ">50"
        },
        {
          gte: 10,
          lte: 50,
          label: "10~50"
        },
        {
          gte: 1,
          lte: 9,
          label: "1~-9"
        },
        {value: 0, label: '0', color: '#012269'},
        {
          gte: -9,
          lte: -1,
          label: "-9~-1"
        },
        {
          gte: -50,
          lte: -10,
          label: "-50~-10"
        },
        {
          lte: -50,
          label: "<-50"
        }
      ],
      inRange: {
        // 渐变颜色，从小到大
        color: [
          "#0E6B30",
          "#14824B",
          "#14A880",
          "#DE5B79",
          "#AD3250",
          "#972440"
        ]
      }
    },
    backgroundColor: '',
    geo: {
      map: mapName || 'guangdong',
      roam: true, // 是否允许缩放
      center:[100,36],
      label: {
        show: false,
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          color: '#012269',
          borderWidth: 1.1,
          borderColor: '#0090FF'
        },
        emphasis: {
          areaColor: '#012269'
        }
      }
    },
    series: series
  }
}

export const CITY_SELECTION_MAP = [{
    label: '中国',
    value: 'china'
  },
  {
    label: '北京',
    value: 'beijing'
  },
  {
    label: '天津',
    value: 'tianjin'
  },
  {
    label: '上海',
    value: 'shanghai'
  },
  {
    label: '重庆',
    value: 'chongqing'
  },
  {
    label: '安徽',
    value: 'anhui'
  },
  {
    label: '福建',
    value: 'fujian'
  },
  {
    label: '甘肃',
    value: 'gansu'
  },
  {
    label: '广东',
    value: 'guangdong'
  },
  {
    label: '广西',
    value: 'guangxi'
  },
  {
    label: '贵州',
    value: 'guizhou'
  },
  {
    label: '海南',
    value: 'hainan'
  },
  {
    label: '河北',
    value: 'hebei'
  },
  {
    label: '黑龙江',
    value: 'heilongjiang'
  },
  {
    label: '河南',
    value: 'henan'
  },
  {
    label: '湖北',
    value: 'hubei'
  },
  {
    label: '湖南',
    value: 'hunan'
  },
  {
    label: '江苏',
    value: 'jiangsu'
  },
  {
    label: '江西',
    value: 'jiangxi'
  },
  {
    label: '吉林',
    value: 'jilin'
  },
  {
    label: '辽宁',
    value: 'liaoning'
  },
  {
    label: '内蒙古',
    value: 'neimenggu'
  },
  {
    label: '宁夏',
    value: 'ningxia'
  },
  {
    label: '青海',
    value: 'qinghai'
  },
  {
    label: '山东',
    value: 'shandong'
  },
  {
    label: '山西',
    value: 'shanxi'
  },
  {
    label: '陕西',
    value: 'shanxi1'
  },
  {
    label: '四川',
    value: 'sichuan'
  },
  {
    label: '西藏',
    value: 'xizang'
  },
  {
    label: '新疆',
    value: 'xinjiang'
  },
  {
    label: '云南',
    value: 'yunnan'
  },
  {
    label: '浙江',
    value: 'zhejiang'
  },
  {
    label: '香港',
    value: 'xianggang'
  },
  {
    label: '澳门',
    value: 'aomen'
  },
  {
    label: '台湾',
    value: 'taiwan'
  }
]