<template>
  <span class="screen-size">
    <a-select v-model="defineSize" style="width: 100%" @change="handleChange">
      <a-select-option value="1920*1080">1920*1080</a-select-option>
      <a-select-option value="1680*1050">1680*1050</a-select-option>
      <a-select-option value="1600*900">1600*900</a-select-option>
      <a-select-option value="1400*1050">1400*1050</a-select-option>
      <a-select-option value="1400*900">1400*900</a-select-option>
      <a-select-option value="1366*768">1366*768</a-select-option>
      <a-select-option value="1360*768">1360*768</a-select-option>
      <a-select-option value="1280*1024">1280*1024</a-select-option>
      <a-select-option value="1280*960">1280*960</a-select-option>
      <a-select-option value="1280*800">1280*800</a-select-option>
      <a-select-option value="1280*720">1280*720</a-select-option>
      <a-select-option value="1080*1920">1080*1920</a-select-option>
    </a-select>
    <!-- <a-input-number
      :min="1"
      :step="1"
      :precision="0"
      :value="width"
      @change="handleNumberChange($event, 'width')"
    ></a-input-number>
    <a-input-number
      :min="1"
      :step="1"
      :precision="0"
      :value="height"
      @change="handleNumberChange($event, 'height')"
    ></a-input-number>-->
  </span>
</template>

<script>
export default {
  name: "ScreenSize",
  props: ["value"],
  data() {
    const self = this;
    const value = this.value.split("*") || [];
    return {
      defineSize: self.value,
      width: value[0] || 0,
      height: value[1] || 0
    };
  },
  watch: {
    value(val = {}) {
      if (typeof val === "string") {
        const size = val.split("*") || [];
        this.width = size[0] || 0;
        this.height = size[1] || 0;
        this.defineSize = val;
      } else {
        this.width = val.width || 0;
        this.height = val.height || 0;
        this.defineSize = val.width+"*"+val.height;
      }
    }
  },
  mounted() {},
  methods: {
    handleChange() {
      let defineSize = this.defineSize.split("*");
      let w = Number(defineSize[0]);
      let h = Number(defineSize[1]);
      console.log(this.$data);
      this.$emit(
        "change",
        Object.assign(
          {},
          { width: w, height: h },
          { ["width"]: w <= 0 ? 1 : w, ["height"]: h <= 0 ? 1 : h }
        )
      );
    }
    // handleNumberChange(e, key) {
    //   this.$emit(
    //     "change",
    //     Object.assign({}, this.$data, { [key]: e <= 0 ? 1 : e })
    //   );
    // }
  }
};
</script>

<style lang="scss" scoped>
.screen-size {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
