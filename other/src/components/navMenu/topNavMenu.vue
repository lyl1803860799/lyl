<template>
  <div class="top-main">
    <span class="title">
      <img :src="logoIcon" />
    </span>
    <div
      class="move-area"
      @mousedown="dragdown($event)"
      @mousemove="dragmove($event)"
      @mouseup="dragup($event)"
      @mouseout="dragout($event)"
    ></div>
    <div class="user-info">
      <span class="user-icon">
        <img :src="photoIcon" />
      </span>
      <a-dropdown
        :overlayClassName="'a-dropdown-define'"
        style="float:left;"
        @visibleChange="dropDownChange"
      >
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <span class="user-name">{{userInfo.accountName}}</span>
          <a-icon type="down" class="down-icon" v-if="dropFlag" />
          <a-icon type="up" class="down-icon" v-if="!dropFlag" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item class="define-dropdown-person" key="1" @click="personCenter">
            <img :src="editIcon" />
            <span style="margin-left:6px;">账号信息</span>
          </a-menu-item>
          <!-- <a-menu-item key="2" @click="personCenter">
            <span>修改密码</span>
          </a-menu-item>-->
          <a-menu-item class="define-dropdown-person" key="3" @click="loginOut">
            <img :src="exitIcon" />
            <span style="margin-left:6px;">退出系统</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <span class="user-status" v-if="userInfo.accountStatus == 0">锁定</span>
      <span class="user-status" v-if="userInfo.accountStatus == 1">试用</span>
      <span class="user-status" v-if="userInfo.accountStatus == 2">内部员工</span>
      <span class="user-status" v-if="userInfo.accountStatus == 9">正式</span>
      <span class="split-line"></span>
      <span>
        <img :src="minIcon" class="min-btn" :style="{background:colorFlag?'#092F48':''}" @click="windowChange('min')" />
        <img
          :src="widowSizeType==='max'?windowIcon:maxIcon"
          class="max-btn"
          :style="{background:colorFlag2?'#092F48':''}"
          @click="windowChange('sizeChang')"
        />
        <img :src="clsoeIcon" class="close-btn" :style="{background:colorFlag3?'#092F48':''}" @click="windowChange('close')" />
      </span>
    </div>

    <a-modal
      class="define-modal"
      title="个人中心"
      :visible="visible"
      :footer="null"
      :width="800"
      @cancel="handleCancel"
    >
      <div class="left-menu" :style="{height:type==='2'?'410px':'100%'}">
        <a-menu class="define-menu" v-model="current" mode="vertical">
          <a-menu-item key="1" @click="selectItem('1')">
            <span>账户信息</span>
          </a-menu-item>
          <!-- <a-menu-item key="2" @click="selectItem('2')">
            <span>修改密码</span>
          </a-menu-item>-->
          <a-menu-item key="3" @click="selectItem('3')">
            <span>关于MTV</span>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="person-data" v-if="type==='1'">
        <p class="person-title">
          <img :src="arrowIcon" class />
          <span>基本信息</span>
        </p>
        <a-row>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">用户名：</label>
              <span class="person-info">
                <a-tooltip
                  placement="bottomLeft"
                  :title="userInfo.accountName"
                >{{userInfo.accountName}}</a-tooltip>
              </span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">状态：</label>
              <span class="person-info" v-if="userInfo.accountStatus == 0">
                <a-tooltip placement="bottomLeft" :title="'锁定（还有'+userInfo.days+'天到期）'">
                  锁定（还有
                  <font style="color:#c32c2c;">{{userInfo.days}}</font>天到期）
                </a-tooltip>
              </span>
              <span class="person-info" v-if="userInfo.accountStatus == 1">
                <a-tooltip placement="bottomLeft" :title="'试用（还有'+userInfo.days+'天到期）'">
                  试用（还有
                  <font style="color:#c32c2c;">{{userInfo.days}}</font>天到期）
                </a-tooltip>
              </span>
              <span class="person-info" v-if="userInfo.accountStatus == 2">
                <a-tooltip placement="bottomLeft" :title="'内部员工（还有'+userInfo.days+'天到期）'">
                  内部员工（还有
                  <font style="color:#c32c2c;">{{userInfo.days}}</font>天到期）
                </a-tooltip>
              </span>
              <span class="person-info" v-if="userInfo.accountStatus == 9">
                <a-tooltip placement="bottomLeft" :title="'正式（还有'+userInfo.days+'天到期）'">
                  正式（还有
                  <font style="color:#c32c2c;">{{userInfo.days}}</font>天到期）
                </a-tooltip>
              </span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">设备数：</label>
              <span class="person-info">
                <a-tooltip
                  placement="bottomLeft"
                  :title="mtvMachineLimit+'（最大绑定数）'"
                >{{mtvMachineLimit}}（最大绑定数）</a-tooltip>
              </span>
            </div>
          </a-col>
        </a-row>
        <a-row style="margin-top:23px;">
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">客户经理：</label>
              <span class="person-info">
                <a-tooltip
                  placement="bottomLeft"
                  :title="userInfo.managerName"
                >{{userInfo.managerName}}</a-tooltip>
              </span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">电话：</label>
              <span class="person-info">
                <a-tooltip
                  placement="bottomLeft"
                  :title="userInfo.managerMobile"
                >{{userInfo.managerMobile}}</a-tooltip>
              </span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">客服热线：</label>
              <span class="person-info">400-880-2970</span>
            </div>
          </a-col>
        </a-row>
        <p class="person-title" style="margin-top:66px;">
          <img :src="arrowIcon" class />
          <span>用户资料</span>
        </p>
        <a-row>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">姓名：</label>
              <span class="person-info">
                <a-tooltip placement="bottomLeft" :title="userInfo.name">{{userInfo.name}}</a-tooltip>
              </span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">性别：</label>
              <span class="person-info">{{userInfo.sex}}</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">地址：</label>
              <span class="person-info">
                <a-tooltip placement="bottomLeft" :title="userInfo.address">{{userInfo.address}}</a-tooltip>
              </span>
            </div>
          </a-col>
        </a-row>
        <a-row style="margin-top:23px;">
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">邮箱：</label>
              <span class="person-info">
                <a-tooltip placement="bottomLeft" :title="userInfo.email">{{userInfo.email}}</a-tooltip>
              </span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">电话：</label>
              <span class="person-info">{{userInfo.mobile}}</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">QQ：</label>
              <span class="person-info">{{userInfo.qq}}</span>
            </div>
          </a-col>
        </a-row>
        <a-row style="margin-top:23px;">
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">公司：</label>
              <span class="person-info">
                <a-tooltip
                  placement="bottomLeft"
                  :title="userInfo.companyName"
                >{{userInfo.companyName}}</a-tooltip>
              </span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">部门：</label>
              <span class="person-info">
                <a-tooltip
                  placement="bottomLeft"
                  :title="userInfo.department"
                >{{userInfo.department}}</a-tooltip>
              </span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="info-list">
              <label class="data-title">职务：</label>
              <span class="person-info">{{userInfo.post}}</span>
            </div>
          </a-col>
        </a-row>
      </div>
      <!-- <div class="person-data" v-if="type==='2'">
        <div class="pwd-area">
          <a-form :form="form">
            <a-form-item label="原密码" :labelCol="{ span: 24 }">
              <a-input-password
                class="define-input"
                placeholder="请输入原密码"
                autocomplete="off"
                v-decorator="['userForm.oldPwd', { 
                     initialValue:userForm.oldPwd,
                     rules: [{required:true,message:'请输入原密码!'},{max:20,message:'不能超过20个字符!'}] 
                   }]"
              ></a-input-password>
              <img :src="passIcon" style="padding-left:10px;" v-if="pass" />
            </a-form-item>

            <a-form-item
              label="新密码"
              :labelCol="{ span: 24 }"
              style="margin-bottom:14px;margin-top:10px"
            >
              <a-input-password
                class="define-input"
                placeholder="请输入新的登录密码"
                v-decorator="['userForm.newPwd', { 
                     initialValue:userForm.newPwd,
                     rules: [{required:true,message:'请输入新的登录密码!'},{max:20,message:'不能超过20个字符!'}] 
                   }]"
              ></a-input-password>
            </a-form-item>

            <a-form-item style="margin-bottom:10px">
              <a-input-password
                class="define-input"
                placeholder="请再次输入登录密码"
                v-decorator="['userForm.confirmPwd', { 
                     initialValue:userForm.confirmPwd,
                     rules: [{required:true,message:'请再次输入登录密码!'},{max:20,message:'不能超过20个字符!'}] 
                   }]"
              ></a-input-password>
            </a-form-item>

            <p
              style="font-size: 12px;color: #00FCFF;"
            >密码长度8~20位，数字、字母（区分大小写）、特殊字符（~！@#$%^&*().）至少2种。</p>
          </a-form>
        </div>
      </div>-->
      <div class="person-data" v-if="type==='3'">
        <div class="gl-logo">
          <img :src="logoIcon" />
        </div>
        <div class="version">版本信息 V1.2.0</div>
        <div style="text-align:center;">
          <a-button class="check-update-btn">检查版本更新</a-button>
        </div>
        <div class="company-info">
          © 2000-2021 Mysteel.com,All Rights Reserved
          上海钢联电子商务股份有限公司 版权所有
        </div>
      </div>

      <div class="define-footer" v-if="isFooter">
        <span style="float:right;margin-right:16px;">
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button
            key="submit"
            style="margin-left:14px;"
            type="primary"
            :loading="loading"
            @click="handleOk"
          >确定</a-button>
        </span>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import logoIcon from "@/assets/images/logo.png";
import photoIcon from "@/assets/images/photo.png";
import minIcon from "@/assets/images/min.png";
import maxIcon from "@/assets/images/max.png";
import windowIcon from "@/assets/images/window.png";
import editIcon from "@/assets/images/edit.png";
import exitIcon from "@/assets/images/exit.png";
import clsoeIcon from "@/assets/images/close.png";
import arrowIcon from "@/assets/images/arrow.png";
import passIcon from "@/assets/images/pass.png";
import { logout, mtvUserInfo,getMtvLimitInfo, keepAlive } from "@/api/login";
export default {
  name: "topNavMenu",
  components: {},
  data() {
    return {
      dropFlag: true,
      pass: false,
      isFooter: false,
      type: "1",
      current: ["1"],
      visible: false,
      logoIcon,
      editIcon,
      exitIcon,
      photoIcon,
      minIcon,
      maxIcon,
      windowIcon,
      clsoeIcon,
      arrowIcon,
      passIcon,
      colorFlag:false,
      colorFlag2:false,
      colorFlag3:false,
      widowSizeType: "max",
      defaultSelectedKeys: [1],
      aliveInteral: null,
      form: this.$form.createForm(this, { name: "form" }),
      userForm: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      userInfo: {
        accountId: null,
        accountName: "",
        accountStatus: 1,
        address: "",
        companyId: null,
        companyName: "",
        contactsId: null,
        department: "",
        dueTime: null,
        email: "",
        managerId: null,
        managerMobile: "",
        managerName: "",
        mobile: "",
        name: "",
        post: "",
        qq: "",
        sex: "",
        days: ""
      },
      mtvMachineLimit:0,
    };
  },
  mounted() {
    let _this = this;
    _this.getUserInfo();
    if(_this.aliveInteral){
      window.clearInterval(this.aliveInteral);
    }
    _this.aliveInteral = window.setInterval(() => {
      keepAlive()
        .then(res => {
          if(res.code && res.code != "200"){
            if (res.code && res.code == "200014") {
              _this.$message.warning("有新设备登录,当前退出！");
              setTimeout(function() {
                window.loginExit();
              }, 1500);
            }else{
              _this.$message.warning("重新登录！");
              setTimeout(function() {
                window.loginExit();
              }, 1500);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 30 * 1000);
  },
  methods: {
    ...mapActions('user', ['saveLoginInfo']),
    dropDownChange(e) {
      this.dropFlag = !e;
    },
    dragdown(event) {
      mousedown(event);
    },
    dragup(event) {
      mouseup(event);
    },
    dragout(event) {
      mouseout(event);
    },
    dragmove(event) {
      this.widowSizeType = "restore";
      mousemove(event);
    },
    async getUserInfo() {
      const { data } = await mtvUserInfo();
      console.log(data);
      if (data) {
        this.userInfo = data;
        let dueTime = data.dueTime;
        let nowTime = new Date().getTime();
        let days = (dueTime - nowTime) / (24 * 60 * 60 * 1000);
        this.userInfo.days = Math.floor(days);
        this.getMtvUserInfo();
        this.saveLoginInfo(data);
      }
    },
    async getMtvUserInfo(){
      const { data } = await getMtvLimitInfo(this.userInfo.accountName);
      console.log(data);
      if (data) {
        this.mtvMachineLimit = data.mtvMachineLimit;
        this.$store.commit("SET_MTVMACHINELIMIT", data.mtvMachineLimit);
        window.localStorage.setItem('mtvMachineLimit',data.mtvMachineLimit);
      }
    },
    windowChange(type) {
      if (type === "min") {
        this.colorFlag = true;
        this.colorFlag2 = false;
        this.colorFlag3 = false;
        window.winMini();
      } else if (type === "close") {
        this.colorFlag = false;
        this.colorFlag2 = true;
        this.colorFlag3 = false;
        window.winClose();
      } else if (type === "sizeChang") {
        this.colorFlag = false;
        this.colorFlag2 = false;
        this.colorFlag3 = true;
        if (this.widowSizeType === "max") {
          this.widowSizeType = "restore";
          window.winShowSize(1024, 675);
          //window.enableResize();
        } else {
          this.widowSizeType = "max";
          // window.winMax();
          webobj.winMax()
          //window.disableResize();
        }
      }
    },
    personCenter() {
      this.visible = true;
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    },
    handleCancel() {
      this.visible = false;
    },
    selectItem(key) {
      this.type = key;
      this.current = [key];
      if (key === "2") {
        this.isFooter = true;
      } else {
        this.isFooter = false;
      }
    },
    loginOut() {
      window.clearInterval(this.aliveInteral);
      logout()
        .then(res => {
          if (res.success && res.code === "200") {
            //window.winShowSize(760, 420);
            this.$message.success("退出登录");
            window.loginExit();
            //this.$router.push({ path: "/login" });
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    destroyed() {
      window.clearInterval(this.aliveInteral);
    },
  }
};
</script>

<style lang="less" scoped>
.top-main {
  color: #fff;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  .title {
    float: left;
    font-size: 16px;
    color: #fff;
    img {
      float: left;
      margin: 5px auto;
    }
  }
  .move-area {
    width: calc(100% - 520px);
    height: 50px;
    float: left;
  }
  .user-info {
    float: right;
    .user-icon {
      float: left;
      margin-right: 5px;
    }
    .user-name {
      float: left;
      margin-right: 5px;
    }
    .user-status {
      float: left;
      margin-left: 10px;
      margin-right: 5px;
      color: #fff;
      background: #ff9900;
      width: auto;
      height: 20px;
      line-height: 20px;
      padding: 0 5px;
      margin-top: 15px;
      text-align: center;
      font-size: 12px;
    }
    .split-line {
      float: left;
      width: 1px;
      height: 28px;
      margin: 11px 10px 0 10px;
      background: #0e3753;
    }
  }
}

.gl-logo {
  margin-top: 76px;
  text-align: center;
}

.version {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #00fcff;
  margin-top: 39px;
  text-align: center;
}

.company-info {
  position: absolute;
  left: 50%;
  bottom: 30px;
  width: 280px;
  height: 50px;
  margin-left: -100px;
  text-align: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #00788e;
  line-height: 20px;
}

.check-update-btn {
  width: 150px;
  height: 38px;
  border-radius: 2px;
  text-align: center;
  margin: 30px auto;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  background: #019ba7;
}

.down-icon {
  font-size: 16px !important;
  color: #fff;
}

.min-btn,
.max-btn,
.close-btn {
  margin-left: 5px;
  font-size: 16px !important;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #0E3753;
  }
}

.define-modal {
  ::v-deep .ant-modal-header {
    background: unset;
    border-bottom: 0;
  }

  ::v-deep .ant-modal-content {
    padding: 0 10px;
  }

  ::v-deep .ant-form-item-label > label {
    color: #fff;
  }

  ::v-deep .ant-modal-body {
    height: 380px;
    padding: 0 24px;
    .person-data {
      float: left;
      width: calc(100% - 100px);
      .person-title {
        margin-top: 10px;
        img {
          padding-left: 15px;
        }
        span {
          padding-left: 8px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    .pwd-area {
      margin-top: 35px;
      padding-left: 80px;
      .define-input {
        width: 320px;
        height: 38px;
      }
    }
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

.left-menu {
  float: left;
  width: 100px;
  height: 100%;
  border-right: 1px solid #0e3753;
  .define-menu {
    float: left;
    width: 100px;
    background: unset;
    border-right: 0;
    .ant-menu-item {
      color: #fff;
    }
    .ant-menu-item-selected {
      background-color: unset;
      width: 100px;
      height: 36px;
      color: #00fcff;
      background-size: 100%;
      background-position: center;
      background-image: url("../../assets/images/person-menu.png");
    }
  }
}

.info-list {
  display: flex;
  align-items: center;
}

.data-title {
  width: 100px;
  text-align: right;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #019ba7;
  display: inline-block;
}
.person-info {
  width: 108px;
  padding-left: 10px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.define-footer {
  position: absolute;
  width: 98%;
  height: 70px;
  line-height: 70px;
  bottom: 0;
  left: 10px;
  border-top: 1px solid #0e3753;
}

.define-dropdown-person {
  display: flex;
  justify-content: center;
  align-items: center;
}

/deep/ .a-dropdown-define {
  border-radius: 2px;
}

/deep/ .ant-input-password-icon {
  color: #00fcff;
}

/deep/ .has-error .ant-input-affix-wrapper .ant-input,
/deep/ .has-error .ant-input-affix-wrapper .ant-input:hover {
  background-color: unset;
}
</style>

