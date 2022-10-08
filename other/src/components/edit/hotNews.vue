<template>
  <div
    class="hot-news-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="hot-news-header"
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
      class="hot-news-content"
      :style="{
        height: `${
           options.component.height
        }px`
      }"
    >
      <div class="hot-news" :style="wrapperStyle">
        <div
          class="prcie-marquee"
          v-if="options.contentOption.columnNum === '1'"
          :style="contentStyle"
        >
          <div class="swiper hotSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,i) in swiperCount" :key="item">
                <div
                  class="hot-list"
                  :style="{background:`${options.contentOption.basicStyle.backgroundColor}`,height:`${maxH}px`}"
                  v-for="(data,index) in splitData[i]"
                  :key="data.articleId"
                >
                  <div
                    class="hot-one"
                    :style="{
                      fontSize:`${options.contentOption.basicStyle.fontSize}px`,
                      fontWeight:`${options.contentOption.basicStyle.textStyle.fontWeight}`,
                      fontStyle:`${options.contentOption.basicStyle.textStyle.fontStyle}`,
                      textDecoration:`${options.contentOption.basicStyle.textStyle.textDecoration}`,
                      color:`${options.contentOption.basicStyle.color}`,
                      lineHeight:`${options.contentOption.basicStyle.lineHeight}px`,
                      letterSpacing:`${options.contentOption.basicStyle.letterSpacing}px`
                    }"
                  >{{data.title}}</div>
                  <div class="hot-num num-one" v-if="index===0">
                    <span :style="numStyle">{{data.sort}}</span>
                  </div>
                  <div class="hot-num num-two" v-else-if="index===0">
                    <span :style="numStyle">{{data.sort}}</span>
                  </div>
                  <div class="hot-num num-three" v-else-if="index===0">
                    <span :style="numStyle">{{data.sort}}</span>
                  </div>
                  <div class="hot-num num-four" v-else>
                    <span :style="numStyle">{{data.sort}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="prcie-marquee"
          v-if="options.contentOption.columnNum === '2'"
          :style="contentStyle"
        >
          <div class="swiper hotSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,i) in swiperCount" :key="item">
                <a-row class="define-row">
                  <a-col
                    class="define-col"
                    :style="{marginTop:index===0||index===1?0:'32px'}"
                    :span="12"
                    v-for="(data,index) in splitData[i]"
                    :key="data.articleId"
                  >
                    <div
                      class="hot-list host-two-column"
                      :style="{float:index===0||index===2||index===4||index===6||index===8||index===10?'left':'right',background:`${options.contentOption.basicStyle.backgroundColor}`,height:`${maxH}px`}"
                    >
                      <div
                        class="hot-one"
                        :style="{
                          fontSize:`${options.contentOption.basicStyle.fontSize}px`,
                          fontWeight:`${options.contentOption.basicStyle.textStyle.fontWeight}`,
                          fontStyle:`${options.contentOption.basicStyle.textStyle.fontStyle}`,
                          textDecoration:`${options.contentOption.basicStyle.textStyle.textDecoration}`,
                          color:`${options.contentOption.basicStyle.color}`,
                          lineHeight:`${options.contentOption.basicStyle.lineHeight}px`,
                          letterSpacing:`${options.contentOption.basicStyle.letterSpacing}px`
                        }"
                      >{{data.title}}</div>
                      <div class="hot-num num-one" v-if="index===0">
                        <span :style="numStyle">{{data.sort}}</span>
                      </div>
                      <div class="hot-num num-two" v-else-if="index===0">
                        <span :style="numStyle">{{data.sort}}</span>
                      </div>
                      <div class="hot-num num-three" v-else-if="index===0">
                        <span :style="numStyle">{{data.sort}}</span>
                      </div>
                      <div class="hot-num num-four" v-else>
                        <span :style="numStyle">{{data.sort}}</span>
                      </div>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </div>
          </div>
        </div>

        <div
          class="define-gray-modal"
          :style="{ width: `${options.component.width}px`, height: `${options.component.height}px`,cursor:isEdit?'move':'unset' }"
        ></div>
      </div>
    </div>

    <div
      id="longWord"
      v-if="options.contentOption.columnNum === '1'"
      :style="{ 
        width: `${options.component.width}px`, 
        fontSize:`${options.contentOption.basicStyle.fontSize}px`,
        fontWeight:`${options.contentOption.basicStyle.textStyle.fontWeight}`,
        fontStyle:`${options.contentOption.basicStyle.textStyle.fontStyle}`,
        textDecoration:`${options.contentOption.basicStyle.textStyle.textDecoration}`,
        color:`${options.contentOption.basicStyle.color}`,
        lineHeight:`${options.contentOption.basicStyle.lineHeight}px`,
        letterSpacing:`${options.contentOption.basicStyle.letterSpacing}px`
      }"
    >
      <div class="long-word">{{longestWord}}</div>
    </div>
    <div
      id="longWord"
      v-if="options.contentOption.columnNum === '2'"
      :style="{ 
        width: `${options.component.width/2-16}px`,
        fontSize:`${options.contentOption.basicStyle.fontSize}px`,
        fontWeight:`${options.contentOption.basicStyle.textStyle.fontWeight}`,
        fontStyle:`${options.contentOption.basicStyle.textStyle.fontStyle}`,
        textDecoration:`${options.contentOption.basicStyle.textStyle.textDecoration}`,
        color:`${options.contentOption.basicStyle.color}`,
        lineHeight:`${options.contentOption.basicStyle.lineHeight}px`,
        letterSpacing:`${options.contentOption.basicStyle.letterSpacing}px`
      }"
    >
      <div class="long-word">{{longestWord}}</div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Swiper from "@/utils/swiper-bundle.min.js";
import "@/utils/swiper-bundle.min.css";
import * as moment from "moment";
import { hotNewsInfo } from "@/api/source";
export default {
  name: "HotNews",
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
    dateHour(time) {
      let dateTime = moment(time).format("hh:mm");
      return dateTime;
    },
    dateDay(time) {
      let dateTime = moment(time).format("YYYY-MM-DD");
      return dateTime;
    }
  },
  data() {
    return {
      isEdit: false,
      array: [],
      wrapperStyle: "",
      contentStyle: "height:100%;",
      numStyle: "",
      textEl: "",
      longestWord: "",
      initNewsTask: null,
      maxH: null,
      swiperNumber: 1,
      swiperCount: 1,
      splitData: [],
      hotSwiper: null
    };
  },
  async mounted() {
    let _this = this;
    if (window.location.href.indexOf("/edit/") > -1) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    if (_this.initNewsTask) {
      window.clearInterval(_this.initNewsTask);
    }
    _this._initNews();
    /** 每隔10分钟调一次 */
    let time = 10 * 60 * 1000;
    _this.initNewsTask = window.setInterval(() => {
      _this._initNews();
    }, time);
    this.getDataDebounce = this.debounce(this.maxHeightMehod, 300); // 获取最大高度时防抖处理
  },
  methods: {
    refresh() {},
    numberStyle(obj) {
      const { numberStyle } = obj;
      let style = "height:100%;";
      Object.keys(numberStyle).forEach(key => {
        if (typeof numberStyle[key] !== "object") {
          if (["fontSize", "lineHeight", "letterSpacing"].includes(key)) {
            style += `${this.replaceWord(key)}: ${numberStyle[key]}px;`;
          } else {
            style += `${this.replaceWord(key)}: ${numberStyle[key]};`;
          }
        } else {
          Object.keys(numberStyle[key]).forEach(kk => {
            if (numberStyle[key][kk]) {
              style += `${this.replaceWord(kk)}: ${numberStyle[key][kk]};`;
            }
          });
        }
      });
      return style;
    },
    computedStyle(obj) {
      const { basicStyle } = obj;
      const { fontFamily } = obj;
      let style = "height:100%;";
      Object.keys(basicStyle).forEach(key => {
        if (typeof basicStyle[key] !== "object") {
          if (["fontSize", "lineHeight", "letterSpacing"].includes(key)) {
            if (key != "lineHeight" && key != "letterSpacing") {
              style += `${this.replaceWord(key)}: ${basicStyle[key]}px;`;
            }
          } else {
            if (key != "backgroundColor" && key != "fontWeight") {
              style += `${this.replaceWord(key)}: ${basicStyle[key]};`;
            }
          }
        } else {
          if (key != "textStyle") {
            Object.keys(basicStyle[key]).forEach(kk => {
              if (basicStyle[key][kk]) {
                style += `${this.replaceWord(kk)}: ${basicStyle[key][kk]};`;
              }
            });
          }
        }
      });
      style += `${this.replaceWord("fontFamily")}: ${fontFamily};`;
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
    createTextEl(obj) {
      const { superLink } = obj;
      const data = obj.transformedData.replace(/\s/g, "&nbsp;");
      if (superLink && superLink.open) {
        return `<a style="${this.contentStyle}" href="${superLink.href ||
          "javascript void(0);"}" target="${superLink.openTarget}">
            ${data}
          </a>`;
      }
      return `<span style="${this.contentStyle}">${data}</span>`;
    },
    // 转换key
    replaceWord(str) {
      return str.replace(/[A-Z]/g, word => {
        return `-${word.toLocaleLowerCase()}`;
      });
    },
    _initNews() {
      hotNewsInfo()
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              let longestWord = this.findLongestWord(res.data);
              this.longestWord = longestWord;
              this.$nextTick(() => {
                let resDatas = res.data.splice(0, 10);
                resDatas.map((item, index) => {
                  item.sort = index + 1;
                });
                this.maxHeightMehod(resDatas);
                this.array = resDatas;
              });
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    findLongestWord(strSplit) {
      var that = this;
      var longestWord = strSplit.reduce(function(longest, currentWord) {
        return that.getLength(currentWord.title) > that.getLength(longest)
          ? currentWord.title
          : longest;
      }, "");
      return longestWord;
    },
    getLength(str) {
      ///<summary>获得字符串实际长度，中文2，英文1</summary>
      ///<param name="str">要获得长度的字符串</param>
      var realLength = 0,
        len = str.length,
        charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
      }
      return realLength;
    },
    maxHeightMehod(data) {
      let longWord = document.getElementById("longWord");
      if (longWord) {
        if (this.hotSwiper) {
          this.hotSwiper.destroy(true);
        }
        let sumHeight = this.options.component.height;
        let oneHeight = longWord.offsetHeight - 2;
        let otherHeight = sumHeight - oneHeight;
        let num = Math.floor(otherHeight / (oneHeight + 32)) + 1;
        this.maxH = oneHeight - 6;
        if (this.options.contentOption.columnNum === "1") {
          this.swiperNumber = num === 0 ? 1 : num;
        } else {
          this.swiperNumber = num === 0 ? 1 * 2 : num * 2;
        }
        this.swiperCount = Math.ceil(10 / this.swiperNumber);
        this.splitData = _.chunk(data, this.swiperNumber);
        this.hotSwiper = new Swiper(".hotSwiper", {
          initialSlide: 0,
          centeredSlides: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          autoplay: {
            delay: 10000 //10秒切换一次
          }
        });
      }
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
  destroyed() {
    window.clearInterval(this.initNewsTask);
  },
  watch: {
    options: {
      immediate: true,
      handler(val) {
        let _this = this;
        if (val.contentOption) {
          _this.wrapperStyle = _this.computeWrapStyle(val.contentOption);
          _this.contentStyle = _this.computedStyle(val.contentOption);
          _this.numStyle = _this.numberStyle(val.contentOption);
          _this.textEl = _this.createTextEl(val.contentOption);
        }
        if (_this.array.length) {
          _this.getDataDebounce && _this.getDataDebounce(_this.array);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.hot-news-container {
  display: flex;
  flex-direction: column;
  .hot-news-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    padding: 0 10px;
    line-height: 2em;
  }
  .hot-news-content {
    width: 100%;
    height: 100%;
    flex: "auto";
    overflow: hidden;
    .hot-news {
      width: 100%;
      height: 100%;
      .prcie-marquee {
        // display: flex;
        // align-items: center;
        .hot-list {
          position: relative;
          width: 100%;
          background: linear-gradient(0deg, #1f9ae9, #004ea6, #16b2f0);
          border: 1px solid #5bffed;
          font-size: 28px;
          color: #ffffff;
          // display: flex;
          // align-items: center;
          .hot-one {
            padding: 20px 28px 20px 55px;
          }
          .hot-num {
            position: absolute;
            left: -6px;
            top: -6px;
            width: 78px;
            height: 72px;
            text-align: center;
            font-size: 30px;
            color: #ffffff;
          }
          .num-one {
            background-image: url("../../assets/images/num1.svg");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            span {
              margin-left: -30px;
              margin-top: 5px;
              display: inline-block;
            }
          }
          .num-two {
            background-image: url("../../assets/images/num2.svg");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            span {
              margin-left: -30px;
              margin-top: 5px;
              display: inline-block;
            }
          }
          .num-three {
            background-image: url("../../assets/images/num3.svg");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            span {
              margin-left: -30px;
              margin-top: 5px;
              display: inline-block;
            }
          }
          .num-four {
            background-image: url("../../assets/images/num4.svg");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            span {
              margin-left: -30px;
              margin-top: 5px;
              display: inline-block;
            }
          }
        }
        .host-two-column {
          width: calc(100% - 16px);
        }
        .define-col:nth-child(odd) {
          .host-two-column {
            float: left;
          }
        }
        .define-col {
          margin-top: 32px;
        }
        .define-col:nth-child(even) {
          .host-two-column {
            float: right;
          }
        }
        .hot-list:not(:first-child) {
          margin-top: 32px;
        }
      }
    }
  }
  #longWord {
    position: fixed;
    opacity: 0;
    .long-word {
      padding: 20px 28px 20px 55px;
      font-weight: bold;
      color: #ffffff;
    }
  }
}

.define-gray-modal {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0);
  cursor: move;
  z-index: 1000;
}
</style>
