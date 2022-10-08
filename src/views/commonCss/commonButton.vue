<template>
    <div id="common-button">
    </div>
  </template>
  
  <script>
  
  export default {
    methods: {
      handleClick(link) {
        // console.log(link)
        if(link.href) {
          // let ele = document.getElementById("camera-container");
          // let ele = this.$refs.cameraWrapper.getElementById("camera-container");
          // let ele = this.$refs.cameraWrapper.refs.one
          // let ele = this.$refs.cameraWrapper.$el.children;
          // console.log(ele.childNodes)
          // let ele = this.$refs.cameraWrapper.$el.getElementById("camera-container");
          // let ele = this.$refs.cameraWrapper.$el.getElementByTagName("h2");
          // this.$refs.cameraWrapper.$el.getElementByTagName is not a function   为什么not a function
          // let ele = document.getElementsByClassName("camera-wrapper")[0].getElementById("one");
          // getElementById是不允许二级获取的
          let ele = document.getElementsByClassName("camera-wrapper")[0].getElementsByTagName("h2")[0];
          console.log(ele)
          ele && ele.scrollIntoView({block: 'start', behavior: 'smooth'});
        }
      },
    }
  }
  </script>
  
  <style lang="less" scoped>
  #common-button {

  }
  </style>