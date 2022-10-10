<template>
  <div id="vueJs-container">
      <link-list :dataList="dataList" :other="false" />
      <router-view></router-view>
  </div>
</template>

<script>
import LinkList from '@/components/linkList';

export default {
    components: { LinkList },
    data() {
        return {
            dataList: [
                {
                    key: 0,
                    text: 'vue.config.js',
                    url: 'vue/vueconfig',
                },
                {
                    key: 1,
                    text: 'vue.config.js',
                    url: 'vue/vueconfig',
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>