<template>
  <div class="scroll-content" v-loading="fullScreenLoading">
    <div class="scale-box" :style="contentStyle">
      <template v-for="(element, i) in list1">
        <div
          class="component-wrapper"
          :key="`${element.option.domId}_${i}`"
          :style="element.wrapperStyle"
        >
          <component
            :is="element.componentName"
            :ref="element.option.domId"
            :options="element.option"
          ></component>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getDataForApi, getDataBySql, getDataByView } from "@/api/dataSource";
import { WebSocketService } from "@/utils/websocketService";
import { TYPE_SETS } from "@/constants/index";
import SET_DATA from "@/utils/newSetData";
import { programDetail } from "@/api/program";

export default {
  name: "ProgramDetail",
  data() {
    return {
      pageId: null,
      sourceType: "all",
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
      mySwiper: null
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
        this.sourceType = this.$route?.query?.sourceType || "all";
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
      if (!styleObj) return;
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
      this.contentStyle = contentStyle;
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
      this.waitToInterval = {};
      this.websocketList = [];
      let response = null;
      this.fullScreenLoading = true;
      try {
        response = await programDetail({
          programId: this.pageId,
          sourceType: this.sourceType ? this.sourceType==='null'?'all':this.sourceType : "all"
        });
        this.fullScreenLoading = false;
        const { data } = response;
        console.log('展示节目详情接口返回',data)
        if (!data) {
          this.$router.push({ path: "/404" });
          return;
        }

        const assemblyList = (
          this.jsonException(data.programTemplateMaterialConfig) || []
        ).map((item, index) => {
          if (window.top.location.href.indexOf("/edit/") === -1) {
            console.log('edit----------------')
            if (item.componentName === "swipe") {
              let list = item.option.contentOption.list;
              if (list && list.length) {
                list.map(listItem => {
                  if (listItem.componentName === "webFrame") {
                    let src = listItem.option.contentOption.src;
                    if (src) {
                      if (
                        src.indexOf("/show.html#programDetail") > -1 ||
                        src.indexOf("/show.html#/programDetail") > -1
                      ) {
                        let index =
                          src.indexOf("show.html#programDetail") ||
                          src.indexOf("/show.html#/programDetail");
                        let str = src
                          .substr(index)
                          .replace("show.html#programDetail", "")
                          .replace("show.html#/programDetail", "");
                        let newUrl =
                          window.location.origin +
                          "/mtv_ui/#/programDetail" +
                          str;
                        listItem.option.contentOption.src= newUrl
                      }
                    }
                  }
                });
              }
            }
          }
          const { component, dataConfig } = item.option;
          if (this.isComponent) {
            component.width = window.innerWidth - 100;
            component.height = window.innerHeight - 100;
          }
          if (dataConfig) {
            const { interval, dataSourceCheckId, dataSourceDictId, wsUrl } =
              dataConfig.dataSource || {};
            if (
              interval &&
              (dataSourceCheckId == 2 ||
                (dataSourceCheckId == 0 && dataSourceDictId <= 2))
            ) {
              this.waitToInterval[interval] = this.waitToInterval[interval]
                ? [...this.waitToInterval[interval], { dataConfig, index }]
                : [{ dataConfig, index }];
            } else if (dataSourceCheckId === 3 && wsUrl) {
              const websocket = new WebSocketService(
                wsUrl,
                this.updateWsRecord,
                index
              );
              dataConfig.dataSource.data = [];

              this.websocketList.push({ websocket, dataConfig, index });
            }
          }
          return {
            ...item,
            wrapperStyle: this.setWrapperStyle(component)
          };
        });
        const pageOption = this.jsonException(data.programConfig)[0] || null;

        this.$set(this, "pageOption", pageOption);
        this.$set(this, "list1", assemblyList);
        console.log("list1", this.list1);
        pageOption && this.setBgStyle(pageOption);
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
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(() => {
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
