<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="文本" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <TextFormatter :elId="'legendFontColor'" v-decorator="['textStyle', { initialValue: formData.textStyle }]" />
    </a-form-item>
    <a-form-item label="间距" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <space-item
        v-decorator="['legendSpace', { initialValue: legendSpace }]"
        @change="handleLegend"
      />
    </a-form-item>
    <a-form-item label="位置" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <position-radio
        v-decorator="['position', { initialValue: position }]"
        @change="handleLegendChange"
      ></position-radio>
    </a-form-item>
  </a-form>
</template>

<script>
import PositionRadio from '@/components/positionRadio'
import TextFormatter from '@/components/textFormatter'
import SpaceItem from '@/components/spaceItem'

const POS_MAP = ['x', 'y']
export default {
  name: 'Legend',
  props: ['value'],
  components: {
    PositionRadio,
    TextFormatter,
    SpaceItem
  },
  data() {
    const self = this
    return {
      formData: {},
      legendSpace: { itemGap: 0, pos: 0 },
      position: 'top',
      form: this.$form.createForm(this, {
        name: 'legend',
        onValuesChange(props, values) {
          if (values.legendSpace !== undefined || values.position !== undefined) {
            return
          }
          let rawVal = self.formData
          if (values.textStyle !== undefined) {
            rawVal = {
              ...rawVal,
              show: values.textStyle.show
            }
          }
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
          this.legendSpace.itemGap = this.formData.itemGap
          POS_MAP.forEach((item) => {
            if (this.formData[item] !== 'center') {
              this.position = this.formData[item]
              this.legendSpace.pos = this.formData.padding
            }
          })
          this.formData.textStyle.show = val.show || false
        }
      }
    }
  },
  methods: {
    handleLegend(val) {
      this.legendSpace = val
      this.handleLegendChange(this.position)
    },
    handleLegendChange(val) {
      this.formData.itemGap = this.legendSpace.itemGap
      this.formData.padding = this.legendSpace.pos

      if (['top', 'bottom'].includes(val)) {
        this.formData.orient = 'horizontal'
        this.formData.x = 'center'
        this.formData.y = val
      } else {
        this.formData.orient = 'vertical'
        this.formData.x = val
        this.formData.y = 'center'
      }
      this.$emit('change', { ...this.formData })
    }
  }
}
</script>
