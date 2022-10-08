<template>
  <div class="main">
    <a-layout>
      <a-layout-header class="header" :style="{backgroundImage:'url('+backgroundIcon+')'}">
        <a-top-nav-menu></a-top-nav-menu>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="90" style="background: #fff">
          <a-side-nav-menu ref="SideNavMenu"></a-side-nav-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content
            :style="{ background: '#fff', padding: '0', margin: 0, minHeight: '500px' }"
          >
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { Layout } from "ant-design-vue";
import TopNavMenu from "@/components/navMenu/topNavMenu.vue";
import SideNavMenu from "@/components/navMenu/sideNavMenu.vue";
import backgroundIcon from "@/assets/images/background.png";
export default {
  name: "index",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ALayoutSider: Layout.Sider,
    ASideNavMenu: SideNavMenu,
    ATopNavMenu: TopNavMenu
  },
  data() {
    return {
      backgroundIcon
    };
  },
  mounted() {
    // test();
    // console.log(window.webobj)
    // window.test();
    // window.onload只在加载完成的时候执行一次？
    // objw.test()
  }
};
</script>

<style>
.ant-layout-header{
  width:100%;
  height:50px;
  line-height: 50px;
  padding: 0 15px;
}
</style>
