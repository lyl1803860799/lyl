<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="开启平滑曲线" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-radio-group v-decorator="['smooth', { initialValue: formData.smooth }]">
        <a-radio :value="true">是</a-radio>
        <a-radio :value="false">否</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="数据点标记" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-select
        v-decorator="['symbol', { initialValue: formData.symbol }]"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option v-for="option in symbolList" :value="option.value" :key="option.value">
          {{
          option.label
          }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="数据点大小" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <dot-size v-decorator="['symbolSize', { initialValue: formData.symbolSize }]" />
    </a-form-item>
    <a-form-item label :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
      <line-line-style v-decorator="['lineStyle', { initialValue: formData.lineStyle }]" />
    </a-form-item>
    <a-form-item label="设置区域颜色" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }" class="m-bottom-0">
      <a-switch v-decorator="['isShowArea', { initialValue: formData.isShowArea }]"  @change="onChange" />
    </a-form-item>
    <a-form-item label :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0" v-if="formData.isShowArea">
      <area-style
        v-decorator="['areaStyle', { initialValue: formData.areaStyle?formData.areaStyle:initAreaStyle }]"
      />
    </a-form-item>
    <a-form-item label :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
      <item-style v-decorator="['itemStyle', { initialValue: formData.itemStyle }]" />
    </a-form-item>
  </a-form>
</template>

<script>
import DotSize from "./dotSize";
import LineLineStyle from "./series/line/lineDetailStyle";
import ItemStyle from "./series/line/itemStyle";
import AreaStyle from "./series/line/areaStyle";

const SYMBOL_LIST = [
  { value: "emptyCircle", label: "空心圆" },
  { value: "circle", label: "实心圆" },
  { value: "rect", label: "方形" },
  { value: "triangle", label: "三角形" },
  { value: "none", label: "无" }
];
export default {
  name: "LineStyle",
  props: ["value"],
  data() {
    const self = this;
    return {
      areaColor: "",
      symbolList: SYMBOL_LIST,
      initAreaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#30f5ee" // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0a72fa" // 0% 处的颜色
            }
          ]
        }
      },
      formData: {},
      form: this.$form.createForm(this, {
        name: "line-style",
        onValuesChange(props, values) {
          self.$emit("change", { ...self.formData, ...values });
        }
      })
    };
  },
  components: {
    DotSize,
    ItemStyle,
    AreaStyle,
    LineLineStyle
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = Object.assign({}, val);
        }
      }
    }
  },
  methods:{
    onChange(e){
      this.value.isShowArea = e
    }
  }
};
</script>
