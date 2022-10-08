<template>
  <div
    class="image-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="image-header"
      v-show="showTitle"
      :style="{
        fontFamily: options.title.style && options.title.style.fontFamily,
        fontSize: `${options.title.style && options.title.style.fontSize}px`,
        lineHeight: `${(options.title.style && options.title.style.fontSize * 2 + 'px') || 2}`,
        opacity: isSave ? 0 : 1
      }"
    >
      {{ options.title.name }}
    </div> -->
    <div
      :class="options.domId"
      :ref="options.domId"
      class="image"
    >
      <img :style="imgStyle" :src="options.contentOption.data" v-if="options.contentOption.data" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BiImage',
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
        return false
      }
    }
  },
  data() {
    return {
      imgStyle: ''
    }
  },
  methods: {
    refresh() {},
    computeImgStyle(styleObj) {
      const { style } = styleObj
      let styleStr = ''
      Object.keys(style || {}).forEach((key) => {
        if (key === 'rotate') {
          styleStr += `transform: rotate(${style[key]}deg);`
        } else if (key === 'boxShadow') {
          styleStr += `box-shadow: ${style[key].color} ${style[key].h} ${style[key].v} ${style[key].blur}`
        } else if (key === 'borderRadius') {
          styleStr += `border-radius: ${style[key]}px;`
        } else {
          styleStr += `${key}: ${style[key]};`
        }
      })
      this.imgStyle = styleStr
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.contentOption) {
          this.computeImgStyle(val.contentOption)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-container {
  display: flex;
  flex-direction: column;
  .image-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    line-height: 1.2em;
    padding: 0 10px;
  }
  .image {
    width: 100%;
    height: 100%;
    flex: 'auto';
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
