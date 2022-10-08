<template>
  <div
    class="price-range-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="price-range-header"
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
      class="price-range-content"
      :style="{
        height: `${
           options.component.height
        }px`
      }"
    >
      <div class="price-range" :style="wrapperStyle">
        <div class="prcie-marquee" :style="contentStyle">
          <span class="type-item">行情</span>
          <div class="notice-items" :ref="options.domId+'_noticeBox'" style="width:(100% -50px);min-height: 20px;">
            <div
              class="notice-items-inner"
              :ref="options.domId+'_noticeInner'"

            >
              <span class="price-scroll" v-for="item in storageItems" :key="item.title">
                <span class="price-title">{{item.title}}</span>
                <span class="price-data">
                  <span class="price-old">
                    <label>{{item.oldval}}</label>
                  </span>
                  <span style="width: 50px;">
                    <label v-if="item.name == 'zp'">持平</label>
                    <label v-if="item.name == 'top'" style="color:#EA3B3B;">+{{item.value}}</label>
                    <label v-if="item.name == 'fall'" style="color:#2AA857;">-{{item.value}}</label>
                    <label v-if="item.name == 'Fair'">-</label>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { priceSource } from "@/api/source";
export default {
  name: "PriceRange",
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
      initIndicatorTask: null,
      scrollInterval: null
    };
  },
  async mounted() {
    /** 每隔10分钟调一次 */
    let time = 10 * 60 * 1000;
    let _this = this;
    if (this.scrollInterval) {
      window.cancelAnimationFrame(this.scrollInterval);
    }
    await _this.getPriceData();
    _this.initIndicatorTask = window.setInterval(() => {
      if (_this.scrollInterval) {
        window.cancelAnimationFrame(_this.scrollInterval);
      }
      _this.getPriceData();
    }, time);
    window.onresize = () => {
      try {
        if (_this.$refs.marquee) {
          let width = _this.$refs.marquee.nativeElement.clientWidth;
          _this.scrollamount = (width / 4000) * 13;
          _this.$refs.marquee.nativeElement.setAttribute(
            "scrollamount",
            _this.scrollamount
          );
        }
      } catch (error) {
        console.log(error);
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
    async getPriceData() {
      const { data } = await priceSource();
      this.storageItems = [];
      let storage = data.storageIndicator;
      for (let key in storage) {
        let title,
          value,
          name = "Fair";
        if (storage[key].content) {
          title = storage[key].columns[1].headerName;
          let field = storage[key].columns[1].field;
          let oldval = "-";
          if (storage[key].content.length > 0) {
            oldval = storage[key].content[0][field];
            if (storage[key].content.length == 1) {
              // || storage[key].content[0][storage[key].columns[0].field] != window.DateUtil.formatDate(this.nowDate)) {
              name = "Fair";
              oldval = "-";
            } else if (
              storage[key].content[0][field] > storage[key].content[1][field]
            ) {
              value =
                storage[key].content[0][field] - storage[key].content[1][field];
              name = "top";
            } else if (
              storage[key].content[0][field] < storage[key].content[1][field]
            ) {
              value =
                storage[key].content[1][field] - storage[key].content[0][field];
              name = "fall";
            } else {
              name = "Fair";
            }
          } else {
            name = "Fair";
          }
          let newValue = value ? value.toFixed(2) : "-";
          this.storageItems.push({
            title: title,
            oldval: oldval,
            value: newValue,
            name: name
          });
        }
      }
      setTimeout(this.initHorseLamp, 3000);
      //console.log(this.storageItems);
    },
    initHorseLamp() {
      let boxWidth = this.$refs[this.options.domId+"_noticeBox"]?this.$refs[this.options.domId+"_noticeBox"].offsetWidth:0;
      let innerWidth = 0;
      let child = this.$refs[this.options.domId+"_noticeInner"]?this.$refs[this.options.domId+"_noticeInner"].childNodes:0;
      if(child){
        let count = 0;
        child.forEach(item => {
          if (item.nodeType === 1) {
            innerWidth += parseInt(
              window.getComputedStyle(item).width.split("px")[0]
            );
            count++;
          }
        });
        //innerWidth += boxWidth * (count - 1);
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
            this.scrollInterval = requestAnimationFrame(animation);
          };
          animation();
        }
      }
    },
    clearTimeMethod() {
      window.cancelAnimationFrame(this.scrollInterval);
    },
    addTimeMethod() {
      setTimeout(this.initHorseLamp, 10);
    }
  },
  destroyed() {
    window.cancelAnimationFrame(this.scrollInterval);
    window.clearInterval(this.initIndicatorTask);
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
.price-range-container {
  display: flex;
  flex-direction: column;
  .price-range-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    padding: 0 10px;
    line-height: 2em;
  }
  .price-range-content {
    width: 100%;
    height: 100%;
    flex: "auto";
    overflow: hidden;
    .price-range {
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
            .price-scroll {
              //overflow: hidden;
              white-space: nowrap;
              //text-overflow: ellipsis;
              padding-right: 54px;
              .price-title {
                padding-right: 23px;
                // font-size: 12px;
                // color: #fff;
              }
              .price-data {
                padding-left: 5px;
                .price-old {
                  overflow: hidden;
                  padding-right: 24px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
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
