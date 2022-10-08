<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="是否留白" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-radio-group v-decorator="['boundaryGap', { initialValue: formData.boundaryGap }]">
        <a-radio :value="true"> 是 </a-radio>
        <a-radio :value="false"> 否 </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 23 }">
      <axis-label :elId="'xAxisLabelFontColor'" v-decorator="['axisLabel', { initialValue: formData.axisLabel }]" />
    </a-form-item>
    <a-form-item label="X轴线" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <axis-line :elId="'xAxisLineColor'" v-decorator="['axisLine', { initialValue: formData.axisLine }]" />
    </a-form-item>
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }">
      <split-line :elId="'xAxisSplitLineColor'" v-decorator="['splitLine', { initialValue: formData.splitLine }]" />
    </a-form-item>
  </a-form>
</template>

<script>
import AxisLabel from '@/components/axisLabel'
import AxisLine from '@/components/axisLine'
import SplitLine from '@/components/splitLine'

export default {
  name: 'xAxis',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'x-axis',
        onValuesChange(props, values) {
          self.$emit('change', { ...self.formData, ...values })
        }
      })
    }
  },
  components: {
    AxisLabel,
    AxisLine,
    SplitLine
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
