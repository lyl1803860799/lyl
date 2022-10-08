<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="地址" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" style="display:none;">
      <a-input v-decorator="['data', { initialValue: formData.data }]"></a-input>
    </a-form-item>
    <a-form-item label="循环播放" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-switch
        v-decorator="['loop', { initialValue: formData.loop, valuePropName: 'checked' }]"
      ></a-switch>
    </a-form-item>
    <a-form-item label="静音播放" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-switch
        v-decorator="['muted', { initialValue: formData.muted, valuePropName: 'checked' }]"
      ></a-switch>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'VideoDetail',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'video-detail',
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
