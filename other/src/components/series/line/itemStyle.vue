<template>
  <a-form
    :form="form"
    :colon="false"
    :labelCol="{ span: 5 }"
    :wrapperCol="{ span: 18 }"
    labelAlign="left"
  >
    <!-- <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
      <color-sets-with-direction
        label="条目"
        v-decorator="['color', { initialValue: formData.color }]"
      />
    </a-form-item> -->
  </a-form>
</template>

<script>
import ColorSetsWithDirection from '@/components/colorSetsWithDirection'

export default {
  name: 'LineItemStyle',
  props: ['value'],
  components: { ColorSetsWithDirection },
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'line-item-style',
        onValuesChange(props, values) {
          self.$emit('change', values)
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
