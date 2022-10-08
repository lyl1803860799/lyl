<template>
  <div class="add-btn" @click="addProject">
    <span class="add" v-show="showIcon"></span>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'addBtn',
  props: {
    title: String,
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    addProject() {
      this.$emit('add')
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  width: 124px;
  height: 36px;
  line-height: 36px;
  border: 1px solid $brightGreen;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
  color: $brightGreen;
  background: $addBtnBg;
  &:hover {
    background: $addBtnActiveBg;
  }
  &:focus {
    background: $addBtnFocusBg;
  }
  &:active {
    background: $addBtnFocusBg;
  }
  .add {
    width: 12px;
    height: 12px;
    background: url('../assets/home-project/add_icon.png') no-repeat;
    display: inline-block;
    margin-right: 7px;
  }
}
</style>
