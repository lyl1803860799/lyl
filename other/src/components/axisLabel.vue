<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="文字角度" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input-number
        :min="0"
        :max="360"
        v-decorator="['rotate', { initialValue: formData.rotate }]"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="文本" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <TextFormatter :elId="elId" v-decorator="['axisLabel', { initialValue: formData.axisLabel }]" />
    </a-form-item>
  </a-form>
</template>

<script>
import TextFormatter from '@/components/textFormatter'

export default {
  name: 'AxisLabel',
  props: ['value','elId'],
  components: {
    TextFormatter
  },
  data() {
    const self = this
    return {
      formData: {
        rotate: 0,
        axisLabel: {}
      },
      form: this.$form.createForm(this, {
        name: 'axis-label',
        onValuesChange(props, values) {
          const rawVal = self.formData
          const newVal = {
            ...rawVal,
            ...values
          }
          self.$emit('change', {
            ...newVal.axisLabel,
            rotate: newVal.rotate
          })
        }
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData.rotate = val.rotate || 0
          this.formData.axisLabel = { ...val, rotate: undefined }
        }
      }
    }
  }
}
</script>
