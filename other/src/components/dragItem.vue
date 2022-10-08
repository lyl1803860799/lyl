<template>
  <draggable-resize
    :grid="[1, 1]"
    :w="width"
    :h="height"
    :x="x"
    :y="y"
    :z="z"
    :active="active"
    :scaleRatio="scale"
    :parent="false"
    :handle-info="{ size: 12, offset: -7, switch: true }"
    class-name-handle="chart-handle-class"
    class-name-active="chart-acive-class"
    :class="{borderZero:true}"
    @dragging="onDrag"
    @dragstop="dragstop"
    @resizing="onResize"
    @activated="onActivated"
    @deactivated="onDeactivated"
  >
    <div
      :class="`container ${isdragging ? 'active' : ''}`"
      @contextmenu.prevent="handleContextMenu"
    >
      <div class="btns" v-show="active && showAction">
        <i class="icon chart-copy" @click="handleCopy"></i>
        <!-- <i class="icon chart-publish" @click="handlePublish"></i> -->
        <a-icon type="close" class="close" @click="handleDel" />
      </div>
      <slot></slot>
    </div>
  </draggable-resize>
</template>

<script>
import * as draggableResize from 'vue-draggable-resizable-gorkys'

export default {
  name: 'DragItem',
  props: {
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 150
    },
    x: {
      type: Number,
      default: 50
    },
    y: {
      type: Number,
      default: 50
    },
    z: Number,
    index: Number,
    // 操作样式
    handleClass: String,
    active: Boolean,
    scale: Number,
    isdragging: Boolean,
    showAction: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  components: {
    draggableResize
  },
  methods: {
    onResize(x, y, width, height) {
      this.$emit('change', { x: x, y: y, width, height, index: this.index })
      this.$emit('resize')
    },
    onDrag: function(x, y) {
      this.$emit('isdragging')
      this.$emit('change', { x: x, y: y, index: this.index })
    },
    dragstop() {
      this.$emit('dragstop', this.index)
    },
    onActivated() {
      this.$emit('activated', this.index)
    },
    onDeactivated() {
      this.$emit('deactivated', this.index)
    },
    /* 右键操作 start */
    handleContextMenu(e) {
      this.$emit('show-context-menu', { x: e.clientX, y: e.clientY })
    },
    /* 右键操作 end */

    /* 单个组件发布/删除/复制 start */
    handlePublish() {
      this.$emit('publish', this.index)
    },
    handleDel() {
      this.$emit('delete', this.index)
    },
    handleCopy(e) {
      this.$emit('copy', {event:e,index:this.index})
    }
    /* 单个组件发布/删除 start */
  }
}
</script>

<style lang="scss">

.vdr {
  display: inline-block;
  border: 0;

  &:hover {
    box-shadow: 0 0 8px #0072da!important;
    border: 1px solid #0072da!important;
  }

  &.chart-acive-class {
    box-shadow: 0 0 8px #0072da!important;
    border: 1px solid #0072da!important;
  }

  .chart-handle-class {
    background: #fff;
    position: absolute;
    border: 1px solid #fff;
    border-radius: 50%;
    height: 14px;
    width: 14px;
    box-sizing: border-box;
    -webkit-transition: all 300ms linear;
    -ms-transition: all 300ms linear;
    transition: all 300ms linear;
    z-index: 2;
  }
  .chart-handle-class-tl {
    top: -7px;
    left: -7px;
    cursor: nw-resize;
  }

  .chart-handle-class-tm {
    top: -7px;
    left: 50%;
    margin-left: -7px;
    cursor: n-resize;
  }

  .chart-handle-class-tr {
    top: -7px;
    right: -7px;
    cursor: ne-resize;
  }

  .chart-handle-class-ml {
    top: 50%;
    margin-top: -7px;
    left: -7px;
    cursor: w-resize;
  }

  .chart-handle-class-mr {
    top: 50%;
    margin-top: -7px;
    right: -7px;
    cursor: e-resize;
  }

  .chart-handle-class-bl {
    bottom: -7px;
    left: -7px;
    cursor: sw-resize;
  }

  .chart-handle-class-bm {
    bottom: -7px;
    left: 50%;
    margin-left: -7px;
    cursor: s-resize;
  }

  .chart-handle-class-br {
    bottom: -7px;
    right: -7px;
    cursor: se-resize;
  }
}
</style>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  // &:before {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   width: 100%;
  //   // height: 100%;
  //   left: 2px;
  //   top: 2px;
  //   right: 2px;
  //   bottom: 2px;
  //   cursor: move;
  //   z-index: 9;
  //   transition: box-shadow 0.2s;
  // }

  &.active {
    &:before {
      box-shadow: 0 0 10px $db52;
      border: 1px solid $db52;
    }
  }

  .btns {
    position: absolute;
    right: 0;
    top: -1.8em;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    height: 1.5em;
    width: 4em;
    line-height: 1.5em;
    background: #071425;
    opacity: 0.9;
    border-radius: 2px;
    align-items: center;

    .icon {
      display: inline-block;
      width: 1em;
      height: 1em;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      cursor: pointer;

      & + .icon {
        margin-left: 0.5em;
      }
    }
    .chart-publish {
      background-image: url(../assets/icon/publish.png);
      &:hover {
        background-image: url(../assets/icon/publish-a.png);
      }
    }
    .chart-copy {
      background-image: url(../assets/home-project/copy.png);
      &:hover {
        background-image: url(../assets/home-project/copy_active.png);
      }
    }

    .close {
      margin-left: 0.5em;
      color: $white;
      cursor: pointer;
      &:hover {
        color: $db23;
      }
    }
  }

  &:hover {
    .btns {
      display: flex;
    }
  }
}
.borderZero{
  border:0;
}
</style>
