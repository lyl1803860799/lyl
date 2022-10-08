<template>
  <transition-group name="carousel-list" tag="ul" class="list-container">
    <li class="list-item" v-for="item in items" :key="`${item.itsmNo}-${item.index}`">
      <div :class="['swiper-item', activeIndex === item.index ? 'active' : '']">
        <p class="name" :style="titleStyle">{{ item.itsmNo }}</p>
        <p class="status" :style="statusStyle">{{ item.statusStr }}</p>
        <div
          :class="['apply-info', activeIndex === item.index ? 'active' : '']"
          :style="contentStyle"
        >
          <i :class="{ 'active-icon': activeIndex === item.index }"></i>
          <p class="user">
            <span class="userName m-right-10">{{ item.applyPeopleName }}</span>
            <span class="time">{{ item.taskStart }} - {{ item.taskEnd }}</span>
          </p>
          <p class="info textPoint">
            {{ item.applyOverview }}
          </p>
        </div>
      </div>
    </li>
  </transition-group>
</template>
<script>
import * as _ from 'lodash'
import { addResizeListener, removeResizeListener } from '@/utils/tool'

export default {
  name: 'MainCarousel',
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    loop: {
      type: Boolean,
      default: true
    },
    playDirection: {
      default: 'left'
    },
    itemArray: Array,
    styleObj: Object
  },
  data() {
    return {
      items: [],
      activeIndex: 0,
      containerWidth: 0,
      timer: null,
      titleStyle: '',
      statusStyle: '',
      contentStyle: ''
    }
  },
  watch: {
    itemArray: {
      immediate: true,
      handler() {
        this.activeIndex = 0
      }
    },
    styleObj: {
      immediate: true,
      handler(val) {
        this.titleStyle = this.computedStyle(val?.titleStyle || {})
        this.statusStyle = this.computedStyle(val?.statusStyle || {})
        this.contentStyle = this.computedStyle(val?.contentStyle || {})
      }
    },
    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer()
    },
    loop() {
      this.setActiveItem(this.activeIndex)
    },
    playDirection() {
      this.activeIndex = this.itemArray?.length
    },
    activeIndex() {
      this.resetItemPosition()
    },
    interval() {
      this.pauseTimer()
      setTimeout(this.startTimer, 100)
    }
  },
  methods: {
    resetItemPosition() {
      const items = (this.itemArray || []).map((item, i) => {
        return { ...item, index: i }
      })
      const middleIndx = Math.ceil(items.length / 2) - 1
      if (this.activeIndex <= middleIndx) {
        this.items = [...items.slice(this.activeIndex - middleIndx), ...items]
          .slice(0, items.length)
          .map((item) => {
            return { ...item }
          })
      } else {
        this.items = [...items, ...items.slice(0, this.activeIndex - middleIndx)]
          .slice(-items.length)
          .map((item) => {
            return { ...item }
          })
      }
    },

    playSlides() {
      if (this.playDirection === 'left') {
        if (this.activeIndex < this.items.length - 1) {
          this.activeIndex++
        } else if (this.loop) {
          this.activeIndex = 0
        }
      } else {
        if (this.activeIndex > 0) {
          this.activeIndex--
        } else if (this.loop) {
          this.activeIndex = this.items.length - 1
        }
      }
    },

    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },

    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return
      this.timer = setInterval(this.playSlides, this.interval)
    },

    setActiveItem(index = 0) {
      index = Number(index)
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn('[Element Warn][Carousel]index must be an integer.')
        return
      }
      let length = this.items.length
      const oldIndex = this.activeIndex
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1
      } else {
        this.activeIndex = index
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition()
      }
    },
    computedStyle(obj) {
      let style = ''
      if (obj.color) {
        style += `color: ${obj.color};`
      }
      if (obj.fontSize) {
        style += `font-size: ${obj.fontSize}px;`
      }
      if (obj.weight) {
        style += `font-weight: ${obj.weight ? 'bold' : 'normal'};`
      }
      return style
    }
  },

  mounted() {
    this.$nextTick(() => {
      addResizeListener(this.$el, _.debounce(this.setActiveItem, 300))
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex
      }
      this.startTimer()
    })
  },

  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.setActiveItem)
    this.pauseTimer()
  }
}
</script>
<style lang="scss" scoped>
.list-container {
  width: 1920px;
  height: 193px;
  white-space: nowrap;

  .list-item {
    display: inline-block;
    height: 160px;
    width: 350px;
  }
}
.swiper-item {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  color: #87cce7;
  padding: 20px;
  font-size: 16px;
  transform: scale(0.8);
  cursor: pointer;
  box-sizing: border-box;
  background-image: url(../../../assets/item-box.png);
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  list-style-type: none;
  p {
    height: 40px;
    line-height: 40px;
    margin: 0;
  }
  .name {
    color: $white;
    font-size: 18px;
  }
  .apply-info {
    position: relative;
    i {
      display: none;
      &.active-icon {
        width: 117px;
        height: 113px;
        display: block;
        background-image: url(../../../assets/swiper-active-icon.png);
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: absolute;
        left: -20px;
        top: 0;
      }
    }
    &.active {
      padding-left: 117px;
      .user {
        line-height: 53px;
        .userName {
          font-size: 20px;
          width: 90px;
        }
      }
    }
    .user {
      @extend .ft-16;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      border-bottom: 1px dashed #fff;
      overflow: hidden;
      .time {
        flex: 1;
        text-align: right;
      }
    }
  }
  .status {
    @extend .ft-16;
    position: absolute;
    color: #0ee8e0;
    text-align: center;
    top: 8px;
    right: 2px;
    width: 100px;
  }
  &.active {
    transform: scale(1);
    .status {
      top: 13px;
      width: 110px;
    }
  }
}
.carousel-list-move {
  transition: transform 1s;
}
</style>
