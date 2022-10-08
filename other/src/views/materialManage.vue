<template>
  <div class="main">
    <div class="tree-area">
      <div class="tree-container">
        <div class="define-card-title">素材库</div>
        <div class="tree-list">
          <div
            class="material-group"
            @click="chooseMaterialType('all')"
            :class="{active:type==='all'}"
            style="margin-top:10px;"
          >
            <img :src="listIcon" />
            <span>全部素材</span>
          </div>
          <div
            class="material-group"
            @click="chooseMaterialType('pic')"
            :class="{active:type==='pic'}"
          >
            <img :src="listIcon" />
            <span>图片</span>
          </div>
          <div
            class="material-group"
            @click="chooseMaterialType('video')"
            :class="{active:type==='video'}"
          >
            <img :src="listIcon" />
            <span>视频</span>
          </div>
        </div>
      </div>
    </div>
    <div class="template-area">
      <div class="template-container">
        <div class="define-card-title">
          <span>{{type==='all'?'全部素材':type==='pic'?'图片':'视频'}}</span>
          <span style="float:right;">
            <a-input-search
              v-model="searchKey"
              placeholder="请输入搜索关键词"
              class="define-search"
              @search="onSearch"
              :maxLength="50"
            />
          </span>
        </div>
        <div class="template-list">
          <a-spin class="loading" v-if="loading" />
          <a-table
            ref="table"
            class="define-table"
            :rowKey="materialData => materialData.id"
            :showHeader="false"
            :columns="columns"
            :data-source="materialData"
            :pagination="pagination"
            @change="handleTableChange"
          >
            <template slot="id" slot-scope="text , record , index">
              <div
                class="choose-list"
                :style="{border:index===0?'0':'',background:'#05233D'}"
                v-if="record.materialType==='upload'"
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
                  <p
                    class="ant-upload-remind"
                    style="padding:0 19px;"
                  >支持上传jpg/png/jpeg/mp4格式文件， 图片文件不能超过5M，视频文件不能超过20M</p>
                </a-upload-dragger>
              </div>
              <div class="choose-list" v-if="record.materialType!='upload'">
                <div
                  class="choose-pic"
                  :style="{cursor:record.materialType==='pic'?'pointer':'unset'}"
                  @click="preView(record)"
                >
                  <img :src="record.materialThumbnail" class="bg-pic" />
                  <img
                    :src="playVideoIcon"
                    v-if="record.materialType!='pic'"
                    class="play-video"
                    @click="playVideo(record)"
                  />
                </div>
                <div class="choose-info">
                  <span class="choose-name">
                    <a-tooltip
                      placement="bottomLeft"
                      :title="record.materialName"
                    >{{record.materialName}}</a-tooltip>
                  </span>
                  <span class="choose-btn">
                    <a-tooltip title="删除" placement="bottom">
                      <img
                        :src="deleteIcon"
                        style="float:right;cursor:pointer;"
                        @click="deleteModal(record)"
                      />
                    </a-tooltip>
                    <a-tooltip title="编辑" placement="bottom">
                      <img
                        :src="editIcon"
                        style="float:right;cursor:pointer;margin-right:20px;"
                        @click="editName(record)"
                      />
                    </a-tooltip>
                  </span>
                </div>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>

    <a-modal
      class="define-modal"
      title="删除确认"
      :visible="delTemplateVisible"
      :confirmLoading="delTemplateConfirmLoading"
      @ok="deleteMaterial"
      @cancel="deleteMaterialCancel"
    >
      <div style="display:flex;align-items: center;">
        <div>
          <a-icon type="question-circle" style="color: #faad14;font-size:20px;" />
        </div>
        <div style="padding-left:10px;color:#fff;font-size: 16px;">删除确认</div>
      </div>
      <div
        style="text-align:left;margin-top:10px;padding-left:30px;color:#fff;font-size: 14px;"
      >删除素材，不会影响节目和模板，是否确认删除？</div>
    </a-modal>

    <a-modal
      class="define-modal"
      :title="modalTitle"
      :visible="visible"
      :footer="null"
      @cancel="handleCancel"
    >
      <img
        :src="modalUrl"
        v-if="modalTitle==='图片'"
        style="max-width:100%;min-height:100px;max-height:400px;"
      />
      <video :src="modalUrl" v-else controls="controls" style="width:100%;max-height:450px;"></video>
    </a-modal>

    <a-modal
      class="define-modal"
      title="编辑素材"
      :visible="editVisible"
      :confirmLoading="confirmLoading"
      @ok="handleEditOk"
      @cancel="handleEditCancel"
    >
      <a-form :form="form" :colon="false" labelAlign="left">
        <a-form-item label="素材名称：" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input
            :addon-after="afterName"
            v-decorator="['name', { initialValue: formData.name,rules: [{required:true,message:'请填写素材名称!'},{max:50,message:'不能超过50个字!'}]  }]"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <video id="videoPlayer" controls="controls"></video>
  </div>
</template>
<script>
import picIcon from "@/assets/images/pic.png";
import videoIcon from "@/assets/images/video.png";
import listIcon from "@/assets/images/list.png";
import editIcon from "@/assets/images/edit.png";
import deleteIcon from "@/assets/images/delete.png";
import uploadIcon from "@/assets/images/uploadFile.png";
import playVideoIcon from "@/assets/images/playVideo.png";
import {
  queryMaterialData,
  deleteMaterialData,
  renameMaterial,
  uploadMaterial
} from "@/api/material";

export default {
  name: "materialManage",
  components: {},
  data() {
    return {
      picIcon,
      videoIcon,
      listIcon,
      editIcon,
      deleteIcon,
      uploadIcon,
      playVideoIcon,
      delTemplateConfirmLoading: false,
      delTemplateVisible: false,
      currentId: null,
      confirmLoading: false,
      type: "all",
      loading: false,
      table: {
        pageNumber: 1,
        pageSize: 11
      },
      totalPages: 0,
      pagination: {
        current: 1,
        defaultPageSize: 12,
        showQuickJumper: true,
        showSizeChanger: false,
        total: 0,
        showTotal: total => `共${total - this.totalPages}条`
      },
      pagination2: {
        current: 1,
        defaultPageSize: 12,
        showQuickJumper: true,
        showSizeChanger: false,
        total: 0,
        showTotal: total => `共${total - this.totalPages}条`
      },
      modalTitle: "图片",
      columns: [
        {
          title: "素材数据",
          dataIndex: "id",
          key: "id",
          scopedSlots: { customRender: "id" }
        }
      ],
      materialData: [
        {
          id: 0,
          materialType: "upload"
        }
      ],
      pageNum: 1,
      pageSize: 10,
      imgSrc: null,
      visible: false,
      modalUrl: "",
      materialLoding: false,
      searchKey: "",
      editVisible: false,
      form: this.$form.createForm(this, { name: "form" }),
      formData: {
        id: null,
        name: ""
      },
      updateBeforeName: "",
      afterName: ""
    };
  },
  mounted() {
    this.getMaterialData("all", null);
  },
  methods: {
    deleteModal(data) {
      this.currentId = data.id;
      this.delTemplateVisible = true;
    },
    async getMaterialData(type, isSearch) {
      let _this = this;
      this.loading = true;
      let list = [
        {
          id: 0,
          materialType: "upload"
        }
      ];
      setTimeout(function(){
        _this.loading = false;
      },6 * 1000);
      const { data } = await queryMaterialData({
        groupType: type,
        namePrefix: this.searchKey,
        groupOwnerId: 0,
        pageNum: this.pageNum,
        pageSize: 11
      });

      this.loading = false;
      let resDatas = data && data.list ? data.list : [];
      this.totalPages = data.pages ? data.pages : 0;
      if (!data.total) {
        this.pagination = false;
      } else {
        if (!this.pagination) {
          this.pagination = this.pagination2;
        }
        this.pagination.total = (data.total ? data.total : 0) + this.totalPages;
        this.pagination.current = data.pageNum;
      }
      this.materialData = list.concat(resDatas);
      console.log(">>>>", this.materialData);
      this.$forceUpdate();
      if (isSearch) {
        if (!data.total || data.total === 0) {
          this.$message.warning("暂无数据，建议您修改分组或搜索条件后查询！");
        }
      }
      let currentPage = this.pagination.current;
      setTimeout(function() {
        let $el = document.getElementsByClassName(
          "ant-pagination-options-quick-jumper"
        );
        if ($el[0]) {
          $el[0].getElementsByTagName("input")[0].value = currentPage;
        }
      }, 100);
    },
    beforeUpload(file) {
      let isLtSize = null;
      let message = "";
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "video/mp4"
      ) {
        if (file.type.indexOf("image") > -1) {
          isLtSize = file.size / 1024 / 1024 < 5;
          message = "素材过大，请注意上传素材的大小不要超过规定限制";
        } else {
          isLtSize = file.size / 1024 / 1024 < 20;
          message = "素材过大，请注意上传素材的大小不要超过规定限制";
        }
        if (!isLtSize) {
          this.$message.error(message);
        }
      } else {
        message = "文件格式不正确，请选择支持的图片或视频格式文件！";
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
            this.$message.success("上传成功");
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
    chooseMaterialType(type) {
      this.type = type;
      this.pageNum = 1;
      this.getMaterialData(type, null);
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.pageNum = pagination.current;
      this.pageSize = pagination.pageSize;
      this.getMaterialData(this.type, null);
    },
    onSearch(e) {
      console.log(e);
      this.searchKey = e;
      this.pageNum = 1;
      this.pageSize = 10;
      this.getMaterialData(this.type, true);
    },
    preView(data) {
      let _this = this;
      this.modalUrl = "";
      if (data.materialType === "pic") {
        setTimeout(function() {
          _this.visible = true;
          _this.modalTitle = "图片";
          _this.modalUrl = data.materialContent;
        }, 10);
      }
    },
    playVideo(data) {
      let _this = this;
      this.modalUrl = "";
      setTimeout(function() {
        _this.visible = true;
        _this.modalUrl = data.materialContent;
        _this.modalTitle = "视频";
      }, 10);
    },
    handleCancel() {
      this.modalUrl = "";
      this.visible = false;
    },
    deleteMaterial() {
      this.delTemplateConfirmLoading = true;
      deleteMaterialData({
        materialId: this.currentId
      })
        .then(res => {
          this.delTemplateVisible = false;
          this.delTemplateConfirmLoading = false;
          if (res.success) {
            this.$message.success("删除成功！");
          } else {
            this.$message.warning(res.message);
          }
          this.pageNum = 1;
          this.getMaterialData(this.type, null);
        })
        .catch(error => {
          this.delTemplateVisible = false;
          this.delTemplateConfirmLoading = false;
          console.log(error);
        });
    },
    deleteMaterialCancel() {
      this.delTemplateVisible = false;
      this.delTemplateConfirmLoading = false;
    },
    editName(data) {
      console.log(data);
      this.form.resetFields();
      this.$nextTick(() => {
        let reg = null;
        let index = data.materialName.lastIndexOf(".");
        this.updateBeforeName = data.materialName;
        this.afterName = data.materialName.substr(index);
        if (this.afterName === ".mp4") {
          reg = /(.*).mp4/;
        } else if (this.afterName === ".png") {
          reg = /(.*).png/;
        } else if (this.afterName === ".jpg") {
          reg = /(.*).jpg/;
        }
        this.formData.id = data.id;
        this.formData.name = data.materialName.replace(reg, "$1");
        this.form.setFieldsValue({
          id: data.id,
          name: data.materialName.replace(reg, "$1")
        });
      });
      this.editVisible = true;
    },
    handleEditOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          if (!values.name.trim()) {
            this.$message.warning("请填写素材名称!");
            return;
          }
          this.confirmLoading = true;
          let name = values.name + this.afterName;
          if (name === this.updateBeforeName) {
            this.editVisible = false;
            this.confirmLoading = false;
          } else {
            renameMaterial({
              materialId: this.formData.id,
              materialName: name
            })
              .then(res => {
                this.confirmLoading = false;
                if (res.success) {
                  this.editVisible = false;
                  this.$message.success("素材重命名成功！");
                } else {
                  this.$message.warning(res.message);
                }
                this.getMaterialData(this.type, null);
              })
              .catch(error => {
                this.confirmLoading = false;
                console.log(error);
              });
          }
        }
      });
    },
    handleEditCancel() {
      this.editVisible = false;
    }
  }
};
</script>
<style lang="less" scoped>
@media (min-width: 800px) {
  .main {
    height: calc(100vh - 30px);
    display: flex;
    justify-content: center;
    background: #071426;
    overflow-x: hidden;
    overflow-y: auto;
    .tree-area {
      width: 250px;
      background-color: #031b30;
      .tree-container {
        padding: 0 20px;
        .tree-list {
          width: 100%;
          //margin-top: 15px;
          border-top: 2px solid #0e3753;
          .material-group {
            width: 100%;
            height: 36px;
            line-height: 36px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            img {
              padding-left: 9px;
            }
            span {
              padding-left: 9px;
            }
            &:hover {
              color: #00fcff;
              background: linear-gradient(90deg, #005b72, #052549);
              box-shadow: 0px 1px 8px 0px rgba(99, 247, 255, 0.06);
            }
          }
          .active {
            color: #00fcff;
            background: linear-gradient(90deg, #005b72, #052549);
            box-shadow: 0px 1px 8px 0px rgba(99, 247, 255, 0.06);
          }
        }
      }
    }
    .template-area {
      width: calc(100% - 250px);
      background-color: #071426;
      height: 100%;
      overflow-y: auto;
      .template-container {
        padding: 0 20px;
        .template-list {
          width: 100%;
          //margin-top: 15px;
          border-top: 2px solid #0e3753;
          .define-table {
            background: unset;
            /deep/ .ant-table-placeholder {
              background: unset;
            }
            /deep/ .ant-table-tbody > tr {
              float: left;
              width: calc(50% - 10px);
              margin-top: 20px;
              &:hover {
                background-color: #071426 !important;
              }
            }
            /deep/ .ant-table-tbody > tr > td {
              float: left;
              width: 100%;
              border-bottom: 0;
              padding: 0;
              &:hover {
                background-color: #071426 !important;
              }
            }
            /deep/ .ant-table-tbody > tr:not(:nth-child(2n + 0)) {
              margin-right: 20px;
            }
            /deep/ .ant-table {
              margin-bottom: 44px;
            }
            /deep/ .ant-table-row {
              background: unset;
            }
          }
        }
      }
    }

    /deep/ .ant-pagination-total-text {
      color: #fff;
      font-size: 14px;
    }

    /deep/ .ant-pagination-item {
      background: #071426;
      border: 1px solid #0e3753;
      border-radius: 2px;

      &:hover {
        color: #00fcff !important;
        border: 1px solid #019ba7 !important;
      }

      a {
        color: #fff;
      }
    }

    /deep/ .ant-pagination-prev,
    /deep/ .ant-pagination-next {
      .ant-pagination-item-link {
        background: #071426;
        border: 1px solid #0e3753;
        border-radius: 2px;
        .anticon-left,
        .anticon-right {
          color: #fff;
        }
      }
    }

    /deep/ .ant-pagination-item-active {
      color: #fff !important;
      background-color: #019ba7 !important;
      a {
        color: #fff;
      }
    }

    /deep/ .ant-pagination-options-quick-jumper {
      color: #fff;
      input {
        width: 32px;
        height: 32px;
        padding: 0;
        color: #fff;
        text-align: center;
        font-size: 14px;
        line-height: 1.5;
        background-color: #071426;
        background-image: none;
        border: 1px solid #0e3753;
      }
    }

    /deep/ .ant-pagination {
      float: unset;
      text-align: center;
      margin-bottom: 30px;
    }
  }
}
@media (min-width: 1200px) {
  .main {
    height: calc(100vh - 30px);
    display: flex;
    justify-content: center;
    background: #071426;
    overflow: hidden;
    .tree-area {
      width: 250px;
      background-color: #031b30;
      .tree-container {
        padding: 0 20px;
        .tree-list {
          width: 100%;
          //margin-top: 15px;
          border-top: 2px solid #0e3753;
          .material-group {
            width: 100%;
            height: 36px;
            line-height: 36px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            img {
              padding-left: 9px;
            }
            span {
              padding-left: 9px;
            }
            &:hover {
              color: #00fcff;
              background: linear-gradient(90deg, #005b72, #052549);
              box-shadow: 0px 1px 8px 0px rgba(99, 247, 255, 0.06);
            }
          }
          .active {
            color: #00fcff;
            background: linear-gradient(90deg, #005b72, #052549);
            box-shadow: 0px 1px 8px 0px rgba(99, 247, 255, 0.06);
          }
        }
      }
    }
    .template-area {
      width: calc(100% - 250px);
      height: 100%;
      overflow-y: auto;
      background-color: #071426;
      .template-container {
        padding: 0 20px;
        .template-list {
          width: 100%;
          //margin-top: 15px;
          border-top: 2px solid #0e3753;
          .define-table {
            background: unset;
            /deep/ .ant-table-placeholder {
              background: unset;
            }
            /deep/ .ant-table-tbody > tr {
              float: left;
              width: calc(33.33333333% - 15px);
              margin-top: 20px;
              &:hover {
                background-color: #071426 !important;
              }
            }
            /deep/ .ant-table-tbody > tr > td {
              float: left;
              width: 100%;
              border-bottom: 0;
              padding: 0;
              &:hover {
                background-color: #071426 !important;
              }
            }
            /deep/ .ant-table-tbody > tr:not(:nth-child(2n + 0)) {
              margin-right: unset;
            }

            /deep/ .ant-table-tbody > tr:not(:nth-child(3n + 0)) {
              margin-right: 20px;
            }

            /deep/ .ant-table-tbody > tr:nth-child(3n + 3) {
              td {
                margin-right: 0 !important;
              }
            }
            /deep/ .ant-table {
              margin-bottom: 44px;
            }
            /deep/ .ant-table-row {
              background: unset;
            }
          }
        }
      }
    }

    /deep/ .ant-pagination-total-text {
      color: #fff;
      font-size: 14px;
    }

    /deep/ .ant-pagination-item {
      background: #071426;
      border: 1px solid #0e3753;
      border-radius: 2px;
      a {
        color: #fff;
      }
    }

    /deep/ .ant-pagination-prev,
    /deep/ .ant-pagination-next {
      .ant-pagination-item-link {
        background: #071426;
        border: 1px solid #0e3753;
        border-radius: 2px;
        .anticon-left,
        .anticon-right {
          color: #fff;
        }
      }
    }

    /deep/ .ant-pagination-item-active {
      color: #fff;
      background: #019ba7;
      a {
        color: #fff;
      }
    }

    /deep/ .ant-pagination-options-quick-jumper {
      color: #fff;
      input {
        width: 32px;
        height: 32px;
        padding: 0;
        color: #fff;
        text-align: center;
        font-size: 14px;
        line-height: 1.5;
        background-color: #071426;
        background-image: none;
        border: 1px solid #0e3753;
      }
    }

    /deep/ .ant-pagination {
      float: unset;
      text-align: center;
    }
  }
}

@media (min-width: 1400px) {
  .main {
    height: calc(100vh - 30px);
    display: flex;
    justify-content: center;
    background: #071426;
    overflow: hidden;
    .tree-area {
      width: 250px;
      background-color: #031b30;
      .tree-container {
        padding: 0 20px;
        .tree-list {
          width: 100%;
          //margin-top: 15px;
          border-top: 2px solid #0e3753;
          .material-group {
            width: 100%;
            height: 36px;
            line-height: 36px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            img {
              padding-left: 9px;
            }
            span {
              padding-left: 9px;
            }
            &:hover {
              color: #00fcff;
              background: linear-gradient(90deg, #005b72, #052549);
              box-shadow: 0px 1px 8px 0px rgba(99, 247, 255, 0.06);
            }
          }
          .active {
            color: #00fcff;
            background: linear-gradient(90deg, #005b72, #052549);
            box-shadow: 0px 1px 8px 0px rgba(99, 247, 255, 0.06);
          }
        }
      }
    }
    .template-area {
      width: calc(100% - 250px);
      height: 100%;
      overflow-y: auto;
      background-color: #071426;
      .template-container {
        padding: 0 20px;
        .template-list {
          width: 100%;
          //margin-top: 15px;
          border-top: 2px solid #0e3753;
          .define-table {
            background: unset;
            /deep/ .ant-table-placeholder {
              background: unset;
            }
            /deep/ .ant-table-tbody > tr {
              float: left;
              width: calc(20% - 16px);
              margin-top: 20px;
              &:hover {
                background-color: #071426 !important;
              }
            }
            /deep/ .ant-table-tbody > tr > td {
              float: left;
              width: 100%;
              border-bottom: 0;
              padding: 0;
              &:hover {
                background-color: #071426 !important;
              }
            }
            /deep/ .ant-table-tbody > tr:not(:nth-child(3n + 0)) {
              margin-right: unset;
            }

            /deep/ .ant-table-tbody > tr:not(:nth-child(5n + 0)) {
              margin-right: 20px;
            }
            /deep/ .ant-table {
              margin-bottom: 44px;
            }
            /deep/ .ant-table-row {
              background: unset;
            }
          }
        }
      }
    }

    /deep/ .ant-pagination-total-text {
      color: #fff;
      font-size: 14px;
    }

    /deep/ .ant-pagination-item {
      background: #071426;
      border: 1px solid #0e3753;
      border-radius: 2px;
      a {
        color: #fff;
      }
    }

    /deep/ .ant-pagination-prev,
    /deep/ .ant-pagination-next {
      .ant-pagination-item-link {
        background: #071426;
        border: 1px solid #0e3753;
        border-radius: 2px;
        .anticon-left,
        .anticon-right {
          color: #fff;
        }
      }
    }

    /deep/ .ant-pagination-item-active {
      color: #fff;
      background: #019ba7;
      a {
        color: #fff;
      }
    }

    /deep/ .ant-pagination-options-quick-jumper {
      color: #fff;
      input {
        width: 32px;
        height: 32px;
        padding: 0;
        color: #fff;
        text-align: center;
        font-size: 14px;
        line-height: 1.5;
        background-color: #071426;
        background-image: none;
        border: 1px solid #0e3753;
      }
    }

    /deep/ .ant-pagination {
      float: unset;
      text-align: center;
      margin-bottom: 30px;
    }
  }
}

::v-deep .ant-form-item-label {
  label {
    color: #fff !important;
  }
}

.define-card-title {
  position: relative;
  padding-left: 14px;
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  &::after {
    content: " ";
    display: inline-block;
    position: absolute;
    width: 4px;
    height: 16px;
    background: #00fcff;
    left: 0;
    top: 20px;
  }
  /deep/ .add-template-btn {
    width: 102px;
    height: 32px;
    background: #019ba7;
    margin-right: 12px;
    padding: 0;
  }

  /deep/ .define-search {
    width: 252px;
    height: 32px;

    input {
      width: 100%;
      height: 32px;
      padding-left: 10px;
      color: #fff;
      border: 1px solid #0e3753;
      background: #071426;
    }
    input::placeholder {
      color: #00788e;
    }
  }

  /deep/ .anticon-search {
    color: #00788e;
  }
}

.tree-btn {
  padding-left: 23px;
}

.choose-list {
  float: left;
  width: 100%;
  height: 238px;
  border: 1px solid #0e3753;
  &:hover {
    border: 1px solid #00fcff;
  }
  /deep/ .ant-upload-drag {
    border: 1px dashed #0e3753;
  }

  /deep/.ant-upload-drag:not(.ant-upload-disabled):hover{
    border: 1px dashed #00fcff;
  }
  .bg-pic {
    position: absolute;
    width: 100%;
    height: 192px;
    object-fit: fill;
  }
  .choose-pic {
    position: relative;
    float: left;
    width: 100%;
    height: 192px;
    background-size: cover;
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

.loading {
  position: absolute;
  left: 62%;
  top: 50%;
}

.define-modal {
  ::v-deep .ant-modal-header {
    background: unset;
    border-bottom: 1px solid #0e3753;
  }

  ::v-deep .ant-modal-body {
    max-height: 500px;
    text-align: center;
  }

  ::v-deep .ant-modal-footer {
    border-top: 1px solid #0e3753;
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

#videoPlayer {
  position: fixed;
  top: 0;
  z-index: -1;
  opacity: 0;
  width: 100%;
}

.ant-upload-remind {
  font-size: 12px;
  font-weight: 400;
  color: #00788e;
  line-height: 20px;
}

// /deep/ .ant-upload-drag {
//   border:1px dashed #0e3753!important;
// }

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

::v-deep .ant-input-group-addon {
  color: #00fcff;
}

::v-deep .ant-popover-buttons {
  .ant-btn {
    background: #061226;
    color: #019ba7;
    border-color: #019ba7;
  }
}
</style>