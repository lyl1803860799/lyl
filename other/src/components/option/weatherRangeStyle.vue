<template>
  <a-form
    class="weather-range-style"
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
          <weather-style-detail
            v-decorator="[
              'contentOption.basicStyle',
              { initialValue: formData.contentOption.basicStyle }
            ]"
          />
        </a-form-item>
      </a-collapse-panel>

      <a-collapse-panel key="3" header="城市">
        <a-form-item
          label
          :labelCol="{ span: 0 }"
          :wrapperCol="{ span: 24 }"
          class="time-setting m-bottom-0"
        >
          <Citys
            v-decorator="[
              'data',
              { initialValue: formData.contentOption.data }
            ]"
            @changeCity="cityChange"
          />
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script>
import ComponentSize from "@/components/componentSize";
import WeatherStyleDetail from "@/components/weatherRangeStyle/weatherStyleDetail";
import Citys from "@/components/weatherRangeStyle/citys";
//import TitleStyle from '@/components/titleStyle'
//import TimeRangeDetail from "@/components/timeRangeStyle/timeRangeDetail";
//import TextTransform from '@/components/textBlockStyle/textTransform'
//import TextMarquee from '@/components/textBlockStyle/textMarquee'
//import TextSuperLink from '@/components/textBlockStyle/textSuperLink'
//import TextDataTransform from '@/components/textBlockStyle/textDataTransform'

export default {
  name: "weatherRangeStyle",
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
      activeKey: ["1", "2", "3"],
      form: this.$form.createForm(this, {
        name: "weather-range-style",
        onValuesChange(props, values) {
          if (values.contentOption !== undefined) {
            values = {
              contentOption: {
                ...self.formData.contentOption,
                ...values.contentOption
              }
            };
            values.contentOption.transformedData = values.contentOption.data;
          }
          self.$emit("option-updated", values);
        }
      }),
      formData: {}
    };
  },
  components: {
    //TitleStyle,
    ComponentSize,
    WeatherStyleDetail,
    Citys
    //TimeRangeDetail,
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
    cityChange(e) {
      if (e.city != this.option.contentOption.data) {
        this.form.setFieldsValue({
          data: e.city
        });
        this.formData.contentOption.data = e.city;
        this.formData.contentOption.transformedData = e.city;
      }
    },
    refreshChart() {
      this.$emit("update-chart");
    }
  }
};
</script>

<style lang="scss" scoped>
.weather-range-style {
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
