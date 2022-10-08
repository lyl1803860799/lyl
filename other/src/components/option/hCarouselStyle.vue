<template>
  <a-form
    class="h-carsouel-style"
    :colon="false"
    labelAlign="left"
    :form="form"
    :labelCol="{ span: 5 }"
    :wrapperCol="{ span: 18 }"
  >
    <a-collapse expandIconPosition="right">
      <a-collapse-panel header="标题样式">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <title-style v-decorator="['title', { initialValue: formData.title }]" />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel header="组件大小" v-if="showComponent">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <component-size
            v-decorator="['component', { initialValue: formData.component }]"
            @change="refreshChart"
          />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel header="样式配置">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <h-carousel-detail
            v-decorator="['contentOption', { initialValue: formData.contentOption }]"
          ></h-carousel-detail>
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script>
import ComponentSize from '@/components/componentSize'
import TitleStyle from '@/components/titleStyle'
import HCarouselDetail from '@/components/hCarouselStyleDetail'

export default {
  name: 'HCarouselStyle',
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
      form: this.$form.createForm(this, {
        name: 'h-carsouel-style',
        onValuesChange(props, values) {
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
    HCarouselDetail
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val || this.formData)
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
.h-carsouel-style {
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
