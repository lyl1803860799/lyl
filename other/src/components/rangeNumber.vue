<template>
  <a-row type="flex" :gutter="20" class="range-number">
    <a-col class="relative" :span="12">
      <a-input :value="min" @change="handleNumberChange($event.target.value, 'min')"> </a-input>
      <span class="info">最小值</span>
    </a-col>
    <a-col class="relative" :span="12">
      <a-input :value="max" @change="handleNumberChange($event.target.value, 'max')"> </a-input>
      <span class="info">最大值</span>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'RangeNumber',
  props: ['value'],
  data() {
    return {
      min: null,
      max: null
    }
  },
  watch: {
    value(val) {
      this.min = val.min || null
      this.max = val.max || null
    }
  },
  methods: {
    handleNumberChange(e, key) {
      this.$emit('change', { ...this.$data, [key]: e.trim() ? e.trim() : null })
    }
  }
}
</script>
<style lang="scss" scoped>
.range-number {
  margin-bottom: 20px;
  .relative {
    position: relative;
    color: $white;
    .info {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -25px;
      text-align: center;
    }
  }
}
</style>
