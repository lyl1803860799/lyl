<template>
  <div class="axis-line">
    <a-icon
      class="m-right-10"
      :type="show ? 'eye' : 'eye-invisible'"
      @click="handleChange(!show, 'show')"
    />
    <color-input type="color" :elId="elId"
          :showInput="true" :value="color" @change="handleChange($event, 'color')" />
  </div>
</template>

<script>
import ColorInput from './colorInput'

export default {
  name: 'AxisLine',
  props: ['value','elId'],
  data() {
    return {
      show: false,
      color: '#ffffff'
    }
  },
  components: {
    ColorInput
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.show = val?.show || false
        this.color = val?.lineStyle?.color || '#ffffff'
      }
    }
  },
  methods: {
    handleChange(e, key) {
      if (key === 'color') {
        this.$emit('change', { lineStyle: { color: e }, show: this.show })
      } else {
        this.$emit('change', { lineStyle: { color: this.color }, [key]: e })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.axis-line {
  display: flex;
  align-items: center;
  color: $white;
}
</style>
