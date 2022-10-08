<template>
  <div
    class="index-board-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="index-board-header"
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
    <div
      class="index-board-content"
      :style="{
        height: `${
           options.component.height
        }px`
      }"
    >
      <div class="index-board" :style="wrapperStyle">
        <div class="index-frame" :style="contentStyle">
          <div
            :style="{
              marginTop:(options.component.height/218)*23+'px',
              fontSize:options.contentOption.basicStyle.fontSize+'px',
              lineHeight:options.contentOption.basicStyle.fontSize+'px',
              textDecoration:options.contentOption.basicStyle.textStyle.textDecoration
            }"
            class="board-content"
          >
            <span>{{ data.name }}</span>
            <span style="padding-left:30px;">{{data.contact}}</span>
          </div>
          <div
            :style="{
              marginTop:(options.component.height/218)*25+'px',
              fontSize:options.contentOption.valueStyle.fontSize+'px',
              lineHeight:options.contentOption.valueStyle.fontSize+'px',
              textDecoration:options.contentOption.basicStyle.textStyle.textDecoration
            }"
            class="board-content"
          >{{ data.value | numberSplit}}</div>
          <div
            :style="{
              position:'absolute',
              bottom:0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop:(options.component.height/218)*23+'px',
              height:(options.component.height/218)*71+'px',
              lineHeight:(options.component.height/218)*71+'px',
              fontSize:options.contentOption.upDownStyle.fontSize+'px',
              fontWeight:options.contentOption.upDownStyle.textStyle.fontWeight?options.contentOption.upDownStyle.textStyle.fontWeight:'normal',
              fontStyle:options.contentOption.upDownStyle.textStyle.fontStyle?options.contentOption.upDownStyle.textStyle.fontStyle:'normal',
              textDecoration:options.contentOption.upDownStyle.textStyle.textDecoration
            }"
            class="board-content"
          >
            <span v-if="data.changeData > 0" style="color:#C05A5A;">
              <span>{{ data.changeData }}</span>
            </span>
            <span v-else-if="data.changeData < 0" style="color:#27B65A;">
              <span>{{ data.changeData }}</span>
            </span>
            <span v-else>{{ data.changeData }}</span>
            <span
              v-if="data.chg > 0"
              style="padding-left:76px;color:#C05A5A;"
              :style="{display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',paddingLeft:(options.component.width/574)*76+'px'}"
            >
              <span
                class="up-data"
                :style="{width:options.contentOption.upDownStyle.fontSize+'px',height:options.contentOption.upDownStyle.fontSize+'px'}"
              ></span>
              <span>{{data.chg}}%</span>
            </span>
            <span
              v-else-if="data.chg < 0"
              style="padding-left:76px;color:#27B65A;"
              :style="{display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',paddingLeft:(options.component.width/574)*76+'px'}"
            >
              <span
                class="down-data"
                :style="{width:options.contentOption.upDownStyle.fontSize+'px',height:options.contentOption.upDownStyle.fontSize+'px'}"
              ></span>
              <span>{{data.chg}}%</span>
            </span>
            <span style="margin-left:76px;" v-else>
              {{data.chg}}<span v-if="data.chg!='-'">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getContractData } from "@/api/source";
import bgIcon from "@/assets/images/index-bg.png";
export default {
  name: "FuturesBoard",
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
  filters: {
    numberSplit(opt) {
      if (opt) {
        const str = opt + ""; //把数字变成string类型
        if (str.indexOf(".") !== -1) {
          //判断是否附带小数
          const intSum = str
            .substring(0, str.indexOf("."))
            .replace(/\B(?=(?:\d{3})+$)/g, ","); //取到整数部分
          const dot = str.substring(str.length, str.indexOf(".")); //取到小数部分搜索
          const ret = intSum + dot;
          return ret;
        } else {
          const ret = str.replace(/\B(?=(?:\d{3})+$)/g, ",");
          return ret + ".00";
        }
      } else {
        return "0.00";
      }
    }
  },
  data() {
    return {
      bgIcon,
      data: {},
      wrapperStyle: "",
      contentStyle: "height:100%;",
      time: "",
      defaultFormat: "YYYY-MM-DD HH:mm:ss",
      dataInterval: null
    };
  },
  mounted() {
    let indexCodeList = this.options.contentOption.indexCodeList;
    if (this.dataInterval) {
      window.clearInterval(this.dataInterval);
    }
    if (indexCodeList && indexCodeList.length) {
      let list = [];
      let _this = this;
      indexCodeList.map(item => list.push(item.key));
      _this.fetchIndexData(list);
      _this.dataInterval = setInterval(() => {
        _this.fetchIndexData(list);
      }, 30 * 60 * 1000);
    }
  },
  methods: {
    refresh() {},
    computedStyle(obj) {
      //console.log(obj)
      const { basicStyle } = obj;
      let style = "height:100%;";
      Object.keys(basicStyle).forEach(key => {
        if (typeof basicStyle[key] !== "object") {
          if (["fontSize", "lineHeight", "letterSpacing"].includes(key)) {
            style += `${this.replaceWord(key)}: ${basicStyle[key]}px;`;
          } else {
            if (key === "url") {
              if (basicStyle[key]) {
                style += `background-size:${this.options.component.width}px ${this.options.component.height}px;background-image: url(${basicStyle[key]});`;
              } else {
                style += `background-size:${this.options.component.width}px ${this.options.component.height}px;background-image: url(${this.bgIcon});`;
              }
            } else {
              style += `${this.replaceWord(key)}: ${basicStyle[key]};`;
            }
          }
        } else {
          Object.keys(basicStyle[key]).forEach(kk => {
            if (basicStyle[key][kk]) {
              style += `${this.replaceWord(kk)}: ${basicStyle[key][kk]};`;
            }
          });
        }
      });
      style += `width: ${this.options.component.width}px;height:${this.options.component.height}px`;
      return style;
    },
    computeWrapStyle(obj) {
      let style = "";
      const { basicStyle } = obj;

      if (basicStyle?.textStyle?.textAlign) {
        style += `text-align: ${basicStyle?.textStyle?.textAlign || "left"};`;
      }
      return style;
    },
    // 转换key
    replaceWord(str) {
      return str.replace(/[A-Z]/g, word => {
        return `-${word.toLocaleLowerCase()}`;
      });
    },
    fetchIndexData(val) {
      if (val && val.length) {
        let indexCodeList = this.options.contentOption.indexCodeList;
        getContractData(val).then(res => {
          if (res.success) {
            let dataList = [];
            if (res.data && res.data.length) {
              let resDatas = res.data;
              resDatas.map(item => {
                let filterDataName = indexCodeList.filter(
                  childItem => childItem.key === item.contactCode
                );
                //let unitName = item.unitName;
                // if (unitName === "百分比") {
                //   unitName = "%";
                // } else if (unitName === "" || unitName === null) {
                //   unitName = "";
                // } else if (unitName.indexOf("=") > -1) {
                //   unitName = "";
                // } else if (unitName.indexOf("点") > -1) {
                //   unitName = "";
                // }
                let priceRise = item.priceRise;
                if (priceRise === null || priceRise === "") {
                  priceRise = "-";
                }
                let priceRisePercent = item.percent;
                if (
                  priceRisePercent === null ||
                  priceRisePercent === "" 
                ) {
                  priceRisePercent = null;
                }
                 if (item.latestPrice === "1000000000000000000.00") {
                   dataList.push({
                     name: filterDataName.length ? filterDataName[0].name : "",
                     contact: item.contactCode,
                     value: null,
                     changeData: "-",
                     chg: "-",
                     volume: "-"
                   });
                 }else{
                   dataList.push({
                     name: filterDataName.length ? filterDataName[0].name : "",
                     contact: item.contactCode,
                     value: item.latestPrice,
                     changeData: priceRise === '-' || priceRise === null ? priceRise: Number(priceRise).toFixed(2),
                     chg: priceRisePercent === '-' || priceRisePercent === null ? priceRisePercent: Number(priceRisePercent).toFixed(2),
                     volume: item.volume
                   });
                 }
              });
              this.data = dataList.length > 0 ? dataList[0] : {};
            }
          } else {
            this.$message.warning(res.message);
          }
        });
      }
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(val) {
        let _this = this;
        if (val.contentOption) {
          console.log(val.contentOption)
          _this.data = val.contentOption.data?val.contentOption.data:{};
          _this.wrapperStyle = _this.computeWrapStyle(val.contentOption);
          _this.contentStyle = _this.computedStyle(val.contentOption);
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
.index-board-container {
  display: flex;
  flex-direction: column;
  .index-board-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    padding: 0 10px;
    line-height: 2em;
  }
  .index-board-content {
    width: 100%;
    height: 100%;
    flex: "auto";
    overflow: hidden;
    .index-board {
      width: 100%;
      height: 100%;
      //word-break: break-all;
      //word-wrap: break-word;
      .index-frame {
        background-repeat: no-repeat;
        background-position: center;
      }
      .board-content {
        float: left;
        width: 100%;
        text-align: center;
      }
      .mutil-text {
        width: 100%;
        height: 100%;
        color: #fff;
        background: unset;
      }
    }
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

<style lang="scss">
@keyframes marqueeLeft {
  0% {
    margin-left: 100%;
    transform: translateX(0);
  }
  100% {
    margin-left: 0;
    transform: translateX(-100%);
  }
}
@keyframes marqueeTop {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
