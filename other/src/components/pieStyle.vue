<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="位置" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <position-number v-decorator="['center', { initialValue: formData.center }]" />
    </a-form-item>
    <a-form-item label="半径" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <radius v-decorator="['radius', { initialValue: formData.radius }]" />
    </a-form-item>
  </a-form>
</template>

<script>
import PositionNumber from './series/pie/positionNumber'
import Radius from './series/pie/radius'

export default {
  name: 'PieStyle',
  props: ['value'],
  components: { PositionNumber, Radius },
  data() {
    const self = this
    return {
      position: {},
      formData: {},
      form: this.$form.createForm(this, {
        name: 'pie-style',
        onValuesChange(props, values) {
          self.formData = { ...self.formData, ...values }
          self.$emit('change', self.formData)
        }
      })
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
