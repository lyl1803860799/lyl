<template>
  <ul class="bg-container">
    <li
      v-for="color in bgColor"
      :key="color"
      :class="['bg-color', value === color ? 'active' : '']"
      :style="{ backgroundImage: color }"
      @click="handleClick(color)"
    ></li>
  </ul>
</template>

<script>
export default {
  name: 'BgColor',
  props: {
    value: String
  },
  data() {
    return {
      bgColor: [
        'linear-gradient(#092844, #092844)',
        'linear-gradient(#06173D, #06173D)',
        'linear-gradient(#17124B, #17124B)'
      ]
    }
  },
  computed: {
    colorVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  },
  methods: {
    handleClick(color) {
      this.colorVal = this.colorVal !== color ? color : this.colorVal
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $db38;
  background-color: $db39;
  color: #1a7eff;
  border-radius: 0;
  padding: 10px 0;
  .bg-color {
    border: 1px solid $db38;
    width: 34px;
    height: 22px;
    cursor: pointer;
    &.active,
    &:hover {
      border: 1px solid $brightGreen;
    }
    & + .bg-color {
      margin-left: 10px;
    }
  }
}
</style>
