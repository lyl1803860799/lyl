<template>
  <a-form
    :form="form"
    :colon="false"
    labelAlign="left"
    class="component-size"
    :labelCol="{ span: 5 }"
    :wrapperCol="{ span: 18 }"
  >
    <a-row type="flex" :gutter="23">
      <a-col :span="11">
        <a-form-item label="宽度" :labelCol="{ span: 11,lg:24,xl:11 }" :wrapperCol="{ span: 13,lg:24,xl:13 }">
          <a-input-number
            :min="0"
            :max="9999"
            :step="1"
            :precision="0"
            class="define-input-num"
            v-decorator="['width', { initialValue: formData.width }]"
          ></a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="高度" :labelCol="{ span: 11,lg:24,xl:11 }" :wrapperCol="{ span: 13,lg:24,xl:13 }">
          <a-input-number
            :min="0"
            :max="9999"
            :step="1"
            :precision="0"
            v-decorator="['height', { initialValue: formData.height }]"
          ></a-input-number>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="23">
      <a-col :span="11">
        <a-form-item label="水平位置" :labelCol="{ span: 11,lg:24,xl:11 }" :wrapperCol="{ span: 13,lg:24,xl:13 }">
          <a-input-number
            :min="0"
            :max="9999"
            :step="1"
            :precision="0"
            v-decorator="['posx', { initialValue: formData.posx }]"
          ></a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="垂直位置" :labelCol="{ span: 11,lg:24,xl:11 }" :wrapperCol="{ span: 13,lg:24,xl:13 }">
          <a-input-number
            :min="0"
            :max="9999"
            :step="1"
            :precision="0"
            v-decorator="['posy', { initialValue: formData.posy }]"
          ></a-input-number>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="23">
      <!-- <a-col :span="11">
        <a-form-item label="缩放组件" :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }">
          <a-switch
            v-decorator="['active', { initialValue: formData.active, valuePropName: 'checked' }]"
          ></a-switch>
        </a-form-item>
      </a-col> -->
      <a-col :span="11">
        <a-form-item label="图层" :labelCol="{ span: 11,lg:24,xl:11 }" :wrapperCol="{ span: 13,lg:24,xl:13 }">
          <a-input-number
            :min="0"
            :max="9999"
            :step="1"
            :precision="0"
            v-decorator="['z', { initialValue: formData.z }]"
          ></a-input-number>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: 'ComponentSize',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'component-size',
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
          this.formData = Object.assign(this.formData, val)
        }
      }
    }
  }
}
</script>
<style>
.ant-input-number-handler-down,
.ant-input-number-handler-up{
  height: 50% !important;
}
.ant-input-number-handler-down:hover,
.ant-input-number-handler-up:hover{
    height: 50% !important;
}
</style>

