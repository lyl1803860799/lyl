<template>
  <div id="aside-container">
    <a-menu
      mode="inline"
      :default-selected-keys="['home']"
    >
      <template v-for="item in menu">
        <!-- 无子菜单 -->
        <template v-if="!item.children">
          <a-menu-item :key="item.id" @click="routerChange">
            <template>
              <a-icon type="home" />
            </template>
            <span>{{item.name}}</span>
          </a-menu-item>
        </template>
        <!-- 有子菜单的 -->
        <template v-else>
          <a-sub-menu :key="item.id">
            <span slot="title">
              <a-icon :type="item.icon" /><span>{{item.name}}</span>
            </span>

            <template v-for="one in item.children">
              <a-menu-item :key="one.id" @click="routerChange">
                <icon-font v-if="one.iconFont" :type="one.iconFont"></icon-font>
                <a-icon v-else :type="one.icon" />
                <span>{{one.name}}</span>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3442626_es7gpgstxm.js',
});

export default {
  components: { IconFont },
  data() {
    return {
      menu: [{
        id: '/',
        name: '首页',
        icon: '',
      },
      {
        id: '/web',
        name: '前端知识库',
        icon: 'chrome',
        children: [
          {
            id: 3,
            // 不能用2-1，会导致多个菜单同时高亮
            name: 'axios',
            icon: 'usb',
          },
          {
            id: '/web/git',
            name: 'git',
            icon: 'github',
          },
          {
            id: '/web/vue',
            name: 'Vue.js',
            iconFont: 'icon-vuejs',
          },
          {
            id: '/web/css',
            name: 'css',
            iconFont: 'icon-vuejs',
          },
          {
            id: '/web/chart',
            name: 'chart',
            iconFont: 'icon-vuejs',
          },
        ]
      },
      {
        id: '/back',
        name: '后端知识库',
        icon: 'desktop',
        children: [
          {
            id: '/back/spring',
            name: 'spring',
            icon: '',
          },
          {
            id: 8,
            name: '数据tab',
            icon: '',
          },
          {
            id: 9,
            name: '企业库tab',
            icon: '',
          },
        ]
      },
      {
        id: '/theory',
        name: '基础理论',
        icon: 'chrome',
        children: [
          {
            id: '/theory/theory',
            // 不能用2-1，会导致多个菜单同时高亮
            name: '基础理论',
            icon: 'chrome',
          },
        ]
      }, {
        id: '/media',
        name: '自媒体',
        icon: 'chrome',
        children: [
          {
            id: '/media/photography',
            name: 'photography',
            icon: 'github',
          },
          {
            id: '/media/ps',
            name: 'ps',
            icon: 'github',
          },
        ]
      }, {
        id: '/commonCss',
        name: '统一样式',
        icon: 'chrome',
        children: [
          {
            id: '/commonCss/commonButton',
            name: '按钮样式',
            icon: 'github',
          },
          {
            id: '/commonCss/others',
            name: '其他',
            icon: 'github',
          },
        ]
      }],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    routerChange({ key }, keyPath) {
      console.log(key)
      this.$router.push({
        path: `${key}`
      })
    },
  },
}
</script>

<style lang="less" scoped>
#aside-container {
    .el-menu-vertical-demo {
        width: 200px;
        border: none;
    }
}
</style>