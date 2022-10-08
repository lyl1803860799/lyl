<template>
  <a-form :colon="false" :form="form" labelAlign="left">
    <a-form-item
      label="告警等级设置"
      :labelCol="{ span: 8 }"
      :wrapperCol="{ span: 16 }"
    ></a-form-item>
    <template v-for="(item, i) in formData">
      <a-form-item
        :label="`Level${i}`"
        :key="`Level${i}`"
        :labelCol="{ span: 5 }"
        :wrapperCol="{ span: 19 }"
      >
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="19">
            <alert-level v-decorator="[`formData[${i}]`, { initialValue: item }]"></alert-level>
          </a-col>
          <a-col :span="4" v-show="i > 0">
            <add-btn style="width: 80%" title="-" :show-icon="false" @add="handleDel(i)"> </add-btn>
          </a-col>
        </a-row>
      </a-form-item>
    </template>
    <a-form-item
      label=""
      :labelCol="{ span: 0 }"
      :wrapperCol="{ span: 23 }"
      v-show="formData.length < 5"
    >
      <add-btn style="width: 100%" title="增加" @add="handleAdd"> </add-btn>
    </a-form-item>
  </a-form>
</template>

<script>
import AlertLevel from './alertLevel'
import addBtn from '@/components/addBtn'

export default {
  name: 'Lines',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'lines',
        onValuesChange(props, values) {
          const index = values.formData.findIndex((item) => item)
          self.formData.splice(index, 1, values.formData[index])
          self.$emit('change', [...self.formData])
        }
      })
    }
  },
  components: { AlertLevel, addBtn },
  methods: {
    handleDel(index) {
      this.formData.splice(index, 1)
      this.$emit('change', [...this.formData])
    },
    handleAdd() {
      this.formData.push({
        color: '#000000',
        width: 2,
        name: ''
      })
      this.$emit('change', [...this.formData])
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = (val || []).map((item) => item)
      }
    }
  }
}
</script>
