<template>
  <div>
    <a-form
      class="basic-line"
      :colon="false"
      :form="form"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
      labelAlign="left"
    >
      <a-collapse activeKey="1" expandIconPosition="right">
        <a-collapse-panel key="1" :header="header">
          <a-card title="数据映射" :bordered="false">
            <a-form-item
              label=""
              :labelCol="{ span: 0 }"
              :wrapperCol="{ span: 23 }"
              class="m-bottom-0"
            >
              <data-map
                ref="dataMap"
                v-decorator="['dataMap', { initialValue: formData.dataMap }]"
                :updateData="updateData"
                @update-newData="updateNewData"
              />
            </a-form-item>
            <a-form-item
              style="display:none"
              label=""
              :labelCol="{ span: 0 }"
              :wrapperCol="{ span: 23 }"
              class="m-bottom-0"
            >
              <input v-decorator="['data', { initialValue: formData.data }]" />
            </a-form-item>
          </a-card>
          <a-card
            title="数据源"
            :bordered="false"
            style="border-top:1px solid #053353;margin-top:10px;min-height: 500px;"
          >
            <a-form-item
              label=""
              :labelCol="{ span: 0 }"
              :wrapperCol="{ span: 23 }"
              class="m-bottom-0"
            >
              <data-source
                v-decorator="['dataSource', { initialValue: formData.dataSource }]"
                :dataMap="formData.dataMap"
                :header="header"
              />
            </a-form-item>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
    </a-form>
  </div>
</template>

<script>
import DataMap from './dataOption/dataMap'
import DataSource from './dataOption/dataSource'
import { COMPONENT_NAME_MAP } from '@/utils/constants'

export default {
  name: 'dataSet',
  components: { DataMap, DataSource },
  data() {
    const self = this
    return {
      form: this.$form.createForm(this, {
        name: 'data-set',
        onValuesChange(props, values) {
          if (values.dataSource) {
            self.updateData = values.dataSource.dataContent
          }
          self.$emit('option-updated', { dataConfig: { ...self.formData, ...values } })
        }
      }),
      formData: {},
      updateData: JSON.stringify([])
    }
  },
  props: {
    title: {
      type: Object,
      default() {
        return {}
      }
    },
    componentType: String,
    dataConfig: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    header() {
      const name = this.title?.name || ''
      const componentName = (this.componentType && COMPONENT_NAME_MAP[this.componentType]) || ''
      if (componentName && name === componentName) {
        return componentName
      }
      if (!componentName) return ''

      return `${componentName}-${name}`
    }
  },
  watch: {
    dataConfig: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val || this.formData)
        this.updateData = this.formData.dataSource.dataContent || JSON.stringify([])
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    updateNewData(data) {
      this.$emit('data-changed', {
        dataConfig: {
          ...this.formData,
          data: data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.data-set {
  ::v-deep .ant-card-head {
    font-size: 14px;
    padding: 0 10px;
    &::before {
      content: '';
      position: absolute;
      width: 4px;
      height: 14px;
      left: 0px;
      top: 11px;
      background: $white;
    }
  }
}
</style>
