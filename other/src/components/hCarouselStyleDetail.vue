<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="内容标题颜色" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <color-input
        :show-input="true"
        v-decorator="['titleStyle.color', { initialValue: formData.titleStyle.color }]"
      />
    </a-form-item>
    <a-form-item label="内容标题大小" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-input-number
        :min="12"
        :max="64"
        :step="1"
        :precision="0"
        v-decorator="['titleStyle.fontSize', { initialValue: formData.titleStyle.fontSize }]"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="内容标题加粗" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-switch
        v-decorator="[
          'titleStyle.weight',
          { initialValue: formData.titleStyle.weight, valuePropName: 'checked' }
        ]"
      ></a-switch>
    </a-form-item>
    <a-form-item label="内容状态颜色" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <color-input
        :show-input="true"
        v-decorator="['statusStyle.color', { initialValue: formData.statusStyle.color }]"
      />
    </a-form-item>
    <a-form-item label="内容状态大小" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-input-number
        :min="12"
        :max="64"
        :step="1"
        :precision="0"
        v-decorator="['statusStyle.fontSize', { initialValue: formData.statusStyle.fontSize }]"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="内容状态加粗" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-switch
        v-decorator="[
          'statusStyle.weight',
          { initialValue: formData.statusStyle.weight, valuePropName: 'checked' }
        ]"
      ></a-switch>
    </a-form-item>
    <a-form-item label="内容字体颜色" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <color-input
        :show-input="true"
        v-decorator="['contentStyle.color', { initialValue: formData.contentStyle.color }]"
      />
    </a-form-item>
    <a-form-item label="内容字体加粗" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-switch
        v-decorator="[
          'contentStyle.weight',
          { initialValue: formData.contentStyle.weight, valuePropName: 'checked' }
        ]"
      ></a-switch>
    </a-form-item>
    <a-form-item label="滚动过渡时间" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-input-number
        :min="3"
        :step="1"
        v-decorator="['interval', { initialValue: formData.interval }]"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="轮播方向" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-select
        v-decorator="['playDirection', { initialValue: formData.playDirection }]"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option value="left">向左</a-select-option>
        <a-select-option value="right">向右</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script>
import ColorInput from '@/components/colorInput'
import { paddingObject } from '@/utils/tool'

export default {
  name: 'HCarouselDetail',
  props: ['value'],
  components: {
    ColorInput
  },
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'h-carousel-detail',
        onValuesChange(props, values) {
          const value = paddingObject(self.formData, values)
          self.$emit('change', value)
        }
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign(
          {},
          val || {
            titileStyle: {},
            statusStyle: {},
            contentStyle: {}
          }
        )
      }
    }
  }
}
</script>
