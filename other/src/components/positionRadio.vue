<template>
  <ul class="position-radio">
    <li
      :class="['radio-item', item, active === item ? 'active' : '']"
      v-for="item in posArr"
      :key="item"
      @click="handleClick(item)"
    ></li>
  </ul>
</template>

<script>
export default {
  name: 'PositionRadio',
  props: {
    value: String
  },
  data() {
    return {
      posArr: ['top', 'left', 'bottom', 'right'],
      lastVal: ''
    }
  },
  computed: {
    active: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  },
  methods: {
    handleClick(item) {
      if (item !== this.lastVal) {
        this.active = item
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@function bg-img($name) {
  @return url(../assets/icon/legend-#{$name}.png);
}
.position-radio {
  display: flex;
  align-items: center;
  .radio-item {
    width: 32px;
    height: 32px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;

    & + .radio-item {
      margin-left: 12px;
    }
    &.top {
      background-image: bg-img('top');
      &:hover,
      &.active {
        background-image: bg-img('top-a');
      }
    }
    &.left {
      background-image: bg-img('left');
      &:hover,
      &.active {
        background-image: bg-img('left-a');
      }
    }
    &.right {
      background-image: bg-img('right');
      &:hover,
      &.active {
        background-image: bg-img('right-a');
      }
    }
    &.bottom {
      background-image: bg-img('bottom');
      &:hover,
      &.active {
        background-image: bg-img('bottom-a');
      }
    }
  }
}
</style>
