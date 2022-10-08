<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="折线宽度" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <div class="item-wrapper">
        <a-input-number
          :min="0"
          :step="1"
          :precision="0"
          class="input-number"
          v-decorator="['width', { initialValue: formData.width }]"
        ></a-input-number>
        <span class="m-left-5">px</span>
      </div>
    </a-form-item>
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
      <color-sets-with-direction
        label="线条"
        v-decorator="['color', { initialValue: formData.color }]"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import ColorSetsWithDirection from '@/components/colorSetsWithDirection'

export default {
  name: 'LineLineStyle',
  props: ['value'],
  components: { ColorSetsWithDirection },
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'line-line-style',
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
        this.formData = Object.assign({}, val || {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  color: $white;
  display: flex;
  align-items: center;
  .input-number {
    flex: 1;
  }
}
</style>
