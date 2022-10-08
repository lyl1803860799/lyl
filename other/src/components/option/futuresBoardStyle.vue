<template>
  <a-form
    class="time-range-style"
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
        <a-form-item label :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <index-board-detail
            v-decorator="[
              'contentOption.basicStyle',
              { initialValue: formData.contentOption.basicStyle }
            ]"
          />
          <index-board-detail-two
            v-decorator="[
              'contentOption.valueStyle',
              { initialValue: formData.contentOption.valueStyle }
            ]"
          />
          <index-board-detail-three
            v-decorator="[
              'contentOption.upDownStyle',
              { initialValue: formData.contentOption.upDownStyle }
            ]"
          />
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script>
import ComponentSize from "@/components/componentSize";
import IndexBoardDetail from "@/components/indexBoardStyle/indexBoardDetail";
import IndexBoardDetailTwo from "@/components/indexBoardStyle/indexBoardDetailTwo";
import IndexBoardDetailThree from "@/components/indexBoardStyle/indexBoardDetailThree";

export default {
  name: "FuturesBoardStyle",
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
      activeKey:['1','2','3'],
      form: this.$form.createForm(this, {
        name: "time-range-style",
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
    IndexBoardDetail,
    IndexBoardDetailTwo,
    IndexBoardDetailThree,
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
.time-range-style {
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
  ::v-deep .time-setting{
    min-height:200px;
  }
  .m-bottom-0 {
    margin-bottom: 0;
  }
}
</style>
