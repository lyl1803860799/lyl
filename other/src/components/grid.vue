<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="上间距" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input v-decorator="['top', { initialValue: formData.top }]"></a-input>
    </a-form-item>
    <a-form-item label="左间距" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input v-decorator="['left', { initialValue: formData.left }]"></a-input>
    </a-form-item>
    <a-form-item label="下间距" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input v-decorator="['bottom', { initialValue: formData.bottom }]"></a-input>
    </a-form-item>
    <a-form-item label="右间距" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input v-decorator="['right', { initialValue: formData.right }]"></a-input>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'Grid',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'grid',
        onValuesChange({ form }, values) {
          const rawVal = form.getFieldsValue()
          self.$emit('change', { ...rawVal, ...values })
        }
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = Object.assign(this.formData, val)
        }
      }
    }
  }
}
</script>
