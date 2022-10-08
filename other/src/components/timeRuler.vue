<template>
  <canvas
    class="canvas"
    :id="domId"
    :style="`width: ${domWidth}px; height: ${domHeight}px;`"
  ></canvas>
</template>

<script>
import TimeRuler from '@/utils/timeRuler'

export default {
  name: 'TimeRule',
  props: {
    domId: String,
    start: {
      type: Number,
      default: 0
    },
    width: Number,
    height: Number,
    domWidth: Number,
    domHeight: Number,
    type: {
      type: Number,
      default: 2
    },
    scale: Number,
    startIndex: Number
  },
  data() {
    return {
      timeRuler: null
    }
  },
  computed: {
    startAndTypeScale() {
      return `${this.type}-${this.start}-${this.scale}-${this.startIndex}-${this.width}-${this.height}`
    }
  },
  methods: {
    generateRule() {
      const canvas = document.getElementById(this.domId)
      if (!canvas) {
        return
      }
      canvas.width = this.domWidth
      canvas.height = this.domHeight
      if (!this.timeRuler) {
        this.timeRuler = new TimeRuler(
          {
            axisWidth: 0.4,
            lineColor: '#626b7a',
            gridWidth: 100,
            gridHeight: 20,
            gridTotalWidth: this.width,
            gridTotalHeight: this.height,
            start: this.start || 0,
            startIndex: this.startIndex || 0,
            scale: this.scale || 1
          },
          canvas
        )
      } else {
        this.timeRuler.setStart(this.start || 0)
        this.timeRuler.setStartIndex(this.startIndex || 0)
        this.timeRuler.setScale(this.scale || 1)
        this.timeRuler.setTotalWidth(this.width || 1)
        this.timeRuler.setTotalHeight(this.height || 1)
      }
      this.timeRuler.init(this.type)
    }
  },
  mounted() {
    this.generateRule()
  },
  watch: {
    startAndTypeScale: {
      immediate: true,
      handler() {
        this.generateRule()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  background: $db45;
}
</style>
