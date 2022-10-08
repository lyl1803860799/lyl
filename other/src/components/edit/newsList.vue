<template>
  <div
    class="news-list-container"
    v-loading="fullLoading"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <div
      class="news-list-content"
      :style="{
        height: `${
           options.component.height
        }px`
      }"
    >
      <div class="news-list" :style="{overflowY: overflowValue}" :id="options.domId">
        <div class="prcie-marquee" :style="wrapperStyle">
          <div class="swiper newsListSwiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,i) in newsList" :key="item.id">
                <ul class="news-ul" :id="options.domId+'_'+i">
                  <li v-for="data in item.child" :key="data.id" :style="{minHeight:maxH+'px'}">
                    <div class="news-top">
                      <span class="news-title-area" :style="titleStyle">{{data.title}}</span>
                      <span :style="sourceStyle">来源：{{data.source}} {{data.articleTime | pushTime}}</span>
                    </div>
                    <div class="news-middle" :style="contentStyle">
                      <span class="overhide">{{ data.content }}</span>
                    </div>
                  </li>
                </ul>
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

    <div class="longWord" :style="contentStyle">
      <span :id="options.domId+'longWord'" class="long-word">大</span>
    </div>
  </div>
</template>

<script>
"use strict";
//import _ from "lodash";
import Swiper from "@/utils/swiper-bundle.min.js";
import "@/utils/swiper-bundle.min.css";
import { getNewsList, getNewsColumnTree } from "@/api/source";
export default {
  name: "NewsList",
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
    timeFilter: function(date) {
      if (date != null) {
        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var day = date.getDate();
        day = day < 10 ? "0" + day : day;
        var hours = date.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes();
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var seconds = date.getSeconds();
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return (
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds
        );
      }
    },
    //计算间隔时间
    pushTime(date) {
      let NewDate = new Date(date);
      let currentTime = new Date();
      if (NewDate) {
        let nowTime = currentTime.getTime();
        let date2 = NewDate.getTime();
        //let time = nowTime - date2;
        // let days = parseInt(time / (1000 * 60 * 60 * 24));
        // let hour = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // let minute = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
        // let second = (time % (1000 * 60)) / 1000;
        //console.log(new Date(nowTime).toDateString() +'!='+ new Date(date2).toDateString());
        if (
          new Date(nowTime).toDateString() != new Date(date2).toDateString()
        ) {
          let year = NewDate.getFullYear();
          let month = NewDate.getMonth() + 1;
          month = month < 10 ? "0" + month : month;
          let day = NewDate.getDate();
          day = day < 10 ? "0" + day : day;
          let hours = NewDate.getHours();
          hours = hours < 10 ? "0" + hours : hours;
          let minutes = NewDate.getMinutes();
          minutes = minutes < 10 ? "0" + minutes : minutes;
          //let seconds = NewDate.getSeconds();
          //seconds = seconds < 10 ? "0" + seconds : seconds;
          //判断是否属于当天
          return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
        } else {
          // if (hour > 0) {
          //   return hour + "小时前";
          // } else {
          //   if (minute > 1) {
          //     return minute + "分钟前";
          //   } else {
          //     return "1分钟前";
          //   }
          // }
          let hours = NewDate.getHours();
          hours = hours < 10 ? "0" + hours : hours;
          let minutes = NewDate.getMinutes();
          minutes = minutes < 10 ? "0" + minutes : minutes;
          return hours + ":" + minutes;
          //===
        }
      }
    }
  },
  data() {
    return {
      el: null,
      fullLoading: false,
      isEdit: false,
      array: [],
      wrapperStyle: "",
      titleStyle: "",
      contentStyle: "",
      sourceStyle: "",
      initNewsTask: null,
      maxH: null,
      longestWord: "",
      mySwiper: null,
      overflowValue: "auto",
      strLen: 0,
      newsList: [],
      dataTypeList: [],
      flashNum: 20,
      time: null,
      time2: null,
      time3: null,
      time4: null,
      time5: null
    };
  },
  async mounted() {
    let _this = this;
    this.mySwiper = new Swiper(".newsListSwiper", {
      initialSlide: 0,
      centeredSlides: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      autoplay: false
    });
    this.flashNum =
      this.options.contentOption.saveParams &&
      this.options.contentOption.saveParams.pageSize
        ? this.options.contentOption.saveParams.pageSize
        : 20;
    if (
      window.location.href.indexOf("/edit/addOrEditTemplate") === -1 &&
      window.location.href.indexOf("/index/templateManage") === -1
    ) {
      _this.fullLoading = true;
      _this.fetchColumnInfo();
    }
    _this.getDataDebounce = _this.debounce(_this.maxHeightMehod, 400); // 获取最大高度时防抖处理
  },
  methods: {
    refresh() {},
    fetchColumnInfo() {
      this.fullLoading = true;
      getNewsColumnTree()
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              let params =
                this.options.contentOption.saveParams &&
                this.options.contentOption.saveParams.params
                  ? this.options.contentOption.saveParams.params
                  : [];
              res.data.map(item => {
                let filterData = params.filter(p => p.id === item.id);
                if (filterData && filterData.length) {
                  item.isVisible = filterData[0].isVisible;
                  item.isAllCloumn = filterData[0].isAllCloumn;
                  if (item.child && item.child.length) {
                    let filterChild = filterData[0].child || [];
                    item.child.map(childItem => {
                      let filterChildData = filterChild.filter(
                        f => f.id === childItem.id
                      );
                      if (filterChildData && filterChildData.length) {
                        childItem.checked = filterChildData[0].checked;
                      } else {
                        childItem.checked = true;
                      }
                    });
                  }
                } else {
                  item.isVisible = true;
                  item.isAllCloumn = true;
                  if (item.child && item.child.length) {
                    item.child.map(childItem => {
                      childItem.checked = true;
                    });
                  }
                }
              });
              this.activeKey = res.data[0].id + "";
              this.dataTypeList = res.data;
              this.fetchNewsInfo();
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    startScroll() {
      let _this = this;
      let index = _this.mySwiper ? _this.mySwiper.activeIndex : 0;
      let id = _this.options.domId + "_" + index;
      this.el = document.getElementById(_this.options.domId);
      let ul = document.getElementById(id);
      if (ul) {
        let ulH = ul.offsetHeight;
        if (ulH > _this.options.component.height) {
          _this.overflowValue = "auto";
        } else {
          _this.overflowValue = "hidden";
        }
        let liList = ul.querySelectorAll("li");
        let hList = [];
        if (liList) {
          for (let i = 0; i < liList.length; i++) {
            hList.push(liList[i].offsetHeight);
          }
        }
        let maxH = Math.max(...hList);
        _this.maxH = maxH ? maxH : 200;
        _this.autoScroll(maxH, 10, 3000, this.el);
      }
    },
    maxHeightMehod() {
      let _this = this;
      window.clearInterval(_this.initNewsTask);
      let longWord = document.getElementById(_this.options.domId + "longWord");
      if (longWord) {
        let elInfo = longWord.getBoundingClientRect();
        let newsTop = document.getElementsByClassName("news-top")[0];
        if (newsTop) {
          let allInfo = newsTop.getClientRects();
          let count = allInfo[0].width / elInfo.width;
          _this.strLen = count * 2 > 0 ? count * 2 : 100;
          allInfo = null;
          count = null;
        }
        elInfo = null;
        newsTop = null;
      }
      window.localStorage.setItem("newsTwoStartTime", new Date().getTime());
      setTimeout(function() {
        longWord = null;
        _this.el = null;
        _this.startScroll();
      }, 10);
    },
    findLongestWord(list) {
      let that = this;
      let dataList = [];
      list.map(item => {
        let strSplit = item.child;
        let longestWord = strSplit.reduce(function(longest, currentWord) {
          return that.getLength(currentWord.content) > that.getLength(longest)
            ? currentWord.content
            : longest;
        }, "");
        dataList.push(longestWord);
      });

      let longestWord2 = dataList.reduce(function(longest, currentWord) {
        return that.getLength(currentWord) > that.getLength(longest)
          ? currentWord
          : longest;
      }, "");

      return longestWord2;
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
    async fetchNewsInfo() {
      let _this = this;
      let newsList = [];
      let hasUseData = _this.dataTypeList.filter(item => item.isVisible);
      for (let i = 0; i < hasUseData.length; i++) {
        let params = {
          articleNum: null,
          endTime: new Date().getTime(),
          labelId: [],
          pageNum: 1,
          pageSize: _this.flashNum,
          searchMap: [],
          sortKey: "articleTime",
          sortType: "desc",
          startTime: null,
          tagSearchInfo: ""
        };
        if (hasUseData[i].isAllCloumn) {
          params.tagSearchInfo = hasUseData[i].columnRuleToPlatform;
        } else {
          let child = hasUseData[i].child;
          if (child && child.length) {
            let filterData = child.filter(childItem => childItem.checked);
            if (filterData.length === 1) {
              params.tagSearchInfo = filterData[0].columnRuleToPlatform;
              if (filterData[0].child && filterData[0].child.length) {
                params.labelId = filterData[0].child.map(res => res.relTagId);
              }
            } else {
              params.tagSearchInfo = hasUseData[i].columnRuleToPlatform;
              params.labelId = filterData.map(res => res.relTagId);
            }
          } else {
            params.tagSearchInfo = hasUseData[i].columnRuleToPlatform;
          }
        }
        const { data } = await getNewsList(params);
        let regEx_html = /<[^>]+>/gi;
        if (data && data.length) {
          data.map(item => {
            let content = item.content.replace(regEx_html, "");
            item.content = content.substring(0, 300);
          });
          newsList.push({
            id: hasUseData[i].id,
            name: hasUseData[i].columnName,
            child: data
          });
        }
      }
      _this.newsList = newsList;
      _this.fullLoading = false;
      _this.getDataDebounce = _this.debounce(_this.maxHeightMehod, 400); // 获取最大高度时防抖处理
      _this.getDataDebounce && _this.getDataDebounce();
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
      let _this = this;
      let step = 1;
      element.scrollTop = 0;
      if (element.offsetHeight !== element.scrollHeight) {
        // 元素内容没有溢出时，不触发
        setTimeout(function() {
          _this.start(element, step, speed, stepLength, delay);
        }, delay);
      }
    },
    init(element, position, delay, step, speed, stepLength) {
      let _this = this;
      element.scrollTop = 0;
      window.clearInterval(_this.initNewsTask);
      if (position === "bottom") {
        let count = _this.mySwiper.slides.length;
        let activeIndex = _this.mySwiper.activeIndex;
        console.log("activeIndex", activeIndex);
        if (count - 1 === activeIndex) {
          let endTime = new Date().getTime();
          let startTime = window.localStorage.getItem("newsTwoStartTime");
          if (startTime && endTime) {
            let t = Number(endTime) - Number(startTime);
            if (t > 30 * 60 * 1000) {
              element = null;
              window.clearInterval(_this.initNewsTask);
              _this.fetchNewsInfo();
              //此处调用查询接口
              return;
            }
          }
          window.clearTimeout(_this.time);
          _this.mySwiper.slideTo(0, 300, false); //切换到第一个slide，速度为1秒
          _this.time = setTimeout(function() {
            window.clearInterval(_this.initNewsTask);
            element = null;
            _this.startScroll();
          }, delay);
        } else {
          _this.mySwiper.slideTo(activeIndex + 1, 300, false); //切换到第一个slide，速度为1秒
          window.clearTimeout(_this.time2);
          _this.time2 = setTimeout(function() {
            _this.start(element, step, speed, stepLength, delay);
          }, delay);
        }
        count = null;
        activeIndex = null;
      } else {
        window.clearTimeout(_this.time3);
        _this.time3 = setTimeout(function() {
          _this.start(element, step, speed, stepLength, delay);
        }, delay);
      }
    },
    start(element, step, speed, stepLength, delay) {
      let _this = this;
      element.scrollTop += step;
      window.clearInterval(_this.initNewsTask);
      _this.initNewsTask = setInterval(function() {
        _this.scrolling(element, step, speed, stepLength, delay);
      }, speed);
    },
    scrolling(element, step, speed, stepLength, delay) {
      let _this = this;
      if (
        element.scrollTop % stepLength !== 0 &&
        element.scrollTop != element.scrollHeight - element.offsetHeight
      ) {
        element.scrollTop += step;
      } else {
        window.clearInterval(_this.initNewsTask);
        if (element.scrollTop === element.scrollHeight - element.offsetHeight) {
          // 触顶或触底
          window.clearTimeout(_this.time4);
          _this.time4 = setTimeout(function() {
            _this.init(element, "bottom", delay, step, speed, stepLength);
          }, delay);
          //step *= -1; // 转换方向
        } else {
          window.clearTimeout(_this.time5);
          _this.time5 = setTimeout(function() {
            _this.start(element, step, speed, stepLength, delay);
          }, delay);
        }
      }
    },
    computeStyle(obj, type) {
      let style = "";
      const { basicStyle, titleStyle, contentStyle, sourceStyle } = obj;
      if (type === "basis") {
        Object.keys(basicStyle).forEach(key => {
          style += `${this.replaceWord(key)}: ${basicStyle[key]};`;
        });
      } else {
        let objectStyle =
          type === "title"
            ? titleStyle
            : type === "content"
            ? contentStyle
            : sourceStyle;
        Object.keys(objectStyle).forEach(key => {
          if (
            key === "fontSize" ||
            key === "lineHeight" ||
            key === "letterSpacing"
          ) {
            style += `${this.replaceWord(key)}: ${objectStyle[key]}px;`;
          } else if (key === "fontWeight") {
            style += `${this.replaceWord(key)}: ${objectStyle[key][key]};`;
          } else {
            style += `${this.replaceWord(key)}: ${objectStyle[key]};`;
          }
        });
      }
      return style;
    },
    // 转换key
    replaceWord(str) {
      return str.replace(/[A-Z]/g, word => {
        return `-${word.toLocaleLowerCase()}`;
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
    }
  },
  destroyed() {
    window.clearTimeout(this.time);
    window.clearTimeout(this.time2);
    window.clearTimeout(this.time3);
    window.clearTimeout(this.time4);
    window.clearTimeout(this.time5);
    window.clearInterval(this.initNewsTask);
  },
  watch: {
    options: {
      immediate: true,
      handler(val) {
        let _this = this;
        if (val.contentOption) {
          if (val.contentOption) {
            if (
              val.contentOption.data === "" ||
              !val.contentOption.data.length
            ) {
              _this.fullLoading = true;
              _this.newsList = val.contentOption.data;
            } else {
              let list = val.contentOption.data.filter(item => item.isVisible);
              _this.fullLoading = false;
              _this.newsList = list;
            }
            _this.wrapperStyle = _this.computeStyle(val.contentOption, "basis");
            _this.titleStyle = _this.computeStyle(val.contentOption, "title");
            _this.contentStyle = _this.computeStyle(
              val.contentOption,
              "content"
            );
            _this.sourceStyle = _this.computeStyle(val.contentOption, "source");
          }
          if (_this.getDataDebounce) {
            _this.getDataDebounce && _this.getDataDebounce();
          } else {
            _this.getDataDebounce = _this.debounce(_this.maxHeightMehod, 400); // 获取最大高度时防抖处理
            _this.getDataDebounce && _this.getDataDebounce();
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.news-list-container {
  display: flex;
  flex-direction: column;
  .news-list-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    padding: 0 10px;
    line-height: 2em;
  }
  .news-list-content {
    width: 100%;
    height: 100%;
    flex: "auto";
    overflow: hidden;
    .news-list {
      width: 100%;
      height: 100%;
      .prcie-marquee {
        // display: flex;
        // align-items: center;
        // margin-top: 30px;
        // overflow: hidden;
        .newsListSwiper {
          .news-ul {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            list-style: none;
            li {
              padding-left: 30px;
              padding-right: 31px;
              padding-top: 28px;
              padding-bottom: 29px;

              &:not(:last-child) {
                border-bottom: 1px solid #1a7bc4;
              }

              .news-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .news-title-area {
                  width: 70%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  display: inline-block;
                }
              }
              .news-middle {
                height: auto;
                overflow: hidden;
                margin-top: 22px;
                .overhide {
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  cursor: pointer;
                }
              }
              .text-hidden {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }

    .news-list::-webkit-scrollbar {
      width: 0!important;
      height: 0!important;
      opacity: 0!important;
      -webkit-appearance: none;
    }

    .news-list::-webkit-scrollbar-track {
      background-color: transparent;
    }

    .news-list::-webkit-scrollbar-thumb {
      border-radius: 7px;
      background-color: #0e3856;
      opacity: 0;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    }

    .news-list::-webkit-scrollbar-button {
      background-color: transparent;
      height: 0;
      width: 0;
    }

    .news-list::-webkit-scrollbar-corner {
      background: 0 0;
    }

    .news-list::-webkit-scrollbar:vertical {
      height: 10px;
      width: 10px;
    }
  }
  .longWord {
    position: fixed;
    opacity: 0;
    .long-word {
      margin-left: 30px;
      margin-right: 31px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
