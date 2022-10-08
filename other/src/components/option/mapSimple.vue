<template>
  <a-form
    class="map-simple"
    :colon="false"
    labelAlign="left"
    :form="form"
    :labelCol="{ span: 5 }"
    :wrapperCol="{ span: 18 }"
  >
    <a-collapse v-model="activeKey" expandIconPosition="right">
      <!-- <a-collapse-panel header="标题样式">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <title-style v-decorator="['title', { initialValue: formData.title }]" />
        </a-form-item>
      </a-collapse-panel> -->
      <a-collapse-panel key="1" header="组件大小" v-if="showComponent">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <component-size
            v-decorator="['component', { initialValue: formData.component }]"
            @change="refreshChart"
          />
        </a-form-item>
      </a-collapse-panel>
      <!-- <a-collapse-panel header="地图样式">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <map-detail v-decorator="['contentOption', { initialValue: formData.contentOption }]" />
        </a-form-item>
      </a-collapse-panel> -->
    </a-collapse>
  </a-form>
</template>

<script>
import ComponentSize from '@/components/componentSize'
import TitleStyle from '@/components/titleStyle'
import MapDetail from '@/components/mapDetail'

export default {
  name: 'MapSimple',
  props: {
    option: {
      type: Object
    },
    showComponent: {
      default: true
    }
  },
  data() {
    const self = this
    return {
      activeKey:['1'],
      form: this.$form.createForm(this, {
        name: 'map-simple',
        onValuesChange(props, values) {
          if (values.contentOption) {
            values = {
              contentOption: {
                ...self.formData.contentOption,
                ...values.contentOption
              }
            }
          }
          self.$emit('option-updated', values)
        }
      }),
      formData: {
        title: {},
        component: {},
        contentOption: {}
      }
    }
  },
  components: {
    TitleStyle,
    ComponentSize,
    MapDetail
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$set(this, 'formData', val || this.formData)
      }
    }
  },
  methods: {
    refreshChart() {
      this.$emit('update-chart')
    }
  }
}
</script>

<style lang="scss" scoped>
.map-simple {
  ::v-deep .ant-form-item-label {
    label {
      color: $white;
    }
  }
  ::v-deep .ant-input-number {
    width: 100%;
    @include inputNumberStyle;
  }
  ::v-deep .ant-tabs {
    color: $white;
    &-bar {
      border: none;
    }
    &-tab-active,
    &-tab:hover {
      color: $brightGreen;
    }
    &-ink-bar {
      background-color: $brightGreen;
    }
    &-tab-arrow-show {
      color: $white;
    }
  }
  .m-bottom-0 {
    margin-bottom: 0;
  }
}
</style>
