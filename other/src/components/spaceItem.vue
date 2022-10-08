<template>
  <a-row type="flex" :gutter="20" class="space-item">
    <a-col class="relative" :span="12">
      <a-input-number
        :min="0"
        :step="1"
        :precision="0"
        :value="form.itemGap"
        @change="handleNumberChange($event, 'itemGap')"
      ></a-input-number>
      <span class="info">左右间距</span>
    </a-col>
    <a-col class="relative" :span="12">
      <a-input-number
        :min="0"
        :step="1"
        :precision="0"
        :value="form.pos"
        @change="handleNumberChange($event, 'pos')"
      ></a-input-number>
      <span class="info">上下间距</span>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'SpaceItem',
  props: ['value'],
  data() {
    return {
      form: {
        itemGap: 0,
        pos: 0
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.$set(this, 'form', val || { itemGap: 0, pos: '' })
        }
      }
    }
  },
  methods: {
    handleNumberChange(e, key) {
      this.$emit('change', { ...this.form, [key]: e || 0 })
    }
  }
}
</script>

<style lang="scss" scoped>
.space-item {
  margin-bottom: 20px;
  .relative {
    position: relative;
    color: $white;
    .info {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -25px;
      text-align: center;
    }
  }
}
</style>
