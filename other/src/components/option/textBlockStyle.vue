<template>
  <a-form
    class="text-block-style"
    :colon="false"
    :form="form"
    labelAlign="left"
    :labelCol="{ span: 5 }"
    :wrapperCol="{ span: 18 }"
  >
    <a-collapse v-model="activeKey" expandIconPosition="right">
      <a-collapse-panel key="1" header="组件大小" v-if="showComponent">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <component-size
            v-decorator="['component', { initialValue: formData.component }]"
            @change="refreshChart"
          />
        </a-form-item>
      </a-collapse-panel>
      <!-- <a-collapse-panel header="标题样式">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <title-style v-decorator="['title', { initialValue: formData.title }]" />
        </a-form-item>
      </a-collapse-panel> -->
      <!-- <a-collapse-panel header="格式转化">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <TextDataTransform
            v-decorator="[
              'contentOption.dataTransform',
              { initialValue: formData.contentOption.dataTransform }
            ]"
          />
        </a-form-item>
      </a-collapse-panel> -->
      <a-collapse-panel key="2" header="样式设置">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <text-block-detail
            v-decorator="[
              'contentOption.basicStyle',
              { initialValue: formData.contentOption.basicStyle }
            ]"
          />
        </a-form-item>
      </a-collapse-panel>
      <!-- <a-collapse-panel header="文字旋转">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <text-transform
            v-decorator="[
              'contentOption.transform',
              { initialValue: formData.contentOption.transform }
            ]"
          />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel header="跑马灯设置">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <text-marquee
            v-decorator="[
              'contentOption.marquee',
              { initialValue: formData.contentOption.marquee }
            ]"
          />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel header="超链设置">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <text-super-link
            v-decorator="[
              'contentOption.superLink',
              { initialValue: formData.contentOption.superLink }
            ]"
          />
        </a-form-item>
      </a-collapse-panel> -->
    </a-collapse>
  </a-form>
</template>

<script>
import ComponentSize from '@/components/componentSize'
//import TitleStyle from '@/components/titleStyle'
import TextBlockDetail from '@/components/textBlockStyle/textBlockDetail'
//import TextTransform from '@/components/textBlockStyle/textTransform'
//import TextMarquee from '@/components/textBlockStyle/textMarquee'
//import TextSuperLink from '@/components/textBlockStyle/textSuperLink'
//import TextDataTransform from '@/components/textBlockStyle/textDataTransform'

export default {
  name: 'TextBlockStyle',
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
        name: 'text-block-style',
        onValuesChange(props, values) {
          if (values.contentOption !== undefined) {
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
    //TitleStyle,
    ComponentSize,
    TextBlockDetail,
    //TextTransform,
    //TextMarquee,
    //TextSuperLink,
    //TextDataTransform
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
.text-block-style {
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
