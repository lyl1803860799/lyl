<template>
  <div class="map-icon-container">
    <div class="map-icon" v-if="value" :style="`background-image: url(${value})`">
      <div class="del-container">
        <span class="del" @click="handleDel"></span>
      </div>
    </div>
    <div class="map-upload-container" v-else>
      <a-upload
        name="file"
        accept="image/*"
        :showUploadList="false"
        :customRequest="customRequest"
        @change="() => {}"
      >
        <div class="map-upload">
          <a-icon :type="loading ? 'loading' : 'plus'" />
        </div>
      </a-upload>
    </div>
  </div>
</template>

<script>
import { dataSourceFileUpload } from '@/api/dataSource'

export default {
  name: 'MapIcon',
  props: ['value'],
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async customRequest(param) {
      if (this.loading) return
      const pramas = {
        file: param.file
      }
      this.loading = true
      const { data } = await dataSourceFileUpload(pramas)
      this.loading = false
      this.$emit('change', data.fileUrl)
    },
    handleDel() {
      this.$emit('change', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.map-icon-container {
  cursor: pointer;
  .map-upload-container {
    width: 40px;
    height: 40px;
    border: 1px solid $db38;
    border-radius: 6px;
    background: $db39;
    text-align: center;
    line-height: 36px;
    color: $white;
    ::v-deep .ant-upload {
      width: 100%;
      height: 100%;
      background: transparent;
      text-align: center;
      line-height: 36px;
      color: $white;
      cursor: pointer;
    }
  }
  .map-icon {
    width: 40px;
    height: 40px;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    .del-container {
      display: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
      background: rgba(0, 0, 0, 0.35);
      text-align: center;
      line-height: 40px;
      .del {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(~@/assets/home-project/delete.png);
      }
    }
    &:hover {
      .del-container {
        display: inline-block;
      }
    }
  }
}
</style>
