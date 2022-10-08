<template>
  <div>
    <a-form
      class="page-opt"
      :form="form"
      layout="horizontal"
      :labelCol="{ span: 5, lg:24,xl:5,}"
      :wrapperCol="{ span: 18, lg:23,xl:18}"
      labelAlign="left"
    >
      <a-form-item label="页面大小">
        <screen-size
          v-decorator="['screenSize', { initialValue: defaultOpt.defineSize }]"
          :min="1"
        />
      </a-form-item>
      <a-form-item :label="title">
        <a-tree-select
          :dropdownClassName="'define-tree-select'"
          v-decorator="['groupOwnerId', { initialValue: defaultOpt.groupOwnerId }]"
          show-search
          style="width: 100%"
          :tree-data="groupData"
          :replaceFields="title==='模板分组'?replaceTreeFields:replaceTreeFields2"
          :defaultValue="defaultValue"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择分组"
          :allowClear="allowClear"
          tree-default-expand-all
        ></a-tree-select>
      </a-form-item>
      <a-form-item label="背景设置" class="m-bottom-0">
        <a-radio-group v-decorator="['bgType', { initialValue: defaultOpt.bgType }]">
          <a-radio value="0">纯色</a-radio>
          <a-radio value="1">图片</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="背景色" v-if="defaultOpt.bgType==='0'">
        <color-input
          :elId="'templateBgColor'"
          :show-input="true"
          v-decorator="['bgColor', { initialValue: defaultOpt.bgColor }]"
        ></color-input>
      </a-form-item>
      <a-form-item label="背景图" class="bg-label" v-if="defaultOpt.bgType==='1'">
        <div class="bg-area" @click="openBgPic">
          <div>
            <img :src="uploadIcon" width="61" height="44" />
          </div>
          <div class="bg-font">点击从图片素材中选择背景图</div>
        </div>
      </a-form-item>
      <a-form-item label="重置">
        <a-button class="reset-btn" @click="handleResetBg">恢复默认背景</a-button>
      </a-form-item>
      <a-form-item label="缩放方式" v-show="defaultOpt.bgType==='1'">
        <a-radio-group v-decorator="['resizeType', { initialValue: defaultOpt.resizeType }]">
          <a-radio :style="radioStyle" :value="1">等比缩放宽度铺满</a-radio>
          <a-radio :style="radioStyle" :value="2">等比缩放高度铺满</a-radio>
          <a-radio :style="radioStyle" :value="3">全屏铺满</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="透明度">
        <a-row>
          <a-col :span="12">
            <a-slider
              v-decorator="['opacity', { initialValue: defaultOpt.opacity }]"
              :min="0"
              :max="1"
              :step="0.1"
            />
          </a-col>
          <a-col :span="4">
            <a-input-number
              v-model="defaultOpt.opacity"
              :min="0"
              :max="1"
              step="0.1"
              style="marginLeft: 16px"
            />
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>

    <a-modal
      class="define-modal"
      :width="700"
      title="背景选择"
      :visible="visible"
      footer=""
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div v-show="loading" class="loading-wrap">
        <div class="loading-box">
          <a-spin />
        </div>
      </div>
      <div v-for="(data,index) in materialData" :key="data.id">
        <div class="choose-list" :style="{border:index===0?'0':'',background:'#05233D'}" v-if="data.materialType==='upload'">
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
import * as uuid from "uuid/v1";
import ColorInput from "@/components/colorInput";
//import bgColor from '@/components/bgColor';
import ScreenSize from "@/components/screenSize";
import uploadIcon from "@/assets/images/uploadFile.png";
import { getTemplateAllGroupInfo } from "@/api/template";
import { getProgramAllGroupInfo } from "@/api/program";
import { queryMaterialData, uploadMaterial } from "@/api/material";
export default {
  name: "PageOption",
  props: {
    defaultOpt: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    const self = this;
    return {
      uploadIcon,
      form: this.$form.createForm(this, {
        name: "coordinated",
        onValuesChange(props, values) {
          const { form } = props;
          let formValue = form.getFieldsValue();
          if (typeof formValue.screenSize === "string") {
            formValue.defineSize = formValue.screenSize;
            const size = formValue.screenSize.split("*") || [];
            let w = size[0] || 0;
            let h = size[1] || 0;
            formValue.screenSize = {
              width: Number(w),
              height: Number(h)
            };
          } else {
            formValue.defineSize =
              formValue.screenSize.width + "*" + formValue.screenSize.height;
          }
          //console.log(formValue)
          if (values.screenSize !== undefined) {
            self.$emit("screen-size-change");
          }
          self.$emit("page-option-change", {
            ...formValue,
            ...values
          });
        }
      }),
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px",
        color: "#fff"
      },
      replaceTreeFields: {
        key: "unqiId",
        children: "children",
        title: "menuName",
        value: "id"
      },
      replaceTreeFields2: {
        key: "unqiId",
        children: "children",
        title: "programName",
        value: "id"
      },
      defaultValue: "",
      groupData: [],
      allowClear: false,
      visible: false,
      materialData: [],
      loading: false
    };
  },
  components: {
    //bgColor,
    ColorInput,
    ScreenSize
  },
  mounted() {
    this.getAllGroupData();
  },
  methods: {
    getAllGroupData() {
      (this.title === "模板分组"
        ? getTemplateAllGroupInfo()
        : getProgramAllGroupInfo()
      )
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              let resDatas = res.data;
              for (let i = 0; i < resDatas.length; i++) {
                if (
                  (resDatas[i].sourceType === "ungroup" || resDatas[i].sourceType==="all") &&
                  (resDatas[i].parentId === 0 ||
                    resDatas[i].programParentId === 0)
                ) {
                  resDatas.splice(i, 1);
                  i--;
                }
              }
              this.groupData = this.addIdData(resDatas);
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addIdData(list) {
      list.map(item => {
        let children = item.children;
        item.unqiId = uuid();
        if (children && children.length) {
          this.addIdData(children);
        }
      });

      return list;
    },
    handleResetBg() {
      this.form.setFieldsValue({
        bgType: "1",
        bgColor: "",
        bgImg: require("@/assets/newbk.png")
      });
    },
    openBgPic() {
      this.getMaterialData();
      this.visible = true;
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
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
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
            this.defaultOpt.bgImg = res.data;
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
      this.defaultOpt.bgImg = data.materialContent;
      this.visible = false;
    }
  }
};
</script>
<style>
.ant-input-number-handler-down,
.ant-input-number-handler-up {
  height: 50% !important;
}
.ant-input-number-handler-down:hover,
.ant-input-number-handler-up:hover {
  height: 50% !important;
}
</style>
<style lang="scss" scoped>
@media (min-width: 1200px) {
  .bg-label{
    ::v-deep label{
      line-height: 110px;
    }
  }
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
}
.page-opt {
  padding: 20px;
  .reset-btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: $brightGreen;
    background-color: $db40;
    border-color: $db38;
    &:hover {
      border-color: $brightGreen;
    }
    &:focus,
    &:active {
      border-color: $brightGreen;
      background-color: $db41;
    }
  }
  ::v-deep .ant-form-item {
    margin-bottom: 12px;
    &.m-bottom-0 {
      margin-bottom: 0;
    }
  }
  ::v-deep .ant-form-item-label {
    label {
      color: $white;
      &::after{
        display: none;
      }
    }
  }
  ::v-deep .ant-upload.ant-upload-drag {
    background-color: $db39;
    border-color: $db38;
    &:hover {
      border-color: $brightGreen;
    }
    .ant-upload-text {
      @extend .ft-14;
      color: $white;
      b {
        color: $brightGreen;
      }
    }
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

.upload-pic {
  width: 100px;
}

.define-modal {
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
}

.choose-list {
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

::v-deep .ant-upload-drag{
  border:1px dashed #0e3753!important;
}


::v-deep .ant-slider-track {
  background: linear-gradient(90deg, #00fcff, #019ba7);
}

::v-deep .ant-slider-handle {
  border-radius: 0;
  border: 0;
}

.define-checkbox {
  float: left;
  height: 32px;
  line-height: 32px;
  color: #fff;
  ::v-deep .ant-checkbox-inner {
    border-radius: 100%;
    background: unset;
  }
}
::v-deep .ant-input-number-handler {
  border-color: #103c5c;
}
::v-deep .ant-input-number-handler .anticon {
  color: #fff;
}
::v-deep .ant-input-number-handler-wrap {
  background-color: transparent;
  opacity: 1;
  border-color: #103c5c;
}

::v-deep .ant-input-number {
  background-color: transparent;
  color: #00fcff;
  padding: 0 5px;
  font-size: 14px;
  border: 1px solid #0e3753;
  color: #00fcff;
}

.ant-upload-remind {
  font-size: 12px;
  font-weight: 400;
  color: #00788e;
  line-height: 20px;
}

.ant-upload-drag-icon {
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
</style>
