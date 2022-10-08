<template>
  <a-form :colon="false" :form="form" labelAlign="left">
    <a-form-item label="字体颜色" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <color-input :show-input="true" v-decorator="['color', { initialValue: formData.color }]" />
    </a-form-item>
    <a-form-item label="字体大小" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input-number
        v-decorator="['fontSize', { initialValue: formData.fontSize }]"
        :min="12"
        :max="64"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="起始位置显示" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-switch
        v-decorator="['show', { initialValue: formData.show, valuePropName: 'checked' }]"
      ></a-switch>
    </a-form-item>
  </a-form>
</template>

<script>
import ColorInput from '@/components/colorInput'

export default {
  name: 'StartPoint',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'start-point',
        onValuesChange(props, values) {
          self.$emit('change', { ...self.formData, ...values })
        }
      })
    }
  },
  components: { ColorInput },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val || {})
      }
    }
  }
}
</script>
