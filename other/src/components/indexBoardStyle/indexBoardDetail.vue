<template>
  <div class="index-board-container-detail">
    <a-form :form="form" :colon="false" labelAlign="left">
      <a-form-item label="字体" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
        <a-select
          v-decorator="['fontFamily', { initialValue: formData.fontFamily }]"
          :getPopupContainer="(trigger) => trigger.parentNode"
        >
          <a-select-option v-for="opt in fontFamilyList" :key="opt" :value="opt">
            {{
            opt
            }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="字号" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
        <a-input-number
          v-decorator="['fontSize', { initialValue: formData.fontSize }]"
          :min="12"
          :step="1"
          :precision="0"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="字体颜色" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
        <color-input
          :show-input="true"
          :elId="'indexBoardFontColor'"
          v-decorator="['color', { initialValue: formData.color }]"
        ></color-input>
      </a-form-item>
      <a-form-item label="背景" class="bg-label" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
        <div class="bg-area" @click="openBgPic">
          <div>
            <img :src="uploadIcon" width="61" height="44" />
            <input type="hidden" v-decorator="['url', { initialValue: formData.url }]" />
          </div>
          <div class="bg-font">点击从图片素材中选择背景图</div>
        </div>
      </a-form-item>
      <a-form-item label="样式" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
        <font-style v-decorator="['textStyle', { initialValue: formData.textStyle }]" />
      </a-form-item>
    </a-form>

    <a-modal
      class="define-board-modal"
      :width="700"
      title="背景选择"
      :visible="visible"
      footer
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div v-show="loading" class="loading-wrap">
        <div class="loading-box">
          <a-spin />
        </div>
      </div>
      <div v-for="(data,index) in materialData" :key="data.id">
        <div
          class="choose-list"
          :style="{border:index===0?'0':'',background:'#05233D'}"
          v-if="data.materialType==='upload'"
        >
          <a-upload-dragger
            v-decorator="['bgImg']"
            name="file"
            :showUploadList="false"
            :before-upload="beforeUpload"
            :customRequest="customUploadRequest"
            @change="() => {}"
          >
            <p class="ant-upload-drag-icon">
              <img :src="uploadIcon" class="uplod-pic" />
              <span class="ant-upload-text">
                将文件拖到此处，或
                <b class>点击上传</b>
              </span>
            </p>
          </a-upload-dragger>
        </div>
        <div class="choose-list" v-if="data.materialType!='upload'">
          <div
            class="choose-pic"
            :style="{backgroundImage:'url('+data.materialThumbnail+')'}"
            @click="choose(data)"
          ></div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import uploadIcon from "@/assets/images/uploadFile.png";
import ColorInput from "@/components/colorInput";
import FontStyle from "@/components/fontStyleTwo";
import { queryMaterialData, uploadMaterial } from "@/api/material";

export default {
  name: "indexBorardDetail",
  props: ["value"],
  components: {
    ColorInput,
    FontStyle
  },
  data() {
    const self = this;
    return {
      uploadIcon,
      loading: false,
      fontFamilyList: [
        '楷体',
        "微软雅黑",
        "宋体",
        "黑体",
        "幼圆",
        "隶书",
        "tahoma",
        "arial",
        "sans-serif"
      ],
      form: this.$form.createForm(this, {
        name: "index-board-detail",
        onValuesChange(props, values) {
          self.$emit("change", { ...self.formData, ...values });
        }
      }),
      formData: {},
      allowClear: false,
      visible: false,
      materialData: []
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val || {});
      }
    }
  },
  methods: {
    openBgPic() {
      this.getMaterialData();
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    async getMaterialData() {
      this.loading = true;
      let list = [
        {
          id: 0,
          materialType: "upload"
        }
      ];
      const { data } = await queryMaterialData({
        groupType: "pic",
        namePrefix: "",
        groupOwnerId: 0,
        pageNum: 1,
        pageSize: 50
      });

      this.loading = false;
      let resDatas = data && data.list ? data.list : [];
      this.materialData = list.concat(resDatas);
      this.$forceUpdate();
    },
    beforeUpload(file) {
      let isLtSize = null;
      let message = "";
      if (file.type === "image/png" || file.type === "image/jpeg") {
        isLtSize = file.size / 1024 / 1024 < 5;
        message = "素材过大，请注意上传素材的大小不要超过规定限制";
        if (!isLtSize) {
          this.$message.error(message);
        }
      } else {
        message = "文件格式不正确，请选择支持的图片格式文件！";
        this.$message.error(message);
        isLtSize = false;
      }

      return isLtSize;
    },
    async customUploadRequest(param) {
      let _this = this;
      let fileType = "";
      let zipFile = null;
      this.loading = true;
      if (param.file.type.indexOf("image") > -1) {
        fileType = "pic";
        zipFile = param.file;
        const pramas = {
          originFile: param.file,
          zipFile: zipFile,
          materialType: fileType
        };
        this.uploadFile(pramas);
      } else {
        fileType = "video";
        var video = param.file;
        var url = URL.createObjectURL(video);
        document.getElementById("videoPlayer").src = url;
        setTimeout(() => {
          zipFile = _this.creatImg(param.file.name);
          //console.log(zipFile)
          const pramas = {
            originFile: param.file,
            zipFile: zipFile,
            materialType: fileType
          };
          _this.uploadFile(pramas);
        }, 800);
      }
    },
    creatImg(name) {
      const video = document.getElementById("videoPlayer");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const imgHeight = video.videoHeight;
      const imgWidth = video.videoWidth;
      ctx.drawImage(video, 0, 0, imgWidth, imgHeight);

      this.imgSrc = canvas.toDataURL("image/png");

      // console.log('imgSrc ' + imgHeight + ' ' + imgWidth)
      //console.log(this.imgSrc);

      var blob = this.dataURLtoBlob(this.imgSrc, "image/png"); //base64转blob，全局函数
      var file = new File([blob], name.replace(".mp4", ".png"), {
        type: "image/png",
        lastModified: Date.now()
      }); //blob转file

      return file;
    },
    dataURLtoBlob(dataURI, type) {
      var binary = atob(dataURI.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    },
    uploadFile(pramas) {
      uploadMaterial(pramas)
        .then(res => {
          this.loading = false;
          if (res.success) {
            this.formData.url = res.data;
            this.form.setFieldsValue({
              url: res.data,
              ...this.formData
            });
            this.$message.success("上传成功");
            this.visible = false;
          } else {
            this.$message.warning(res.message);
          }
          this.getMaterialData(this.type, null);
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    choose(data) {
      console.log(data);
      this.formData.url = data.materialContent;
      this.form.setFieldsValue({
        url: data.materialContent,
        ...this.formData
      });
      this.visible = false;
    }
  }
};
</script>
<style lang="scss">
.ant-input-number-handler-down,
.ant-input-number-handler-up {
  height: 50% !important;
}
.ant-input-number-handler-down:hover,
.ant-input-number-handler-up:hover {
  height: 50% !important;
}
</style>
<style lang="scss">
.bg-label {
  .ant-form-item-label {
    line-height: 110px;
  }
}
.bg-area {
  width: 100%;
  height: 110px;
  background: #05233d;
  border: 1px dashed #103c5c;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .bg-font {
    color: #00fcff;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }
}
</style>

<style lang="scss" scoped>
.define-board-modal {
  ::v-deep .ant-modal-header {
    background: unset;
    border-bottom: 1px solid #0e3753;
  }

  ::v-deep .ant-modal-body {
    max-height: 500px;
    overflow-y: auto;
  }

  ::v-deep .ant-modal-footer {
    border-top: 1px solid #0e3753;
    margin-left: 8px;
    width: 98.5%;
  }

  ::v-deep .anticon-close {
    color: #00fcff;
    transition: all 0.3s ease;
  }

  ::v-deep .ant-modal-title {
    color: #fff;
    font-size: 14px;
    &::after {
      content: " ";
      display: inline-block;
      position: absolute;
      width: 4px;
      height: 16px;
      background: #00fcff;
      left: 12px;
      top: 19px;
    }
  }

  ::v-deep .choose-list {
    float: left;
    width: 200px;
    height: 150px;
    margin-left: 10px;
    margin-top: 10px;
    border: 1px solid #0e3753;
    cursor: pointer;
    .choose-pic {
      position: relative;
      float: left;
      width: 100%;
      height: 149px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-bottom: 1px solid #0e3753;
      .play-video {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 50px;
        height: 50px;
        margin-left: -25px;
        margin-top: -25px;
        cursor: pointer;
      }
    }
    .choose-info {
      float: left;
      width: 100%;
      height: 44px;
      line-height: 44px;
      background: #05233d;
      .choose-name {
        float: left;
        padding-left: 14px;
        font-size: 14px;
        color: #fff;
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .choose-btn {
        float: right;
        margin-right: 14px;
        margin-top: 13px;
      }
    }
  }
  ::v-deep .ant-upload-drag {
    text-align: center;
    border: 1px dashed #0e3753 !important;
  }
  ::v-deep .ant-upload-remind {
    font-size: 12px;
    font-weight: 400;
    color: #00788e;
    line-height: 20px;
  }

  ::v-deep .ant-upload-drag-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    margin-bottom: 10px !important;
  }

  .ant-upload-drag-icon .ant-upload-text {
    color: #fff;
  }

  .ant-upload-drag-icon .ant-upload-text b {
    color: #00fcff;
  }
}
</style>
