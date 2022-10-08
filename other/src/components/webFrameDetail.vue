<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="显示关闭按钮" :labelCol="{ span: 7 }" :wrapperCol="{ span: 16 }">
      <a-switch
        v-decorator="['showClose', { initialValue: formData.showClose, valuePropName: 'checked' }]"
      ></a-switch>
    </a-form-item>
    <a-form-item label="地址" :labelCol="{ span: 7 }" :wrapperCol="{ span: 16 }">
      <a-input v-decorator="['src', { initialValue: formData.src }]"></a-input>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'WebFrameDetail',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'web-frame-detail',
        onValuesChange(props, values) {
          self.$emit('change', { ...self.formData, ...values })
        }
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val)
      }
    }
  }
}
</script>
