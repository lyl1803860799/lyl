<template>
  <div class="alert-level-container">
    <div class="alert-level-item">
      <label class="alert-label">颜色</label>
      <color-input
        :show-input="true"
        class="color-input-item alert-item"
        type="color"
        :value="color"
        placement="top"
        @change="handleChange($event, 'color')"
      />
    </div>
    <div class="alert-level-item">
      <label class="alert-label">线宽</label>
      <a-input-number
        class=" alert-item"
        :step="1"
        :max="10"
        :min="2"
        :value="width"
        @change="handleChange($event, 'width')"
      ></a-input-number>
    </div>
    <div class="alert-level-item">
      <label class="alert-label">别名</label>
      <a-input
        class="alert-item"
        :value="name"
        placeholder="请输入别名"
        @change="handleChange($event.target.value, 'name')"
      ></a-input>
    </div>
  </div>
</template>

<script>
import ColorInput from '@/components/colorInput'

export default {
  name: 'AlertLevel',
  props: ['value'],
  data() {
    return {
      color: '#ffffff',
      width: 2,
      name: ''
    }
  },
  components: { ColorInput },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.color = val?.color || '#ffffff'
        this.width = val?.width || 2
        this.name = val?.name || ''
      }
    }
  },
  methods: {
    handleChange(val, key) {
      this.$emit('change', { ...this.$data, [key]: val })
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-level-container {
  .alert-level-item {
    display: flex;
    align-items: center;
    .alert-label {
      color: $white;
      margin-right: 10px;
    }
    .alert-item {
      flex: 1;
    }
  }
}
</style>
