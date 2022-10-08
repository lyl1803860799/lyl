<template>
  <div class="main">
    <div class="tree-area">
      <div class="tree-container">
        <div class="define-card-title">节目分组</div>
        <div class="tree-list">
          <a-tree
            class="template-tree"
            showIcon
            blockNode
            :default-selected-keys="defaultSelectKey"
            :selectedKeys.sync="defaultSelectKey"
            :expandedKeys.sync="defaultExpandedKeys"
            :tree-data="treeData"
            :replace-fields="replaceFields"
            @select="selectGroup"
          >
            <img :src="listIcon" style="width:14px;" slot="list" />
            <template v-slot:title="nodeData">
              <span class="tree-title">{{ nodeData.programName }}</span>
              <span
                class="tree-btn"
                v-if="nodeData.selected && nodeData.sourceType!='all' && nodeData.sourceType!='system' && nodeData.sourceType!='ungroup'"
              >
                <a-tooltip title="编辑" placement="bottom">
                  <img
                    @click="editTree($event,nodeData)"
                    v-if="nodeData.programParentId!=0"
                    :src="editIcon"
                    style="width:18px;margin-right:16px;"
                  />
                </a-tooltip>
                <a-tooltip title="新增" v-if="nodeData.sourceType != 'share'" placement="bottom">
                  <img
                    @click="addTreeNode($event,nodeData)"
                    :src="addIcon"
                    style="width:18px;margin-right:16px;"
                  />
                </a-tooltip>
                <a-tooltip title="删除" placement="bottom">
                  <img
                    @click="deleteTreeNode($event,nodeData)"
                    v-if="nodeData.programParentId!=0"
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
          <span>{{defalutProgramName}}</span>
          <span style="float:right;margin-top:12px;">
            <a-button
              type="primary"
              class="add-template-btn"
              icon="plus"
              @click="addOrEditProgram(null,null)"
            >新增节目</a-button>
            <span class="program-template-btn" @click="collapseProgram">
              <span>
                <img :src="programTemplateIcon" style="margin-top: -2px;" />
              </span>
              <span style="padding-left:6px;">节目模板</span>
            </span>
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
            :class="{programTempalteArea:collapseRight}"
            rowKey="id"
            :locale="tablenodata"
            :showHeader="false"
            :columns="columns"
            :data-source="programData"
            :pagination="pagination"
            @change="handleTableChange"
          >
            <template slot="unqiId" slot-scope="text , record">
              <div class="choose-list">
                <div class="choose-pic" @mouseenter="enter(record)" @mouseleave="leave(record)">
                  <img :src="record.programSnapshot" class="bg-pic" />
                  <div class="hover-modal" v-if="record.isHover">
                    <div class="hover-content">
                      <p class="hover-title">
                        <span>分辨率：{{record.programSize}}</span>
                        <a-tooltip title="删除" placement="bottom">
                          <span
                            class="program-delete-icon"
                            v-if="record.sourceType!='system' && record.sourceType!='share' && groupType != 'share'"
                            @click="deleteModal(record)"
                          />
                        </a-tooltip>
                        <a-tooltip title="复制" placement="bottom">
                          <span class="program-copy-icon" @click="copyProgram(record)" />
                        </a-tooltip>
                        <a-tooltip title="预览" placement="bottom">
                          <span class="program-play-icon" @click="prviewProgram(record)" />
                        </a-tooltip>
                        <a-tooltip
                          v-if="record.sourceType==='share' && groupType !== 'share'"
                          title="共享中"
                          placement="bottom"
                        >
                          <span class="program-sharing-icon" style="cursor:unset;" />
                        </a-tooltip>
                        <a-tooltip
                          v-if="record.sourceType !=='share' && (record.programLimitType === -1 || record.programLimitType === null) && groupType != 'share'"
                          title="共享"
                          placement="bottom"
                        >
                          <span class="program-share-icon" @click="openShareModal(record)" />
                        </a-tooltip>
                        <a-tooltip
                          v-if="record.sourceType !=='share' && (record.programLimitType === 0 || record.programLimitType === 1) && groupType != 'share'"
                          title="共享中"
                          placement="bottom"
                        >
                          <span class="program-sharing-icon" @click="openShareModal(record)" />
                        </a-tooltip>
                      </p>
                      <div
                        class="template-btn"
                        v-if="record.programGroup != 'system'"
                        style="margin-top:12px;"
                      >
                        <a-button
                          class="edit-project"
                          v-if="record.sourceType!='system' && record.sourceType!='share' && groupType != 'share'"
                          @click="addOrEditProgram(record.id,record.programName,record.sourceType,null,null,record.programParentId)"
                        >编辑节目</a-button>
                      </div>
                    </div>
                    <div class="hover-info">
                      <span class="hover-name" style="padding-left:13px;">
                        <a-tooltip :title="record.programName">{{record.programName}}</a-tooltip>
                      </span>
                      <a-tooltip title="编辑" placement="bottom">
                        <span
                          class="program-edit-icon"
                          v-if="record.sourceType != 'system' && record.sourceType!='share' && groupType != 'share'"
                          @click="editTemplate(record)"
                        />
                      </a-tooltip>
                    </div>
                  </div>
                </div>
                <div class="choose-info">
                  <span class="choose-name">
                    <a-tooltip :title="record.programName" placement="bottom">{{record.programName}}</a-tooltip>
                  </span>
                </div>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <section class="template-collapse-right" v-show="collapseRight">
      <img :src="templateCollaseIcon" class="collapse-btn" @click="collapseTemplate" />
      <div class="program-template-list">
        <div class="define-card-title">
          <span>节目模板</span>
          <span class="more-template" @click="qryMore">查看更多模板></span>
        </div>
        <div class="template-list">
          <div
            class="template-info"
            v-for="data in systemTemplateData"
            :key="data.id"
            @mouseenter="enter(data)"
            @mouseleave="leave(data)"
          >
            <div
              class="template-content"
              :style="{backgroundImage:'url('+data.templateSnapshot+')'}"
            >
              <div class="hover-modal" v-if="data.isHover">
                <div class="hover-content">
                  <p class="hover-title">
                    <span>分辨率：{{data.templateSize}}</span>
                    <a href="javascript:void(0);" @click="prviewTemplate(data)">
                      <img :src="playIcon" style="float:right;cursor:pointer;margin-right:20px;" />
                    </a>
                  </p>
                  <div class="template-btn" style="margin-top:35px;">
                    <a-button class="create-project" @click="createProgram(data)">创建节目</a-button>
                  </div>
                </div>
              </div>
            </div>
            <div class="template-title">{{data.templateName}}</div>
          </div>
        </div>
      </div>
    </section>

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
      >删除分组后，不会影响该分组下的节目，请确认是否删除该分组？</div>
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
        <div style="padding-left:10px;color:#fff;font-size: 16px;">{{delTemplateText}}</div>
      </div>
      <div style="margin-top:10px;padding-left:30px;color:#fff;font-size: 14px;">{{delTemplateText2}}</div>
    </a-modal>

    <a-modal
      class="define-modal"
      title="编辑节目"
      :visible="editTemplateVisible"
      :confirmLoading="confirmTemplateLoading"
      @ok="handleEditTemplateOk"
      @cancel="handleEditTemplateCancel"
    >
      <a-form :form="templateForm" :colon="false" labelAlign="left">
        <a-form-item label="名称：" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input
            v-decorator="['programName', { initialValue: programFormData.programName,rules: [{required:true,message:'请填写名称!'},{max:50,message:'不能超过50个字!'}]  }]"
          ></a-input>
        </a-form-item>
        <a-form-item label="分组：" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-tree-select
            v-model="programFormData.groupId"
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

    <a-modal
      class="define-modal"
      title="节目共享"
      :visible="shareVisible"
      :confirmLoading="shareLoading"
      :bodyStyle="{padding:'16px 50px'}"
      @ok="handleShareOk"
      @cancel="handleShareCancel"
    >
      <a-row>
        <a-radio-group v-model="shareForm.shareUserType">
          <a-radio :value="-1">不共享</a-radio>
          <a-radio :value="0">指定用户共享</a-radio>
          <a-radio :value="1">所有用户共享</a-radio>
        </a-radio-group>
      </a-row>
      <a-row v-if="shareForm.shareUserType === 0">
        <div class="select-account">指定账号</div>
        <div class="add-account-container">
          <a-row>
            <a-col :span="19">
              <a-input
                class="account-input"
                v-model="shareAccount"
                placeholder="请输入账号(示例：M4378639)"
              />
            </a-col>
            <a-col :span="5">
              <a-button class="confirm-btn" @click="addShareAccount">确认添加</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <ul class="share-list">
                <li v-for="data in shareForm.shareAccountList" :key="data.shareUserAccount">
                  <a-row>
                    <a-col :span="8" class="share-account-name text-center">{{data.shareUserName}}</a-col>
                    <a-col :span="8" class="text-center">{{data.shareUserAccount}}</a-col>
                    <a-col :span="8" class="flex-center">
                      <span class="program-delete-icon" @click="deleteShareAccount(data)"></span>
                    </a-col>
                  </a-row>
                </li>
              </ul>
            </a-col>
          </a-row>
        </div>
      </a-row>
    </a-modal>

    <div
      id="view-scroll-content"
      class="scroll-content"
      v-show="isShowPrev"
      v-loading="fullScreenLoading"
    >
      <div class="scale-box" :style="contentStyle">
        <template v-for="(element, i) in list1">
          <div
            class="component-wrapper"
            :key="`${element.option.domId}_${i}`"
            :style="element.wrapperStyle"
          >
            <component
              :is="element.componentName"
              :ref="element.option.domId"
              :options="element.option"
            ></component>
          </div>
        </template>
      </div>
      <div class="close-container" data-title="退出全屏" v-show="showScreenPreview" @click="exitScreen"></div>
    </div>
  </div>
</template>
<script>
import * as uuid from "uuid/v1";
import {
  getLeftProgramMenus,
  getProgramList,
  programDetail,
  addMenuInfo,
  editMenuInfo,
  deleteMenuInfo,
  getProgramAllGroupInfo,
  addProgram,
  settingProgramShare,
  getShareAccountInfo,
  getShareUsers
} from "@/api/program";
import { getTemplateList, templateDetail } from "@/api/template";
import { TYPE_SETS } from "@/constants/newIndex";
import SET_DATA from "@/utils/newSetData";
import { getDataForApi, getDataBySql, getDataByView } from "@/api/dataSource";
import { WebSocketService } from "@/utils/websocketService";
import treeIcon from "@/assets/images/tree-icon.png";
import expandIcon from "@/assets/images/expand.png";
import listIcon from "@/assets/images/list.png";
import addIcon from "@/assets/images/add.png";
import editIcon from "@/assets/images/edit.png";
import editHoverIcon from "@/assets/images/edit-hover.png";
//import copyIcon from "@/assets/images/copy.png";
import copyHoverIcon from "@/assets/images/copy-hover.png";
import deleteIcon from "@/assets/images/delete.png";
import deleteHoverIcon from "@/assets/images/delete-hover.png";
import playIcon from "@/assets/images/play.png";
import playHoverIcon from "@/assets/images/play-hover.png";

import programTemplateIcon from "@/assets/images/programTemplate.png";
import templateCollaseIcon from "@/assets/images/templateCollase.png";
export default {
  name: "programManage",
  components: {},
  data() {
    return {
      treeIcon,
      expandIcon,
      listIcon,
      addIcon,
      editIcon,
      editHoverIcon,
      //copyIcon,
      copyHoverIcon,
      deleteIcon,
      deleteHoverIcon,
      playIcon,
      playHoverIcon,
      programTemplateIcon,
      templateCollaseIcon,
      spinning: false,
      allowClear: false,
      loading: false,
      addOrEditVisible: false,
      confirmLoading: false,
      delVisible: false,
      treeSourceType: "",
      delConfirmLoading: false,
      editTemplateVisible: false,
      confirmTemplateLoading: false,
      delTemplateVisible: false,
      delTemplateText:'删除确认',
      delTemplateText2:'是否确认删除节目？',
      delTemplateConfirmLoading: false,
      currentId: null,
      currentSourceType: "defined",
      groupTitle: "新建分组",
      replaceFields: {
        key: "unqiId",
        children: "children",
        title: "programName"
      },
      defaultSelectKey: ["1_all"],
      defaultExpandedKeys: [],
      defalutProgramName: "全部分组",
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
          title: "节目数据",
          dataIndex: "unqiId",
          key: "unqiId",
          scopedSlots: { customRender: "unqiId" }
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
      programData: [],
      groupType: "all",
      groupOwnerId: 0,
      groupParentId: 0,
      addForm: this.$form.createForm(this, { name: "addForm" }),
      formData: {
        groupName: ""
      },
      templateForm: this.$form.createForm(this, { name: "templateForm" }),
      programFormData: {
        programId: null,
        programName: "",
        groupId: null,
        groupType: "defined",
        programLimitType: -1
      },
      replaceTreeFields: {
        key: "unqiId",
        children: "children",
        title: "programName",
        value: "id"
      },
      groupData: [],
      defaultValue: "",
      pageId: null,
      pageGropType: "system",
      templateId: null,
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
      collapseRight: false,
      systemTemplateData: [],
      editHoverFlag: false,
      currentGropData: [],
      treeUniqId: "",
      shareVisible: false,
      shareLoading: false,
      shareForm: {
        programId: null,
        shareUserType: -1,
        shareAccountList: []
      },
      shareAccount: "",
      oldShareData: {
        shareUserType: null,
        shareAccountList: []
      }
    };
  },
  mounted() {
    let that = this;
    this.treeUniqId = this.$route.params?.treeUniqId || "";
    if (this.treeUniqId) {
      let list = this.treeUniqId.split("_");
      this.getProgramTree(list[1], list[0]);
    } else {
      this.getProgramTree("all");
    }
    this.getTemplateData();
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
    addShareAccount() {
      if (this.shareForm.shareAccountList.length >= 20) {
        this.$message.warning("最多添加20个账号");
        return;
      }
      let accountName = this.$store.state.user.userName;
      if (this.shareAccount === accountName) {
        this.$message.warning("不能添加自身账号");
        return;
      }
      this.shareAccountInfo();
    },
    deleteShareAccount(data) {
      for (let i = 0; i < this.shareForm.shareAccountList.length; i++) {
        if (
          data.shareUserAccount ===
          this.shareForm.shareAccountList[i].shareUserAccount
        ) {
          this.shareForm.shareAccountList.splice(i, 1);
        }
      }
    },
    createProgram(data) {
      this.addOrEditProgram(null, null, null, data.id, data.templateGroup);
    },
    collapseTemplate() {
      this.collapseRight = false;
    },
    getTemplateData() {
      let params = {
        pageNum: 1,
        pageSize: 10,
        groupOwnerId: 1,
        namePrefix: null,
        groupType: "system"
      };
      getTemplateList(params)
        .then(res => {
          console.log(res);
          if (res.success) {
            if (res.data && res.data.list) {
              res.data.list.map(item => {
                item.isHover = false;
              });
            }
            this.systemTemplateData = res.data.list;
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
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
    copyProgram(data) {
      console.log(data);
      this.loading = true;
      programDetail({
        programId: data.id,
        sourceType: this.groupType === "share" ? "share" : data.sourceType
      })
        .then(res => {
          if (res.success) {
            this.copyAddProgram(res.data, data.programSnapshot);
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    copyAddProgram(data, snapshot) {
      let programTemplateMaterialConfig = this.jsonException(
        data.programTemplateMaterialConfig
      );
      if (
        programTemplateMaterialConfig &&
        programTemplateMaterialConfig.length
      ) {
        programTemplateMaterialConfig.map(item => {
          if (item.option) {
            item.option.domId = uuid();
          }
        });
      }
      addProgram({
        isProgram: 1,
        programName: data.programName,
        programEnName: "",
        programConfig: data.programConfig,
        programTemplatesConfig: "[]",
        programTemplateMaterialConfig: JSON.stringify(
          programTemplateMaterialConfig
        ),
        programSnapshot: snapshot,
        programParentId: data.programParentId,
        programLimitType: -1,
        programSize: data.programSize,
        isCopy: 1,
        source:
          data.sourceType === "system"
            ? "system"
            : data.sourceType === "share" || this.groupType === "share"
            ? "share"
            : undefined
      })
        .then(res => {
          this.loading = false;
          if (res.success) {
            this.$message.success("复制成功");
            this.getProgramData(this.groupOwnerId, this.groupType);
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    prviewProgram(data) {
      this.list1 = [];
      this.isShowPrev = true;
      this.fullScreenLoading = false;
      this.pageId = data.id;
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
      this.getProgramPageInfo(data.sourceType);
      //let routeData = this.$router.resolve({ path: "/show/" + data.id });
      //window.open(routeData.href, "_blank");
    },
    openShareModal(data) {
      console.log(data);
      this.shareForm.programId = data.id;
      this.shareForm.shareUserType =
        data.programLimitType === null ? -1 : data.programLimitType;
      getShareUsers(data.id)
        .then(res => {
          if (res.success) {
            this.shareForm.shareAccountList = res.data;
            this.shareVisible = true;
            console.log(res);
            this.oldShareData = {
              shareUserType: this.shareForm.shareUserType,
              shareAccountList: res.data
            };
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(error => {
          this.shareVisible = true;
          console.log(error);
        });
    },
    prviewTemplate(data) {
      this.list1 = [];
      this.isShowPrev = true;
      this.fullScreenLoading = false;
      this.templateId = data.id;
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
      this.getTempaltePageInfo();
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
      this.list1 = [];
      this.isShowPrev = false;
      this.showScreenPreview = false;
      // this.scaleStyle = {
      //   ...this.scaleStyle,
      //   transform: `scale(${this.scalePageOption.scale})`
      // }
    },
    getAllGroupData() {
      getProgramAllGroupInfo()
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
    getProgramTree(type, groupOwnerId, groupParentId) {
      this.spinning = true;
      getLeftProgramMenus()
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
              this.getAllGroupData();
              this.getProgramData(
                groupOwnerId ? groupOwnerId : res.data[0].id,
                type
              );
              if (groupOwnerId || groupOwnerId === 0) {
                let currentData = this.findItemById(
                  res.data,
                  groupOwnerId,
                  type
                );
                if (currentData) {
                  this.currentGropData = currentData;
                }
                let allParentInfo = this.findParentNode(
                  res.data,
                  groupOwnerId,
                  type
                );
                if (allParentInfo && allParentInfo.length) {
                  allParentInfo.map(item => {
                    this.defaultExpandedKeys.push(item.activeId + "_" + type);
                  });
                }
                this.groupParentId = currentData
                  ? currentData.programParentId
                  : groupParentId;
                this.defaultSelectKey = [groupOwnerId + "_" + type];
                this.defalutProgramName = currentData
                  ? currentData.programName
                  : "";
              } else {
                this.groupParentId = res.data[0].programParentId;
                this.currentGropData = res.data[0];
                this.defaultSelectKey = [data[0].id + "_" + data[0].sourceType];
                this.defalutProgramName = res.data[0].programName;
              }
            }
            console.log(data);
            this.treeData = data;
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    findParentNode(list, id, type, children = "children", level = 0) {
      var arrRes = [];
      let obj = {
        id: 0,
        [children]: list
      };
      let rev = (data, id, level) => {
        if (!data || !data[children] || !data[children].length) {
          return;
        }

        for (var i = 0; i < data[children].length; i++) {
          let item = data[children][i];

          if (item.id == id && item.sourceType == type) {
            //将匹配到的结果保存到数组
            arrRes.unshift({ level, activeId: item.id }); //递归它的父级
            rev(obj, data.id, 0);
            break;
          } else if (item[children] && item[children].length > 0) {
            //如果有子集，则把子集作为参数重新执行本方法
            rev(item, id, level + 1);
          }
        }
      };
      rev(obj, id, level);
      return arrRes;
    },
    findItemById(list, id, type) {
      let res = list.find(
        item => item.id === Number(id) && item.sourceType === type
      );
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
    getProgramData(id, type) {
      let _this = this;
      let params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.defaultPageSize,
        namePrefix: this.searchTxt,
        programSize: "",
        groupOwnerId: id,
        groupType: type
      };
      getProgramList(params)
        .then(res => {
          this.loading = false;
          this.spinning = false;
          if (res.success) {
            if (res.data && res.data.list) {
              res.data.list.map(item => {
                item.isHover = false;
              });
            }
            this.pagination.total = res.data.total || 0;
            this.programData = this.addUniqeId(res.data.list);
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
        _this.spinning = false;
      },6 * 1000);
    },
    addUniqeId(list) {
      if (list && list.length) {
        list.map(item => {
          let children = item.children;
          item.unqiId = item.id + "_" + item.sourceType;
          if (children && children.length) {
            this.addUniqeId(children);
          }
        });
      }

      return list;
    },
    addChildrenData(list) {
      list.map(item => {
        let children = item.children;
        item.slots = { icon: "list" };
        item.title = item.programName;
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
    picMouseEnter() {
      this.editHoverFlag = true;
    },
    picMouseLeave() {
      this.editHoverFlag = false;
    },
    selectGroup(e, data) {
      try {
        if (e && e[0]) {
          let list = e[0].split("_");
          this.groupOwnerId = Number(list[0]);
          this.currentGropData = data.node.dataRef;
          this.groupParentId = data.node.dataRef.programParentId;
          this.defalutProgramName = data.node.dataRef.programName;
          this.groupType = list[1];
          this.searchTxt = "";
          this.pagination.current = 1;
          this.pagination.defaultPageSize = 12;
          this.pagination.total = 0;
          this.spinning = true;
          this.getProgramData(this.groupOwnerId, this.groupType);
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
      this.formData.groupName = data.programName;
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
      this.treeSourceType = data.sourceType;
      this.delVisible = true;
    },
    editTemplate(data) {
      console.log(data);
      this.programFormData.groupId = data.programParentId;
      this.programFormData.groupType = data.sourceType;
      this.programFormData.programLimitType = data.programLimitType;
      this.defaultValue = data.programParentId;

      this.templateForm.resetFields();
      this.programFormData.programId = data.id;
      this.programFormData.programName = data.programName;
      this.editTemplateVisible = true;
    },
    handleTableChange(pagination) {
      console.log(pagination);
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getProgramData(this.groupOwnerId, this.groupType);
      //this.queryParam.page = pagination.current;
      //this.queryParam.size = pagination.pageSize;
      //this.getTableList();
    },
    qryMore() {
      this.$router.push({
        path: "/index/templateManage"
      });
    },
    addOrEditProgram(
      id,
      name,
      sourceType,
      templateId,
      templateGropType,
      programParentId
    ) {
      this.$router.push({
        path: "/edit/addOrEditProgram",
        query: {
          id: id,
          name: name,
          templateId: templateId,
          templateGropType: templateGropType,
          programParentId: programParentId,
          sourceType: sourceType,
          treeUniqId:
            this.currentGropData.id + "_" + this.currentGropData.sourceType
        }
      });
    },
    onSearch(e) {
      this.searchTxt = e;
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 12;
      this.getProgramData(this.groupOwnerId, this.groupType);
    },
    onInput(e) {
      let val = e.target.value;
      if (val.trim() === "") {
        this.searchTxt = "";
        this.pagination.current = 1;
        this.pagination.defaultPageSize = 12;
        this.getProgramData(this.groupOwnerId, this.groupType);
      }
    },
    handleAddOk() {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true;
          if (this.groupTitle === "编辑分组") {
            editMenuInfo({
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
                this.getAllGroupData();
                this.getProgramTree(
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
                this.getAllGroupData();
                this.getProgramTree(
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
        programId: this.groupOwnerId,
        isProgram: 0,
        sourceType: this.treeSourceType
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
          this.getProgramTree(
            this.groupType,
            this.currentGropData.programParentId
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
      if(data.programLimitType === 0 || data.programLimitType === 1){
        this.delTemplateText = '当前节目处于共享状态！ ';
        this.delTemplateText2 = '删除后，将同步删除共享节目，是否确认删除？';
      }else{
        this.delTemplateText = '删除确认';
        this.delTemplateText2='是否确认删除节目？';
      }
      this.currentId = data.id;
      this.currentSourceType = data.sourceType;
      this.delTemplateVisible = true;
    },
    deleteTemplate() {
      this.delTemplateConfirmLoading = true;
      deleteMenuInfo({
        programId: this.currentId,
        isProgram: 1,
        sourceType: "defined",
        syncInfo:true
      })
        .then(res => {
          this.delTemplateVisible = false;
          this.delTemplateConfirmLoading = false;
          if (res.success) {
            if (res.message.indexOf("删除成功") > -1) {
              this.$message.success(res.message);
            } else {
              let resDatas = res.data;
              let str = "";
              if (resDatas && resDatas.length) {
                resDatas.map((item, index) => {
                  if (index === resDatas.length - 1) {
                    str += "" + item.channelName;
                  } else {
                    str += "" + item.channelName + "、";
                  }
                });
              }
              this.$confirm({
                title: "提示",
                content:
                  "以下频道正在使用该节目：" +
                  str +
                  "，请先将节目从正在使用的频道中删除，再进行节目删除操作！",
                okText: "确认",
                onOk() {
                  return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                  }).catch(() => console.log("Oops errors!"));
                },
                onCancel() {}
              });
            }
          } else {
            this.$message.warning(res.message);
          }
          this.pagination.current = 1;
          this.pagination.defaultPageSize = 12;
          this.getProgramData(this.groupOwnerId, this.groupType);
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
    isArrayEquar(a, b) {
      // 判断数组的长度
      if (a.length !== b.length) {
        return false;
      } else {
        // 循环遍历数组的值进行比较
        for (let i = 0; i < a.length; i++) {
          if (a[i].shareUserAccount !== b[i].shareUserAccount) {
            return false;
          }
        }
        return true;
      }
    },
    handleEditTemplateOk() {
      this.confirmTemplateLoading = true;
      this.templateForm.validateFields((err, values) => {
        if (!err) {
          let params = {
            programId: this.programFormData.programId,
            programName: values.programName,
            programParentId: this.programFormData.groupId,
            isProgram: 1,
            groupType: this.programFormData.groupType
              ? this.programFormData.groupType
              : "defined",
            syncInfo: false
          };
          if (
            this.programFormData.programLimitType === 0 ||
            this.programFormData.programLimitType === 1
          ) {
            this.editProgramCommon(params, 1);
          } else {
            this.editProgramCommon(params);
          }
        }
      });
    },
    editProgramCommon(params, count) {
      let _this = this;
      editMenuInfo(params)
        .then(res => {
          this.confirmTemplateLoading = false;
          if (res.success) {
            this.editTemplateVisible = false;
            this.$message.success(count===2?"更新成功！":"编辑成功！");
            if (count === 1) {
              this.editTemplateVisible = false;
              this.$confirm({
                content: "节目内容已更新，是否同步更新共享节目内容？",
                icon: "",
                okText: "更新",
                onOk() {
                  return new Promise((resolve, reject) => {
                    params.syncInfo = true;
                    _this.editProgramCommon(params,2);
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                  }).catch(() => console.log("Oops errors!"));
                },
                cancelText: "不更新",
                onCancel() {
                  //this.$confirm.destroyAll();
                }
              });
            }
          } else {
            this.$message.warning(res.message);
          }
          this.getProgramTree(
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
    },
    handleEditTemplateCancel() {
      this.editTemplateVisible = false;
      this.confirmTemplateLoading = false;
    },
    handleShareOk() {
      let list = [];
      if (this.shareForm.shareUserType === 0) {
        if (this.shareForm.shareAccountList.length === 0) {
          this.$message.warning("请添加账号");
          return;
        }
        this.shareForm.shareAccountList.map(item => {
          list.push({
            shareUserName: item.shareUserName,
            shareUserAccount: item.shareUserAccount
          });
        });
      }
      this.shareLoading = true;
      if (this.shareForm.shareUserType === 0) {
        console.log('去除以下判断')
        // if (
        //   this.oldShareData.shareUserType === this.shareForm.shareUserType &&
        //   this.isArrayEquar(this.oldShareData.shareAccountList, list)
        // ) {
        //   this.shareLoading = false;
        //   this.shareVisible = false;
        //   return;
        // }
      } else {
        if (this.oldShareData.shareUserType === this.shareForm.shareUserType) {
          this.shareLoading = false;
          this.shareVisible = false;
          return;
        }
      }
      settingProgramShare({
        programId: this.shareForm.programId,
        shareAccounts: list,
        shareType: this.shareForm.shareUserType
      })
        .then(res => {
          if (res.success) {
            this.$message.success("共享设置成功！");
            this.shareLoading = false;
            this.shareVisible = false;
            this.getProgramData(this.groupOwnerId, this.groupType);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(error => {
          this.shareLoading = false;
          console.log(error);
        });
    },
    handleShareCancel() {
      this.shareVisible = false;
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
      this.contentStyle = contentStyle;
    },
    setWrapperStyle(styleObj) {
      let style = "";
      if (styleObj.posx) {
        style += `left: ${styleObj.posx}px;`;
      }

      if (styleObj.posy) {
        style += `top: ${styleObj.posy}px;`;
      }

      if (styleObj.z || styleObj.z === 0) {
        style += `z-index: ${styleObj.z};`;
      }

      if (styleObj.width) {
        style += `width: ${styleObj.width}px;`;
      }

      if (styleObj.height) {
        style += `height:  ${styleObj.height}px;`;
      }
      //console.log(style);
      return style;
    },
    async getProgramPageInfo(sourceType) {
      if (!this.pageId) return;
      this.waitToInterval = {};
      this.websocketList = [];
      let response = null;
      this.fullScreenLoading = true;
      try {
        response = await programDetail({
          programId: this.pageId,
          sourceType: this.groupType==='share'?'share':sourceType
        });
        this.fullScreenLoading = false;
        const { data } = response;
        if (!data) {
          this.$router.push({ path: "/404" });
          return;
        }
        const assemblyList = (
          this.jsonException(data.programTemplateMaterialConfig) || []
        ).map((item, index) => {
          const { component, dataConfig } = item.option;
          if (this.isComponent) {
            component.width = window.innerWidth - 100;
            component.height = window.innerHeight - 100;
          }
          if (dataConfig) {
            const { interval, dataSourceCheckId, dataSourceDictId, wsUrl } =
              dataConfig.dataSource || {};
            if (
              interval &&
              (dataSourceCheckId == 2 ||
                (dataSourceCheckId == 0 && dataSourceDictId <= 2))
            ) {
              this.waitToInterval[interval] = this.waitToInterval[interval]
                ? [...this.waitToInterval[interval], { dataConfig, index }]
                : [{ dataConfig, index }];
            } else if (dataSourceCheckId === 3 && wsUrl) {
              const websocket = new WebSocketService(
                wsUrl,
                this.updateWsRecord,
                index
              );
              dataConfig.dataSource.data = [];

              this.websocketList.push({ websocket, dataConfig, index });
            }
          }
          return {
            ...item,
            wrapperStyle: this.setWrapperStyle(component)
          };
        });
        const pageOption = this.jsonException(data.programConfig)[0] || null;
        console.log(assemblyList);
        this.$set(this, "pageOption", pageOption);
        this.$set(this, "list1", assemblyList);
        pageOption && this.setBgStyle(pageOption);
        // if (data.programName) {
        //   document.title = data.programName || data.assemblyName;
        // }

        // 开启定时器
        Object.keys(this.waitToInterval || {}).forEach(interval => {
          this.startInterval(interval);
        });

        // 先清空websocket组件的默认数据
        this.websocketList.forEach(wsCmp => {
          this.setOptionData(
            wsCmp.index,
            this.transformData(wsCmp.dataConfig.dataMap, [])
          );
        });
      } catch {
        this.fullScreenLoading = false;
      }
    },
    async getTempaltePageInfo() {
      if (!this.templateId) return;
      this.waitToInterval = {};
      this.websocketList = [];
      let response = null;
      this.fullScreenLoading = true;
      try {
        response = await templateDetail({
          templateId: this.templateId,
          groupType: this.pageGropType
        });
        this.fullScreenLoading = false;
        const { data } = response;
        if (!data) {
          this.$router.push({ path: "/404" });
          return;
        }
        const assemblyList = (
          this.jsonException(data.materialsConfig) || []
        ).map((item, index) => {
          const { component, dataConfig } = item.option;
          if (this.isComponent) {
            component.width = window.innerWidth - 100;
            component.height = window.innerHeight - 100;
          }
          if (dataConfig) {
            const { interval, dataSourceCheckId, dataSourceDictId, wsUrl } =
              dataConfig.dataSource || {};
            if (
              interval &&
              (dataSourceCheckId == 2 ||
                (dataSourceCheckId == 0 && dataSourceDictId <= 2))
            ) {
              this.waitToInterval[interval] = this.waitToInterval[interval]
                ? [...this.waitToInterval[interval], { dataConfig, index }]
                : [{ dataConfig, index }];
            } else if (dataSourceCheckId === 3 && wsUrl) {
              const websocket = new WebSocketService(
                wsUrl,
                this.updateWsRecord,
                index
              );
              dataConfig.dataSource.data = [];

              this.websocketList.push({ websocket, dataConfig, index });
            }
          }
          return {
            ...item,
            wrapperStyle: this.setWrapperStyle(component)
          };
        });
        const pageOption = this.jsonException(data.templateConfig)[0] || null;
        console.log(assemblyList);
        this.$set(this, "pageOption", pageOption);
        this.$set(this, "list1", assemblyList);
        pageOption && this.setBgStyle(pageOption);
        // if (data.programName) {
        //   document.title = data.programName || data.assemblyName;
        // }

        // 开启定时器
        Object.keys(this.waitToInterval || {}).forEach(interval => {
          this.startInterval(interval);
        });

        // 先清空websocket组件的默认数据
        this.websocketList.forEach(wsCmp => {
          this.setOptionData(
            wsCmp.index,
            this.transformData(wsCmp.dataConfig.dataMap, [])
          );
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
      console.log("resize");
      let _this = this;
      if (_this.resizeTimer) {
        clearTimeout(_this.resizeTimer);
      }
      _this.resizeTimer = setTimeout(() => {
        if (!document.fullscreenElement) {
          this.list1 = [];
        }
        console.log("resize");
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
    collapseProgram() {
      this.collapseRight = !this.collapseRight;
    },
    async shareAccountInfo() {
      // let accountName = this.$store.state.user.userName;
      const { data } = await getShareAccountInfo(this.shareAccount);
      if (data) {
        this.shareForm.shareAccountList.push({
          id: uuid(),
          shareUserName: data.shareUserName,
          shareUserAccount: data.shareUserAccount
        });
        this.shareAccount = "";
      }
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