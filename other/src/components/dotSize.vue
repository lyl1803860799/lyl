<template>
  <span class="dot-size">
    <a-input-number
      :min="0"
      :step="1"
      :precision="0"
      :value="width"
      @change="handleNumberChange($event, 'width')"
    ></a-input-number>
    <a-input-number
      :min="0"
      :step="1"
      :precision="0"
      :value="height"
      @change="handleNumberChange($event, 'height')"
    ></a-input-number>
  </span>
</template>

<script>
export default {
  name: 'DotSize',
  props: ['value'],
  data() {
    const value = this.value || {}
    return {
      width: value.width || 0,
      height: value.height || 0
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          if (!isNaN(val)) {
            this.width = val
            this.height = val
          } else {
            this.width = val[0] || 0
            this.height = val[1] || 0
          }
        }
      }
    }
  },
  methods: {
    handleNumberChange(e, key) {
      const data = { ...this.$data, ...{ [key]: e } }
      this.$emit('change', [data.width, data.height])
    }
  }
}
</script>

<style lang="scss" scoped>
.dot-size {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
