<template>
  <div
    class="carousel-container"
    :style="{ width: `${options.component.width}px`, height: `100%` }"
  >
    <!-- <div
      class="carousel-header"
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
    <main-carousel
      :ref="options.domId"
      type="card"
      indicator-position="none"
      class="carousel"
      :style="{
        height: `${options.component.height}px`
      }"
      :interval="options.contentOption.interval ? options.contentOption.interval * 1000 : 2000"
      :play-direction="options.contentOption.playDirection"
      :item-array="options.contentOption.data"
      :style-obj="styleObj"
    />
  </div>
</template>

<script>
import MainCarousel from './list'

export default {
  name: 'BiCarousel',
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
  components: { MainCarousel },
  data() {
    return {}
  },
  computed: {
    styleObj() {
      return {
        titleStyle: this.options?.contentOption?.titleStyle || {},
        statusStyle: this.options?.contentOption?.statusStyle || {},
        contentStyle: this.options?.contentOption?.contentStyle || {}
      }
    }
  },
  methods: {
    refresh() {
      const carousel = this.$refs[this.options.domId]
      carousel && carousel.setActiveItem(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-container {
  display: flex;
  flex-direction: column;
  .carousel-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    line-height: 1.2em;
    padding: 0 10px;
  }
  .carousel {
    width: 100%;
    height: 100%;
    flex: 1;
    position: relative;
  }
}
</style>
