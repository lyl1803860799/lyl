<template>
  <div id="view-scroll-content" class="scroll-content" v-loading="fullScreenLoading">
    <div class="swiper previewSwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="data in previewConfigList"
          :key="data.id"
          :data-swiper-autoplay="data.time"
        >
          <div class="scale-box" :style="data.contentStyle">
            <template v-for="(element, i) in data.list1">
              <div
                  class="component-wrapper"
                   v-if="element.componentName !== 'page404'"
                  :key="`${element.option.domId}_${i}`"
                  :style="element.wrapperStyle"
                >
                  <component
                    :is="element.componentName"
                    :ref="element.option.domId"
                    :options="element.option"
                  ></component>
                </div>
                <div
                   v-else
                  :key="`${element.componentName}_${i}`"
                >
                  <component
                    :is="element.componentName"
                  ></component>
                </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="close-area" :style="exitStyle" @mouseenter="enter()" @mouseleave="leave()">
      <div class="close-container" data-title="退出全屏" @click="exitScreen"></div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getDataForApi, getDataBySql, getDataByView } from "@/api/dataSource";
import Swiper from "@/utils/swiper-bundle.min.js";
import "@/utils/swiper-bundle.min.css";
import { TYPE_SETS } from "@/constants/index";
import SET_DATA from "@/utils/newSetData";
import { channelDetail } from "@/api/channel";
import page404 from '@/views/404';

export default {
  name: "ShowIndex",
  components: {
    page404
  },
  data() {
    return {
      pageId: null,
      contentStyle: "",
      list1: [],
      fullScreenLoading: false,
      showScreenPreview: true,
      exitStyle: "opacity:0;",
      pageOption: null,
      resizeTimer: null,
      intervalObj: {},
      // 轮询数据
      waitToInterval: {},
      // websocket list
      websocketList: [],
      previewConfigList: [],
      mySwiper: null,
      token: ""
    };
  },
  computed: {
    activePath() {
      return this.$route.path;
    },
    isComponent() {
      return this.activePath.includes("component");
    }
  },
  watch: {
    "$route.path": {
      immediate: true,
      handler() {
        this.pageId = this.$route?.params?.id;
        this.token = decodeURIComponent(
          this.getQueryString(window.location.href, "id")
        );
        if(this.token){
          Cookies.set("unify_user", this.token);
        }
        this.$nextTick(() => {
          this.getPageInfo();
        });
      }
    }
  },
  methods: {
    getQueryString(url, name) {
      url = url + "";
      var regstr = "/(\\?|\\&)" + name + "=([^\\&]+)/";
      var reg = eval(regstr);
      //eval可以将 regstr字符串转换为 正则表达式
      var result = url.match(reg);
      if (result && result[2]) {
        return result[2];
      }
      return null;
    },
    enter() {
      this.exitStyle = "opacity:1;";
    },
    leave() {
      this.exitStyle = "opacity:0;";
    },
    setBgStyle(styleObj) {
      let contentStyle = "";
      if (styleObj.bgType === "1") {
        contentStyle += `background-image: url(${styleObj.bgImg});`;
      } else {
        contentStyle += `background-color: ${styleObj.bgColor};`;
      }

      if (styleObj.resizeType) {
        const size =
          +styleObj.resizeType === 1
            ? "100% auto"
            : +styleObj.resizeType === 2
            ? "auto 100%"
            : "100% 100%";
        contentStyle += `background-size: ${size};`;
      }

      if (styleObj.screenSize) {
        const { width, height } = styleObj.screenSize;
        contentStyle += `width: ${width}px; height: ${height}px;`;
      }
      // let res = window.getMonitorInfo();
      // let response = JSON.parse(res);
      // let w = window.screen.innerWidth,
      //   h = window.screen.innerHeight;

      // if (response.success) {
      //   let resDatas = response.data;
      //   resDatas.map(item => {
      //     if (item.identifyID === this.identifyID) {
      //       w = item.dmPelsWidth;
      //       h = item.dmPerlsHeight;
      //     }
      //   });
      // }
      if (!this.isComponent) {
        const { width, height } = styleObj.screenSize;
        let scale = {};
        if (!document.fullscreenElement) {
          const { innerWidth, innerHeight } = window;
          scale = { y: innerHeight / height, x: innerWidth / width };
        } else {
          const { width: innerWidth, height: innerHeight } = window.screen;
          scale = { y: innerHeight / height, x: innerWidth / width };
        }
        contentStyle += "position: absolute; left: 50%; top: 50%;";
        contentStyle += `transform: scale(${scale.x}, ${
          scale.y
        }); margin-left: -${width / 2}px; margin-top: -${height / 2}px;`;
      }
      return contentStyle;
    },
    setWrapperStyle(styleObj) {
      let style = "";
      if (this.activePath.includes("component")) {
        if (styleObj.posx) {
          style += `left: 50px;`;
        }

        if (styleObj.posy) {
          style += `top: 50px;`;
        }

        if (styleObj.z) {
          style += `z-index: ${styleObj.z};`;
        }

        if (styleObj.width) {
          style += `width: ${styleObj.width}px;`;
        }

        if (styleObj.height) {
          style += `height: ${styleObj.height}px;`;
        }
      } else {
        if (styleObj.posx) {
          style += `left: ${styleObj.posx}px;`;
        }

        if (styleObj.posy) {
          style += `top: ${styleObj.posy}px;`;
        }

        if (styleObj.z) {
          style += `z-index: ${styleObj.z};`;
        }

        if (styleObj.width) {
          style += `width: ${styleObj.width}px;`;
        }

        if (styleObj.height) {
          style += `height:  ${styleObj.height}px;`;
        }
      }

      return style;
    },
    async getPageInfo() {
      if (!this.pageId) return;
      const el = document.getElementById("view-scroll-content");
      // let ratio = window.devicePixelRatio;
      // if (ratio > 1) {
      //   let prcent = 1 / ratio;
      //   el.style.transform = "scale(" + prcent + ")";
      // }
      const rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;

      if (rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        const wscript = new window.ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
      let previewConfigList = [];
      this.waitToInterval = {};
      this.websocketList = [];
      let response = null;
      this.fullScreenLoading = true;
      try {
        response = await channelDetail({
          channelId: this.pageId
        });
        const { data } = response;
        if (!data) {
          this.$router.push({ path: "/404" });
          return;
        }
        let channelDataList = data.channelPrograms;
        channelDataList.map(res => {
          let time = 0;
          let programRule = this.jsonException(res.programRule || [])[0] || {};
          const pageOption = this.jsonException(res.programConfig || [])[0] || null;
          let assemblyList = (
            this.jsonException(res.programTemplateMaterialConfig || []) || []
          ).map(item => {
            const { component } = item.option;
            if (this.isComponent) {
              component.width = window.innerWidth - 100;
              component.height = window.innerHeight - 100;
            }
            return {
              ...item,
              wrapperStyle: this.setWrapperStyle(component)
            };
          });
           let contentStyle = pageOption?this.setBgStyle(pageOption):'width:100%;height:100%;';
          let playTime = Number(programRule.playTime);
          if (programRule.playTimeType === "hour") {
            time = playTime * 60 * 60 * 1000;
          } else if (programRule.playTimeType === "minute") {
            time = playTime * 60 * 1000;
          } else {
            time = playTime * 1000;
          }
          if(res.programTemplateMaterialConfig === null){
            assemblyList = [{
              componentName: "page404",
              id: "page-404-style"
            }]
          }
          previewConfigList.push({
            id: programRule.uuid,
            playTime: programRule.playTime,
            playTimeType: programRule.playTimeType,
            playAnimation: programRule.playAnimation,
            useRange: programRule.useRange,
            contentStyle: contentStyle,
            list1: assemblyList,
            time: time
          });
        });
        this.pageOption = JSON.parse(data.channelRule);
        this.previewConfigList = previewConfigList;
        let playType = JSON.parse(data.channelRule).playType;
        let playAnimation = JSON.parse(data.channelRule).playAnimation;
        if (this.mySwiper) {
          this.mySwiper.destroy(true);
        }
        this.$nextTick(() => {
          if (playAnimation === "0") {
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              effect: "fade",
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          } else if (playAnimation === "1" || playAnimation === "2") {
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          } else if (playAnimation === "3") {
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              effect: "creative",
              creativeEffect: {
                prev: {
                  shadow: true,
                  translate: [0, 0, 0]
                },
                next: {
                  translate: [0, "100%", 0]
                }
              },
              watchSlidesProgress: true,
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          } else if (playAnimation === "4") {
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              effect: "creative",
              creativeEffect: {
                prev: {
                  shadow: true,
                  translate: [0, 0, 0]
                },
                next: {
                  translate: [0, "-100%", 0]
                }
              },
              watchSlidesProgress: true,
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          } else {
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              effect: "fade",
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          }
          this.fullScreenLoading = false;
        });
      } catch {
        this.fullScreenLoading = false;
      }
    },
    jsonException(json) {
      try {
        let res = JSON.parse(json);
        return res instanceof Array ? res : [res];
      } catch {
        return [];
      }
    },
    handleResize() {
      console.log("resize");
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
        console.log("resize");
        // 处理取消全屏后需要恢复原始scale
        if (this.pageOption) {
          this.setBgStyle(this.pageOption);
        }
      }, 300);
    },
    // 获取数据
    //查看数据源响应结果
    checkData(interval, dataConfigList) {
      dataConfigList.forEach(async data => {
        let { dataConfig, index } = data;
        let { dataSource, dataMap } = dataConfig;
        let res, params;
        if (dataSource.dataSourceCheckId == 2) {
          let obj = {};
          dataSource.headers.forEach(item => {
            if (item.keyName) {
              obj[item.keyName] = item.valName;
            }
          });
          if (dataSource.method == "post") {
            params = {
              apiUrl: dataSource.apiUrl,
              method: dataSource.method,
              body: dataSource.body,
              headers: obj
            };
          } else {
            params = {
              apiUrl: dataSource.apiUrl,
              method: dataSource.method,
              headers: obj
            };
          }

          res = await getDataForApi(params);
        } else if (dataSource.dataSourceCheckId == 0) {
          if (+dataSource.sourceMode === 1) {
            if (
              dataSource.dataSourceId &&
              dataSource.dataTableName &&
              Object.values(dataSource.columns).filter(item => item).length > 0
            ) {
              res = await getDataByView({
                dataSourceId: dataSource.dataSourceId,
                dataTableName: dataSource.dataTableName,
                columns: Object.values(dataSource.columns).filter(item => item),
                queryStr: dataSource.queryStr,
                orderBy: dataSource.sort?.orderBy,
                orderColumns: dataSource.sort?.orderColumns
              });
            }
          } else {
            if (dataSource.dataSourceId && dataSource.editorContent) {
              res = await getDataBySql({
                dataSourceId: dataSource.dataSourceId,
                sql: dataSource.editorContent
              });
            }
          }
        }

        const dataContent = res.data;

        if (dataContent && dataContent.length > 0) {
          const formattedData = this.transformData(dataMap, dataContent);
          this.setOptionData(index, formattedData);
        }
      });
      this.startInterval(interval);
    },

    // 更新websocket数据响应结果
    updateWsRecord(data, index) {
      const curWs = this.websocketList.find(ws => ws.index === index);
      const { dataConfig } = curWs;
      let { dataSource, dataMap } = dataConfig;
      dataSource.data = dataSource.data
        .concat(JSON.parse(data))
        .slice(-(dataSource.wsMaxLength || 1000));
      if (dataSource.data && dataSource.data.length > 0) {
        const formattedData = this.transformData(dataMap, dataSource.data);
        this.setOptionData(index, formattedData);
      }
    },

    transformData(dataMap, data) {
      const updateData = (data || []).map(item => {
        const result = Object.entries(dataMap)
          .map(keys => {
            return { [keys[0]]: item[keys[1] || keys[0]] };
          })
          .reduce((prev, next) => {
            return Object.assign({}, prev, next);
          }, {});
        return result;
      });

      return updateData;
    },

    setOptionData(index, newData) {
      let curEl = this.deepClone(this.list1[index]);
      let defaultOption = {
        ...curEl.option,
        dataConfig: {
          ...curEl.option.dataConfig,
          data: newData
        }
      };
      defaultOption = SET_DATA[curEl.componentName].call(
        this,
        defaultOption,
        TYPE_SETS[curEl.id.replace(/\d/g, "")] || null,
        curEl.id.replace(/\d/g, "") || null
      );
      this.$set(this.list1, index, {
        ...curEl,
        option: { ...defaultOption },
        width: +defaultOption.component.width,
        height: +defaultOption.component.height,
        posx: +defaultOption.component.posx,
        posy: +defaultOption.component.posy,
        z: +defaultOption.component.z,
        active: defaultOption.component.active
      });
      this.$refs[curEl.option.domId] &&
        this.$refs[curEl.option.domId][0] &&
        this.$refs[curEl.option.domId][0].refresh();
    },

    // 开启定时器
    startInterval(interval) {
      if (this.intervalObj[interval]) {
        clearInterval(this.intervalObj[interval]);
      }
      this.intervalObj[interval] = setTimeout(() => {
        this.checkData(interval, this.waitToInterval[interval]);
      }, interval * 1000);
    },
    // 关闭定时器
    pauseInterval() {
      Object.values(this.intervalObj).forEach(item => {
        if (item) {
          clearTimeout(item);
        }
      });
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    // 销毁websocket
    destoryWS() {
      this.websocketList.forEach(wsItem => {
        wsItem.lockReconnect = true;
        wsItem.websocket.close();
      });
    },
    exitScreen() {
      const el = document;
      const cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;

      if (cfs) {
        cfs.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        const wscript = new window.ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
      window.winClose();
      this.showScreenPreview = false;
    }
  },
  mounted() {
    //let _this = this;
    if (!this.isComponent) {
      window.addEventListener("resize", this.handleResize);
    }
    // document.body.addEventListener('mouseover',function(e){
    //   let w = window.screen.width;
    //   //let h = window.screen.height;
    //   let x =e.pageX || e.clientX;
    //   let y =e.pageY || e.clientY;
    //   if(x+80>w && y<80){
    //     _this.exitStyle = "opacity:1;visibility:visible;"
    //   }else{
    //     _this.exitStyle = "opacity:0;visibility:hidden;"
    //   }
    // });
  },
  beforeDestroy() {
    this.pauseInterval();
    this.destoryWS();
  }
};
</script>

<style lang="scss" scoped>
.scroll-content {
  width: 100%;
  height: 100%;
}

.swiper,
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  font-size: 18px;
  //background: #fff;
  height: 100%;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  opacity: 0!important;
}
.swiper-slide-active{
  opacity: 1!important;
}
.component-wrapper {
  position: absolute;
}
.close-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 9999;
  .close-container {
    height: 20px;
    width: 20px;
    background-image: url(~@/assets/icon/exit.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    position: absolute;
    right: 20px;
    top: 20px;
    border-radius: 50%;
    z-index: 9999;
    cursor: pointer;

    &:hover {
      background-image: url(~@/assets/icon/exit-a.png);

      &:after {
        position: absolute;
        right: -10px;
        bottom: -40px;
        content: attr(data-title);
        color: #00fcff;
        border: 1px solid #00fcff;
        padding: 6px 11px;
        min-height: 16px;
        line-height: 16px;
        white-space: nowrap;
        word-break: keep-all;
      }
    }
  }
}
</style>
