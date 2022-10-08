<template>
  <div
    class="time-range-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="time-range-header"
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
      class="time-range-content"
      :style="{
        height: `${
           options.component.height
        }px`
      }"
    >
      <div class="time-range" :style="wrapperStyle">
        <div :style="contentStyle">{{time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeRange",
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
      wrapperStyle: "",
      contentStyle: "height:100%;",
      textEl: "",
      time: "",
      defaultFormat: "YYYY-MM-DD HH:mm:ss",
      clockInterval: null
    };
  },
  mounted() {
    let _this = this;
    window.clearInterval(_this.clockInterval);
    let formatType = this.options.contentOption.dataTransform && this.options.contentOption.dataTransform.dateFormatter? this.options.contentOption.dataTransform.dateFormatter:"YYYY-MM-DD HH:mm:ss";
    _this.clockInterval = window.setInterval(() => {
      _this.getTime(formatType);
    }, 1000);
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
    getTime(format) {
      let dt = new Date();
      let year = dt.getFullYear();
      let month = this.IfZero(dt.getMonth() + 1);
      let days = this.IfZero(dt.getDate());
      //let def = dt.getTimezoneOffset() / 60;
      //let gmt = dt.getHours() + def;
      let time = "";
      if (format === "YYYY-MM-DD HH:mm:ss") {
        time =
          year +
          "-" +
          month +
          "-" +
          days +
          " " +
          this.IfZero(dt.getHours()) +
          ":" +
          this.IfZero(dt.getMinutes()) +
          ":" +
          this.IfZero(dt.getSeconds());
      } else if (format === "YYYY-MM-DD") {
        time = year + "-" + month + "-" + days;
      } else if (format === "HH:mm:ss") {
        time =
          this.IfZero(dt.getHours()) +
          ":" +
          this.IfZero(dt.getMinutes()) +
          ":" +
          this.IfZero(dt.getSeconds());
      }
      this.time = time;
    },
    IfZero(num) {
      return num <= 9 ? "0" + num : num;
    },
    check24(hour) {
      return hour >= 24 ? hour - 24 : hour;
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(val) {
        let _this = this;
        if (val.contentOption) {
          if (
            val.contentOption.dataTransform.dateFormatter != _this.defaultFormat
          ) {
            window.clearInterval(_this.clockInterval);
            _this.clockInterval = window.setInterval(() => {
              _this.getTime(val.contentOption.dataTransform.dateFormatter);
            }, 1000);
            _this.defaultFormat = val.contentOption.dataTransform.dateFormatter;
          }
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
.time-range-container {
  display: flex;
  flex-direction: column;
  .time-range-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    padding: 0 10px;
    line-height: 2em;
  }
  .time-range-content {
    width: 100%;
    height: 100%;
    flex: "auto";
    overflow: hidden;
    .time-range {
      width: 100%;
      height: 100%;
      //word-break: break-all;
      //word-wrap: break-word;
      .mutil-text {
        width: 100%;
        height: 100%;
        color: #fff;
        background: unset;
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
