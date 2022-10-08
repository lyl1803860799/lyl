<template>
  <div class="main">
    <a-layout>
      <a-layout-header class="header" :style="{backgroundImage:'url('+backgroundIcon+')'}">
        <a-top-nav-menu></a-top-nav-menu>
      </a-layout-header>
      <a-layout>
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
import backgroundIcon from "@/assets/images/background.png";
export default {
  name: "edit",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ATopNavMenu: TopNavMenu
  },
  data() {
    return {
      backgroundIcon
    };
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
