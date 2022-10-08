<template>
  <a-row class="position-number" type="flex" :glutter="20">
    <a-col class="relative" :span="12">
      <a-input-number
        :min="0"
        :step="1"
        :max="100"
        :precision="0"
        :value="form[0]"
        @change="handleChange($event, 0)"
      ></a-input-number>
      <span class="info">左右位置</span>
    </a-col>
    <a-col class="relative" :span="12">
      <a-input-number
        :min="0"
        :step="1"
        :max="100"
        :precision="0"
        :value="form[1]"
        @change="handleChange($event, 1)"
      ></a-input-number>
      <span class="info">上下位置</span>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'PositionNumber',
  props: ['value'],
  data() {
    return {
      form: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.$set(this, 'form', val || [])
      }
    }
  },
  methods: {
    handleChange(val, key) {
      this.form[key] = val || 0
      this.$emit('change', [...this.form])
    }
  }
}
</script>
<style lang="scss" scoped>
.position-number {
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
