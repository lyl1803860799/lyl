<template>
  <div
    class="news-range-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="news-range-header"
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
      class="news-range-content"
      :style="{
        height: `${
           options.component.height
        }px`
      }"
    >
      <div class="news-range" :style="wrapperStyle">
        <div class="prcie-marquee" :style="contentStyle">
          <span class="type-item">资讯</span>
          <div class="notice-items" :ref="options.domId+'_noticeBox'" style="width:(100% -50px);min-height: 20px;">
            <div class="notice-items-inner" :ref="options.domId+'_noticeInner'">
              <span v-for="news in storageItems" :key="news.id" class="new-title-item">
                <span v-if="isToDay(news.showTime)">{{news.showTime | dateHour}}</span>
                <span v-if="!isToDay(news.showTime)">{{news.showTime | dateDay}}</span>
                &nbsp;{{ news.title }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from "moment";
import { getHomeNewsMenu, isNewest } from "@/api/source";
export default {
  name: "NewsRange",
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
      array: [],
      wrapperStyle: "",
      contentStyle: "height:100%;",
      textEl: "",
      time: "",
      defaultFormat: "YYYY-MM-DD HH:mm:ss",
      clockInterval: null,
      storageItems: [],
      scrollamount: 6,
      infoChannels: ["360"],
      hotChannels: ["318", "4530", "4628", "4649"],
      infoNewestTime: null,
      hotNewestTime: null,
      toDay: null, //用于判断新闻是否为今日新闻的变量
      initNewsTask: null,
      scrollNewsInterval: null
    };
  },
  async mounted() {
    let _this = this;
    if (this.scrollNewsInterval) {
      window.cancelAnimationFrame(this.scrollNewsInterval);
    }
    _this._initNews();
    /** 每隔3分钟调一次 */
    let time = 3 * 60 * 1000;
    _this.initNewsTask = window.setInterval(() => {
      if (_this.scrollNewsInterval) {
        window.cancelAnimationFrame(_this.scrollNewsInterval);
      }
      _this._initNews();
    }, time);
    window.onresize = () => {
      if (_this.$refs.marquee) {
        try {
          let width = _this.$refs.marquee.nativeElement.clientWidth;
          _this.scrollamount = (width / 4000) * 13;
          _this.$refs.marquee.nativeElement.setAttribute(
            "scrollamount",
            _this.scrollamount
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
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
            style += `${this.replaceWord(key)}: ${basicStyle[key]};`;
          }
        } else {
          Object.keys(basicStyle[key]).forEach(kk => {
            if (basicStyle[key][kk]) {
              style += `${this.replaceWord(kk)}: ${basicStyle[key][kk]};`;
            }
          });
        }
      });

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
      let infoChannels = this.infoChannels;
      let hotChannels = this.hotChannels;

      if (this.infoNewestTime == null || this.hotNewestTime == null) {
        this.updateInfo();
        this.updateHot();
      } else {
        if (this.infoNewestTime) {
          isNewest({
            channelId: infoChannels,
            showTime: this.infoNewestTime
          }).then(info => {
            if (!info.isNewest) {
              this.updateInfo();
            }
            if (this.hotNewestTime) {
              isNewest({
                channelId: hotChannels,
                showTime: this.hotNewestTime
              }).then(hot => {
                if (!hot.isNewest) {
                  if (info.isNewest) {
                    this.parseNews(this.infoNewsData);
                  }
                  this.updateHot();
                } else {
                  this.parseNews(this.hotNewsData);
                }
              });
            }
          });
        }
      }
    },
    async updateInfo() {
      const { data } = await getHomeNewsMenu({
        channelId: this.infoChannels,
        pageSize: 20
      });
      console.log('updateInfo',data)
      if (data && data.length) {
        this.storageItems.length = 0;
        this.parseNews(data);
        this.infoNewsData = data;
        this.infoNewestTime = data[0].showTime;
        if (this.scrollNewsInterval) {
          window.cancelAnimationFrame(this.scrollNewsInterval);
        }
        setTimeout(this.initHorseLamp, 3000);
      }
    },
    async updateHot() {
      const { data } = await getHomeNewsMenu({
        channelId: this.hotChannels,
        pageSize: 20
      });
      console.log('updateHot',data)
      if (data && data.length) {
        this.storageItems.length = 0;
        this.parseNews(data);
        this.hotNewsData = data;
        this.hotNewestTime = data[0].showTime;
        if (this.scrollNewsInterval) {
          window.cancelAnimationFrame(this.scrollNewsInterval);
        }
        setTimeout(this.initHorseLamp, 3000);
      }
    },
    parseNews(data) {
      if (!data) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        this.storageItems.push(item);
      }
      this.toDay = new Date();
    },
    //用于判断是不是今天的新闻。
    isToDay(dateTime) {
      if (!dateTime || dateTime === "") return false;
      var date = new Date(dateTime);
      if (date.getDate() == this.toDay.getDate()) {
        return true;
      }
      return false;
    },
    initHorseLamp() {
      let boxWidth = this.$refs[this.options.domId+"_noticeBox"]?this.$refs[this.options.domId+"_noticeBox"].offsetWidth:0;
      let innerWidth = 0;
      let child = this.$refs[this.options.domId+"_noticeInner"]?this.$refs[this.options.domId+"_noticeInner"].childNodes:0;
      if(child){
        let count = 0;
        //console.log(child)
        child.forEach(item => {
          if (item.nodeType === 1) {
            innerWidth += parseInt(
              window.getComputedStyle(item).width.split("px")[0]
            );
            count++;
          }
        });
        innerWidth += boxWidth * (count - 1);
        console.log(innerWidth, boxWidth);
        if (innerWidth > boxWidth) {
          let padding = 0;
          let animation = () => {
            padding -= 1;
            if(this.$refs[this.options.domId+"_noticeInner"]){
              this.$refs[this.options.domId+"_noticeInner"].style.cssText = `transform: translate3d(${padding}px, 0, 0)`;
            }
            if (
              padding ===
              -(
                innerWidth -
                parseInt(
                  window
                    .getComputedStyle(child[child.length - 1])
                    .width.split("px")[0]
                )
              )
            ) {
              padding = 0;
              if(this.$refs[this.options.domId+"_noticeInner"]){
                this.$refs[this.options.domId+"_noticeInner"].style.cssText = `transform: translate3d(${padding}px, 0, 0)`;
              }
            }
            this.scrollNewsInterval = requestAnimationFrame(animation);
          };
          animation();
        }
      }
    },
    clearTimeMethod() {
      window.cancelAnimationFrame(this.scrollNewsInterval);
    },
    addTimeMethod() {
      setTimeout(this.initHorseLamp, 10);
    }
  },
  destroyed() {
    window.cancelAnimationFrame(this.scrollNewsInterval);
    window.clearInterval(this.initNewsTask);
  },
  watch: {
    options: {
      immediate: true,
      handler(val) {
        let _this = this;
        if (val.contentOption) {
          //console.log("------", val.contentOption);
          _this.wrapperStyle = _this.computeWrapStyle(val.contentOption);
          _this.contentStyle = _this.computedStyle(val.contentOption);
          _this.textEl = _this.createTextEl(val.contentOption);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.news-range-container {
  display: flex;
  flex-direction: column;
  .news-range-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    padding: 0 10px;
    line-height: 2em;
  }
  .news-range-content {
    width: 100%;
    height: 100%;
    flex: "auto";
    overflow: hidden;
    .news-range {
      width: 100%;
      height: 100%;
      .prcie-marquee {
        display: flex;
        align-items: center;
        .notice-items {
          flex: 1;
          display: flex;
          overflow: hidden;

          .notice-items-inner {
            display: flex;
            width: 100%;
            .new-title-item {
              //overflow: hidden;
              white-space: nowrap;
              //text-overflow: ellipsis;
              padding-right: 54px;
            }
          }
        }
        .type-item {
          width: 45px;
          min-width: 45px;
          margin: 0 10px;
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
