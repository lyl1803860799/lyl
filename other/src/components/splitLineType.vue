<template>
  <div class="split-line-type">
    <a-icon
      class="m-right-10"
      :type="formData.show ? 'eye' : 'eye-invisible'"
      @click="handleChange(!formData.show, 'show')"
    />
    <a-radio-group :value="formData.type" @change="handleChange($event.target.value, 'type')">
      <a-radio value="solid"> 实线 </a-radio>
      <a-radio value="dashed"> 虚线 </a-radio>
      <a-radio value="dotted"> 点线 </a-radio>
    </a-radio-group>
  </div>
</template>

<script>
export default {
  name: 'SplitLineType',
  props: ['value'],
  data() {
    return {
      formData: {
        show: false,
        type: 'solid'
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = Object.assign(
            {},
            val || {
              show: false,
              type: 'solid'
            }
          )
        }
      }
    }
  },
  methods: {
    handleChange(val, key) {
      this.$emit('change', { ...this.formData, [key]: val })
    }
  }
}
</script>

<style lang="scss" scoped>
.split-line-type {
  display: flex;
  align-items: center;
  color: $white;
  height: 36px;
  line-height: 36px;
}
</style>
