<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <p class="title">请求体(Body)</p>
    <a-form-item
      label="请求体方式"
      :labelCol="{ span: 8 }"
      :wrapperCol="{ span: 14 }"
      class="m-bottom-0"
    >
      <a-select
        placeholder="请选择请求体方式"
        default-value="raw"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option v-for="item in requestBodys" :key="item.id" :value="item.name">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="编码方式"
      :labelCol="{ span: 8 }"
      :wrapperCol="{ span: 14 }"
      class="m-bottom-0"
    >
      <a-select
        placeholder="请选择编码方式"
        default-value="JSON"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option v-for="item in codingModes" :key="item.id" :value="item.name">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
      <ace-editor
        v-decorator="['body', { initialValue: formData.body }]"
        :height="150"
        lang="json"
      ></ace-editor
    ></a-form-item>
  </a-form>
</template>

<script>
import AceEditor from '@/components/edit/aceEditor'
export default {
  name: 'postBody',
  props: ['value'],
  components: { AceEditor },
  data() {
    const self = this
    return {
      requestBodys: [{ id: 1, name: 'raw' }],
      codingModes: [{ id: 0, name: 'JSON' }],
      formData: {},
      form: this.$form.createForm(this, {
        name: 'postBody',
        onValuesChange(props, values) {
          self.$emit('change', values.body)
        }
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData.body = val
        }
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.title {
  border-top: 1px solid #112761;
  color: $white;
  font-size: 14px;
}
</style>
