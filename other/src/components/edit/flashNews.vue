<template>
  <div
    class="hot-news-container"
    v-loading="fullLoading"
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
        <div id="helloOne" class="prcie-marquee" :style="contentStyle">
          <!-- <div class="swiper hotSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,i) in swiperCount" :key="item">
                
              </div>
            </div>
          </div>-->
          <div v-for="item in newsList" :key="item.id">
            <vue-timeline-update
              id="one"
              :dateString="getTimeInfo(item)"
              :date="new Date()"
              :title="item.content"
              :description="categoryInfo(item)"
              :animation="true"
              category
              icon
              color="green"
            />
          </div>

          <div class="hidden-timeline__left">
            <svg
              class="time-clock"
              viewBox="0 0 30 30"
              focusable="false"
              fill="currentColor"
              data-icon="right"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              style="width: 42px; height: 42px; color: rgb(255, 219, 180);"
            >
              <path
                id="形状_1"
                data-name="形状 1"
                class="cls-1"
                d="M60,177a15,15,0,1,0,15,15,15,15,0,0,0-15-15m7.185,20.6a1.871,1.871,0,0,1-2.6.521l-5.627-3.751a1.87,1.87,0,0,1-.833-1.558v-9.375a1.876,1.876,0,1,1,3.752,0v8.37L66.668,195a1.877,1.877,0,0,1,.516,2.6"
                transform="translate(-45 -177)"
              />
            </svg>
            <span
              :id="options.domId"
              class="gb-vue-timeline-update__ago"
            >11:39</span>
          </div>
        </div>

        <div
          class="define-gray-modal"
          :style="{ width: `${options.component.width}px`, height: `${options.component.height}px`,cursor:isEdit?'move':'unset' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// import _ from "lodash";
// import Swiper from "@/utils/swiper-bundle.min.js";
import "@/utils/swiper-bundle.min.css";
import * as moment from "moment";
import { flashQueryList } from "@/api/source";
export default {
  name: "FlashNews",
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
    const self = this;
    return {
      newsList: self.options.contentOption.data,
      fullLoading: false,
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
      mySwiper: null
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
    if (this.options.contentOption.saveParams) {
      _this._initNews();
      /** 每隔10分钟调一次 */
      let time = 10 * 60 * 1000;
      _this.initNewsTask = window.setInterval(() => {
        _this._initNews();
      }, time);
    }
    this.$nextTick(() => {
      let leftContent = document.getElementsByClassName(
        "gb-vue-timeline-update__left"
      );
      if (leftContent && leftContent.length > 0) {
        for (let i = 0; i < leftContent.length; i++) {
          if (leftContent[i].innerHTML.indexOf("svg") === -1) {
            let picHtml =
              `<svg class="time-clock" viewBox="0 0 30 30" focusable="false" fill="currentColor" data-icon="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path id="形状_1" data-name="形状 1" class="cls-1" d="M60,177a15,15,0,1,0,15,15,15,15,0,0,0-15-15m7.185,20.6a1.871,1.871,0,0,1-2.6.521l-5.627-3.751a1.87,1.87,0,0,1-.833-1.558v-9.375a1.876,1.876,0,1,1,3.752,0v8.37L66.668,195a1.877,1.877,0,0,1,.516,2.6" transform="translate(-45 -177)"/></svg>` +
              leftContent[i].innerHTML;
            leftContent[i].innerHTML = picHtml;
          }
        }
      }
      this.styleMethod(this.options.contentOption);
      this.autoScroll(200, 10, 3000, document.getElementById("helloOne"));
    });
    this.getDataDebounce = this.debounce(this.styleMethod, 300); // 获取样式时防抖处理
  },
  methods: {
    getTimeInfo(data) {
      let date = moment(data.publisherTime).format("HH:mm");
      return date;
    },
    categoryInfo(data) {
      let categoryName = data.categoryName;
      let sectionName = data.sectionName;
      let relationBreed = data.relationBreed;
      let str = "";
      let breedsStr = "";
      if (relationBreed && relationBreed.length) {
        relationBreed.map((item, index) => {
          if (index === relationBreed.length - 1) {
            breedsStr += "<span>" + item.name + "</span>";
          } else {
            breedsStr +=
              "<span style='padding-right:10px;'>" + item.name + "</span>";
          }
        });
        str +=
          '<div class="category-name">' +
          categoryName +
          ":" +
          breedsStr +
          "</div>";
      } else {
        str += '<div class="category-name">' + categoryName + "</div>";
      }
      str += '<div class="section-name">' + sectionName + "</div>";

      let currentDate = moment().format("YYYY-MM-DD");
      let date = moment(data.publisherTime).format("YYYY-MM-DD");
      let dateTime = "";
      if (currentDate != date) {
        dateTime = moment(data.publisherTime).format("MM-DD");
        str += '<div class="flash-date-time">' + dateTime + "</div>";
      }

      return str;
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
      let params = this.options.contentOption.saveParams;
      flashQueryList(params)
        .then(res => {
          console.log(res);
          if (res.success) {
            if (res.data && res.data.list.length) {
              //this.$emit("data-changed", { data: res.data.list, saveParams: params });
              this.newsList = res.data.list;
              this.$nextTick(() => {
                let leftContent = document.getElementsByClassName(
                  "gb-vue-timeline-update__left"
                );
                if (leftContent && leftContent.length > 0) {
                  for (let i = 0; i < leftContent.length; i++) {
                    if (leftContent[i].innerHTML.indexOf("svg") === -1) {
                      let picHtml =
                        `<svg class="time-clock" viewBox="0 0 30 30" focusable="false" fill="currentColor" data-icon="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path id="形状_1" data-name="形状 1" class="cls-1" d="M60,177a15,15,0,1,0,15,15,15,15,0,0,0-15-15m7.185,20.6a1.871,1.871,0,0,1-2.6.521l-5.627-3.751a1.87,1.87,0,0,1-.833-1.558v-9.375a1.876,1.876,0,1,1,3.752,0v8.37L66.668,195a1.877,1.877,0,0,1,.516,2.6" transform="translate(-45 -177)"/></svg>` +
                        leftContent[i].innerHTML;
                      leftContent[i].innerHTML = picHtml;
                    }
                  }
                }
                this.styleMethod(this.options.contentOption);
                this.autoScroll(
                  200,
                  10,
                  3000,
                  document.getElementById("helloOne")
                );
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
    },
    /**
     * stepLength：一次滚动步长
     * speed：滚动速度
     * delay：停留时间
     * element：Element对象
     *
     * element.offsetHeight 元素的像素高度（包括边框和填充）
     * element.scrollTop 元素的内容垂直滚动的像素
     * element.scrollHeight 元素的高度（包括带滚动条的隐蔽的地方）
     */
    autoScroll(stepLength, speed, delay, element) {
      let interval;
      let step = 1;
      element.scrollTop = 0;

      function init() {
        element.scrollTop = 0;
        setTimeout(start, delay);
      }

      function start() {
        element.scrollTop += step;
        interval = setInterval(scrolling, speed);
      }

      function scrolling() {
        if (
          element.scrollTop % stepLength !== 0 &&
          element.scrollTop != element.scrollHeight - element.offsetHeight
        ) {
          element.scrollTop += step;
        } else {
          clearInterval(interval);
          if (
            element.scrollTop ===
            element.scrollHeight - element.offsetHeight
          ) {
            // 触顶或触底
            setTimeout(init, delay);
            //step *= -1; // 转换方向
          } else {
            setTimeout(start, delay);
          }
        }
      }

      if (element.offsetHeight !== element.scrollHeight) {
        // 元素内容没有溢出时，不触发
        setTimeout(start, delay);
      }
    },
    styleMethod(contentOption) {
      let leftContent = document.getElementsByClassName(
        "gb-vue-timeline-update__left"
      );
      if (leftContent && leftContent.length > 0) {
        for (let i = 0; i < leftContent.length; i++) {
          if (leftContent[i].innerHTML.indexOf("svg") === -1) {
            let picHtml =
              `<svg class="time-clock" viewBox="0 0 30 30" focusable="false" fill="currentColor" data-icon="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path id="形状_1" data-name="形状 1" class="cls-1" d="M60,177a15,15,0,1,0,15,15,15,15,0,0,0-15-15m7.185,20.6a1.871,1.871,0,0,1-2.6.521l-5.627-3.751a1.87,1.87,0,0,1-.833-1.558v-9.375a1.876,1.876,0,1,1,3.752,0v8.37L66.668,195a1.877,1.877,0,0,1,.516,2.6" transform="translate(-45 -177)"/></svg>` +
              leftContent[i].innerHTML;
            leftContent[i].innerHTML = picHtml;
          }
        }
      }
      try {
        //快讯样式设置
        let allContent = document.getElementsByClassName(
          "gb-vue-timeline-update__title"
        );
        let allRight = document.getElementsByClassName(
          "gb-vue-timeline-update__right"
        );
        if (allContent && allContent.length) {
          for (let i = 0; i < allContent.length; i++) {
            allContent[i].style.fontFamily = contentOption.fontFamily;
            allContent[i].style.fontSize =
              contentOption.basicStyle.fontSize + "px";
            allContent[i].style.color = contentOption.basicStyle.color;
            if (contentOption.basicStyle.backgroundColor) {
              allRight[i].style.background =
                contentOption.basicStyle.backgroundColor;
            }
            allContent[i].style.lineHeight =
              contentOption.basicStyle.lineHeight + "px";
            allContent[i].style.letterSpacing =
              contentOption.basicStyle.letterSpacing + "px";
          }
        }

        //品种样式设置
        let allCategoryName = document.getElementsByClassName("category-name");
        if (allCategoryName && allCategoryName.length) {
          for (let i = 0; i < allCategoryName.length; i++) {
            allCategoryName[i].style.fontSize =
              contentOption.breedStyle.fontSize + "px";
            allCategoryName[i].style.color = contentOption.breedStyle.color;
            if (contentOption.breedStyle.backgroundColor) {
              allCategoryName[i].style.background =
                contentOption.breedStyle.backgroundColor;
            }
          }
        }

        //栏目样式设置
        let allSectionName = document.getElementsByClassName("section-name");
        if (allSectionName && allSectionName.length) {
          for (let i = 0; i < allSectionName.length; i++) {
            allSectionName[i].style.fontSize =
              contentOption.cloumnStyle.fontSize + "px";
            allSectionName[i].style.color = contentOption.cloumnStyle.color;
            if (contentOption.cloumnStyle.backgroundColor) {
              allSectionName[i].style.background =
                contentOption.cloumnStyle.backgroundColor;
            }
          }
        }

        //时间样式设置
        let allClockIcon = document.getElementsByClassName("time-clock");
        let allDateTime = document.getElementsByClassName("flash-date-time");
        let fontWList = [];
        let hiddenFont = document.getElementById(this.options.domId);
        if (leftContent && leftContent.length) {
          for (let i = 0; i < leftContent.length; i++) {
            let allTime = leftContent[i].querySelector(
              ".gb-vue-timeline-update__ago"
            );
            if(i===0 && hiddenFont){
              hiddenFont.style.fontSize = contentOption.timeStyle.fontSize + "px";
              hiddenFont.style.color = contentOption.timeStyle.color;
            }
            fontWList.push(allTime.offsetWidth);
            allTime.style.fontSize = contentOption.timeStyle.fontSize + "px";
            allTime.style.color = contentOption.timeStyle.color;
            if(allDateTime[i]){
              allDateTime[i].style.fontSize =
                contentOption.timeStyle.fontSize + "px";
              allDateTime[i].style.color = contentOption.timeStyle.color;
            }
          }
        }
        console.log(allClockIcon)
        if (allClockIcon && allClockIcon.length) {
          for (let i = 0; i < allClockIcon.length; i++) {
            allClockIcon[i].style.width =
              contentOption.timeStyle.fontSize + "px";
            allClockIcon[i].style.height =
              contentOption.timeStyle.fontSize + "px";
            allClockIcon[i].style.color = contentOption.timeStyle.color;
          }
        }

        setTimeout(function() {
          let width = hiddenFont.offsetWidth;
          if (leftContent && leftContent.length) {
            for (let i = 0; i < leftContent.length; i++) {
              let allTime = leftContent[i].querySelector(
                ".gb-vue-timeline-update__ago"
              );
              allTime.style.width = width + "px";
            }
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
      this.fullLoading = false;
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
        console.log(val.contentOption);
        if (val.contentOption) {
          _this.newsList = val.contentOption.data;
          _this.fullLoading = true;
          _this.wrapperStyle = _this.computeWrapStyle(val.contentOption);
          _this.contentStyle = _this.computedStyle(val.contentOption);
          _this.textEl = _this.createTextEl(val.contentOption);
          _this.getDataDebounce && _this.getDataDebounce(val.contentOption);
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
        margin-top: 30px;
        overflow: hidden;
        .hidden-timeline__left {
          position: fixed;
          top:-1000px;
          opacity: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 0 0 auto;
          min-width: 100px;
          text-align: right;
          .time-clock {
            width: 30px;
            height: 30px;
            color: #ffdbb4;
            margin-right: 8px;
            margin-top: -16px;
          }
          .gb-vue-timeline-update__ago {
            font-size: 32px;
            color: rgb(255, 219, 180);
            display: flex !important;
            margin-top: -16px;
          }
        }
      }
    }
  }
  #longWord {
    position: fixed;
    opacity: 0;
    .long-word {
      padding: 26px 28px 20px 55px;
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

::v-deep .gb-vue-timeline-update__title {
  margin-bottom: 17px;
  font-size: 28px;
  font-weight: normal !important;
  color: #ffffff;
  p {
    margin: 0;
  }
}

::v-deep .gb-base-number {
  border-width: 6px !important;
}

::v-deep .gb-base-number--dark.gb-base-number--green {
  border-color: #4dfcfa;
}

::v-deep .gb-base-number__icon {
  display: none;
}

::v-deep .gb-vue-timeline-update {
  .gb-vue-timeline-update__left {
    display: flex;
    justify-content: center;
    align-items: center;
    .gb-vue-timeline-update__ago {
      display: flex !important;
      margin-top: -16px;
    }
  }
}

::v-deep .gb-vue-timeline-update__bullet {
  top: calc(50% - 16px) !important;
  background-color: #044daa;
}

::v-deep .gb-vue-timeline-update__ago {
  font-size: 32px;
  font-weight: bold;
  color: #ffdbb4;

  justify-content: center;
  align-items: center;
  // &::before {
  //   width: 30px;
  //   height: 30px;
  //   margin-right:8px;
  //   background-image: url("../../assets/images/time.svg");
  //   background-size: 100%;
  //   background-position: center;
  //   background-repeat: no-repeat;
  //   color: red;
  //   content: "";
  //   display: inline-block;
  // }
}

::v-deep .time-clock {
  width: 30px;
  height: 30px;
  color: #ffdbb4;
  margin-right: 8px;
  margin-top: -16px;
}

::v-deep .gb-base-number--small {
  width: 24px !important;
  height: 24px !important;
}

::v-deep .gb-vue-timeline-update__right {
  padding-left: 25px;
  padding-right: 30px;
  padding-top: 24px;
  padding-bottom: 14px !important;
  margin-bottom: 32px;
  background: linear-gradient(0deg, #1f9ae9, #004ea6, #16b2f0);
  border: 1px solid #5bffed;
}

::v-deep .category-name {
  color: #2bf8ff;
  font-size: 22px;
  border: 1px solid #1291db;
  background: linear-gradient(90deg, #013983, #0258b3);
  padding: 5px 17px 6px 17px;
  border-radius: 17px;
  display: inline-block;
}

::v-deep .section-name {
  color: #2bf8ff;
  font-size: 22px;
  margin-left: 30px;
  padding: 5px 17px 6px 17px;
  border-radius: 17px;
  display: inline-block;
}

::v-deep .flash-date-time {
  float: right;
  color: #ffdbb4;
  font-size: 32px;
  margin-left: 30px;
  padding: 5px 17px 6px 17px;
  border-radius: 17px;
  display: inline-block;
}
</style>
