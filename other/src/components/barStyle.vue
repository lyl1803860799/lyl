<template>
  <a-form class="bar-style" labelAlign="left" :form="form" :colon="false">
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }">
      <item-style v-decorator="['itemStyle', { initialValue: formData.itemStyle }]" />
    </a-form-item>
  </a-form>
</template>

<script>
import ItemStyle from './series/bar/itemStyle'

export default {
  name: 'BarStyle',
  props: ['value'],
  components: {
    ItemStyle
  },
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'bar-style',
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
        if (val) {
          this.formData = Object.assign({}, val)
        }
      }
    }
  }
}
</script>
