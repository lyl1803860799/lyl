<template>
  <div
    class="carousel-container"
    :style="{ width: `${options.component.width}px`, height: `100%` }"
  >
    <!-- <div
      class="carousel-header"
      :style="{
        fontFamily: options.title.style && options.title.style.fontFamily,
        fontSize: `${options.title.style && options.title.style.fontSize}px`,
        lineHeight: `${(options.title.style && options.title.style.fontSize * 2 + 'px') || 2}`,
        opacity: isSave ? 0 : 1
      }"
    >
      {{ options.title.name }}
    </div>-->
    <div class="carousel" :style="{
        height: `100%`
      }">
      <!-- <a-carousel
        autoplay
        :dots="false"
        :autoplaySpeed="300000"
        :beforeChange="refresh"
        arrows
      >
        <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
          <a-icon type="right-circle" />
        </div>
        <div class="carousel-item" v-for="(item, i) in list" :key="`carousel-item-${i}`">
          <component
            :ref="item.domId"
            :show-title="options.contentOption.show"
            :is="item.componentName"
            :options="item.option"
          />
        </div>
      </a-carousel>-->
      <div class="swiper linkSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, i) in list" :key="`carousel-item-${i}`">
            <component
              :ref="item.domId"
              :show-title="options.contentOption.show"
              :is="item.componentName"
              :options="item.option"
            />
          </div>
        </div>
      </div>
      <div
        class="define-gray-modal"
        :style="{ width: `${options.component.width}px`, height: `${options.component.height}px`,cursor:isEdit?'move':'unset' }"
      ></div>
    </div>
  </div>
</template>

<script>
import Swiper from "@/utils/swiper-bundle.min.js";
import "@/utils/swiper-bundle.min.css";
export default {
  name: "BiSwiper",
  props: ["options", "isSave"],
  data() {
    return {
      count: 0,
      isEdit: false,
      mySwiper: null
      // list: []
    };
  },
  computed: {
    list() {
      let list = [];
      if (this.options) {
        list = this.options.contentOption.list.map(item => {
          item.option = {
            ...item.option,
            component: {
              ...this.options.component
            },
            domId: item.domId
          };
          return item;
        });
      }
      return list;
    }
  },
  mounted() {
    let speedTime = this.options.contentOption.autoPlaySpeed * 1000 || 3000;
    this.mySwiper = new Swiper(".linkSwiper", {
      initialSlide: 0,
      centeredSlides: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      autoplay: {
        delay: speedTime
      }
    });
    if (window.location.href.indexOf("/edit/") > -1) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  },
  methods: {
    refresh(from, to) {
      if (this.list.length === 1) {
        if (this.count === 0) {
          const item = this.list[to];
          if (item) {
            this.$refs[item.domId].forEach(cmp => {
              cmp.refresh();
            });
          }
          this.count++;
        }
      } else {
        const item = this.list[to];
        if (item) {
          this.$refs[item.domId].forEach(cmp => {
            cmp.refresh();
          });
        }
      }
    }
  },
  watch: {
    "options.contentOption.autoPlaySpeed": {
      handler(val) {
        if (this.mySwiper) {
          this.mySwiper.destroy(true);
        }
        this.mySwiper = new Swiper(".linkSwiper", {
          initialSlide: 0,
          centeredSlides: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          autoplay: {
            delay: val * 1000 || 3000
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.carousel-container {
  display: flex;
  flex-direction: column;
  .carousel-header {
    text-align: left;
    @extend .ft-12;
    line-height: 1.2em;
    padding: 0 10px;
  }
  .carousel {
    width: 100%;
    height: 100%;
    flex: "auto";
    position: relative;
    .ant-carousel {
      height: 100%;
      ::v-deep .slick-slider {
        height: 100%;
        div {
          height: 100%;
        }
        .slick-prev,
        .slick-next {
          display: none !important;
        }
      }
    }
    // .carousel-item {
    //   min-width: 300px;
    //   min-height: 300px;
    // }
  }
}
.linkSwiper {
  width: 100%;
  height: 100%;
  z-index: 0;
}
.define-gray-modal {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.05);
  cursor: move;
}
</style>

<style lang="scss">
.ant-carousel .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: $white;
  background-color: transparent;
  opacity: 0.3;
  &:before {
    display: none;
  }
  &:hover {
    color: $white;
    opacity: 0.5;
  }
}
</style>
