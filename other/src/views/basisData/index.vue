<template>
  <div class="main">
    <div class="tree-area">
      <div class="tree-container">
        <div class="define-card-title">基础数据</div>
        <div class="tree-list">
          <a-tree
            class="template-tree"
            showIcon
            blockNode
            :default-selected-keys="defaultSelectKey"
            :selectedKeys.sync="defaultSelectKey"
            :replace-fields="replaceFields"
            :tree-data="allTreeData"
            @select="selectGroup"
          >
            <img :src="listIcon" style="width:14px;" slot="list" />
            <template v-slot:title="nodeData">
              <span
                class="tree-title"
                :id="nodeData.unqiId"
                :parentId="nodeData.parentUUid"
              >{{ nodeData.title }}</span>
              <span
                class="tree-btn"
                v-if="nodeData.selected  && nodeData.parentId != null && nodeData.sourceType!='all' && nodeData.sourceType!='system' && nodeData.sourceType!='ungroup'"
              >
                <a-tooltip title="编辑" placement="bottom">
                <img
                  @click="editTree($event,nodeData)"
                  v-if="nodeData.parentId!=0"
                  :src="editIcon"
                  style="width:18px;margin-right:16px;"
                />
                </a-tooltip>
                <a-tooltip title="新增" placement="bottom">
                <img
                  @click="addTreeNode($event,nodeData)"
                  v-if="nodeData.sourceType!='share'"
                  :src="addIcon"
                  style="width:18px;margin-right:16px;"
                />
                </a-tooltip>
                <a-tooltip title="删除" placement="bottom">
                <img
                  @click="deleteTreeNode($event,nodeData)"
                  v-if="nodeData.parentId!=0"
                  :src="deleteIcon"
                  style="width:18px;"
                />
                </a-tooltip>
              </span>
            </template>
          </a-tree>
        </div>
      </div>
    </div>
    <div class="template-area">
      <div class="template-container">
        <div class="define-card-title">
          <span>数据详情</span>
        </div>
        <div class="template-list">
          <a-row style="margin-top:19px;">
            <a-col :span="8">
              <span class="label-name">数据名称：</span>
              <span class="label-value">{{currentGropData.title}}</span>
            </a-col>
            <a-col :span="8">
              <span class="label-name">数据ID：</span>
              <span class="label-value">{{currentGropData.id}}</span>
            </a-col>
            <a-col :span="8">
              <span class="label-name">备注：</span>
              <span class="label-value">{{currentGropData.remark?currentGropData.remark:'暂无'}}</span>
            </a-col>
          </a-row>
          <a-row style="margin-top:19px;">
            <a-col :span="8">
              <span class="label-name">数据分类：</span>
              <span
                class="label-value"
              >{{currentGropData.type === "channel"?"频道分组":currentGropData.type === "program"?"节目分组":"模板分组"}}</span>
            </a-col>
            <a-col :span="8">
              <span class="label-name">父级数据：</span>
              <span class="label-value">{{parentName}}</span>
            </a-col>
            <a-col :span="8">
              <span class="label-name">创建时间：</span>
              <span class="label-value">{{currentGropData.createTime | dateDay}}</span>
            </a-col>
          </a-row>
          <a-row style="margin-top:19px;">
            <!-- <a-col :span="8">
              <span class="label-name">数据层级：</span>
              <span class="label-value">{{currentGropData.title}}</span>
            </a-col>-->
            <a-col :span="8">
              <span class="label-name">排序：</span>
              <span class="label-value">{{sort}}</span>
            </a-col>
            <a-col :span="8">
              <span class="label-name">更新时间：</span>
              <span class="label-value">{{currentGropData.modifyTime | dateDay}}</span>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>

    <a-modal
      class="define-modal"
      :title="groupTitle"
      :visible="addOrEditVisible"
      :confirmLoading="confirmLoading"
      @ok="handleAddOk"
      @cancel="handleAddCancel"
    >
      <a-form :form="addForm" :colon="false" labelAlign="left">
        <a-form-item label="分组名称：" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input
            placeholder="请输入分组名称"
            v-decorator="['groupName', { initialValue: formData.groupName,rules: [{required:true,message:'请填写分组名称!'},{max:50,message:'不能超过50个字!'}]  }]"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      class="define-modal"
      title="删除确认"
      :visible="delVisible"
      :confirmLoading="delConfirmLoading"
      @ok="handleDelOk"
      @cancel="handleDelCancel"
    >
      <div style="display:flex;align-items: center;">
        <div>
          <a-icon type="question-circle" style="color: #faad14;font-size:20px;" />
        </div>
        <div style="padding-left:10px;color:#fff;font-size: 16px;">删除确认</div>
      </div>
      <div
        style="margin-top:10px;padding-left:30px;color:#fff;font-size: 14px;"
      >删除分组后，不会影响该分组下的{{deleteTypeName}}，请确认是否删除该分组？</div>
    </a-modal>

    <div v-show="spinning" class="loading-wrap">
      <div class="loading-box">
        <a-spin />
      </div>
    </div>
  </div>
</template>
<script>
import * as moment from "moment";
import * as uuid from "uuid/v1";
import {
  addChannelMenuInfo,
  editChannelMenuInfo,
  deleteChannelMenuInfo,
  addProgramMenuInfo,
  editProgramMenuInfo,
  deleteProgramMenuInfo,
  addTemplateMenuInfo,
  editTemplateMenuInfo,
  deleteTemplateMenuInfo
} from "@/api/basis";
import { getLeftChannelMenus } from "@/api/channel";
import { getLeftProgramMenus } from "@/api/program";
import { getLeftTemplateMenus } from "@/api/template";
import treeIcon from "@/assets/images/tree-icon.png";
import expandIcon from "@/assets/images/expand.png";
import listIcon from "@/assets/images/list.png";
import addIcon from "@/assets/images/add.png";
import editIcon from "@/assets/images/edit.png";
import deleteIcon from "@/assets/images/delete.png";
import playIcon from "@/assets/images/play.png";
export default {
  name: "basisData",
  components: {},
  data() {
    return {
      treeIcon,
      expandIcon,
      listIcon,
      addIcon,
      editIcon,
      deleteIcon,
      playIcon,
      spinning: false,
      allowClear: false,
      loading: false,
      addOrEditVisible: false,
      addOrUpdateData: null,
      confirmLoading: false,
      delVisible: false,
      deletData: [],
      sort: 0,
      deleteTypeName: "",
      delConfirmLoading: false,
      editTemplateVisible: false,
      confirmTemplateLoading: false,
      delTemplateVisible: false,
      delTemplateConfirmLoading: false,
      defaultExpandedKeys: [],
      replaceFields: {
        key: "unqiId",
        children: "children",
        title: "title"
      },
      currentId: null,
      parentName: "",
      groupTitle: "新建分组",
      defaultSelectKey: ["channel_0_root"],
      defalutTemplateName: "模板分组",
      searchTxt: "",
      allTreeData: [],
      templateData: [],
      groupType: "all",
      groupOwnerId: 0,
      groupParentId: 0,
      addForm: this.$form.createForm(this, { name: "addForm" }),
      formData: {
        groupName: ""
      },
      templateForm: this.$form.createForm(this, { name: "templateForm" }),
      templateFormData: {
        templateId: null,
        templateName: "",
        groupId: null
      },
      groupData: [],
      defaultValue: "",
      pageId: null,
      pageGropType: "defind",
      contentStyle: "",
      list1: [],
      fullScreenLoading: false,
      pageOption: null,
      resizeTimer: null,
      intervalObj: {},
      // 轮询数据
      waitToInterval: {},
      // websocket list
      websocketList: [],
      showScreenPreview: false,
      isShowPrev: false,
      isComponent: false,
      currentGropData: [],
      acceptUnitNodes: null
    };
  },
  filters: {
    dateHour(time) {
      let dateTime = moment(time).format("hh:mm");
      return dateTime;
    },
    dateDay(time) {
      if (!time) {
        return "";
      }
      let dateTime = moment(time).format("YYYY-MM-DD hh:mm:ss");
      return dateTime;
    }
  },
  mounted() {
    this.getChannelTree();
  },
  methods: {
    getChannelTree(type, groupOwnerId, groupParentId) {
      let _this = this;
      this.spinning = true;
      this.allTreeData = [];
      getLeftChannelMenus()
        .then(res => {
          let root = [];
          if (res.success) {
            let data = [];
            if (res.data && res.data.length) {
              let resDatas = res.data;
              for (let i = 0; i < resDatas.length; i++) {
                if (
                  resDatas[i].sourceType === "ungroup" ||
                  resDatas[i].sourceType === "all" ||
                  resDatas[i].sourceType === "system"
                ) {
                  resDatas.splice(i, 1);
                  i--;
                }
              }
              data = this.addChildrenData(resDatas, "channel", 1);
              root = data;
              if (type) {
                if (type === "channel") {
                  root.map(item => {
                    if (item.id === groupOwnerId) {
                      let key = "channel_" + item.id + "_defined";
                      this.defaultSelectKey = [key];
                      this.currentGropData = item;
                    }
                  });
                }
              } else {
                let key = "channel_" + root[0].id + "_defined";
                this.defaultSelectKey = [key];
                this.currentGropData = root[0];
                this.groupOwnerId = root[0].id;
              }
              this.sort = 1;
            } else {
              this.$message.warning(res.message);
            }
          }
          this.allTreeData = this.allTreeData.concat(root);
          this.getProgramTree(type, groupOwnerId, groupParentId);
        })
        .catch(error => {
          this.spinning = false;
          console.log(error);
        });
      setTimeout(function(){
        _this.spinning = false;
      },10000)
    },
    getProgramTree(type, groupOwnerId, groupParentId) {
      this.spinning = true;
      getLeftProgramMenus()
        .then(res => {
          let root = [];
          if (res.success) {
            let data = [];
            if (res.data && res.data.length) {
              let resDatas = res.data;
              for (let i = 0; i < resDatas.length; i++) {
                if (
                  resDatas[i].sourceType === "ungroup" ||
                  resDatas[i].sourceType === "all" ||
                  resDatas[i].sourceType === "system"
                ) {
                  resDatas.splice(i, 1);
                  i--;
                }
              }
              data = this.addChildrenData(resDatas, "program", 1);
              // this.currentGropData = currentData;
              root = data;
              if (type) {
                if (type === "program") {
                  root.map(item => {
                    if (item.id === groupOwnerId) {
                      let key = "program_" + item.id + "_defined";
                      this.defaultSelectKey = [key];
                      this.currentGropData = item;
                    }
                  });
                }
              }
            } else {
              this.$message.warning(res.message);
            }
          }
          this.allTreeData = this.allTreeData.concat(root);
          this.getTemplateTree(type, groupOwnerId, groupParentId);
        })
        .catch(error => {
          this.spinning = false;
          console.log(error);
        });
    },
    getTemplateTree(type, groupOwnerId, groupParentId) {
      this.spinning = true;
      getLeftTemplateMenus()
        .then(res => {
          this.spinning = false;
          let root = [];
          if (res.success) {
            let data = [];
            if (res.data && res.data.length) {
              let resDatas = res.data;
              for (let i = 0; i < resDatas.length; i++) {
                if (
                  resDatas[i].sourceType === "ungroup" ||
                  resDatas[i].sourceType === "all" ||
                  resDatas[i].sourceType === "system"
                ) {
                  resDatas.splice(i, 1);
                  i--;
                }
              }
              data = this.addChildrenData(resDatas, "template", 1);
              // this.currentGropData = currentData;
              root = data;
              if (type) {
                if (type === "template") {
                  root.map(item => {
                    if (item.id === groupOwnerId) {
                      let key = "template_" + item.id + "_defined";
                      this.defaultSelectKey = [key];
                      this.currentGropData = item;
                    }
                  });
                }
              }
            } else {
              this.$message.warning(res.message);
            }
          }
          let allTreeData = this.allTreeData.concat(root);
          this.$set(this, "allTreeData", allTreeData);
          this.$forceUpdate();
          console.log(groupParentId);
        })
        .catch(error => {
          this.spinning = false;
          console.log(error);
        });
    },
    addChildrenData(list, fieldType, num) {
      let number = num;
      list.map((item, index) => {
        let children = item.children;
        item.slots = { icon: "list" };
        item.type = fieldType;
        item.sort = index + 1;
        if (fieldType === "channel") {
          if (item.channelParentId === 0) {
            item.sort = 1;
          }
          item.title = item.channelName;
          item.parentId = item.channelParentId;
        } else if (fieldType === "program") {
          if (item.programParentId === 0) {
            item.sort = 2;
          }
          item.title = item.programName;
          item.parentId = item.programParentId;
        } else {
          if (item.parentId === 0) {
            item.sort = 3;
          }
          item.title = item.menuName;
        }
        item.isExpaned = false;
        if (num === 0) {
          item.parentUUid = fieldType + "_" + item.parentId + "_root";
        } else {
          item.parentUUid =
            fieldType + "_" + item.parentId + "_" + item.sourceType;
        }
        number++;
        item.unqiId = fieldType + "_" + item.id + "_" + item.sourceType;
        if (children && children.length) {
          this.addChildrenData(children, fieldType, number);
        }
      });

      return list;
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
    selectGroup(e, data) {
      console.log(e, data);
      try {
        if (data.node) {
          let el = data.node.dataRef.parentUUid;
          let v = document.getElementById(el);
          this.groupOwnerId = data.node.dataRef.id;
          this.groupParentId = data.node.dataRef.parentId;
          this.currentGropData = data.node.dataRef;
          this.sort = data.node.dataRef.sort;
          if (v) {
            this.parentName = v.textContent;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    rotateWordTree(e, item) {
      console.log(e, item);
      let translateYFront = e.target.style.transform;
      if (translateYFront == "rotate(0deg)") {
        e.target.style.transform = "rotate(-90deg)";
      } else {
        e.target.style.transform = "rotate(0deg)";
      }
    },
    editTree(e, data) {
      e.preventDefault();
      e.stopPropagation();
      this.addForm.resetFields();
      this.addOrUpdateData = data;
      this.formData.groupName = data.title;
      this.groupTitle = "编辑分组";
      this.addOrEditVisible = true;
    },
    addTreeNode(e, data) {
      e.preventDefault();
      e.stopPropagation();
      this.addOrUpdateData = data;
      this.groupTitle = "新建分组";
      this.addOrEditVisible = true;
      this.formData.groupName = "";
      this.addForm.resetFields();
    },
    deleteTreeNode(e, data) {
      e.preventDefault();
      e.stopPropagation();
      this.deletData = data;
      if (data.type === "channel") {
        this.deleteTypeName = "频道";
      } else if (data.type === "program") {
        this.deleteTypeName = "节目";
      } else {
        this.deleteTypeName = "模板";
      }
      this.delVisible = true;
    },
    editTemplate(data) {
      console.log(data);
      this.templateFormData.groupId = data.templateParentId;
      this.defaultValue = data.templateParentId;

      this.templateForm.resetFields();
      this.templateFormData.templateId = data.id;
      this.templateFormData.templateName = data.templateName;

      this.editTemplateVisible = true;
    },
    handleTableChange(pagination) {
      console.log(pagination);
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getTemplateData(this.groupOwnerId, this.groupType);
      //this.queryParam.page = pagination.current;
      //this.queryParam.size = pagination.pageSize;
      //this.getTableList();
    },
    onInput(e) {
      let val = e.target.value;
      if (val.trim() === "") {
        this.searchTxt = "";
        this.pagination.current = 1;
        this.pagination.defaultPageSize = 12;
        this.getTemplateData(this.groupOwnerId, this.groupType);
      }
    },
    onSearch(e) {
      this.searchTxt = e;
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 12;
      this.getTemplateData(this.groupOwnerId, this.groupType);
    },
    handleAddOk() {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true;
          console.log(this.groupOwnerId);
          if (this.groupTitle === "编辑分组") {
            if (this.addOrUpdateData.type === "channel") {
              editChannelMenuInfo({
                channelId: this.groupOwnerId,
                channelName: values.groupName,
                groupOwnerId: this.groupParentId,
                isChannel: 0
              })
                .then(res => {
                  this.confirmLoading = false;
                  if (res.success) {
                    this.addOrEditVisible = false;
                    this.$message.success("编辑成功！");
                  } else {
                    this.$message.warning(res.message);
                  }
                  this.getChannelTree(
                    this.addOrUpdateData.type,
                    this.groupOwnerId
                  );
                })
                .catch(error => {
                  this.confirmLoading = false;
                  console.log(error);
                });
            } else if (this.addOrUpdateData.type === "program") {
              editProgramMenuInfo({
                programId: this.groupOwnerId,
                programName: values.groupName,
                programParentId: this.groupParentId,
                isProgram: 0,
                groupType: "defined"
              })
                .then(res => {
                  this.confirmLoading = false;
                  if (res.success) {
                    this.addOrEditVisible = false;
                    this.$message.success("编辑成功！");
                  } else {
                    this.$message.warning(res.message);
                  }
                  this.getChannelTree(
                    this.addOrUpdateData.type,
                    this.groupOwnerId
                  );
                })
                .catch(error => {
                  this.confirmLoading = false;
                  console.log(error);
                });
            } else {
              editTemplateMenuInfo({
                templateId: this.groupOwnerId,
                newName: values.groupName,
                groupOwnerId: this.groupParentId,
                isTemplate: 0
              })
                .then(res => {
                  this.confirmLoading = false;
                  if (res.success) {
                    this.addOrEditVisible = false;
                    this.$message.success("编辑成功！");
                  } else {
                    this.$message.warning(res.message);
                  }
                  this.getChannelTree(
                    this.addOrUpdateData.type,
                    this.groupOwnerId
                  );
                })
                .catch(error => {
                  this.confirmLoading = false;
                  console.log(error);
                });
            }
          } else {
            if (this.addOrUpdateData.type === "channel") {
              addChannelMenuInfo({
                parentId: this.groupOwnerId,
                menuName: values.groupName,
                limitType: -1
              })
                .then(res => {
                  this.confirmLoading = false;
                  if (res.success) {
                    this.addOrEditVisible = false;
                    this.$message.success("新增成功！");
                  } else {
                    this.$message.warning(res.message);
                  }
                  this.getChannelTree(
                    this.addOrUpdateData.type,
                    this.groupOwnerId
                  );
                })
                .catch(error => {
                  this.confirmLoading = false;
                  console.log(error);
                });
            } else if (this.addOrUpdateData.type === "program") {
              addProgramMenuInfo({
                parentId: this.groupOwnerId,
                menuName: values.groupName
              })
                .then(res => {
                  this.confirmLoading = false;
                  if (res.success) {
                    this.addOrEditVisible = false;
                    this.$message.success("新增成功！");
                  } else {
                    this.$message.warning(res.message);
                  }
                  this.getChannelTree(
                    this.addOrUpdateData.type,
                    this.groupOwnerId
                  );
                })
                .catch(error => {
                  this.confirmLoading = false;
                  console.log(error);
                });
            } else {
              addTemplateMenuInfo({
                parentId: this.groupOwnerId,
                menuName: values.groupName
              })
                .then(res => {
                  this.confirmLoading = false;
                  if (res.success) {
                    this.addOrEditVisible = false;
                    this.$message.success("新增成功！");
                  } else {
                    this.$message.warning(res.message);
                  }
                  this.getChannelTree(
                    this.addOrUpdateData.type,
                    this.groupOwnerId
                  );
                })
                .catch(error => {
                  this.confirmLoading = false;
                  console.log(error);
                });
            }
          }
        }
      });
    },
    handleAddCancel() {
      this.addOrEditVisible = false;
    },
    handleDelOk() {
      this.delConfirmLoading = true;
      if (this.deletData.type === "channel") {
        deleteChannelMenuInfo({
          channelId: this.groupOwnerId,
          isChannel: 0
        })
          .then(res => {
            this.delConfirmLoading = false;
            if (res.success) {
              this.delVisible = false;
              this.$message.success("删除成功！");
            } else {
              this.$message.warning(res.message);
            }
            this.getChannelTree(
              this.deletData.type,
              this.groupOwnerId,
              this.deletData.channelParentId
            );
          })
          .catch(error => {
            this.delConfirmLoading = false;
            this.delVisible = false;
            console.log(error);
          });
      } else if (this.deletData.type === "program") {
        deleteProgramMenuInfo({
          programId: this.groupOwnerId,
          isProgram: 0,
          sourceType: this.deletData.sourceType
        })
          .then(res => {
            this.delConfirmLoading = false;
            if (res.success) {
              this.delVisible = false;
              this.$message.success("删除成功！");
            } else {
              this.$message.warning(res.message);
            }
            this.getChannelTree(
              this.deletData.type,
              this.groupOwnerId,
              this.deletData.channelParentId
            );
          })
          .catch(error => {
            this.delConfirmLoading = false;
            this.delVisible = false;
            console.log(error);
          });
      } else {
        deleteTemplateMenuInfo({
          templateId: this.groupOwnerId,
          isTemplate: 0
        })
          .then(res => {
            this.delConfirmLoading = false;
            if (res.success) {
              this.delVisible = false;
              this.$message.success("删除成功！");
            } else {
              this.$message.warning(res.message);
            }
            this.getChannelTree(
              this.deletData.type,
              this.groupOwnerId,
              this.deletData.channelParentId
            );
          })
          .catch(error => {
            this.delConfirmLoading = false;
            this.delVisible = false;
            console.log(error);
          });
      }
    },
    handleDelCancel() {
      this.delVisible = false;
    },
    deleteModal(data) {
      this.currentId = data.id;
      this.delTemplateVisible = true;
    },
    deleteTemplateCancel() {
      this.delTemplateVisible = false;
      this.delTemplateConfirmLoading = false;
    },
    handleEditTemplateCancel() {
      this.editTemplateVisible = false;
      this.confirmTemplateLoading = false;
    },
    jsonException(json) {
      try {
        let res = JSON.parse(json);
        return res instanceof Array ? res : [res];
      } catch {
        return [];
      }
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/common.scss";
</style>
<style lang="scss" scoped>
@import "./index.scss";
</style>