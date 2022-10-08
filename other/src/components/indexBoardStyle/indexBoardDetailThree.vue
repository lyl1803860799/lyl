<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="涨跌字号" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input-number
        v-decorator="['fontSize', { initialValue: formData.fontSize }]"
        :min="12"
        :step="1"
        :precision="0"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="涨跌样式" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <font-style v-decorator="['textStyle', { initialValue: formData.textStyle }]" />
    </a-form-item>
  </a-form>
</template>

<script>
import FontStyle from "@/components/fontStyleTwo";

export default {
  name: "indexBorardDetailThree",
  props: ["value"],
  components: {
    FontStyle
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
      form: this.$form.createForm(this, {
        name: "index-board-detail",
        onValuesChange(props, values) {
          self.$emit("change", { ...self.formData, ...values });
        }
      }),
      formData: {}
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val || {});
      }
    }
  }
};
</script>
<style>
.ant-input-number-handler-down,
.ant-input-number-handler-up{
  height: 50% !important;
}
.ant-input-number-handler-down:hover,
.ant-input-number-handler-up:hover{
    height: 50% !important;
}
</style>
