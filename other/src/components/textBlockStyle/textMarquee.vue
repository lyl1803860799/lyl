<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="开关" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-switch
        v-decorator="['show', { initialValue: formData.show, valuePropName: 'checked' }]"
      ></a-switch>
    </a-form-item>
    <a-form-item label="方向" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-select
        v-decorator="['direction', { initialValue: formData.direction }]"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option value="right">从右到左</a-select-option>
        <a-select-option value="bottom">从下到上</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'TextMarquee',
  props: ['value'],
  data() {
    const self = this
    return {
      form: this.$form.createForm(this, {
        name: 'text-marquee',
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
