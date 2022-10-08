<template>
  <a-form
    class="pie-simple"
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
          <component-size v-decorator="['component', { initialValue: formData.component }]" />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="图形效果">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <Board v-decorator="['contentOption', { initialValue: formData.contentOption }]" />
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script>
import ComponentSize from '@/components/componentSize'
//import TitleStyle from '@/components/titleStyle'
import Board from '@/components/scrollBoardStyle/board'

export default {
  name: 'FuturesTableStyle',
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
      activeKey:['1','2'],
      form: this.$form.createForm(this, {
        name: 'scroll-board-style',
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
    //TitleStyle,
    ComponentSize,
    Board
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$set(this, 'formData', val || this.formData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pie-simple {
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
