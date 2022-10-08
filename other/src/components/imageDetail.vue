<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="旋转角度" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input-number
        v-decorator="['rotate', { initialValue: formData.rotate }]"
        :min="0"
        :max="360"
        :step="1"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="圆角" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input-number
        v-decorator="['borderRadius', { initialValue: formData.borderRadius }]"
        :min="0"
        :step="1"
        :precision="0"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="不透明度" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input-number
        v-decorator="['opacity', { initialValue: formData.opacity }]"
        :min="0"
        :max="1"
        :step="0.01"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="阴影" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <box-shadow v-decorator="['boxShadow', { initialValue: formData.boxShadow }]" />
    </a-form-item>
  </a-form>
</template>

<script>
import BoxShadow from '@/components/boxShadow'

export default {
  name: 'ImageDetail',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'image-detail',
        onValuesChange(props, values) {
          self.$emit('change', { ...self.formData, ...values })
        }
      })
    }
  },
  components: { BoxShadow },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign(
          {},
          val || {
            boxShadow: {}
          }
        )
      }
    }
  }
}
</script>
