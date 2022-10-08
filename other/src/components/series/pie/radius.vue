<template>
  <a-row class="radius-number" type="flex" :glutter="20">
    <a-col class="relative" :span="12">
      <a-input-number
        :min="0"
        :step="1"
        :precision="0"
        :value="form.start"
        @change="handleChange($event, 'start')"
      ></a-input-number>
      <span class="info">半径开始</span>
    </a-col>
    <a-col class="relative" :span="12">
      <a-input-number
        :min="0"
        :step="1"
        :precision="0"
        :value="form.end"
        @change="handleChange($event, 'end')"
      ></a-input-number>
      <span class="info">半径结束</span>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'RadiusNumber',
  props: ['value'],
  data() {
    return {
      form: {
        start: 0,
        end: 0
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = Object.assign({}, this.form, {
            start: val[0],
            end: val[1]
          })
        }
      }
    }
  },
  methods: {
    handleChange(val, key) {
      const value = { ...this.form, [key]: val }
      this.$emit('change', [value.start, value.end])
    }
  }
}
</script>
<style lang="scss" scoped>
.radius-number {
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
