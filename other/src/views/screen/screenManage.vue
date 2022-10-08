<template>
  <div class="main">
    <div class="top">
      <span class="page-title">屏幕管理</span>
      <!-- <span class="remind-title"></span> -->
      <span class="opationBtn">
        <button class="flag-btn" @click="flagBtn">
          <img :src="flagIcon" />
          <span style="padding-left:6px;">标识</span>
        </button>
        <a-button icon="play-circle" class="all-play-btn" @click="allPlay">全部播放</a-button>
        <!-- <a-button @click="playModal">测试按钮</a-button> -->
      </span>
    </div>

    <div class="content">
      <div class="screen-list">
        <a-table
          ref="table"
          class="define-table"
          rowKey="identifyID"
          :locale="tablenodata"
          :showHeader="false"
          :columns="columns"
          :data-source="screenData"
          :pagination="false"
        >
          <template slot="identifyID" slot-scope="text , record">
            <div class="screen-frame">
              <div
                class="screen-pic"
                v-if="!record.isLimit"
                @mouseenter="enter(record)"
                @mouseleave="leave(record)"
              >
                <img :src="record.snapshot" class="bg-pic" />
                <div class="hover-modal" v-if="record.isHover">
                  <div class="hover-content">
                    <p class="hover-title">播放频道：</p>
                    <p class="hover-info">{{record.channelName}}</p>
                    <div class="other-info">
                      <p>
                        <span class="hover-title">屏幕分辨率：</span>
                        <span>{{record.dmPelsWidth}}*{{record.dmPerlsHeight}}</span>
                      </p>
                      <p>
                        <span class="hover-title">品牌：</span>
                        <span>{{record.brandName}}</span>
                      </p>
                      <p class="remark">
                        <span class="hover-title">备注：</span>
                        <span>{{record.remark}}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="screen-no-data" v-if="!record.isHover&&!record.snapshot">
                  <div class="screen-no-data-pic" :style="{backgroundImage:'url('+pdBgIcon+')'}"></div>
                  <div class="screen-no-data-font">暂无频道信息</div>
                </div>
              </div>
              <div class="screen-pic" v-else>
                <div class="no-use">
                  <div>
                    <img :src="limitIcon" />
                  </div>
                  <div
                    style="font-size: 14px;color: #00FCFF;text-align: center;"
                  >超出设备限制，请联系销售经理购买增加显示设备！</div>
                </div>
              </div>
              <div class="screen-name">
                <span class="screen-name-font">
                  <a-tooltip placement="bottom" :title="record.monitorName">{{record.monitorName}}</a-tooltip>
                </span>
                <span style="float:right;" v-if="!record.isLimit">
                  <a-tooltip title="播放" placement="bottom">
                    <span class="screen-play-icon" @click="playScreen(record)" />
                  </a-tooltip>
                  <a-tooltip title="选择频道" placement="bottom">
                    <span class="screen-channel-icon" @click="playModal(record)" />
                  </a-tooltip>
                  <a-tooltip title="编辑" placement="bottom">
                    <span class="screen-edit-icon" @click="editModal(record)" />
                  </a-tooltip>
                </span>
              </div>
            </div>
          </template>
        </a-table>
      </div>
    </div>

    <div v-show="loading" class="loading-wrap">
      <div class="loading-box">
        <a-spin />
      </div>
    </div>

    <a-modal
      class="define-modal"
      title="屏幕编辑"
      :visible="editVisible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item>
          <label class="form-item-title">
            <span style="color:#c32c2c;">*</span>屏幕名称:
          </label>
          <a-input
            class="define-input"
            placeholder="请输入屏幕名称，1-100字"
            v-decorator="['screenForm.name', { 
                     initialValue:screenForm.name,
                     rules: [{required:true,message:'请填写名称'},{max:100,message:'不能超过100个字符!'}] 
                   }]"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <label class="form-item-title">备注:</label>
          <a-input
            class="define-input"
            placeholder="请输入备注信息，1-100字"
            autocomplete
            v-decorator="['screenForm.remark', { 
                     initialValue:screenForm.remark,
                     rules: [{required:false,message:'请输入备注信息'},{max:100,message:'不能超过100个字符!'}] 
                   }]"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      title="选择频道"
      class="define-modal"
      :width="856"
      :visible="channelVisible"
      on-ok="handleChooseOk"
      @cancel="handleChooseCancel"
      :bodyStyle="{minHeight:'300px',maxHeight:'600px',overflowY:'auto'}"
    >
      <template slot="footer">
        <a-button key="back" @click="handleChooseCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="confirmLoading2" @click="handleChooseOk">确认</a-button>
      </template>
      <a-row :gutter="24" style="padding:2px 0;">
        <a-col :span="12">
          <a-tree-select
            :dropdownClassName="'define-tree-select'"
            v-model="value"
            show-search
            style="float:left;width: 65%"
            :tree-data="groupData"
            :replaceFields="replaceTreeFields"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="分组筛选"
            :allowClear="true"
            tree-default-expand-all
            @change="treeChange"
            @select="treeSelect"
          ></a-tree-select>
        </a-col>
        <a-col :span="12">
          <a-input-search
            v-model="searchTxt"
            style="float:right;width:252px;"
            placeholder="请输入搜索关键词"
            class="define-search"
            @search="onSearch"
            @input="onInput"
            :maxLength="50"
          />
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-spin class="loading" v-if="spinning"></a-spin>
          <a-table
            ref="table"
            class="define-modal-table"
            rowKey="id"
            :locale="tablenodata"
            :showHeader="false"
            :columns="channelColumns"
            :data-source="channelData"
            :pagination="pagination"
            @change="handleTableChange"
          >
            <template slot="id" slot-scope="text , record">
              <div class="choose-modal">
                <div class="choose-list" :key="record.id">
                  <div class="choose-pic" @mouseenter="enter(record)" @mouseleave="leave(record)">
                    <img :src="record.channelSnapshot" class="bg-pic" />
                    <div class="hover-modal" v-if="record.isHover">
                      <div class="hover-content">
                        <span class="top-icon copy-btn" @click="showCopyModal(record)">频道链接</span>
                      </div>
                    </div>
                  </div>
                  <div class="choose-info">
                    <span class="choose-name">
                      <a-tooltip :title="record.channelName">{{record.channelName}}</a-tooltip>
                    </span>
                    <span>
                      <a-checkbox
                        class="define-checkbox"
                        :checked="record.checked"
                        @change="onChooseChange($event,record)"
                      ></a-checkbox>
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-modal>

    <a-modal
      title="链接"
      class="define-modal"
      :dialogStyle="{marginTop:'10%'}"
      :width="600"
      :visible="linkVisible"
      @cancel="handleLinkCancel"
      :footer="null"
    >
      <a-input disabled v-model="shareLink" class="copy-link-input">
        <span class="link-btns" slot="addonAfter">
          <a-tooltip title="复制">
            <span class="top-icon copy-link" @click="copyLink"></span>
          </a-tooltip>
        </span>
      </a-input>
    </a-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
import * as uuid from "uuid/v1";
import flagIcon from "@/assets/images/flag.png";
import pdBgIcon from "@/assets/images/pindao_bg.png";
import limitIcon from "@/assets/images/limit.png";
import {
  getChannelList,
  getChannelAllGroupInfo,
  channelDetail,
  channelDetailBatch
} from "@/api/channel";
import { getMtvLimitInfo } from "@/api/login";
export default {
  name: "screenManage",
  components: {},
  data() {
    return {
      flagIcon,
      pdBgIcon,
      limitIcon,
      shareLink: "",
      linkVisible: false,
      editVisible: false,
      confirmLoading: false,
      confirmLoading2: false,
      form: this.$form.createForm(this, { name: "form" }),
      screenForm: {
        id: "",
        name: "",
        remark: ""
      },
      loading: false,
      replaceTreeFields: {
        key: "unqiId",
        children: "children",
        title: "channelName",
        value: "id"
      },
      channelVisible: false,
      treeExpandedKeys: [],
      value: undefined,
      treeData: [],
      pagination: {
        current: 1,
        defaultPageSize: 6,
        showQuickJumper: true,
        showSizeChanger: false,
        total: 0,
        showTotal: total => `共${total}条`,
        onShowSizeChange: (current, pageSize) => {
          this.table.pageSize = pageSize;
          this.table.pageNumber = 1;
        }
      },
      spinning: false,
      searchKeys: "",
      groupData: [],
      chooseList: [],
      channelId: null,
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
      screenData: [],
      columns: [
        {
          title: "屏幕数据",
          dataIndex: "identifyID",
          key: "identifyID",
          scopedSlots: { customRender: "identifyID" }
        }
      ],
      currentScreenData: null,
      channelData: [],
      channelColumns: [
        {
          title: "频道数据",
          dataIndex: "id",
          key: "id",
          scopedSlots: { customRender: "id" }
        }
      ],
      searchTxt: "",
      channelGroupType: "all",
      machineLimit: 0
    };
  },
  // computed: {
  //   ...mapState({
  //     mtvMachineLimit: state => state.mtvMachineLimit
  //   })
  // },
  created() {
    let token = window.getTokenValue();
    //console.log(token);
    window.sessionStorage.setItem("token", token);
    Cookies.set("unify_user", token);
    /**
     * 页面禁用拖拽上传时 浏览器默认打开图片
     */
    document.addEventListener(
      "drop",
      function(e) {
        e.preventDefault();
      },
      false
    );
    document.addEventListener(
      "dragover",
      function(e) {
        e.preventDefault();
      },
      false
    );
  },
  mounted() {
    this.getScreenData();
    this.getAllGroupData();
  },
  methods: {
    showCopyModal(data) {
      this.shareLink =
        "https://client.mysteel.com/mtv_ui/show.html#show/" +
        data.id +
        "?id=" +
        window.sessionStorage.getItem("token");
      this.linkVisible = true;
    },
    copyLink() {
      this.$copyAction(this.shareLink);
    },
    handleLinkCancel() {
      this.linkVisible = false;
    },
    flagBtn() {
      if (this.screenData.length) {
        this.screenData.map(item => {
          let monitorName = encodeURIComponent(item.monitorName);
          console.log(monitorName);
          window.CheckMonitor(
            item.identifyID,
            "https://client.mysteel.com/mtv_ui/flag.html?flag=1&name=" +
              monitorName
          );
        });
      }
      // this.$message.warnin(
      //   "当前勾选的频道节目分辨率与显示器分辨率不一致，播放效果可能不理想，请尽量选择与屏幕分辨率一致的频道节目内容"
      // );
    },
    async getScreenData() {
      let _this = this;
      this.loading = true;
      setTimeout(function(){
        _this.loading = false;
      },6 * 1000);
      try {
        console.log("22222", window.getLoginInfo());
        let userInfo = JSON.parse(window.getLoginInfo());
        let strUser = userInfo.data.userName;
        let res = await window.getMonitorInfo();
        let config = await window.getMonitorConfig();
        let dataList = JSON.parse(config).data;
        console.log("11111", dataList);
        setTimeout(function() {
          _this.loading = false;
        }, 10000);
        if (dataList) {
          let filterData = dataList.filter(item => item.userName === strUser);
          if (filterData && filterData.length) {
            let resDatas = filterData[0].monitorConfig;
            let channelList = [];
            let idList = [];
            console.log("resDatas", resDatas);
            resDatas.map(item => {
              idList.push({
                identifyID: item.identifyID,
                monitorName: item.monitorName ? item.monitorName : "",
                strRemark: item.strRemark ? item.strRemark : "",
                channelID: item.channelID ? item.channelID : ""
              });
              if (item.channelID) {
                channelList.push({
                  uuid: item.identifyID,
                  channelId: item.channelID
                });
              }
            });
            const { data } = await channelDetailBatch(channelList);
            let snapshotList = [];
            if (data && data.length) {
              data.map(item => {
                let identifyID = item.uuid;
                let resFilterData = idList.filter(
                  res => res.identifyID === identifyID
                );
                if (resFilterData.length) {
                  snapshotList.push({
                    identifyID: resFilterData[0].identifyID,
                    monitorName: resFilterData[0].monitorName,
                    strRemark: resFilterData[0].strRemark,
                    channelID: item.id,
                    channelName: item.channelName,
                    channelSnapshot: item.channelSnapshot
                      ? item.channelSnapshot
                      : ""
                  });
                }
              });
              let response = JSON.parse(res);
              console.log("snapshotList", snapshotList);
              if (response.success) {
                let resDatas = response.data;
                if (resDatas && resDatas.length) {
                  if (idList.length) {
                    resDatas.map(item => {
                      let filterData = idList.filter(
                        res => res.identifyID === item.identifyID
                      );
                      if (filterData && filterData.length) {
                        if (filterData[0].monitorName) {
                          item.monitorName = filterData[0].monitorName;
                        }
                        item.channelID = filterData[0].channelID;
                        item.remark = filterData[0].strRemark;
                      }
                    });
                  }
                  resDatas.map(item => {
                    if (item.monitorName.indexOf("unknow") > -1) {
                      item.monitorName = item.monitorName.replace(
                        "unknow",
                        "显示器"
                      );
                    }
                    if (item.brandName.indexOf("unknow") > -1) {
                      item.brandName = item.brandName.replace(
                        "unknow",
                        "未知厂商"
                      );
                    }
                    if (snapshotList) {
                      let snapshot = snapshotList.filter(
                        imgRes => imgRes.channelID === item.channelID
                      );
                      if (snapshot && snapshot[0]) {
                        item.snapshot = snapshot[0].channelSnapshot;
                      }

                      let snapshotTwo = snapshotList.filter(
                        imgRes => imgRes.identifyID === item.identifyID
                      );
                      if (snapshotTwo && snapshotTwo[0]) {
                        if (snapshotTwo[0].monitorName) {
                          item.monitorName = snapshotTwo[0].monitorName;
                        }
                        if (snapshotTwo[0].strRemark) {
                          item.remark = snapshotTwo[0].strRemark;
                        }
                        item.channelID = snapshotTwo[0].channelID;
                        item.channelName = snapshotTwo[0].channelName;
                      }
                    }
                    item.isHover = false;
                  });
                }
                const { data } = await getMtvLimitInfo(
                  this.$store.state.user.userName
                );
                if (data) {
                  if (resDatas && resDatas.length) {
                    let limit = data.mtvMachineLimit ? data.mtvMachineLimit : 0;
                    this.machineLimit = limit;
                    resDatas.map((item, i) => {
                      if (i > Number(limit) - 1) {
                        item.isLimit = true;
                      } else {
                        item.isLimit = false;
                      }
                    });
                  }
                }
                this.screenData = resDatas;
              } else {
                this.$message.warning(response.message);
              }
            } else {
              let response = JSON.parse(res);
              this.loading = false;
              if (response.success) {
                let resDatas = response.data;
                if (resDatas && resDatas.length) {
                  if (idList.length) {
                    resDatas.map(item => {
                      let filterData = idList.filter(
                        res => res.identifyID === item.identifyID
                      );
                      if (filterData && filterData.length) {
                        item.monitorName = filterData[0].monitorName;
                        item.remark = filterData[0].strRemark;
                      }
                    });
                  }
                  resDatas.map(item => {
                    if (item.monitorName.indexOf("unknow") > -1) {
                      item.monitorName = item.monitorName.replace(
                        "unknow",
                        "显示器"
                      );
                    }
                    if (item.brandName.indexOf("unknow") > -1) {
                      item.brandName = item.brandName.replace(
                        "unknow",
                        "未知厂商"
                      );
                    }
                    let filterDatas = idList.filter(
                      idRes => idRes.identifyID === item.identifyID
                    );
                    if (filterDatas && filterDatas.length) {
                      item.remark = filterDatas[0].strRemark;
                      item.monitorName = filterDatas[0].monitorName;
                    }
                    item.isHover = false;
                  });
                }
                const { data } = await getMtvLimitInfo(
                  this.$store.state.user.userName
                );
                if (data) {
                  if (resDatas && resDatas.length) {
                    let limit = data.mtvMachineLimit ? data.mtvMachineLimit : 0;
                    this.machineLimit = limit;
                    resDatas.map((item, i) => {
                      if (i > Number(limit) - 1) {
                        item.isLimit = true;
                      } else {
                        item.isLimit = false;
                      }
                    });
                  }
                }
                this.screenData = resDatas;
              } else {
                this.$message.warning(response.message);
              }
            }
            this.loading = false;
          } else {
            let response = JSON.parse(res);
            this.loading = false;
            if (response.success) {
              let resDatas = response.data;
              if (resDatas && resDatas.length) {
                resDatas.map(item => {
                  if (item.monitorName.indexOf("unknow") > -1) {
                    item.monitorName = item.monitorName.replace(
                      "unknow",
                      "显示器"
                    );
                  }
                  if (item.brandName.indexOf("unknow") > -1) {
                    item.brandName = item.brandName.replace(
                      "unknow",
                      "未知厂商"
                    );
                  }
                  item.isHover = false;
                });
              }
              const { data } = await getMtvLimitInfo(
                this.$store.state.user.userName
              );
              if (data) {
                if (resDatas && resDatas.length) {
                  let limit = data.mtvMachineLimit ? data.mtvMachineLimit : 0;
                  this.machineLimit = limit;
                  resDatas.map((item, i) => {
                    if (i > Number(limit) - 1) {
                      item.isLimit = true;
                    } else {
                      item.isLimit = false;
                    }
                  });
                }
              }
              this.screenData = resDatas;
            } else {
              this.$message.warning(response.message);
            }
          }
        } else {
          let response = JSON.parse(res);
          this.loading = false;
          if (response.success) {
            let resDatas = response.data;
            if (resDatas && resDatas.length) {
              resDatas.map(item => {
                if (item.monitorName.indexOf("unknow") > -1) {
                  item.monitorName = item.monitorName.replace(
                    "unknow",
                    "显示器"
                  );
                }
                if (item.brandName.indexOf("unknow") > -1) {
                  item.brandName = item.brandName.replace("unknow", "未知厂商");
                }
                item.isHover = false;
              });
            }
            const { data } = await getMtvLimitInfo(
              this.$store.state.user.userName
            );
            if (data) {
              if (resDatas && resDatas.length) {
                let limit = data.mtvMachineLimit ? data.mtvMachineLimit : 0;
                this.machineLimit = limit;
                resDatas.map((item, i) => {
                  if (i > Number(limit) - 1) {
                    item.isLimit = true;
                  } else {
                    item.isLimit = false;
                  }
                });
              }
            }
            this.screenData = resDatas;
          } else {
            this.$message.warning(response.message);
          }
        }
        console.log("screenData", this.screenData);
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    getAllGroupData() {
      getChannelAllGroupInfo()
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              let resDatas = res.data;
              for (let i = 0; i < resDatas.length; i++) {
                if (resDatas[i].sourceType === "ungroup") {
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
    enter(item) {
      item.isHover = true;
    },
    leave(item) {
      item.isHover = false;
    },
    editModal(data) {
      console.log(data);
      this.form.resetFields();
      this.currentScreenData = data;
      this.screenForm.id = data.identifyID;
      this.screenForm.name = data.monitorName;
      this.screenForm.remark = data.remark;
      this.editVisible = true;
    },
    playModal(data) {
      this.value = undefined;
      this.currentScreenData = data;
      this.channelVisible = true;
      this.getChannelData(999999, "all");
    },
    allPlay() {
      let _this = this;
      let limit = this.machineLimit;
      if (this.screenData.length) {
        this.screenData.map((item,i) => {
          if (i <= Number(limit) - 1) {
            setTimeout(function() {
              _this.playScreen(item);
            }, 800);
          }
        });
      }
    },
    async playScreen(resData) {
      let userInfo = JSON.parse(window.getLoginInfo());
      let strUser = userInfo.data.userName;
      let config = JSON.parse(window.getMonitorConfig());
      if (config) {
        if (config.data) {
          let res = config.data.filter(item => item.userName === strUser);
          if (res[0] && res[0].monitorConfig) {
            let monitorConfig = res[0].monitorConfig.filter(
              item => item.identifyID === resData.identifyID
            );
            console.log("*******", monitorConfig);
            if (monitorConfig && monitorConfig.length) {
              if (monitorConfig[0].channelID) {
                this.loading = true;
                const { data } = await channelDetail({
                  channelId: monitorConfig[0].channelID
                });
                this.loading = false;
                if (data.id && data.channelName) {
                  window.playMedia(
                    resData.identifyID,
                    "https://client.mysteel.com/mtv_ui/show.html#show/" +
                      monitorConfig[0].channelID +
                      "?id=" +
                      window.sessionStorage.getItem("token")
                  );
                } else {
                  this.$message.warning("请选择频道！");
                }
              } else {
                this.$message.warning("请选择频道！");
              }
            } else {
              this.$message.warning("请选择频道！");
            }
          } else {
            this.$message.warning("请选择频道！");
          }
        } else {
          this.$message.warning("请选择频道！");
        }
      } else {
        this.$message.warning("请选择频道！");
      }
    },
    handleCancel() {
      this.editVisible = false;
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true;
          console.log(values);
          let userInfo = JSON.parse(window.getLoginInfo());
          let strUser = userInfo.data.userName;
          let id = this.currentScreenData.identifyID;
          let brandName = this.currentScreenData.brandName;
          let monitorName = values.screenForm.name;
          window.saveMonitorConfig(
            strUser,
            id,
            brandName,
            monitorName,
            values.screenForm.remark
          );
          this.$message.success("编辑成功！");
          this.confirmLoading = false;
          this.editVisible = false;
          this.getScreenData();
        }
      });
    },
    handleChooseOk() {
      let data = this.channelData.filter(item => item.checked);
      let userInfo = JSON.parse(window.getLoginInfo());
      let strUser = userInfo.data.userName;
      let id = this.currentScreenData.identifyID;
      let channelID = data && data.length ? Number(data[0].id) : 0;
      window.saveMonitorChannel(strUser, id, channelID);
      this.channelVisible = false;
      this.$message.success("选择成功！");
      this.getScreenData();
    },
    handleChooseCancel() {
      this.channelVisible = false;
    },
    treeChange(e) {
      if (!e) {
        this.value = e;
        this.pagination.current = 1;
        this.pagination.defaultPageSize = 6;
        this.getChannelData(999999, "all");
      }
    },
    treeSelect(e, data) {
      console.log(e, data);
      this.value = e;
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 6;
      this.channelGroupType = data.dataRef.sourceType;
      this.getChannelData(e, data.dataRef.sourceType);
    },
    onSearch(e) {
      this.searchTxt = e;
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 6;
      if (this.value) {
        this.getChannelData(this.value, this.channelGroupType);
      } else {
        this.getChannelData(999999, "all");
      }
    },
    onInput(e) {
      let val = e.target.value;
      if (val.trim() === "") {
        this.searchTxt = "";
        this.pagination.current = 1;
        this.pagination.defaultPageSize = 6;
        if (this.value) {
          this.getChannelData(this.value, this.channelGroupType);
        } else {
          this.getChannelData(999999, "all");
        }
      }
    },
    onChannge(e) {
      console.log(e);
      this.channelId = e;
      this.chooseList.map(item => {
        if (item.id === e.id) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      this.$forceUpdate();
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    onChooseChange(e, res) {
      let data = this.deepClone(this.channelData);
      this.channelData.map(item => {
        item.checked = false;
      });
      data.map(item => {
        if (item.id === res.id) {
          item.checked = !item.checked;
        } else {
          item.checked = false;
        }
      });
      this.channelData = this.deepClone(data);
      this.$forceUpdate();
    },
    getChannelData(id, type) {
      let params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.defaultPageSize,
        groupOwnerId: id ? id : "999999",
        namePrefix: this.searchTxt,
        groupType: type ? type : "all"
      };
      this.spinning = true;
      getChannelList(params)
        .then(res => {
          this.loading = false;
          this.spinning = false;
          if (res.success) {
            if (res.data && res.data.list) {
              res.data.list.map(item => {
                console.log(this.currentScreenData.channelID === item.id);
                if (this.currentScreenData.channelID === item.id) {
                  item.checked = true;
                }
                item.isHover = false;
              });
            }
            this.pagination.total = res.data.total || 0;
            this.channelData = res.data.list;
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
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getChannelData(this.value, this.channelGroupType);
    }
  },
  // watch: {
  //   mtvMachineLimit(val) {
  //     this.machineLimit = val;
  //   }
  // }
};
</script>
<style lang="scss">
@import "@/styles/common.scss";
</style>
<style lang="scss" scoped>
@import "./index.scss";
</style>