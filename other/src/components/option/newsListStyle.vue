<template>
  <a-form
    class="news-range-style"
    :colon="false"
    :form="form"
    labelAlign="left"
    :labelCol="{ span: 5 }"
    :wrapperCol="{ span: 18 }"
  >
    <a-collapse v-model="activeKey" expandIconPosition="right">
      <a-collapse-panel key="1" header="组件大小" v-if="showComponent">
        <a-form-item label :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <component-size
            v-decorator="['component', { initialValue: formData.component }]"
            @change="refreshChart"
          />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="样式设置">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }">
          <a-form-item
                label
                :labelCol="{ span: 0 }"
                :wrapperCol="{ span: 24 }"
                class="m-top-10 m-bottom-0"
              >
                <news-list-detail :type="'all'" v-decorator="['contentOption.basicStyle', { initialValue: formData.contentOption.basicStyle }]" />
          </a-form-item>
        </a-form-item>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="标题">
              <a-form-item
                label
                :labelCol="{ span: 0 }"
                :wrapperCol="{ span: 24 }"
                class="m-top-10 m-bottom-0"
              >
                <news-list-detail :type="'title'" v-decorator="['contentOption.titleStyle', { initialValue: formData.contentOption.titleStyle }]" />
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane key="2" tab="摘要">
              <a-form-item
                label
                :labelCol="{ span: 0 }"
                :wrapperCol="{ span: 24 }"
                class="m-top-10 m-bottom-0"
              >
                <news-list-detail :type="'content'" v-decorator="['contentOption.contentStyle', { initialValue: formData.contentOption.contentStyle }]" />
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane key="3" tab="来源">
              <a-form-item
                label
                :labelCol="{ span: 0 }"
                :wrapperCol="{ span: 24 }"
                class="m-top-10 m-bottom-0"
              >
                <news-list-detail :type="'source'" v-decorator="['contentOption.sourceStyle', { initialValue: formData.contentOption.sourceStyle }]"/>
              </a-form-item>
              <div style="width:100%;height:36px;"></div>
            </a-tab-pane>
        </a-tabs>
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script>
import ComponentSize from "@/components/componentSize";
import ColorInput from "@/components/colorInput";
//import TitleStyle from '@/components/titleStyle'
import NewsListDetail from "@/components/newsListStyle/newsListDetail";

export default {
  name: "newsListStyle",
  props: {
    option: {
      type: Object
    },
    showComponent: {
      default: true
    }
  },
  data() {
    const self = this;
    return {
      fontFamilyList: [
        "楷体",
        "微软雅黑",
        "宋体",
        "黑体",
        "幼圆",
        "隶书",
        "tahoma",
        "arial",
        "sans-serif"
      ],
      styleTypeList: [],
      activeKey: ["1", "2"],
      form: this.$form.createForm(this, {
        name: "news-list-style",
        onValuesChange(props, values) {
          console.log(values)
          if (values.contentOption !== undefined) {
            values = {
              contentOption: {
                ...self.formData.contentOption,
                ...values.contentOption
              }
            };
          }
          self.$emit("option-updated", values);
        }
      }),
      formData: {
        title: {},
        component: {},
        contentOption: {}
      }
    };
  },
  components: {
    //TitleStyle,
    ComponentSize,
    ColorInput,
    NewsListDetail
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
        console.log(val)
        this.formData = Object.assign({}, val || this.formData);
      }
    }
  },
  methods: {
    refreshChart() {
      this.$emit("update-chart");
    }
  }
};
</script>

<style lang="scss" scoped>
.news-range-style {
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
  ::v-deep .time-setting {
    min-height: 200px;
  }
  .m-bottom-0 {
    margin-bottom: 0;
  }
}
</style>
