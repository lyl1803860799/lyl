<template>
  <transition-group name="layer-list" tag="ul" class="layer-list">
    <li class="layer-item" v-for="item in layerList" :key="item.option.domId">
      <a-tooltip placement="bottomLeft" :title="item.option.title.name">
        <span class="title">{{ item.option.title.name }}</span>
      </a-tooltip>
      <a-tooltip placement="bottom" title="上移">
        <span class="action add" @click="handleLayerChange(item, item.rawIdx, 'add')"></span>
      </a-tooltip>
      <a-tooltip placement="bottom" title="下移">
        <span class="action minus" @click="handleLayerChange(item, item.rawIdx, 'minus')"></span>
      </a-tooltip>
      <a-tooltip placement="bottom" title="置于顶层">
        <span class="action top" @click="handleLayerChange(item, item.rawIdx, 'top')"></span>
      </a-tooltip>
      <a-tooltip placement="bottom" title="置于底层">
        <span class="action bottom" @click="handleLayerChange(item, item.rawIdx, 'bottom')"></span>
      </a-tooltip>
    </li>
  </transition-group>
</template>

<script>
export default {
  name: 'LayerList',
  props: {
    list: Array,
    max: Number,
    min: Number
  },
  data() {
    return {}
  },
  computed: {
    layerList() {
      const layerList = this.list.map((item, rawIdx) => {
        return {
          ...item,
          rawIdx
        }
      })
      layerList.sort((a, b) => b.z - a.z)
      return layerList
    }
  },
  methods: {
    handleLayerChange(data, index, action) {
      if (['add', 'top'].includes(action) && data.z === this.max) return
      if (['minus', 'bottom'].includes(action) && data.z === this.min) return
      this.$emit('layer-change', { index, value: action })
    }
  }
}
</script>

<style lang="scss" scoped>
// 操作按钮背景样式
@each $name in add, minus, bottom, top {
  .#{$name} {
    background-image: url(../../assets/icon/action-#{$name}.png);
    &:hover {
      background-image: url(../../assets/icon/action-#{$name}-a.png);
    }
  }
}

.layer-list {
  background: $db37;
  color: $white;
  width: 100%;
  overflow: hidden;
  padding: 10px 0;

  .layer-item {
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50px;
    padding: 0 16px;
    cursor: default;
    &:hover {
      background: $db53;
    }
    .title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 15px;
    }
    .action {
      display: inline-block;
      width: 1em;
      height: 1em;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      cursor: pointer;

      & + .action {
        margin-left: 18px;
      }
    }
  }
}
.layer-list-move {
  transition: transform 1s ease-in-out;
}
</style>
