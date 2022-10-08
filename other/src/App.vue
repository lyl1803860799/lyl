<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  name: "App",
  components: {
    AConfigProvider: ConfigProvider
  },
  data(){
    return{
      locale: zhCN
    }
  }
};
</script>

<style>
</style>
