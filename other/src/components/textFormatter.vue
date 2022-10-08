<template>
  <div class="text-formatter">
    <a-row class="m-bottom-25" type="flex" :gutter="20" align="top">
      <a-col class="relative" span="12">
        <div class="icon-wrapper" @click="handleChange(!show, 'show')">
          <a-icon class="m-right-10 icon" :type="show ? 'eye' : 'eye-invisible'" />
        </div>
        <div class="wrapper">
          <a-select :value="fontFamily" @change="handleChange($event, 'fontFamily')">
            <a-select-option v-for="opt in fontFamilyList" :key="opt" :value="opt">{{
              opt
            }}</a-select-option>
          </a-select>
        </div>
        <span class="label">字体</span>
      </a-col>
      <a-col class="relative" span="12">
        <a-select
          :value="fontWeight"
          @change="handleChange($event, 'fontWeight')"
          :getPopupContainer="(trigger) => trigger.parentNode"
        >
          <a-select-option v-for="opt in ['normal', 'bold', 'bolder']" :key="opt" :value="opt">{{
            opt
          }}</a-select-option>
        </a-select>
        <span class="label">粗细</span>
      </a-col>
    </a-row>
    <a-row class="m-bottom-10" type="flex" :gutter="20" align="top">
      <a-col class="relative" span="12">
        <a-input-number
          :value="fontSize"
          :min="12"
          :max="64"
          :step="1"
          :precision="0"
          @change="handleChange($event, 'fontSize')"
        ></a-input-number>
        <span class="label">字号</span>
      </a-col>
      <a-col class="relative" span="12">
        <color-input
          class="color-input-item"
          type="color"
          :elId="elId"
          :showInput="true"
          :value="color"
          @change="handleChange($event, 'color')"
        />
        <span class="label">颜色</span>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ColorInput from './colorInput'

export default {
  name: 'TextFormatter',
  props: ['value','elId'],
  data() {
    return {
      fontFamilyList: ['楷体','微软雅黑', '宋体', '黑体', '幼圆', '隶书', 'tahoma', 'arial', 'sans-serif'],
      fontFamily: '',
      fontWeight: '',
      fontSize: '',
      color: '#fff',
      show: false
    }
  },
  components: {
    ColorInput
  },
  watch: {
    value: {
      immediate: true,
      handler(val = {}) {
        this.fontFamily = val.fontFamily || '微软雅黑'
        this.fontWeight = val.fontWeight || 'normal'
        this.fontSize = val.fontSize || 12
        this.color = val.color || '#ffffff'
        this.show = val.show || false
      }
    }
  },
  methods: {
    handleChange(e, key) {
      this.$emit(
        'change',
        Object.assign(
          {},
          {
            fontFamily: this.fontFamily,
            fontWeight: this.fontWeight,
            fontSize: this.fontSize,
            color: this.color,
            show: this.show
          },
          { [key]: e }
        )
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.text-formatter {
  .m-bottom-25 {
    margin-bottom: 25px;
  }
  .relative {
    display: flex;
    color: $white;
    .icon-wrapper {
      height: 32px;
      line-height: 32px;
      cursor: pointer;
    }
    .wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      color: $white;
    }
    .label {
      display: block;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
      position: absolute;
      bottom: -20px;
      left: 0;
      right: 0;
      text-align: center;
      color: $white;
    }
    .color-input-item {
      & + .label {
        width: 42px;
        margin-left: 1em;
      }
    }
  }
}
</style>
