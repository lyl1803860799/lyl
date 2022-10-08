<template>
  <a-row type="flex" align="middle" :gutter="20" class="box-shadow">
    <a-col :span="12" class="item">
      <a-input-number
        :step="1"
        :precision="0"
        :value="shadow.h"
        @change="handleChange($event.target.value, 'h')"
      >
      </a-input-number>
      <span class="label">水平位置</span>
    </a-col>
    <a-col :span="12" class="item">
      <a-input-number
        :step="1"
        :precision="0"
        :value="shadow.v"
        @change="handleChange($event.target.value, 'v')"
      >
      </a-input-number>
      <span class="label">垂直位置</span>
    </a-col>
    <a-col :span="12" class="item">
      <a-input-number
        :min="0"
        :step="1"
        :precision="0"
        :value="shadow.blur"
        @change="handleChange($event.target.value, 'blur')"
      >
      </a-input-number>
      <span class="label">模糊距离</span>
    </a-col>
    <a-col :span="12" class="item">
      <color-input
        :showInput="true"
        :elId="'boxShadowColor'" 
        :placement="'top'"
        :value="shadow.color"
        @change="handleChange($event, 'color')"
      ></color-input>
      <span class="label">颜色</span>
    </a-col>
    <div style="height:200px;width:100%;"></div>
  </a-row>
</template>

<script>
import ColorInput from './colorInput'

export default {
  name: 'BoxShadow',
  props: ['value'],
  data() {
    return {
      shadow: {
        h: 0,
        v: 0,
        blur: 0,
        color: '#ffffff'
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.shadow = Object.assign({}, val || {})
        }
      }
    }
  },
  components: { ColorInput },
  methods: {
    handleChange(value, key) {
      this.$emit('change', { ...this.shadow, [key]: value })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-shadow {
  .item {
    margin-bottom: 10px;
    .label {
      display: block;
      text-align: center;
      line-height: 20px;
      height: 20px;
      font-size: 12px;
      color: $white;
    }
  }
}
</style>
