<template>
  <div class="map-container" v-loading="loading">
    <div id="wordMap"></div>
  </div>
</template>

<script>
import { queryIndexInfo } from "@/api/template";
import * as Echarts from "echarts";
//import pointIcon from "@/assets/images/point.png";
import { mapFontBg, pointerIcon } from "@/constants/pic";
import lineTopIcon from "@/assets/images/line_top.png";
import lineBottomIcon from "@/assets/images/line_bottom.png";
import lineLeftIcon from "@/assets/images/line_left.png";
import lineRightIcon from "@/assets/images/line_right.png";
import upIcon from "@/assets/images/up.svg";
import downIcon from "@/assets/images/down.svg";

export default {
  name: "IndexMap",
  data() {
    return {
      //pointIcon,
      lineTopIcon,
      lineBottomIcon,
      lineLeftIcon,
      lineRightIcon,
      upIcon,
      downIcon,
      loading: false,
      mapStyle: "",
      geoCoordMap: null,
      myChart: null,
      indexDatas: [
        {
          name: "英国富时100",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "德国dax30",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "深证综指",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "上证综合指数",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "恒生指数",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "日经225指数",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "道琼斯指数",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "纳斯达克",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "韩国综合指数",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "标准普尔500指数",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "巴西BOVESPA",
          value: null,
          changeData: null,
          chg: null
        },
        {
          name: "法国CAC40指数",
          value: null,
          changeData: null,
          chg: null
        }
      ],
      dataInterval:null
    };
  },
  created() {
    console.log('------------地图页面--------------')
    this.loading = true;
  },
  mounted() {
    let _this = this;
    Echarts.registerMap(
      "world",
      require(`@/constants/geoJson/mapJson/world.json`)
    );

    this.$nextTick(() => {
      let myChart = Echarts.init(document.getElementById("wordMap"));
      this.myChart = myChart;
      this.getMapData();
    });
    this.dataInterval = setInterval(() => {
        _this.getMapData();
    }, 30 * 60 * 1000);
    window.addEventListener("resize", function() {
      if (_this.myChart) {
        _this.myChart.resize();
      }
    });
  },
  methods: {
    getMapData() {
      let list = [
        "GM0000000325",
        "GM00041024",
        "GM00041022",
        "GM0000000323",
        "GM00041089",
        "GM00041094",
        "CM0000818885",
        "CM0000818886",
        "CM0000822077",
        "CM0000822078",
        "CM0000822079",
        "GM0000000317",
        "GM0000000321",
        "GM0000000318",
        "GM00040966",
        "GM00040962",
        "GM0000000319",
        "GM00040965",
        "GM00040967",
        "GM0000000322",
        "GM0000000320",
        "GM00040971",
        "GM00040976",
        "GM00040984",
        "GM00040975",
        "GM00040983",
        "GM0000000324",
        "GM00041072",
        "GM00041068"
      ];
      queryIndexInfo(list)
        .then(res => {
          let indexDatas = this.deepClone(this.indexDatas);
          if (res.success) {
            let resDatas = res.data;
            if (resDatas && resDatas.length > 0) {
              resDatas.map(item => {
                if (item.indexCode === "GM0000000325") {
                  //英国富时100
                  indexDatas[0].value = item.dataValue;
                }else if (item.indexCode === "GM00041024") {
                  //英国富时100
                  indexDatas[0].changeData = item.dataValue;
                }else if (item.indexCode === "GM00041022") {
                  //英国富时100
                  indexDatas[0].chg = item.dataValue;
                } else if (item.indexCode === "GM0000000323") {
                  //德国dax30
                  indexDatas[1].value = item.dataValue;
                } else if (item.indexCode === "GM00041089") {
                  //德国dax30
                  indexDatas[1].changeData = item.dataValue;
                } else if (item.indexCode === "GM00041094") {
                  //德国dax30
                  indexDatas[1].chg = item.dataValue;
                } else if (item.indexCode === "CM0000818885") {
                  //深证综指
                  indexDatas[2].value = item.dataValue;
                } else if (item.indexCode === "CM0000818886") {
                  //深证综指
                  indexDatas[2].chg = item.dataValue;
                } else if (item.indexCode === "CM0000822077") {
                  //上证综合指数
                  indexDatas[3].value = item.dataValue;
                } else if (item.indexCode === "CM0000822078") {
                  //上证综合指数
                  indexDatas[3].changeData = item.dataValue;
                } else if (item.indexCode === "CM0000822079") {
                  //上证综合指数
                  indexDatas[3].chg = item.dataValue;
                } else if (item.indexCode === "GM0000000317") {
                  //恒生指数
                  indexDatas[4].value = item.dataValue;
                } else if (item.indexCode === "GM0000000321") {
                  //日经225指数
                  indexDatas[5].value = item.dataValue;
                } else if (item.indexCode === "GM0000000318") {
                  //道琼斯指数
                  indexDatas[6].value = item.dataValue;
                } else if (item.indexCode === "GM00040966") {
                  //道琼斯指数
                  indexDatas[6].changeData = item.dataValue;
                } else if (item.indexCode === "GM00040962") {
                  //道琼斯指数
                  indexDatas[6].chg = item.dataValue;
                } else if (item.indexCode === "GM0000000319") {
                  //纳斯达克
                  indexDatas[7].value = item.dataValue;
                } else if (item.indexCode === "GM00040965") {
                  //纳斯达克
                  indexDatas[7].changeData = item.dataValue;
                } else if (item.indexCode === "GM00040967") {
                  //纳斯达克
                  indexDatas[7].chg = item.dataValue;
                } else if (item.indexCode === "GM0000000322") {
                  //韩国综合指数
                  indexDatas[8].value = item.dataValue;
                } else if (item.indexCode === "GM0000000320") {
                  //标准普尔500指数
                  indexDatas[9].value = item.dataValue;
                } else if (item.indexCode === "GM00040971") {
                  //标准普尔500指数
                  indexDatas[9].changeData = item.dataValue;
                } else if (item.indexCode === "GM00040976") {
                  //标准普尔500指数
                  indexDatas[9].chg = item.dataValue;
                } else if (item.indexCode === "GM00040984") {
                  //巴西BOVESPA
                  indexDatas[10].value = item.dataValue;
                } else if (item.indexCode === "GM00040975") {
                  //巴西BOVESPA
                  indexDatas[10].changeData = item.dataValue;
                } else if (item.indexCode === "GM00040983") {
                  //巴西BOVESPA
                  indexDatas[10].chg = item.dataValue;
                } else if (item.indexCode === "GM0000000324") {
                  //法国CAC40指数
                  indexDatas[11].value = item.dataValue;
                } else if (item.indexCode === "GM00041072") {
                  //法国CAC40指数
                  indexDatas[11].changeData = item.dataValue;
                } else if (item.indexCode === "GM00041068") {
                  //法国CAC40指数
                  indexDatas[11].chg = item.dataValue;
                }
              });
            }
            this.getOption(indexDatas);
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    convertData(data) {
      var res = [];
      var gdGeoCoordMap = {
        英国富时100: [-0.164553, 51.52654],
        德国dax30: [8.569964, 50.135948],
        深证综指: [114.060499, 22.547255],
        上证综合指数: [121.542274, 31.219717],
        恒生指数: [114.169327, 22.285707],
        日经225指数: [139.778743, 35.682643],
        道琼斯指数: [-73.875175, 40.851113],
        纳斯达克: [-73.868851, 40.851113],
        韩国综合指数: [126.965998, 37.5214],
        标准普尔500指数: [-73.868851, 40.851113],
        巴西BOVESPA: [-47.884956, -15.782605],
        法国CAC40指数: [2.327501, 48.878046]
      };
      for (var i = 0; i < data.length; i++) {
        var geoCoord = gdGeoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
            changeData: data[i].changeData,
            chg: data[i].chg
          });
        }
      }
      return res;
    },
    getOption(mapData) {
      let seriesDatas = [
        {
          tooltip: {
            show: false
          },
          type: "effectScatter",
          coordinateSystem: "geo",
          // rippleEffect: {
          //   scale: 10,
          //   brushType: "stroke"
          // },
          // showEffectOn: "render",
          itemStyle: {
            normal: {
              color: ""
            }
          },
          label: {
            normal: {
              color: "#fff"
            }
          },
          symbol: pointerIcon,
          symbolSize: 10,
          data: this.convertData(mapData),
          zlevel: 1
        }
      ];
      mapData.map((item, index) => {
        let symbolSize = null,
          symbolOffset = null,
          symbolRotate = 0,
          symbolSize2 = null,
          symbolOffset2 = null;
        if (item.name === "英国富时100") {
          symbolSize = [2, 40];
          symbolOffset = [0, -20];
          symbolSize2 = [280, 86];
          symbolOffset2 = [60, -83];
        } else if (item.name === "德国dax30") {
          symbolSize = [2, 40];
          symbolOffset = [30, 0];
          symbolRotate = 90;
          symbolSize2 = [280, 86];
          symbolOffset2 = [189, 0];
        } else if (item.name === "深证综指") {
          symbolSize = [2, 40];
          symbolOffset = [0, 30];
          symbolRotate = 180;
          symbolSize2 = [280, 86];
          symbolOffset2 = [0, 92];
        } else if (item.name === "上证综合指数") {
          symbolSize = [2, 40];
          symbolOffset = [-30, 0];
          symbolRotate = -90;
          symbolSize2 = [280, 86];
          symbolOffset2 = [-190, 30];
        } else if (item.name === "恒生指数") {
          symbolSize = [2, 40];
          symbolOffset = [30, 0];
          symbolRotate = -90;
          symbolSize2 = [280, 86];
          symbolOffset2 = [190, 0];
        } else if (item.name === "日经225指数") {
          symbolSize = [2, 40];
          symbolOffset = [30, 0];
          symbolRotate = -90;
          symbolSize2 = [280, 86];
          symbolOffset2 = [190, -30];
        } else if (item.name === "道琼斯指数") {
          symbolSize = [2, 40];
          symbolOffset = [-30, 0];
          symbolRotate = -90;
          symbolSize2 = [280, 86];
          symbolOffset2 = [-190, 0];
        } else if (item.name === "纳斯达克") {
          symbolSize = [2, 40];
          symbolOffset = [0, 30];
          symbolRotate = 180;
          symbolSize2 = [280, 86];
          symbolOffset2 = [0, 92];
        } else if (item.name === "韩国综合指数") {
          symbolSize = [2, 130];
          symbolOffset = [0, -70];
          symbolRotate = 180;
          symbolSize2 = [280, 86];
          symbolOffset2 = [-50, -175];
        } else if (item.name === "标准普尔500指数") {
          symbolSize = [2, 40];
          symbolOffset = [0, -30];
          symbolRotate = 180;
          symbolSize2 = [280, 86];
          symbolOffset2 = [0, -92];
        } else if (item.name === "巴西BOVESPA") {
          symbolSize = [2, 40];
          symbolOffset = [0, 30];
          symbolSize2 = [280, 86];
          symbolOffset2 = [0, 92];
        } else if (item.name === "法国CAC40指数") {
          symbolSize = [2, 40];
          symbolOffset = [0, 30];
          symbolSize2 = [280, 86];
          symbolOffset2 = [0, 92];
        }
        let showPic = null;
        let colorStr = '#fff';
        if(item.chg === null || item.chg === ''){
          showPic = null;
          colorStr = '#fff';
        }else{
          if(item.chg >0){
            showPic = this.upIcon;
            colorStr = '#C05A5A';
          }else if(item.chg <0){
            showPic = this.downIcon;
            colorStr = '#27B65A';
          }
        }
        seriesDatas.push(
          {
            type: "scatter",
            coordinateSystem: "geo",
            itemStyle: {
              color: "#00FFF6"
            },
            symbolRotate: symbolRotate,
            symbol: this.lineTopIcon,
            symbolSize: symbolSize,
            symbolOffset: symbolOffset,
            data: [this.convertData(mapData)[index]],
            z: 999
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            label: {
              width: "100%",
              height: "100%",
              verticalAlign: "top",
              normal: {
                show: true,
                formatter: function(params) {
                  //console.log(params);
                  var name = params.name;
                  var value = params.value[2];
                  var changeData = params.data.changeData;
                  if (changeData === null || changeData === "") {
                    changeData = "-";
                  }
                  var chg = params.data.chg;
                  if (chg === null || chg === "") {
                    chg = "-";
                  } else {
                    chg = Number(chg).toFixed(2)+"%";
                  }
                  var text = `{name|${name}}\n{kong|}{showPic|}{value|${value}}{changeData|${changeData}}{chg|${chg}}`;
                  return text;
                },
                color: "#fff",
                rich: {
                  name: {
                    width: 280,
                    fontSize: 18,
                    fontWeight: "bold",
                    padding: [8, 0, 0, 14],
                    color: "#fff"
                  },
                  kong: {
                    width: 14,
                    height: 30
                  },
                  showPic: {
                    width: showPic?20:0,
                    height: showPic?16:0,
                    align: "left",
                    verticalAlign: "center",
                    backgroundColor: {
                      image:showPic
                    }
                  },
                  value: {
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: "bold",
                    padding: showPic?[14, 0, 0, 14]:[14, 0, 0, 0]
                  },
                  changeData: {
                    width:40,
                    fontSize: 16,
                    fontWeight: "bold",
                    padding: [-10, 0, 0, 19],
                    color:colorStr
                  },
                  chg: {
                    width:40,
                    fontSize: 16,
                    fontWeight: "bold",
                    padding: [0, 0, -30, -40],
                    color:colorStr
                  }
                }
              }
            },
            itemStyle: {
              color: "",
              opacity: 1
            },
            symbol: mapFontBg,
            symbolSize: symbolSize2,
            symbolOffset: symbolOffset2,
            z: 999,
            data: [this.convertData(mapData)[index]]
          }
        );
      });
      let option = {
        background: "",
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        tooltip: {
          trigger: "none"
        },
        geo: {
          map: "world",
          zoom: 0.95,
          roam: false,
          left:100,
          //labelLayout: ["50%", "50%"],
          itemStyle: {
            normal: {
              borderColor: "#0CA1FF",
              borderWidth: 0,
              areaColor: "#0CA1FF"
            }
          }
        },
        series: seriesDatas
      };
      this.myChart.setOption(option);
      this.loading = false;
    },
    jsonException(json) {
      try {
        let res = JSON.parse(json);
        return res instanceof Array ? res : [res];
      } catch {
        return [];
      }
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  },
  beforeDestroy() {
    window.clearInterval(this.dataInterval);
  }
};
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  background-position: center;
  background-image: url('../../assets/images/map_bg.png');
  background-size:100% ;
  background-repeat: no-repeat;
}
#wordMap {
  width: 100%;
  height: 100vh;
}
</style>
