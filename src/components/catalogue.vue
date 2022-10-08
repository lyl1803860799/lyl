<template>
  <div id="catalogue-container">
      <a-anchor  @click="handleClick">
        <!-- <a-anchor-link href="javascript:void(0)" @click="goAnchor('#one')" title="Basic demo" /> -->
        <a-anchor-link href="#one" title="Basic demo" />
      </a-anchor>
  </div>
</template>

<script>
export default {
  methods: {
    goAnchor (selector) {
      console.log(selector);
      document.querySelector(selector).scrollIntoView({
        behavior:"smooth"
      })
    },
    handleClick(e, link) {
      // 阻止点击的默认事件修改路由
      e.preventDefault();
      this.$emit('handleClick', link)
    }
  } 
}
</script>

<style lang="less" scoped>
/deep/ .ant-anchor-wrapper {
  padding-left: 0;

  .ant-anchor {
    background-color: #f0f2f5;
    padding: 0;

    .ant-anchor-ink-ball {
      display: none;
    }

    .ant-anchor-link {
      padding: 0;
    }
    .ant-anchor-ink {
      &::before {
        display: none;
      }
    }
  }
}
</style>