<template>
  <div class="up-load">
    <div class="main">
      <a-upload-dragger
        name="file"
        :file-list="fileList"
        :customRequest="customRequest"
        @change="handleChange"
        :default-file-list="defaultFileList"
        :accept="accept"
      >
        <img src="@/assets/images/uploadFile.png" alt="" />
        <p>将文件拖到此处，或<span>点击上传</span></p>
      </a-upload-dragger>
    </div>
  </div>
</template>

<script>
import { dataSourceFileUpload } from '@/api/dataSource'
export default {
  name: 'upLoad',
  props: {
    title: String,
    value: [Object, String, Array],
    defaultFileList: {
      type: Array,
      default() {
        return []
      }
    },
    accept: String,
    dataSourceDictId: [Number, String]
  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    fileUrl: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleChange(param) {
      this.$emit('handleChange', param)
      // this.fileList = param.fileList
      // if (this.fileList.length > 1) {
      //   this.fileList = this.fileList.slice(-1)
      // }
    },
    //上传之前
    onBeforeUpload(file) {
      const type = file.name.substring(file.name.lastIndexOf('.') + 1)
      let isExcel
      if (this.dataSourceDictId == 3) {
        isExcel = type === 'xlsx' || type === 'xls'
      } else if (this.dataSourceDictId == 4) {
        isExcel = type === 'json'
      }

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isExcel) {
        this.$message.error(
          `上传文件只能是${this.dataSourceDictId == 3 ? 'Excel格式!' : 'Json格式!'} `
        )
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      return isExcel && isLt2M
    },
    async customRequest(param) {
      if (!this.onBeforeUpload(param.file)) return
      const params = {
        file: param.file
      }
      const { data } = await dataSourceFileUpload(params)
      this.$message.success('上传成功')
      this.fileUrl = data.fileUrl
      this.$emit('http-request', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.up-load {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $dkBg1;
  border: 1px solid $lightColor;
  ::v-deep.ant-upload.ant-upload-drag {
    border: none;
    color: $white;
  }
  ::v-deep.ant-upload-list-item-info {
    color: $white;
  }
  p {
    color: $white;
    margin-bottom: 0;
    line-height: 20px;
    text-align: center;
  }
  span {
    color: $brightGreen;
  }
}
</style>
