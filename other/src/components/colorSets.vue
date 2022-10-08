<template>
  <ul class="color-sets">
    <li class="color-item" v-for="(color, i) in colorSets" :key="`${color}-${i}`">
      <color-input class="color-input" :value="color" @change="changed($event, i)"></color-input>
      <template v-if="i === 0">
        <span class="action" @click="add">+</span>
      </template>
      <template v-else>
        <span class="action" @click="del(i)">-</span>
      </template>
    </li>
  </ul>
</template>

<script>
import ColorInput from './colorInput'

export default {
  name: 'ColorSets',
  props: ['value'],
  data() {
    return { colorSets: [] }
  },
  components: {
    ColorInput
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.colorSets = (val && [...val]) || []
      }
    }
  },
  methods: {
    changed(val, index) {
      const colorSets = this.colorSets.map((item, i) => {
        if (i === index) {
          item = val
        }
        return item
      })
      this.$emit('change', colorSets)
    },
    add() {
      this.$emit('change', [...this.colorSets, '#000000'])
    },
    del(i) {
      const colorSets = this.colorSets.filter((item, index) => index !== i)
      this.$emit('change', colorSets)
    }
  }
}
</script>

<style lang="scss" scoped>
.color-item {
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  .color-input {
    display: inline-block;
    height: 32px;
    width: 32px;
  }
  .action {
    display: inline-block;
    padding: 5px;
    font-size: 20px;
    margin-left: 10px;
    color: $db28;
    cursor: pointer;
  }
}
</style>
