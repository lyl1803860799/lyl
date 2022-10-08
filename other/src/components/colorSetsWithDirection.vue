<template>
  <a-form class="colorset-with-direction" labelAlign="left" :form="form" :colon="false">
    <a-form-item :label="`${label}颜色角度`" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-radio-group v-decorator="['direction', { initialValue: formData.direction }]">
        <a-radio :value="1"> 从上到下 </a-radio>
        <a-radio :value="0"> 从左往右 </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item :label="`${label}颜色`" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <color-step
        v-decorator="['colorStops', { initialValue: formData.colorStops }]"
        @change="handleColorStops"
      />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'colorSetsWithDirection',
  props: ['value', 'label'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'color-sets-with-direction',
        onValuesChange({ form }, values) {
          const rawVal = form.getFieldsValue()
          if (values.direction !== undefined) {
            values = { ...rawVal, x2: +(values.direction === 0), y2: +(values.direction === 1) }
            self.$emit('change', values)
          }
        }
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = Object.assign({}, val, {
            direction: val.y2
          })
        }
      }
    }
  },
  methods: {
    handleColorStops(val) {
      const value = { ...this.formData, colorStops: val }
      this.$emit('change', value)
    }
  }
}
</script>
