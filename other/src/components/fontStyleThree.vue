<template>
  <ul class="font-style">
    <li
      :class="`font-style-item bold ${fontWeight === 'bold' ? 'active' : ''}`"
      @click="handleChange('bold', 'fontWeight')"
    >
      <img :src="fontWeight === 'bold'?boldSelectedIcon:boldNormalIcon" />
    </li>
    <!-- <li
      :class="`font-style-item italic ${fontStyle === 'italic' ? 'active' : ''}`"
      @click="handleChange('italic', 'fontStyle')"
    >
      <img :src="fontStyle === 'italic'?ISelectedIcon:INormalIcon" />
    </li>
    <li
      :class="`font-style-item underline ${textDecoration === 'underline' ? 'active' : ''}`"
      @click="handleChange('underline', 'textDecoration')"
    >
      <img :src="textDecoration === 'underline'?underlineSelectedIcon:underlineNormalIcon" />
    </li> -->
    <!-- <li
      :class="`font-style-item line-through ${textDecoration === 'line-through' ? 'active' : ''}`"
      @click="handleChange('line-through', 'textDecoration')"
    ></li>-->
  </ul>
</template>

<script>
import boldNormalIcon from "@/assets/images/bold-normal.png";
import boldSelectedIcon from "@/assets/images/bold-selected.png";
export default {
  name: "FontStyle",
  props: ["value"],
  data() {
    return {
      boldNormalIcon,
      boldSelectedIcon,
      fontWeight: "",
      fontStyle: "",
      textDecoration: "",
      textAlign: ""
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.fontWeight = val.fontWeight;
        this.fontStyle = val.fontStyle;
        this.textDecoration = val.textDecoration;
        this.textAlign = val.textAlign;
      }
    }
  },
  methods: {
    handleChange(val, key) {
      let params = {
        fontWeight: this.fontWeight,
        fontStyle: this.fontStyle,
        textDecoration: this.textDecoration,
        textAlign: this.textAlign
      };
      this.$emit("change", {
        ...params,
        [key]: this[key] === val ? "" : val
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.font-style {
  float: left;
  margin-top: 4px;
  &-item {
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #0e3753;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-size: 100% 100%;
    // background-position: center center;
    // background-repeat: no-repeat;
    & + .font-style-item {
      @extend .m-left-10;
    }
  }
}
</style>
