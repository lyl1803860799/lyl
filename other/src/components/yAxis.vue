<template>
  <a-form class="y-axis" :form="form" :colon="false" labelAlign="left">
    <a-form-item label="范围" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <range-number v-decorator="['yRange', { initialValue: yRange }]" />
    </a-form-item>
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 23 }">
      <axis-label :elId="'yAxisLabelFontColor'+elId" v-decorator="['axisLabel', { initialValue: formData.axisLabel }]" />
    </a-form-item>
    <a-form-item label="Y轴线" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <axis-line :elId="'yAxisLineColor'+elId" v-decorator="['axisLine', { initialValue: formData.axisLine }]" />
    </a-form-item>
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }">
      <split-line :elId="'yAxisSplitLineColor'+elId" v-decorator="['splitLine', { initialValue: formData.splitLine }]" />
    </a-form-item>
    <a-form-item label="显示" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-checkbox-group v-decorator="['markPoint', { initialValue: formData.markPoint }]">
        <a-checkbox value="max"> 最大值 </a-checkbox>
        <a-checkbox value="min"> 最小值 </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="坐标轴名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 17 }">
      <a-input v-decorator="['name', { initialValue: formData.name }]"></a-input>
    </a-form-item>
  </a-form>
</template>

<script>
import RangeNumber from '@/components/rangeNumber'
import AxisLabel from '@/components/axisLabel'
import AxisLine from '@/components/axisLine'
import SplitLine from '@/components/splitLine'

export default {
  name: 'YAxis',
  props: ['value','elId'],
  data() {
    const self = this
    return {
      yRange: {
        min: '',
        max: ''
      },
      formData: {},
      form: this.$form.createForm(this, {
        name: 'y-axis',
        onValuesChange(props, values) {
          let rawVal = self.formData
          if (values.yRange !== undefined) {
            rawVal = {
              ...rawVal,
              ...values.yRange
            }
          } else {
            rawVal = { ...rawVal, ...values }
          }
          self.$emit('change', rawVal)
        }
      })
    }
  },
  components: {
    RangeNumber,
    AxisLabel,
    AxisLine,
    SplitLine
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        console.log(val)
        if (val) {
          this.formData = Object.assign({}, val)
          this.yRange = Object.assign(
            {},
            {
              min: this.formData.min,
              max: this.formData.max
            }
          )
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.y-axis {
  ::v-deep .ant-checkbox-group {
    .ant-checkbox-wrapper {
      color: $white;
      &:hover .ant-checkbox-inner,
      .ant-checkbox-input:focus + .ant-checkbox-inner {
        border-color: $brightGreen;
      }
      .ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: $brightGreen;
          border-color: $brightGreen;
        }
      }
      &-checked {
        color: $brightGreen;
        .ant-checkbox-inner:after {
          border-color: $db47;
        }
      }
    }
  }
}
</style>
