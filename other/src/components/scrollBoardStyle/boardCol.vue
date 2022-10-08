<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="表头名" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-input v-decorator="['name', { initialValue: formData.name }]"></a-input>
    </a-form-item>
    <a-form-item label="文字滚动" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-switch
        v-decorator="['animation', { initialValue: formData.animation, valuePropName: 'checked' }]"
      ></a-switch>
    </a-form-item>
    <a-form-item label="滚动时间间隔" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-input-number
        :min="0"
        :step="1"
        v-decorator="['duration', { initialValue: formData.duration }]"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="列宽" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-input-number
        :min="0"
        :step="1"
        v-decorator="['width', { initialValue: formData.width }]"
      ></a-input-number>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'BoardCol',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'board-col',
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
        this.formData = Object.assign(
          {},
          val || {
            name: '',
            animation: false,
            duration: 0,
            width: 0
          }
        )
      }
    }
  }
}
</script>
