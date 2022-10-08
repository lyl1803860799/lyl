<template>
  <div
    class="board-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="board-header"
      v-show="showTitle"
      :style="{
        fontFamily: options.title.style && options.title.style.fontFamily,
        fontSize: `${options.title.style && options.title.style.fontSize}px`,
        lineHeight: `${(options.title.style && options.title.style.fontSize * 2 + 'px') || 2}`,
        opacity: isSave ? 0 : 1
      }"
    >
      {{ options.title.name }}
    </div>-->
    <div class="board-wrapper">
      <mbi-scroll-board
        :style="{
          height: `${
            options.component.height
          }px`,
          width: `${options.component.width}px`
        }"
        :ref="options.domId"
        :config="config"
      />
    </div>
  </div>
</template>

<script>
import * as moment from "moment";
import { queryIndexData,queryRealTimeIndexData } from "@/api/template";
import MbiScrollBoard from "@/components/scrollBoard/main";
import upIcon from "@/assets/images/up.svg";
import downIcon from "@/assets/images/down.svg";

export default {
  name: "ScrollBoard",
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
        return false;
      }
    }
  },
  components: { MbiScrollBoard },
  data() {
    return {
      upIcon,
      downIcon,
      config: {},
      dataInterval: null
    };
  },
  mounted() {
    let indexCodeList = this.options.contentOption.indexCodeList;
    if (this.dataInterval) {
      window.clearInterval(this.dataInterval);
    }
    if (indexCodeList && indexCodeList.length) {
      let _this = this;
      _this.fetchIndexData(indexCodeList);
      _this.dataInterval = setInterval(() => {
        _this.fetchIndexData(indexCodeList);
      }, 30 * 60 * 1000);
    }
    this.getDataDebounce = this.debounce(this.settingScrool, 300); // 获取样式时防抖处理
  },
  methods: {
    refresh() {},
    setHeaders(data) {
      const headerData = (data.header || []).concat(data.appendHeader || []);
      const emptyLen = new Array(
        Math.max(headerData.length, (data.data && data.data[0]?.length) || 0)
      ).fill("");
      const totalWidth = this.options?.component?.width || 0;
      const avgLength = totalWidth / emptyLen.length;
      const header = [...headerData, ...emptyLen]
        .slice(0, emptyLen.length)
        .map((item, i) => {
          let style = "";
          if (data.fontSize) {
            style += `font-size: ${data.fontSize}px;`;
          }
          if (data.headerTC) {
            style += `color: ${data.headerTC};`;
          }
          // if (item.animation || avgLength < data.fontSize * (item?.name?.length || 0)) {
          //   style += `animation: move ${item?.duration || 2}s linear 0s infinite;`
          // }
          let wrapperStyle = "padding: 0 10px; margin: 0 -10px;";
          if (item.width) {
            wrapperStyle += `width: ${item.width}px;`;
          }
          if (data.headerAlign) {
            wrapperStyle += `text-align: ${data.headerAlign};`;
          }
          if (data.showBorder) {
            wrapperStyle += `border: 1px solid ${
              data.borderColor
            }; border-bottom: none; ${
              i === data.header.length - 1 ? "" : "border-right: none;"
            }`;
          }
          return `
          <div style="overflow-x: ${
            item.animation ||
            avgLength < data.fontSize * (item?.name?.length || 0)
              ? "auto"
              : "inherit"
          }; ${wrapperStyle}">
            <span style="${style}">${item.name}</item></span>
          </div>
        `;
        });
      return header;
    },
    setRowData(data) {
      const bodyData = data.data || [];
      const headerData = (data.header || []).concat(data.appendHeader || []);
      const emptyLen = new Array(
        Math.max(headerData.length, (data.data && data.data[0]?.length) || 0)
      ).fill("");
      const totalWidth = this.options?.component?.width || 0;
      const avgLength = totalWidth / emptyLen.length;

      const row = bodyData.map((rd, ri) => {
        const column = [...rd, ...emptyLen]
          .slice(0, emptyLen.length)
          .map((cd, i) => {
            const item = headerData[i];
            let style = "width: 100%;";
            if (data.fontSize) {
              style += `font-size: ${data.fontSize}px;`;
            }
            // if (
            //   item.animation ||
            //   (item.name !== '图片' && avgLength < data.fontSize * (cd && cd.length || 0)) ||
            //   (item.name !== '图片' && avgLength < 50)
            // ) {
            //   style += `animation: move ${item.duration || 2}s linear 0s infinite;`
            // }

            let wrapperStyle = "padding: 0 10px; margin: 0 -10px;";
            if (item && item.width) {
              wrapperStyle += `width: ${item.width}px;`;
            }
            if (data.bodyAlign) {
              wrapperStyle += `text-align: ${data.bodyAlign};`;
            }
            if (data.showBorder) {
              wrapperStyle += `border: 1px solid ${
                data.borderColor
              }; border-bottom: none; ${
                i === data.header.length - 1 ? "" : "border-right: none;"
              }`;
              if (ri === data.data.length - 1) {
                wrapperStyle += `border-bottom: 1px solid ${data.borderColor};`;
              }
            }
            if (i === 2 || i === 3) {
              let value =
                cd === null || cd === "" || cd === undefined ? "-" : Number(cd);
              let str = "";
              style += `display: flex;justify-content: ${data.bodyAlign};align-items: center;`;
              if (value === 0 || value === "-") {
                str = `${value}`;
              } else if (value > 0) {
                if (i === 3) {
                  str = `<span class="up-data"></span><span style="color:#D14242">${value}%</span>`;
                } else {
                  str = `<span style="color:#D14242">${value}</span>`;
                }
              } else {
                if (i === 3) {
                  str = `<span class="down-data"></span><span style="color:#27B65A">${value}%</span>`;
                } else {
                  str = `<span style="color:#27B65A">${value}</span>`;
                }
              }
              return (
                `
              <div style="overflow-x: ${
                (item && item.animation) ||
                avgLength < data.fontSize * ((cd && cd.length) || 0)
                  ? "auto"
                  : "inherit"
              }; ${wrapperStyle}">
                <span style="${style}" class="${
                  data.index && ri < 3 && i === 0
                    ? `dv-index dv-index-${ri + 1}`
                    : ""
                }">` +
                str +
                `</span>
              </div>
            `
              );
            } else {
              if (data.bodyColor) {
                style += `color: ${data.bodyColor};`;
              }
              return (item && item.name !== "图片") || !cd
                ? `
              <div style="overflow-x: ${
                (item && item.animation) ||
                avgLength < data.fontSize * ((cd && cd.length) || 0)
                  ? "auto"
                  : "inherit"
              }; ${wrapperStyle}">
                <span style="${style}" class="${
                    data.index && ri < 3 && i === 0
                      ? `dv-index dv-index-${ri + 1}`
                      : ""
                  }">${cd}</span>
              </div>
            `
                : `
              <div style="overflow-x: ${
                (item && item.animation) || avgLength < 50 ? "auto" : "inherit"
              }; ${wrapperStyle}">
                <img src="${cd}" style="${style}width: 50px;height: 100%;" class="${
                    data.index && ri < 3 && i === 0
                      ? `dv-index dv-index-${ri + 1}`
                      : ""
                  }">
              </div>
            `;
            }
          });
        return column;
      });
      return row;
    },
    fetchIndexData(val) {
      let list = [];
      let keyList = [];
      val.map(item => {
        keyList.push(item.key);
        list.push({ indexCode: item.key, frequencyCode: item.frequencyCode });
      });
      if (list && list.length) {
        if(this.options.title.name==='实时行情'){
          queryRealTimeIndexData(keyList).then(res => {
            if (res.success) {
              let dataList = [];
              if (res.data && res.data.length) {
                let resDatas = res.data;
                resDatas.map(item => {
                  let sort = 0;
                  for (let i = 0; i < list.length; i++) {
                    if (list[i] === item.indexCode) {
                      sort = i;
                    }
                  }
                  item.sort = sort;
                });
                resDatas.sort(function(a, b) {
                  return a.sort - b.sort;
                });
                resDatas.map((item, index) => {
                  // let unitName = item.unitName;
                  // if (unitName === "百分比") {
                  //   unitName = "%";
                  // } else if (unitName === "" || unitName === null) {
                  //   unitName = "";
                  // } else if (unitName.indexOf("=") > -1) {
                  //   unitName = "";
                  // } else if (unitName.indexOf("点") > -1) {
                  //   unitName = "";
                  // }
                  let priceRise = item.raiseValue;
                  if (priceRise === null || priceRise === "") {
                    priceRise = "-";
                  }
                  let priceRisePercent = item.raiseRatio;
                  if (
                    priceRisePercent === null ||
                    priceRisePercent === "" ||
                    priceRisePercent === "0.00"
                  ) {
                    priceRisePercent = "-";
                  }
                  let lasterPrice = item.newPrice;
                  if (lasterPrice === null || lasterPrice === "") {
                    lasterPrice = "-";
                  } else {
                    lasterPrice = lasterPrice + "";
                  }
                  let dateTime = item.dataTime;
                  if(dateTime){
                    let nowDate = moment().format("YYYY-MM-DD");
                    let dataTime = dateTime.substring(0,10);
                    if(nowDate === dataTime){
                      dateTime = moment(dateTime).format("HH:mm");
                    }else{
                      dateTime = moment(dateTime).format("MM-DD");
                    }
                  }else{
                    dateTime = "-";
                  }
                  dataList.push([
                    val[index]["otherName"]
                      ? val[index]["otherName"]
                      : item.indexName,
                    lasterPrice,
                    priceRise === "-" ? priceRise : Number(priceRise).toFixed(2),
                    priceRisePercent === "-"
                      ? priceRisePercent
                      : Number(priceRisePercent).toFixed(2),
                    dateTime
                  ]);
                });
                this.options.contentOption.data = dataList;
                let updateData = this.options.contentOption;
                this.setHeaders(updateData);
              }
            } else {
              this.$message.warning(res.message);
            }
          });
        }else{
          queryIndexData(list).then(res => {
            if (res.success) {
              let dataList = [];
              if (res.data && res.data.length) {
                let resDatas = res.data;
                resDatas.map(item => {
                  let sort = 0;
                  for (let i = 0; i < list.length; i++) {
                    if (list[i] === item.indexCode) {
                      sort = i;
                    }
                  }
                  item.sort = sort;
                });
                resDatas.sort(function(a, b) {
                  return a.sort - b.sort;
                });
                resDatas.map((item, index) => {
                  let unitName = item.unitName;
                  if (unitName === "百分比") {
                    unitName = "%";
                  } else if (unitName === "" || unitName === null) {
                    unitName = "";
                  } else if (unitName.indexOf("=") > -1) {
                    unitName = "";
                  } else if (unitName.indexOf("点") > -1) {
                    unitName = "";
                  }
                  let priceRise = item.priceRise;
                  if (priceRise === null || priceRise === "") {
                    priceRise = "-";
                  }
                  let priceRisePercent = item.priceRisePercent;
                  if (
                    priceRisePercent === null ||
                    priceRisePercent === "" ||
                    priceRisePercent === "0.00"
                  ) {
                    priceRisePercent = "-";
                  }
                  let lasterPrice = item.latestPrice;
                  if (lasterPrice === null || lasterPrice === "") {
                    lasterPrice = "-";
                  } else {
                    lasterPrice = lasterPrice + "" + unitName;
                  }
                  dataList.push([
                    val[index]["otherName"]
                      ? val[index]["otherName"]
                      : item.indexName,
                    lasterPrice,
                    priceRise === "-" ? priceRise : Number(priceRise).toFixed(2),
                    priceRisePercent === "-"
                      ? priceRisePercent
                      : Number(priceRisePercent).toFixed(2),
                    item.dataDate
                  ]);
                });
                this.options.contentOption.data = dataList;
                let updateData = this.options.contentOption;
                this.setHeaders(updateData);
              }
            } else {
              this.$message.warning(res.message);
            }
          });
        }
      }
    },
    settingScrool(val) {
      const data = this.deepClone(val.contentOption);
      if (data.start) {
        this.$refs[val.domId] && this.$refs[val.domId].stopAnimation();
        setTimeout(() => {
          this.$refs[val.domId] && this.$refs[val.domId].restart();
        }, data.waitTime * 1000);
      }
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    // 防抖函数
    debounce(fn, wait) {
      let timer;
      return function() {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args); // 把参数传进去
        }, wait);
      };
    }
  },
  watch: {
    options: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val.contentOption) {
          const data = this.deepClone(val.contentOption);
          const { setHeaders, setRowData } = this;
          if (data.index) {
            data.header = [{ name: "排序", animation: false }].concat(
              data.header
            );
            data.data = data.data.map((d, index) => {
              return [index + 1, ...d];
            });
          }
          this.config = {
            header: setHeaders(data),
            data: setRowData(data),
            headerHeight: data.fontSize * 2,
            rowNum: data.rowNum,
            align: data.align ? [data.align] : [],
            carousel: data.carousel,
            waitTime: data.waitTime * 1000,
            headerBGC: data.headerBGC,
            oddRowBGC: data.oddRowBGC || data.bodyBGC,
            evenRowBGC: data.evenRowBGC || data.bodyBGC
          };
          if (!data.start) {
            this.$refs[val.domId] && this.$refs[val.domId].stopAnimation();
          } else {
            if (val.component && val.component.isChangeSize) {
              this.getDataDebounce && this.getDataDebounce(val);
            } else {
              this.$refs[val.domId] && this.$refs[val.domId].stopAnimation();
              setTimeout(() => {
                this.$refs[val.domId] && this.$refs[val.domId].restart();
              }, data.waitTime * 1000);
            }
          }
        }
      }
    }
  },
  destroyed() {
    window.clearInterval(this.dataInterval);
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  .chart-header {
    color: $white;
    @extend .ft-12;
    line-height: 1.2em;
    padding: 0 10px;
  }
  .board-wrapper {
    width: 100%;
    position: relative;
  }
}

::v-deep .up-data {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-size: 100%;
  background-position: center;
  background-image: url("../../assets/images/up.svg");
  background-repeat: no-repeat;
  display: inline-block;
}

::v-deep .down-data {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-size: 100%;
  background-position: center;
  background-image: url("../../assets/images/down.svg");
  background-repeat: no-repeat;
  display: inline-block;
}
</style>

<style>
@keyframes move {
  0% {
    margin-left: 100%;
  }
  100% {
    margin-left: -100%;
  }
}
</style>
