<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <!-- <a-form-item label="转换" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" class="m-bottom-0">
      <a-select
        v-decorator="['type', { initialValue: formData.type }]"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option value="none">无</a-select-option>
        <a-select-option value="number">数字</a-select-option>
        <a-select-option value="date">时间</a-select-option>
      </a-select>
    </a-form-item>

    <template v-if="formData.type === 'number'">
      <a-form-item label=" " :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" class="m-bottom-0">
        <a-select
          v-decorator="['numberType', { initialVal: formData.numberType }]"
          :getPopupContainer="(trigger) => trigger.parentNode"
        >
          <a-select-option value="int">整数</a-select-option>
          <a-select-option value="float">小数</a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="formData.numberType === 'float'">
        <a-form-item
          label=" "
          :labelCol="{ span: 5 }"
          :wrapperCol="{ span: 18 }"
          class="m-bottom-0"
        >
          <div class="input-container">
            保留<a-input-number
              class="input-item"
              v-decorator="['effective', { initialValue: formData.effective }]"
            ></a-input-number
            >位
          </div>
        </a-form-item>
      </template>
    </template> -->

    <template v-if="formData.type === 'date'">
      <a-form-item label="格式选择" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" class="m-bottom-0">
        <a-select
          v-decorator="['dateFormatter', { initialValue: formData.dateFormatter }]"
          :getPopupContainer="(trigger) => trigger.parentNode"
        >
          <a-select-option value="YYYY-MM-DD">年-月-日</a-select-option>
          <a-select-option value="YYYY-MM-DD HH:mm:ss">年-月-日 时:分:秒</a-select-option>
          <a-select-option value="HH:mm:ss">时:分:秒</a-select-option>
        </a-select>
      </a-form-item>
    </template>
  </a-form>
</template>

<script>
export default {
  name: 'TextDataTransform',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'text-data-transform',
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
.input-container {
  display: flex;
  align-items: center;
  color: $white;

  .input-item {
    flex: 1;
  }
}
</style>
