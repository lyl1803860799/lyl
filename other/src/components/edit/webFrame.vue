<template>
  <div class="frame-container" :style="{ width: `${options.component.width}px`, height: `100%` }">
    <!-- <div
      class="frame-header"
      v-show="showTitle"
      :style="{
        fontFamily: options.title.style && options.title.style.fontFamily,
        fontSize: `${options.title.style && options.title.style.fontSize}px`,
        lineHeight: `${(options.title.style && options.title.style.fontSize * 2 + 'px') || 2}`,
        opacity: isSave ? 0 : 1
      }"
    >{{ options.title.name }}</div>-->
    <div class="frame">
      <template v-if="showFrame">
        <a-icon
          v-if="options.contentOption.showClose"
          type="close-square"
          theme="filled"
          class="frame-close"
          @click="() => (showFrame = false)"
        ></a-icon>
        <iframe
          class="iframe"
          :style="{
            width: `${options.component.width}px`,
            height: `100%`,
            overflow:`hidden`
          }"
          :src="options.contentOption.src"
          frameborder="0"
          :name="options.domId"
          :ref="options.domId"
          sandbox="allow-scripts allow-same-origin allow-popups"
        ></iframe>
        <div
          class="define-gray-modal"
          :style="{
            width: `${options.component.width}px`,
            height: `100%`,
            cursor:isEdit?'move':'unset'
          }"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebFrame",
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
      isEdit: false,
      showFrame: true
    };
  },
  mounted() {
    if (window.location.href.indexOf("/edit/") > -1) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  },
  methods: {
    refresh() {
      try {
        let _this = this;
        let src = this.options?.contentOption.src;
        if (window.top.location.href.indexOf("/edit/") > -1) {
          setTimeout(function() {
            let parentFrame =
              _this.$refs[_this.options.domId].contentWindow.parent;
            if (_this.$refs[_this.options.domId] && parentFrame) {
              console.log("parentFrame", parentFrame);
              if (parentFrame && parentFrame.length) {
                let parentSrc = parentFrame.location.href;
                console.log(window.location.origin, parentSrc);
                console.log(src, parentSrc);
                if (
                  src &&
                  parentSrc &&
                  src.indexOf("/show.html#programDetail") > -1 &&
                  (parentSrc.indexOf("/show.html#programDetail") > -1 ||
                    parentSrc.indexOf("/show.html#/programDetail") > -1)
                ) {
                  let index =
                    src.indexOf("show.html#programDetail") ||
                    src.indexOf("/show.html#/programDetail");
                  let str = src
                    .substr(index)
                    .replace("show.html#programDetail", "")
                    .replace("show.html#/programDetail", "");
                  let newUrl =
                    window.location.origin + "/mtv_ui/#/programDetail" + str;
                  console.log("-----parentFrame------", parentFrame);
                  console.log("-----newUrl------", newUrl);

                  _this.$refs[_this.options.domId].src = newUrl;
                  // _this.$refs[_this.options.domId].onload = function() {
                  //   let childFrame = _this.$refs[
                  //     _this.options.domId
                  //   ].contentWindow.document.getElementById("app");
                  //   console.log(childFrame.querySelectorAll("iframe"))
                  //   console.log("加载完成", childFrame);
                  // };
                  //childFrame[0].setAttribute("src", newUrl);
                } else {
                  _this.$refs[_this.options.domId].src = src;
                  // _this.$refs[_this.options.domId].onload = function() {
                  //   let childFrame = _this.$refs[
                  //     _this.options.domId
                  //   ].contentWindow.document.getElementById("app");
                  //   console.log(childFrame.querySelectorAll("iframe"))
                  //   console.log("加载完成", childFrame);
                  // };
                }
              } else {
                _this.$refs[_this.options.domId].src = src;
              }
            } else {
              _this.$refs[_this.options.domId].src = src;
            }
          }, 1);
        } else {
          _this.$refs[_this.options.domId].src = src;
        }
        //frames[this.options.domId] && frames[this.options.domId].contentWindow && frames[this.options.domId].contentWindow.location.reload(true);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.frame-container {
  display: flex;
  flex-direction: column;
  .frame-header {
    text-align: left;
    @extend .ft-12;
    color: $white;
    line-height: 1.2em;
    padding: 0 10px;
  }
  .frame {
    width: 100%;
    height: 100%;
    flex: "auto";
    position: relative;

    &-close {
      font-size: 24px;
      position: absolute;
      right: 0.5em;
      top: 0.5em;
      color: $circleGrey;
    }
  }
}

.define-gray-modal {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.05);
  cursor: move;
}
</style>
