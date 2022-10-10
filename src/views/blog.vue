<template>
    <div id="others-warpper">
        <link-list :dataList="dataList" :other="true" />
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
                    text: 'js每日tip',
                    url: 'https://www.jstips.co/zh_CN/',
                },
                {
                    key: 1,
                    text: '闪击工作台',
                    url: 'https://nav.sankki.com/#/index',
                },
                {
                    key: 2,
                    text: '源码讲解视频',
                    url: 'https://link.juejin.cn/?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1LE411e7HE',
                },
                {
                    key: 3,
                    text: '算法讲解',
                    url: 'https://link.juejin.cn/?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1wA411b7qZ',
                },
                {
                    key: 4,
                    text: '每日一题',
                    url: 'https://juejin.cn/user/3456520288996157/posts',
                }
                
            ]
        }
    },
    methods: {
    }
  }
  </script>
  
<style lang="less" scoped>
#others-warpper {
    height: 100%;
    // background: url('../assets/img/yuanshen6.svg');
    // yuanshen2
    background-size: cover;
}
</style>