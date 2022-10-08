<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="表头颜色">
      <color-input
        :show-input="true"
        :elId="'tableHeaderColor'"
        v-decorator="['headerTC', { initialValue: formData.headerTC }]"
      ></color-input>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="表头背景">
      <color-input
        :show-input="true"
        :elId="'tableHeaderBgColor'"
        v-decorator="['headerBGC', { initialValue: formData.headerBGC }]"
      ></color-input>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="字体位置">
      <a-select
        v-decorator="['headerAlign', { initialValue: formData.headerAlign }]"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option value="center">居中</a-select-option>
        <a-select-option value="left">左对齐</a-select-option>
        <a-select-option value="right">右对齐</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="字体大小">
      <a-input-number
        :min="12"
        :max="64"
        :step="1"
        :precision="0"
        v-decorator="['fontSize', { initialValue: formData.fontSize }]"
      ></a-input-number>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="显示行数">
      <a-input v-decorator="['rowNum', { initialValue: formData.rowNum }]"></a-input>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="开启滚动">
      <a-switch v-decorator="['start', { initialValue: formData.start, valuePropName: 'checked' }]"></a-switch>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="滚动时间">
      <a-input-number :min="0" v-decorator="['waitTime', { initialValue: formData.waitTime }]"></a-input-number>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="线条显示">
      <a-switch
        v-decorator="[
          'showBorder',
          { initialValue: formData.showBorder, valuePropName: 'checked' }
        ]"
      ></a-switch>
    </a-form-item>
    <!-- <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="开启排行">
      <a-switch
        v-decorator="['index', { initialValue: formData.index, valuePropName: 'checked' }]"
      ></a-switch>
    </a-form-item>-->
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="字体颜色">
      <color-input
        :show-input="true"
        :elId="'tableFontColor'"
        v-decorator="['bodyColor', { initialValue: formData.bodyColor }]"
      ></color-input>
    </a-form-item>
    <!-- <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="表格背景">
      <color-input :show-input="true" :elId="'tableBodyBgColor'" :placement="'top'" v-decorator="['bodyBGC', { initialValue: formData.bodyBGC }]"></color-input>
    </a-form-item> -->
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="字体位置">
      <a-select
        v-decorator="['bodyAlign', { initialValue: formData.bodyAlign }]"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option value="center">居中</a-select-option>
        <a-select-option value="left">左对齐</a-select-option>
        <a-select-option value="right">右对齐</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="线条颜色">
      <color-input
        :elId="'tableLineColor'"
        placement="top"
        :show-input="true"
        v-decorator="['borderColor', { initialValue: formData.borderColor }]"
      ></color-input>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="奇行颜色">
      <color-input
        :elId="'tableOddColor'"
        placement="top"
        :show-input="true"
        v-decorator="['oddRowBGC', { initialValue: formData.oddRowBGC }]"
      ></color-input>
    </a-form-item>
    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label="偶行颜色">
      <color-input
        :elId="'tableEvenColor'"
        placement="top"
        :show-input="true"
        v-decorator="['evenRowBGC', { initialValue: formData.evenRowBGC }]"
      ></color-input>
    </a-form-item>
    <!-- <div class="header">表列设置：</div>
    <template v-for="(col, i) in formData.appendHeader">
      <a-form-item :key="`col-${i}`" label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }">
        <board-col
          v-decorator="[`appendHeader[${i}]`, { initialValue: formData.appendHeader[i] }]"
        />
      </a-form-item>
    </template>
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 23 }">
      <add-btn title="增加" @add="addCol" class="add-btn"></add-btn>
    </a-form-item>-->
  </a-form>
</template>

<script>
import ColorInput from "@/components/colorInput";
//import BoardCol from "./boardCol";
//import AddBtn from "@/components/addBtn";

export default {
  name: "Board",
  props: ["value"],
  components: { 
    //BoardCol, 
    ColorInput, 
    //AddBtn 
  },
  data() {
    const self = this;
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: "board",
        onValuesChange(props, values) {
          let rawVal = self.formData;
          if (values.appendHeader) {
            rawVal.appendHeader = rawVal.appendHeader.map((item, i) => {
              if (values.appendHeader[i]) {
                return values.appendHeader[i];
              }
              return item;
            });
            self.$emit("change", { ...rawVal });
          } else {
            self.$emit("change", { ...rawVal, ...values });
          }
        }
      })
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val);
      }
    }
  },
  methods: {
    addCol() {
      this.formData.appendHeader.push({
        name: "",
        animation: false,
        duration: 3,
        width: 0
      });
      this.$emit("change", { ...this.formData });
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
<style lang="scss" scoped>
.add-btn {
  width: 100%;
}
.header {
  @extend .ft-16;
  @extend .p-bottom-10;
  color: $white;
}
</style>
