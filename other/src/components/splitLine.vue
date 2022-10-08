<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="分隔线" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <split-line-type v-decorator="['splitLine', { initialValue: splitLine }]" />
    </a-form-item>
    <a-form-item label="分隔线颜色" :labelCol="{ span: 6 }" :wrapperCol="{ span: 17 }">
      <color-input
        type="color"
        :elId="elId"
          :showInput="true"
        v-decorator="['lineStyle.color', { initialValue: formData.lineStyle.color }]"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import SplitLineType from './splitLineType'
import ColorInput from './colorInput'

export default {
  name: 'SplitLine',
  props: ['value','elId'],
  data() {
    const self = this
    return {
      splitLine: {
        show: false,
        type: 'solid'
      },
      formData: {
        lineStyle: {}
      },
      form: this.$form.createForm(this, {
        name: 'split-line',
        onValuesChange(props, values) {
          let rawVal = self.formData
          if (values.splitLine !== undefined) {
            rawVal = {
              ...rawVal,
              show: values.splitLine.show,
              lineStyle: {
                ...rawVal.lineStyle,
                type: values.splitLine.type
              }
            }
          } else {
            if(self.splitLine){
              values.lineStyle.type = self.splitLine.type;
            }
            rawVal = { ...rawVal, ...values }
          }
          self.$emit('change', rawVal)
        }
      })
    }
  },
  components: {
    SplitLineType,
    ColorInput
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = Object.assign(
            {},
            val || {
              lineStyle: {}
            }
          )
          this.splitLine = Object.assign(
            {},
            {
              show: this.formData.show,
              type: this.formData.lineStyle.type?this.formData.lineStyle.type:this.splitLine.type
            }
          )
        }
      }
    }
  },
  methods: {
    handleChange(e, key) {
      if (key === 'type') {
        this.$emit('change', { ...this.$data, lineStyle: { type: e } })
      } else {
        this.$emit('change', { ...this.$data, [key]: e })
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
