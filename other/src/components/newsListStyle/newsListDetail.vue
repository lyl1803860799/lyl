<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="字体" v-if="type==='all'" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-select
        v-decorator="['fontFamily', { initialValue: formData.fontFamily }]"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option v-for="opt in fontFamilyList" :key="opt" :value="opt">
          {{
          opt
          }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="字号" v-if="type!='all'" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-input-number
        v-decorator="['fontSize', { initialValue: formData.fontSize }]"
        :min="12"
        :step="1"
        :precision="0"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="字体颜色" v-if="type!='all'" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <color-input
        :show-input="true"
        :elId="'newsFontColor'+type"
        :placement="'top'"
        v-decorator="['color', { initialValue: formData.color }]"
      ></color-input>
    </a-form-item>
    <a-form-item
      v-if="type==='all'"
      label="背景颜色"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
    >
      <color-input
        :show-input="true"
        :elId="'newsBgColor'"
        :placement="'top'"
        v-decorator="['backgroundColor', { initialValue: formData.backgroundColor }]"
      ></color-input>
    </a-form-item>
    <a-form-item
      v-if="type==='content' && type!='all'"
      label="行间距"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
    >
      <a-input-number
        :min="12"
        :step="1"
        :precision="0"
        v-decorator="['lineHeight', { initialValue: formData.lineHeight }]"
      ></a-input-number>
    </a-form-item>
    <a-form-item
      v-if="type==='content' && type!='all'"
      label="字间距"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
    >
      <a-input-number
        :min="0"
        :step="1"
        :precision="0"
        v-decorator="['letterSpacing', { initialValue: formData.letterSpacing }]"
      ></a-input-number>
    </a-form-item>
    <a-form-item
      v-if="type==='title' && type!='all'"
      style="margin-bottom:40px;"
      label="样式"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
    >
      <font-style v-decorator="['fontWeight', { initialValue: formData.fontWeight }]" />
    </a-form-item>
  </a-form>
</template>

<script>
import ColorInput from "@/components/colorInput";
import FontStyle from "@/components/fontStyleThree";

export default {
  name: "newsListDetail",
  props: ["value", "type"],
  components: {
    ColorInput,
    FontStyle
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
      form: this.$form.createForm(this, {
        name: "news-range-detail",
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
