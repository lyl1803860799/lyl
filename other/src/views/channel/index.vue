<template>
  <div class="main">
    <div class="tree-area">
      <div class="tree-container">
        <div class="define-card-title">频道分组</div>
        <div class="tree-list">
          <a-tree
            class="template-tree"
            showIcon
            blockNode
            :default-selected-keys="defaultSelectKey"
            :selectedKeys.sync="defaultSelectKey"
            :tree-data="treeData"
            :replace-fields="replaceFields"
            @select="selectGroup"
          >
            <!-- <template slot="switcherIcon">
              <img
                @click="rotateWordTree($event)"
                :src="treeIcon"
                style="width:8px;transform:rotate(-90deg)"
                slot="switcherIcon"
                type="down"
              />
            </template>-->
            <img :src="listIcon" style="width:14px;" slot="list" />
            <template v-slot:title="nodeData">
              <span class="tree-title">{{ nodeData.channelName }}</span>
              <span
                class="tree-btn"
                v-if="nodeData.selected && nodeData.sourceType!='all' && nodeData.sourceType!='system' && nodeData.sourceType!='ungroup'"
              >
                <a-tooltip title="编辑" placement="bottom">
                <img
                  @click="editTree($event,nodeData)"
                  v-if="nodeData.channelParentId!=0"
                  :src="editIcon"
                  style="width:18px;margin-right:16px;"
                />
                </a-tooltip>
                <a-tooltip title="新增" placement="bottom">
                <img
                  @click="addTreeNode($event,nodeData)"
                  :src="addIcon"
                  style="width:18px;margin-right:16px;"
                />
                </a-tooltip>
                <a-tooltip title="删除" placement="bottom">
                <img
                  @click="deleteTreeNode($event,nodeData)"
                  v-if="nodeData.channelParentId!=0"
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
          <span>{{defalutChannelName}}</span>
          <span style="float:right;">
            <a-button
              type="primary"
              class="add-template-btn"
              icon="plus"
              @click="addOrEditTemplate(null,null,'defind')"
            >新增频道</a-button>
            <a-input-search
              v-model="searchTxt"
              placeholder="请输入搜索关键词"
              class="define-search"
              @search="onSearch"
              @input="onInput"
              :maxLength="50"
            />
          </span>
        </div>
        <div class="template-list">
          <a-table
            ref="table"
            class="define-table"
            rowKey="id"
            :locale="tablenodata"
            :showHeader="false"
            :columns="columns"
            :data-source="templateData"
            :pagination="pagination"
            @change="handleTableChange"
          >
            <template slot="id" slot-scope="text , record">
              <div class="choose-list">
                <div
                  class="choose-pic"
                  @mouseenter="enter(record)"
                  @mouseleave="leave(record)"
                >
                  <img :src="record.channelSnapshot" class="bg-pic">
                  <div class="hover-modal" v-if="record.isHover">
                    <div class="hover-content">
                      <div class="hover-title">
                        <div style="float:left;width:80px;display:flex;align-items: center;">
                          <span>
                            <a-switch
                              checked-children="开"
                              un-checked-children="关"
                              v-model="record.isShare"
                              @change="shareChannel($event,record)"
                            />
                          </span>
                          <span style="padding-left:8px;">共享</span>
                        </div>
                        <a-tooltip title="删除" placement="bottom">
                          <span
                          v-if="record.templateGroup != 'system'"
                          class="program-delete-icon"
                          @click="deleteModal(record)"/>
                        </a-tooltip>
                        <a-tooltip title="预览" placement="bottom"><span class="program-play-icon" @click="prviewTemplate(record)" /></a-tooltip>
                      </div>
                      <div
                        class="template-btn"
                        v-if="record.templateGroup != 'system'"
                        style="margin-top:80px;"
                      >
                        <a-button
                          class="edit-project"
                          @click="addOrEditTemplate(record.id,record.channelName,record.channelGroup)"
                        >编辑</a-button>
                      </div>
                    </div>
                    <div class="hover-info">
                      <span class="hover-name" style="padding-left:13px;">
                        <a-tooltip :title="record.channelName" placement="bottom">{{record.channelName}}</a-tooltip>
                      </span>
                      <a-tooltip title="编辑" placement="bottom">
                      <span
                        class="program-edit-icon"
                        v-if="record.templateGroup != 'system'"
                        @click="editTemplate(record)"
                      />
                      </a-tooltip>
                    </div>
                  </div>
                </div>
                <div class="choose-info">
                  <span class="choose-name">
                    <a-tooltip :title="record.channelName" placement="bottom">{{record.channelName}}</a-tooltip>
                  </span>
                </div>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>

    <div v-show="spinning" class="loading-wrap">
      <div class="loading-box">
        <a-spin />
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
      >删除分组后，不会影响该分组下的频道，请确认是否删除该分组？</div>
    </a-modal>

    <a-modal
      class="define-modal"
      title="删除确认"
      :visible="delTemplateVisible"
      :confirmLoading="delTemplateConfirmLoading"
      @ok="deleteTemplate"
      @cancel="deleteTemplateCancel"
    >
      <div style="display:flex;align-items: center;">
        <div>
          <a-icon type="question-circle" style="color: #faad14;font-size:20px;" />
        </div>
        <div style="padding-left:10px;color:#fff;font-size: 16px;">删除确认</div>
      </div>
      <div
        style="margin-top:10px;padding-left:30px;color:#fff;font-size: 14px;"
      >删除频道，不删除频道中的节目，是否确认删除？</div>
    </a-modal>

    <a-modal
      class="define-modal"
      title="编辑频道"
      :visible="editTemplateVisible"
      :confirmLoading="confirmTemplateLoading"
      @ok="handleEditTemplateOk"
      @cancel="handleEditTemplateCancel"
    >
      <a-form :form="templateForm" :colon="false" labelAlign="left">
        <a-form-item label="名称：" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input
            v-decorator="['channelName', { initialValue: templateFormData.channelName,rules: [{required:true,message:'请填写名称!'},{max:50,message:'不能超过50个字!'}]  }]"
          ></a-input>
        </a-form-item>
        <a-form-item label="分组：" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-tree-select
            v-model="templateFormData.groupId"
            show-search
            style="width: 100%"
            :dropdownClassName="'define-tree-select'"
            :tree-data="groupData"
            :replaceFields="replaceTreeFields"
            :defaultValue="defaultValue"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择分组"
            :allowClear="allowClear"
            tree-default-expand-all
          ></a-tree-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <div
      id="view-scroll-content"
      class="scroll-content"
      v-show="isShowPrev"
      v-loading="fullScreenLoading"
    >
      <div class="swiper previewSwiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="data in previewConfigList"
            :key="data.id"
            :data-swiper-autoplay="data.time"
          >
            <div class="scale-box" :style="data.contentStyle">
              <template v-for="(element, i) in data.list1">
                <div
                  class="component-wrapper"
                   v-if="element.componentName !== 'page404'"
                  :key="`${element.option.domId}_${i}`"
                  :style="element.wrapperStyle"
                >
                  <component
                    :is="element.componentName"
                    :ref="element.option.domId"
                    :options="element.option"
                  ></component>
                </div>
                <div
                   v-else
                  :key="`${element.componentName}_${i}`"
                >
                  <component
                    :is="element.componentName"
                  ></component>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="close-container" data-title="退出全屏" v-show="showScreenPreview" @click="exitScreen"></div>
    </div>
  </div>
</template>
<script>
import * as uuid from "uuid/v1";
import {
  getLeftChannelMenus,
  getChannelList,
  addMenuInfo,
  editMenuInfo,
  deleteMenuInfo,
  getChannelAllGroupInfo,
  channelDetail,
  channelLimitType
} from "@/api/channel";
import Swiper from "@/utils/swiper-bundle.min.js";
import "@/utils/swiper-bundle.min.css";
import { TYPE_SETS } from "@/constants/index";
import SET_DATA from "@/utils/setData";
import { getDataForApi, getDataBySql, getDataByView } from "@/api/dataSource";
import treeIcon from "@/assets/images/tree-icon.png";
import expandIcon from "@/assets/images/expand.png";
import listIcon from "@/assets/images/list.png";
import addIcon from "@/assets/images/add.png";
import editIcon from "@/assets/images/edit.png";
import deleteIcon from "@/assets/images/delete.png";
import playIcon from "@/assets/images/play.png";
import page404 from '@/views/404';

export default {
  name: "templateManage",
  components: {
    page404
  },
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
      confirmLoading: false,
      delVisible: false,
      delConfirmLoading: false,
      editTemplateVisible: false,
      confirmTemplateLoading: false,
      delTemplateVisible: false,
      delTemplateConfirmLoading: false,
      currentId: null,
      groupTitle: "新建分组",
      replaceFields: {
        key: "unqiId",
        children: "children",
        title: "channelName"
      },
      defaultSelectKey: ["1_all"],
      defalutChannelName: "频道分组",
      searchTxt: "",
      treeData: [],
      table: {
        pageNumber: 1,
        pageSize: 12
      },
      pagination: {
        current: 1,
        defaultPageSize: 12,
        showQuickJumper: true,
        showSizeChanger: false,
        total: 0,
        showTotal: total => `共${total}条`,
        onShowSizeChange: (current, pageSize) => {
          this.table.pageSize = pageSize;
          this.table.pageNumber = 1;
        }
      },
      columns: [
        {
          title: "频道数据",
          dataIndex: "id",
          key: "id",
          scopedSlots: { customRender: "id" }
        }
      ],
      tablenodata: {
        emptyText: () => (
          <div style="font-size: 14px;font-family: Microsoft YaHei;font-weight: 400;color: #00FCFF;">
            <div class="no-data-area">
              <div>
                <div class="no-data" />
              </div>
              <div>暂无数据，建议您修改分组或搜索条件后查询！</div>
            </div>
          </div>
        )
      },
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
        channelName: "",
        groupId: null
      },
      replaceTreeFields: {
        key: "unqiId",
        children: "children",
        title: "channelName",
        value: "id"
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
      currentGropData: null,
      previewConfigList: [],
      treeUniqId: ""
    };
  },
  mounted() {
    let that = this;
    this.treeUniqId = this.$route.params?.treeUniqId || "";
    if (this.treeUniqId) {
      let list = this.treeUniqId.split("_");
      this.getTemplateTree(list[1], list[0]);
    } else {
      this.getTemplateTree("all");
    }

    window.addEventListener("resize", this.handleResize);
    document.addEventListener("fullscreenchange", function() {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        that.isShowPrev = false;
        that.fullScreenLoading = false;
      }
    });
    document.addEventListener("webkitfullscreenchange", function() {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        that.isShowPrev = false;
        that.fullScreenLoading = false;
      }
    });
  },
  methods: {
    addOrEditProgram(id, name, templateId, templateGropType) {
      this.$router.push({
        path: "/edit/addOrEditProgram",
        query: {
          id: id,
          name: name,
          templateId: templateId,
          templateGropType: templateGropType,
          treeUniqId:
            this.currentGropData.id + "_" + this.currentGropData.sourceType
        }
      });
    },
    checkFull() {
      var isFull =
        document.fullscreenEnabled ||
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenEnabled;
      if (isFull === undefined) isFull = false;
      return isFull;
    },
    prviewTemplate(data) {
      this.isShowPrev = true;
      this.fullScreenLoading = false;
      this.pageId = data.id;
      this.pageGropType = data.templateGroup;
      const el = document.getElementById("view-scroll-content");
      const rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;

      if (rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        const wscript = new window.ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
      this.showScreenPreview = true;
      this.getPageInfo();
      //let routeData = this.$router.resolve({ path: "/show/" + data.id });
      //window.open(routeData.href, "_blank");
    },
    exitScreen() {
      const el = document;
      const cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;

      if (cfs) {
        cfs.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        const wscript = new window.ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
      this.isShowPrev = false;
      this.showScreenPreview = false;
      this.previewConfigList = [];
      // this.scaleStyle = {
      //   ...this.scaleStyle,
      //   transform: `scale(${this.scalePageOption.scale})`
      // }
    },
    getAllGroupData() {
      getChannelAllGroupInfo()
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              let resDatas = res.data;
              for (let i = 0; i < resDatas.length; i++) {
                if (
                  resDatas[i].sourceType === "ungroup" ||
                  resDatas[i].sourceType === "all"
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
    getTemplateTree(type, groupOwnerId, groupParentId) {
      this.spinning = true;
      getLeftChannelMenus()
        .then(res => {
          if (res.success) {
            let data = [];
            if (res.data && res.data.length) {
              if (!groupOwnerId) {
                res.data[0].selected = true;
              }
              data = this.addChildrenData(res.data);
              this.groupType = type;
              this.groupOwnerId =
                groupOwnerId || groupOwnerId == 0
                  ? groupOwnerId
                  : res.data[0].id;
              this.groupParentId =
                groupParentId || groupParentId == 0
                  ? groupParentId
                  : res.data[0].parentId;
              this.getAllGroupData();
              this.getTemplateData(
                groupOwnerId ? groupOwnerId : res.data[0].id,
                type
              );
              if (groupOwnerId || groupOwnerId === 0) {
                let currentData = this.findItemById(
                  res.data,
                  groupOwnerId,
                  type
                );
                this.groupParentId = currentData
                  ? currentData.channelParentId
                  : groupParentId;
                this.defaultSelectKey = [groupOwnerId + "_" + type];
                this.defalutChannelName = currentData
                  ? currentData.channelName
                  : "";
              } else {
                this.groupParentId = res.data[0].channelParentId;
                this.currentGropData = res.data[0];
                this.defaultSelectKey = [data[0].id + "_" + data[0].sourceType];
                this.defalutChannelName = res.data[0].channelName;
              }
            }
            this.treeData = data;
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    findItemById(list, id, type) {
      let res = list.find(item => item.id === id && item.sourceType === type);
      if (res) {
        return res;
      } else {
        for (let i = 0; i < list.length; i++) {
          if (
            list[i].children instanceof Array &&
            list[i].children.length > 0
          ) {
            res = this.findItemById(list[i].children, id, type);
            if (res) {
              return res;
            }
          }
        }
        return null;
      }
    },
    getTemplateData(id, type) {
      let _this = this;
      let params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.defaultPageSize,
        groupOwnerId: id,
        namePrefix: this.searchTxt,
        groupType: type
      };
      this.spinning = true;
      getChannelList(params)
        .then(res => {
          this.loading = false;
          this.spinning = false;
          if (res.success) {
            if (res.data && res.data.list) {
              res.data.list.map(item => {
                item.isHover = false;
                if (item.channelLimitType === -1) {
                  item.isShare = false;
                } else {
                  item.isShare = true;
                }
              });
            }
            this.pagination.total = res.data.total || 0;
            this.templateData = res.data.list;
            let currentPage = this.pagination.current;
            setTimeout(function() {
              let $el = document.getElementsByClassName(
                "ant-pagination-options-quick-jumper"
              );
              if ($el[0]) {
                $el[0].getElementsByTagName("input")[0].value = currentPage;
              }
            }, 100);
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          this.loading = false;
          this.spinning = false;
          console.log(error);
        });
      setTimeout(function(){
        _this.loading = false;
        _this.spinning = false
      },6 * 1000);
    },
    addChildrenData(list) {
      list.map(item => {
        let children = item.children;
        item.slots = { icon: "list" };
        item.isExpaned = false;
        item.unqiId = item.id + "_" + item.sourceType;
        if (children && children.length) {
          this.addChildrenData(children);
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
    enter(item) {
      item.isHover = true;
    },
    leave(item) {
      item.isHover = false;
    },
    selectGroup(e, data) {
      try {
        if (e && e[0]) {
          let list = e[0].split("_");
          this.groupOwnerId = Number(list[0]);
          this.currentGropData = data.node.dataRef;
          this.groupParentId = data.node.dataRef.channelParentId;
          this.defalutChannelName = data.node.dataRef.channelName;
          this.groupType = list[1];
          this.searchTxt = "";
          this.pagination.current = 1;
          this.pagination.defaultPageSize = 12;
          this.pagination.total = 0;
          this.spinning = true;
          this.getTemplateData(this.groupOwnerId, this.groupType);
        }
      } catch (error) {
        console.log(error);
      }
    },
    rotateWordTree(e, item) {
      console.log(item);
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
      this.formData.groupName = data.channelName;
      this.groupTitle = "编辑分组";
      this.addOrEditVisible = true;
    },
    addTreeNode(e, data) {
      e.preventDefault();
      e.stopPropagation();
      this.groupTitle = "新建分组";
      this.addOrEditVisible = true;
      this.formData.groupName = "";
      this.addForm.resetFields();
    },
    deleteTreeNode(e, data) {
      e.preventDefault();
      e.stopPropagation();
      this.delVisible = true;
    },
    editTemplate(data) {
      this.templateFormData.groupId = data.programParentId;
      this.templateFormData.groupType = data.sourceType;
      this.defaultValue = data.programParentId;

      this.templateForm.resetFields();
      this.templateFormData.templateId = data.id;
      this.templateFormData.channelName = data.channelName;
      this.editTemplateVisible = true;
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getTemplateData(this.groupOwnerId, this.groupType);
      //this.queryParam.page = pagination.current;
      //this.queryParam.size = pagination.pageSize;
      //this.getTableList();
    },
    addOrEditTemplate(id, name, type, channelParentId) {
      this.$router.push({
        path: "/edit/addOrEditChannel",
        query: {
          id: id,
          name: name,
          type: type,
          channelParentId: channelParentId
        }
      });
    },
    onSearch(e) {
      this.searchTxt = e;
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 12;
      this.getTemplateData(this.groupOwnerId, this.groupType);
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
    handleAddOk() {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true;
          if (this.groupTitle === "编辑分组") {
            editMenuInfo({
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
                this.getAllGroupData();
                this.getTemplateTree(
                  this.groupType,
                  this.groupOwnerId,
                  this.groupParentId
                );
              })
              .catch(error => {
                this.confirmLoading = false;
                console.log(error);
              });
          } else {
            addMenuInfo({
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
                this.getAllGroupData();
                this.getTemplateTree(
                  this.groupType,
                  this.groupOwnerId,
                  this.groupParentId
                );
              })
              .catch(error => {
                this.confirmLoading = false;
                console.log(error);
              });
          }
        }
      });
    },
    handleAddCancel() {
      this.addOrEditVisible = false;
    },
    handleDelOk() {
      this.delConfirmLoading = true;
      deleteMenuInfo({
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
          this.getAllGroupData();
          this.getTemplateTree(
            this.groupType,
            this.currentGropData.channelParentId
          );
        })
        .catch(error => {
          this.delConfirmLoading = false;
          this.delVisible = false;
          console.log(error);
        });
    },
    handleDelCancel() {
      this.delVisible = false;
    },
    deleteModal(data) {
      this.currentId = data.id;
      this.delTemplateVisible = true;
    },
    deleteTemplate() {
      this.delTemplateConfirmLoading = true;
      deleteMenuInfo({
        channelId: this.currentId,
        isChannel: 1
      })
        .then(res => {
          this.delTemplateVisible = false;
          this.delTemplateConfirmLoading = false;
          if (res.success) {
            this.$message.success("删除成功！");
          } else {
            this.$message.warning(res.message);
          }
          this.pagination.current = 1;
          this.pagination.defaultPageSize = 12;
          this.getTemplateData(this.groupOwnerId, this.groupType);
        })
        .catch(error => {
          this.delTemplateConfirmLoading = false;
          console.log(error);
        });
    },
    deleteTemplateCancel() {
      this.delTemplateVisible = false;
      this.delTemplateConfirmLoading = false;
    },
    handleEditTemplateOk() {
      this.confirmTemplateLoading = true;
      this.templateForm.validateFields((err, values) => {
        if (!err) {
          let params = {
            channelId: this.templateFormData.templateId,
            channelName: values.channelName,
            groupOwnerId: this.templateFormData.groupId,
            isChannel: 1
          };
          editMenuInfo(params)
            .then(res => {
              this.confirmTemplateLoading = false;
              if (res.success) {
                this.editTemplateVisible = false;
                this.$message.success("编辑成功！");
              } else {
                this.$message.warning(res.message);
              }
              this.getTemplateTree(
                this.groupType,
                this.groupOwnerId,
                this.groupParentId
              );
              this.getAllGroupData();
            })
            .catch(error => {
              this.confirmTemplateLoading = false;
              console.log(error);
            });
        }
      });
    },
    handleEditTemplateCancel() {
      this.editTemplateVisible = false;
      this.confirmTemplateLoading = false;
    },
    setBgStyle(styleObj) {
      let contentStyle = "";
      if (!styleObj) return;
      if (styleObj.bgType === "1") {
        contentStyle += `background-image: url(${styleObj.bgImg});`;
      } else {
        contentStyle += `background-color: ${styleObj.bgColor};`;
      }

      if (styleObj.resizeType) {
        const size =
          +styleObj.resizeType === 1
            ? "100% auto"
            : +styleObj.resizeType === 2
            ? "auto 100%"
            : "100% 100%";
        contentStyle += `background-size: ${size};`;
      }

      if (styleObj.screenSize) {
        const { width, height } = styleObj.screenSize;
        contentStyle += `width: ${width}px; height: ${height}px;`;
      }

      if (!this.isComponent) {
        const { width, height } = styleObj.screenSize;
        let scale = {};
        if (!document.fullscreenElement) {
          const { innerWidth, innerHeight } = window;
          scale = { y: innerHeight / height, x: innerWidth / width };
        } else {
          const { width: innerWidth, height: innerHeight } = window.screen;
          scale = { y: innerHeight / height, x: innerWidth / width };
        }
        contentStyle += "position: absolute; left: 50%; top: 50%;";
        contentStyle += `transform: scale(${scale.x}, ${
          scale.y
        }); margin-left: -${width / 2}px; margin-top: -${height / 2}px;`;
      }
      return contentStyle;
    },
    setWrapperStyle(styleObj) {
      let style = "";
      if (styleObj.posx) {
        style += `left: ${styleObj.posx}px;`;
      }

      if (styleObj.posy) {
        style += `top: ${styleObj.posy}px;`;
      }

      if (styleObj.z) {
        style += `z-index: ${styleObj.z};`;
      }

      if (styleObj.width) {
        style += `width: ${styleObj.width}px;`;
      }

      if (styleObj.height) {
        style += `height:  ${styleObj.height}px;`;
      }

      return style;
    },
    async getPageInfo() {
      if (!this.pageId) return;
      this.previewConfigList = [];
      let previewConfigList = [];
      this.waitToInterval = {};
      this.websocketList = [];
      let response = null;
      this.fullScreenLoading = true;
      try {
        response = await channelDetail({
          channelId: this.pageId
        });
        this.fullScreenLoading = false;
        const { data } = response;
        if (!data) {
          this.$router.push({ path: "/404" });
          return;
        }
        console.log(data);
        let channelDataList = data.channelPrograms;
        channelDataList.map(res => {
          let time = 0;
          let programRule = this.jsonException(res.programRule || [])[0] || {};
          const pageOption = this.jsonException(res.programConfig || [])[0] || null;
          let assemblyList = (
            this.jsonException(res.programTemplateMaterialConfig || []) || []
          ).map(item => {
            const { component } = item.option;
            if (this.isComponent) {
              component.width = window.innerWidth - 100;
              component.height = window.innerHeight - 100;
            }
            return {
              ...item,
              wrapperStyle: this.setWrapperStyle(component)
            };
          });
          let contentStyle = pageOption?this.setBgStyle(pageOption):'width:100%;height:100%;';
         
          let playTime = Number(programRule.playTime);
          if (programRule.playTimeType === "hour") {
            time = playTime * 60 * 60 * 1000;
          } else if (programRule.playTimeType === "minute") {
            time = playTime * 60 * 1000;
          } else {
            time = playTime * 1000;
          }
          if(res.programTemplateMaterialConfig === null){
            assemblyList = [{
              componentName: "page404",
              id: "page-404-style"
            }]
          }
          previewConfigList.push({
            id: programRule.uuid,
            playTime: programRule.playTime,
            playTimeType: programRule.playTimeType,
            playAnimation: programRule.playAnimation,
            useRange: programRule.useRange,
            contentStyle: contentStyle,
            list1: assemblyList,
            time: time
          });
        });
        this.previewConfigList = previewConfigList;
        let playType = JSON.parse(data.channelRule).playType;
        let playAnimation = JSON.parse(data.channelRule).playAnimation;
        if (this.mySwiper) {
          this.mySwiper.destroy(true);
        }
        this.$nextTick(() => {
          // 下一个UI帧再初始化swiper
          if (playAnimation === "0") {
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              effect: "fade",
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          } else if (playAnimation === "1" || playAnimation === "2") {
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          } else if (playAnimation === "3") {
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              effect: "creative",
              creativeEffect: {
                prev: {
                  shadow: true,
                  translate: [0, 0, 0]
                },
                next: {
                  translate: [0, "100%", 0]
                }
              },
              watchSlidesProgress: true,
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          } else if(playAnimation === "4"){
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              effect: "creative",
              creativeEffect: {
                prev: {
                  shadow: true,
                  translate: [0, 0, 0]
                },
                next: {
                  translate: [0, "-100%", 0]
                }
              },
              watchSlidesProgress: true,
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          }else {
            this.mySwiper = new Swiper(".previewSwiper", {
              initialSlide: 0,
              effect: "fade",
              centeredSlides: true,
              observer: true, //修改swiper自己或子元素时，自动初始化swiper
              observeParents: true, //修改swiper的父元素时，自动初始化swiper
              autoplay: {
                stopOnLastSlide: playType === "1" ? true : false
              } //可选选项，自动滑动
            });
          }
        });
      } catch {
        this.fullScreenLoading = false;
      }
    },
    jsonException(json) {
      try {
        let res = JSON.parse(json);
        return res instanceof Array ? res : [res];
      } catch {
        return [];
      }
    },
    handleResize() {
      let _this = this;
      if (_this.resizeTimer) {
        clearTimeout(_this.resizeTimer);
      }
      _this.resizeTimer = setTimeout(() => {
        if (!document.fullscreenElement) {
          this.previewConfigList = [];
        }
        // 处理取消全屏后需要恢复原始scale
        _this.setBgStyle(_this.pageOption);
      }, 300);
    },
    // 获取数据
    //查看数据源响应结果
    checkData(interval, dataConfigList) {
      dataConfigList.forEach(async data => {
        let { dataConfig, index } = data;
        let { dataSource, dataMap } = dataConfig;
        let res, params;
        if (dataSource.dataSourceCheckId == 2) {
          let obj = {};
          dataSource.headers.forEach(item => {
            if (item.keyName) {
              obj[item.keyName] = item.valName;
            }
          });
          if (dataSource.method == "post") {
            params = {
              apiUrl: dataSource.apiUrl,
              method: dataSource.method,
              body: dataSource.body,
              headers: obj
            };
          } else {
            params = {
              apiUrl: dataSource.apiUrl,
              method: dataSource.method,
              headers: obj
            };
          }

          res = await getDataForApi(params);
        } else if (dataSource.dataSourceCheckId == 0) {
          if (+dataSource.sourceMode === 1) {
            if (
              dataSource.dataSourceId &&
              dataSource.dataTableName &&
              Object.values(dataSource.columns).filter(item => item).length > 0
            ) {
              res = await getDataByView({
                dataSourceId: dataSource.dataSourceId,
                dataTableName: dataSource.dataTableName,
                columns: Object.values(dataSource.columns).filter(item => item),
                queryStr: dataSource.queryStr,
                orderBy: dataSource.sort?.orderBy,
                orderColumns: dataSource.sort?.orderColumns
              });
            }
          } else {
            if (dataSource.dataSourceId && dataSource.editorContent) {
              res = await getDataBySql({
                dataSourceId: dataSource.dataSourceId,
                sql: dataSource.editorContent
              });
            }
          }
        }

        const dataContent = res.data;

        if (dataContent && dataContent.length > 0) {
          const formattedData = this.transformData(dataMap, dataContent);
          this.setOptionData(index, formattedData);
        }
      });
      this.startInterval(interval);
    },

    // 更新websocket数据响应结果
    updateWsRecord(data, index) {
      const curWs = this.websocketList.find(ws => ws.index === index);
      const { dataConfig } = curWs;
      let { dataSource, dataMap } = dataConfig;
      dataSource.data = dataSource.data
        .concat(JSON.parse(data))
        .slice(-(dataSource.wsMaxLength || 1000));
      if (dataSource.data && dataSource.data.length > 0) {
        const formattedData = this.transformData(dataMap, dataSource.data);
        this.setOptionData(index, formattedData);
      }
    },

    transformData(dataMap, data) {
      const updateData = (data || []).map(item => {
        const result = Object.entries(dataMap)
          .map(keys => {
            return { [keys[0]]: item[keys[1] || keys[0]] };
          })
          .reduce((prev, next) => {
            return Object.assign({}, prev, next);
          }, {});
        return result;
      });

      return updateData;
    },

    setOptionData(index, newData) {
      let curEl = this.deepClone(this.list1[index]);
      let defaultOption = {
        ...curEl.option,
        dataConfig: {
          ...curEl.option.dataConfig,
          data: newData
        }
      };
      defaultOption = SET_DATA[curEl.componentName].call(
        this,
        defaultOption,
        TYPE_SETS[curEl.id.replace(/\d/g, "")] || null,
        curEl.id.replace(/\d/g, "") || null
      );
      this.$set(this.list1, index, {
        ...curEl,
        option: { ...defaultOption },
        width: +defaultOption.component.width,
        height: +defaultOption.component.height,
        posx: +defaultOption.component.posx,
        posy: +defaultOption.component.posy,
        z: +defaultOption.component.z,
        active: defaultOption.component.active
      });
      this.$refs[curEl.option.domId] &&
        this.$refs[curEl.option.domId][0] &&
        this.$refs[curEl.option.domId][0].refresh();
    },

    // 开启定时器
    startInterval(interval) {
      if (this.intervalObj[interval]) {
        clearInterval(this.intervalObj[interval]);
      }
      this.intervalObj[interval] = setTimeout(() => {
        this.checkData(interval, this.waitToInterval[interval]);
      }, interval * 1000);
    },
    // 关闭定时器
    pauseInterval() {
      Object.values(this.intervalObj).forEach(item => {
        if (item) {
          clearTimeout(item);
        }
      });
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    // 销毁websocket
    destoryWS() {
      this.websocketList.forEach(wsItem => {
        wsItem.lockReconnect = true;
        wsItem.websocket.close();
      });
    },
    async shareChannel(e, res) {
      res.isShare = e;
      const { data } = await channelLimitType({
        channelId: res.id,
        channelLimitType: e ? 0 : -1
      });
      console.log(data);
      this.$message.success(e ? "打开共享成功" : "关闭共享成功");
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/common.scss";
</style>
<style lang="scss" scoped>
@import "./index.scss";
.swiper-slide{
  opacity: 0!important;
}
.swiper-slide-active{
  opacity: 1!important;
}
</style>