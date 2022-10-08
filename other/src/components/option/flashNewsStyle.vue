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
      <!-- <a-collapse-panel header="标题样式">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <title-style v-decorator="['title', { initialValue: formData.title }]" />
        </a-form-item>
      </a-collapse-panel>-->
      <!-- <a-collapse-panel header="格式转化">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <TextDataTransform
            v-decorator="[
              'contentOption.dataTransform',
              { initialValue: formData.contentOption.dataTransform }
            ]"
          />
        </a-form-item>
      </a-collapse-panel>-->
      <a-collapse-panel key="2" header="样式设置">
        <a-form-item label="字体" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-select
            v-decorator="['contentOption.fontFamily', { initialValue: formData.contentOption.fontFamily }]"
            :getPopupContainer="(trigger) => trigger.parentNode"
          >
            <a-select-option v-for="opt in fontFamilyList" :key="opt" :value="opt">
              {{
              opt
              }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="快讯">
            <a-form-item
              label
              :labelCol="{ span: 0 }"
              :wrapperCol="{ span: 24 }"
              class="m-bottom-0"
            >
              <flash-news-detail
                :type="'flash'"
                v-decorator="[
              'contentOption.basicStyle',
              { initialValue: formData.contentOption.basicStyle }
            ]"
              />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" tab="品种">
            <a-form-item
              label
              :labelCol="{ span: 0 }"
              :wrapperCol="{ span: 24 }"
              class="m-bottom-30"
            >
              <flash-news-detail
                :type="'breed'"
                v-decorator="[
              'contentOption.breedStyle',
              { initialValue: formData.contentOption.breedStyle }
            ]"
              />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="3" tab="栏目">
            <a-form-item
              label
              :labelCol="{ span: 0 }"
              :wrapperCol="{ span: 24 }"
              class="m-bottom-30"
            >
              <flash-news-detail
                :type="'cloumn'"
                v-decorator="[
              'contentOption.cloumnStyle',
              { initialValue: formData.contentOption.cloumnStyle }
            ]"
              />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="4" tab="时间">
            <a-form-item
              label
              :labelCol="{ span: 0 }"
              :wrapperCol="{ span: 24 }"
              style="margin-bottom:120px;"
            >
              <flash-news-detail
                :type="'time'"
                v-decorator="[
              'contentOption.timeStyle',
              { initialValue: formData.contentOption.timeStyle }
            ]"
              />
            </a-form-item>
          </a-tab-pane>

        </a-tabs>
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script>
import ComponentSize from "@/components/componentSize";
//import TitleStyle from '@/components/titleStyle'
import FlashNewsDetail from "@/components/flashNewsStyle/flashNewsDetail";

export default {
  name: "flashNewsStyle",
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
        '楷体',
        "微软雅黑",
        "宋体",
        "黑体",
        "幼圆",
        "隶书",
        "tahoma",
        "arial",
        "sans-serif"
      ],
      activeKey: ["1", "2"],
      form: this.$form.createForm(this, {
        name: "price-range-style",
        onValuesChange(props, values) {
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
    FlashNewsDetail
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

  .m-bottom-30 {
    margin-bottom: 40px!important;
  }
}
</style>
