<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="开关" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-switch v-decorator="['open', { initialValue: formData.open, valuePropName: 'checked' }]">
      </a-switch>
    </a-form-item>
    <a-form-item label="打开方式" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-select
        v-decorator="['openTarget', { initialValue: formData.openTarget }]"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option value="_self">本窗口</a-select-option>
        <a-select-option value="_blank">新窗口</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="超链地址" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input
        placeholder="http(s)://xxx.com"
        v-decorator="['href', { initialValue: formData.href }]"
      ></a-input>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'TextSuperLink',
  props: ['value'],
  data() {
    const self = this
    return {
      form: this.$form.createForm(this, {
        name: 'text-super-link',
        onValuesChange(props, values) {
          self.$emit('change', { ...self.formData, ...values })
        }
      }),
      formData: {}
    }
  },
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
