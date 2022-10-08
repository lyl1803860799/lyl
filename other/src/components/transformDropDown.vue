<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
      <span :class="`img ${selectedItem.className}`"></span
      ><span class="label">{{ selectedItem.label }}</span> <a-icon type="down" />
    </a>
    <ul class="list" slot="overlay">
      <li
        class="list-item"
        v-for="(item, i) in itemList"
        :key="item.label"
        @click="handleSelect(item, i)"
      >
        <span :class="`img ${item.className}`"></span><span class="label">{{ item.label }}</span>
      </li>
    </ul>
  </a-dropdown>
</template>

<script>
export default {
  name: 'TransformDropDown',
  props: ['value'],
  data() {
    return {
      itemList: [
        { className: 'skew', value: 'skew', label: '斜切' },
        { className: 'rotate', value: 'rotate', label: '旋转' },
        { className: 'normal', value: '', label: '无旋转' }
      ],
      selectedIndex: 0
    }
  },
  computed: {
    selectedItem() {
      return this.itemList[this.selectedIndex] || {}
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.selectedIndex = this.itemList.findIndex((item) => item.value === val)
      }
    }
  },
  methods: {
    handleSelect(item, i) {
      if (this.selectedIndex !== i) {
        this.selectedIndex = i
        this.$emit('change', item.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-dropdown-link,
.list {
  color: $white;
  display: flex;
  align-items: center;
  .img {
    width: 29px;
    height: 29px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    margin-right: 10px;

    &.skew {
      background-image: url('../assets/transform-skew.png');
    }
    &.rotate {
      background-image: url('../assets/transform-rotate.png');
    }
    &.normal {
      background-image: url('../assets/transform-normal.png');
    }
  }
}
.list {
  display: block;
  background-color: $dropBg;
  .list-item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    color: $white;
    padding: 0 15px;
    cursor: pointer;
    &:hover {
      background-color: $dropActive;
    }
  }
}
</style>
