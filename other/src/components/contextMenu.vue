<template>
  <ul v-show="visible" class="context-menu" :style="bodyStyle" v-clickOutSide="hideMenu">
    <li
      class="context-menu-item"
      v-for="item in itemList"
      :key="item.value"
      @click="handleChoose(item)"
    >
      <span :class="`action ${item.value}`"></span>
      {{ item.label }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    itemList: {
      type: Array,
      required: true
    },
    bodyStyle: {
      type: Object
    },
    visible: Boolean
  },
  data() {
    return {}
  },
  methods: {
    handleChoose(item) {
      this.hideMenu()
      if (item.value === 'save') {
        this.$emit('save', item)
      } else {
        this.$emit('choose', item)
      }
    },
    hideMenu() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
// 操作按钮背景样式
@function bgIcon($name) {
  @return url('~@/assets/icon/action-'+$name+'.png');
}
.context-menu {
  @extend .radius-4;
  position: fixed;
  z-index: 99999;
  background-color: $db40;
  border: 1px solid $db46;
  color: $white;
  padding: 4px 0;
  &-item {
    height: 2em;
    line-height: 2em;
    padding: 0 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .action {
      display: inline-block;
      width: 1em;
      height: 1em;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      margin-right: 5px;
      &.add {
        background-image: bgIcon(add);
      }
      &.minus {
        background-image: bgIcon(minus);
      }
      &.bottom {
        background-image: bgIcon(bottom);
      }
      &.top {
        background-image: bgIcon(top);
      }
      &.save {
        background-image: bgIcon(save);
      }
    }
    &:hover {
      background-color: $db47 !important;
      color: $brightGreen !important;
      .action {
        &.add {
          background-image: bgIcon(add-a);
        }
        &.minus {
          background-image: bgIcon(minus-a);
        }
        &.bottom {
          background-image: bgIcon(bottom-a);
        }
        &.top {
          background-image: bgIcon(top-a);
        }
        &.save {
          background-image: bgIcon(save-a);
        }
      }
    }
  }
}
</style>
