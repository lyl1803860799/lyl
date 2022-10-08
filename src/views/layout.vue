<template>
  <div id="layout-container">
    <a-layout class="container">
      <a-layout-header class="main-header">Header</a-layout-header>
      <a-layout>
        <!-- 侧边栏 -->
        <a-layout-sider>
          <side />
        </a-layout-sider>
        <a-layout>
          <!-- 主容器的nav导航，上面有面包屑 -->
          <a-layout-header class="content-header">Header</a-layout-header>
          <!-- 主容器部分 -->
          <a-layout-content class="main-container">
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import side from '@/components/aside';

export default {
    components: { side },
}
</script>

<style lang="less" scoped>
#layout-container {
  height: 100%;
  .container {
    height: 100%;
    .main-header {
      height: 50px;
    }

    .content-header {
      height: 50px;
    }

    // background-color: rgb(245,246,249);
    .ant-layout-header {
      background-color: #fff;
      color: #333;
      text-align: center;
      // line-height: 500px;
    }
    
    .ant-layout-sider {
      line-height: 200px;
      background-color: rgb(84 92 100);
    }
    
    .ant-layout-content {
      color: #333;
      // text-align: center;
      height: 100%;
    }
    
    .main-container {
      padding: 10px 20px;
    }
  }
}
</style>