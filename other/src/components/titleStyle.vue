<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="标题名称" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input v-decorator="['name', { initialValue: formData.name }]"></a-input>
    </a-form-item>
    <a-form-item label="字体" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-select v-decorator="['style.fontFamily', { initialValue: formData.style.fontFamily }]">
        <a-select-option
          v-for="opt in [
            '楷体',
            '微软雅黑',
            '宋体',
            '黑体',
            '幼圆',
            '隶书',
            'tahoma',
            'arial',
            'sans-serif'
          ]"
          :key="opt"
          :value="opt"
          >{{ opt }}</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item label="字号" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input-number
        :min="12"
        :max="64"
        :step="1"
        :precision="0"
        v-decorator="['style.fontSize', { initialValue: formData.style.fontSize }]"
      ></a-input-number>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'TitleStyle',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'title-style',
        onValuesChange(props, values) {
          let rawVal = self.formData
          if (values.name === undefined) {
            rawVal = {
              ...rawVal,
              style: {
                ...rawVal.style,
                ...values.style
              }
            }
          } else {
            rawVal = { ...rawVal, ...values }
          }
          self.$emit('change', rawVal)
        }
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = Object.assign({}, val)
        }
      }
    }
  }
}
</script>
