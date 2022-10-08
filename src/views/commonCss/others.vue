<template>
    <div id="others-warpper">
    css画一条线
    <div class="icons">
            <div class="circle">
                <image class="icon" ></image>
                <image class="icon" ></image>
            </div>
            <div class="horizon"></div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    methods: {
    }
  }
  </script>
  
<style lang="less" scoped>
#others-warpper {
    .icons{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .icon{
        
        padding-right: 20rpx;
        width: 90rpx;
        height: 90rpx;
    }
    .circle{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .horizon{
        width: 50%;
        height: 1px;
        background-color: #be3131;
        position: absolute;
    }
}
</style>