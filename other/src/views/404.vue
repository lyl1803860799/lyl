<template>
  <div class="empty">
    <div class="content">
      <img src="@/assets/404.png" width="546px" height="230px" />
      <div class="text">该节目无法访问，请检查节目是否被删除或权限异常</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page404',
  data() {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.empty {
  width: 100%;
  height: 100%;
  margin: auto;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url('../assets/404-bg.jpg');
  top: 0;
  left: 0;
  position: absolute;

  .content {
    width: 700px;
    height: 370px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .text {
      font-size: 22px;
      color:#fff;
      line-height: 66px;
    }
    .ant-btn-green {
      font-size: 18px;
      height: 54px;
      width: 180px;
      text-align: center;
      padding: 0;
      color: $white;
      background-color: $lightGreen;
      border: none;
      border-radius: 4px;
    }
  }
}
</style>
