<template>
  <div
    class="text-block-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="text-block-header"
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
    <div class="text-block-content">
      <div class="text-block" :style="wrapperStyle" @dblclick="dbTextArea">
        <textarea
          v-show="isDisabaled"
          v-model="options.contentOption.data"
          class="mutil-text"
          :style="contentStyle"
          maxlength="1000"
          @blur="disableInput"
          @change="inputTxt"
        ></textarea>
        <span v-show="!isDisabaled" :style="contentStyle">
          {{options.contentOption.data}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextBlock",
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
      isDisabaled: false,
      wrapperStyle: "",
      contentStyle: "cursor:move;",
      textEl: ""
    };
  },
  methods: {
    refresh() {},
    computedStyle(obj) {
      //console.log(obj)
      const { basicStyle } = obj;
      let style = this.isDisabaled ? "cursor:text;" : "cursor:move;";
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
      const { transform, basicStyle, marquee } = obj;
      if (transform.type === "skew") {
        style += `transform: ${transform.type}(${transform.x ||
          0}deg, ${transform.y || 0}deg);`;
      } else if (transform.type === "rotate") {
        style += `transform: rotateX(${transform.x ||
          0}deg) rotateY(${transform.y || 0}deg) rotateZ(${transform.z ||
          0}deg);`;
      }

      if (marquee.show && marquee.direction) {
        style += `animation: ${
          marquee.direction === "right" ? "marqueeLeft" : "marqueeTop"
        } 5s linear 0s infinite;`;
      }

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
    dbTextArea(e) {
      this.contentStyle = this.contentStyle.replace(
        "cursor:move;",
        "cursor:text;"
      );
      this.isDisabaled = true;
      e.target.focus();
      e.target.select && e.target.select();
    },
    disableInput() {
      this.contentStyle = this.contentStyle.replace(
        "cursor:text;",
        "cursor:move;"
      );
      this.isDisabaled = false;
    },
    inputTxt(e) {
      this.options.contentOption.data = e.target.value;
      this.options.contentOption.transformedData = e.target.value;
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(val) {
        if (val.contentOption) {
          //console.log("------", val.contentOption);
          this.wrapperStyle = this.computeWrapStyle(val.contentOption);
          this.contentStyle = this.computedStyle(val.contentOption);
          this.textEl = this.createTextEl(val.contentOption);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text-block-container {
  display: flex;
  flex-direction: column;
  .text-block-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    padding: 0 10px;
    line-height: 2em;
  }
  .text-block-content {
    width: 100%;
    height: 100%;
    flex: "auto";
    overflow: hidden;
    .text-block {
      width: 100%;
      height: 100%;
      //word-break: break-all;
      //word-wrap: break-word;
      .mutil-text {
        width: 100%;
        height: 100%;
        color: #fff;
        background: unset;
        overflow-y: hidden;
        border: 0 !important;
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
