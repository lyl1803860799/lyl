<template>
  <div v-show="visible" class="loading-wrap">
    <div class="loading-box">
      <a-spin />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true
    }
  }
}
</script>
<style lang="scss" scoped>
.loading-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2000;
  background-color: hsla(0, 0%, 100%, 0.2);
}
.loading-box {
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  width: 100px;
  transform: translate(-50%, -50%);
}
</style>
