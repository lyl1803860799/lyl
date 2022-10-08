<template>
  <div
    class="video-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="video-header"
      v-show="showTitle"
      :style="{
        fontFamily: options.title.style && options.title.style.fontFamily,
        fontSize: `${options.title.style && options.title.style.fontSize}px`,
        lineHeight: `${(options.title.style && options.title.style.fontSize * 2 + 'px') || 2}`,
        opacity: isSave ? 0 : 1
      }"
    >
      {{ options.title.name }}
    </div>-->
    <div :class="options.domId" :ref="options.domId" class="video">
      <!-- 视频自动播放需要默认静音，否则会被浏览器拦截播放 -->
      <video
        v-if="options.contentOption.data"
        controls 
        autoplay
        :id="'video_'+options.domId"
        class="el-video"
        :loop="options.contentOption.loop"
        :muted="options.contentOption.muted"
        :src="options.contentOption.data"
      >您的浏览器不支持video标签</video>
      <div
        class="define-gray-modal"
        :style="{ width: `${options.component.width}px`, height: `${options.component.height}px`,cursor:isEdit?'move':'unset' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BiVideo",
  props: {
    showTitle: {
      default: true
    },
    options: {
      required: true,
      type: Object
    },
    isSave: {
      required: false,
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isEdit: false
    };
  },
  mounted() {
    if (window.location.href.indexOf("/edit/") > -1) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    this.$nextTick(() => {
      let id = "video_" + this.options.domId;
      let el = document.getElementById(id);
      el.play();
    });
  },
  methods: {
    refresh() {}
  }
};
</script>

<style lang="scss" scoped>
.video-container {
  display: flex;
  flex-direction: column;
  .video-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    line-height: 1.2em;
    padding: 0 10px;
  }
  .video {
    width: 100%;
    height: 100%;
    flex: "auto";
    position: relative;
    video {
      width: 100%;
      height: 100%;
    }
  }
}
.el-video {
  object-fit: fill;
}
.define-gray-modal {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.05);
  cursor: move;
}
</style>
