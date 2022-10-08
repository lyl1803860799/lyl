<template>
  <div
    id="loginMain"
    class="login-main"
    onmousedown="stopmousedown(event)"
    onmousemove="stopmousemove(event)"
    onmouseup="stopmouseup(event)"
    onmouseout="stopmouseout(event)"
  >
    <div class="left-side"></div>
    <div class="right-side">
      <div class="action-btn">
        <span
          class="login-action-btn"
          style="margin-right: 12px;"
          :style="{background:minixFlag?'#092F48':''}"
          @click="minixStyle"
        >
          <img
            :src="minIcon"
            onmousedown="stopmousedown(event)"
            onmousemove="stopmousemove(event)"
            onmouseup="stopmouseup(event)"
            onmouseout="stopmouseout(event)"
            onclick="onMinix()"
          />
          <!-- <a-icon
            type="minus"
            class="min-btn"
            onmousedown="stopmousedown(event)"
            onmousemove="stopmousemove(event)"
            onmouseup="stopmouseup(event)"
            onmouseout="stopmouseout(event)"
            onclick="onMinix()"
          />-->
        </span>
        <span
          class="login-action-btn"
          :style="{background:closeFlag?'#092F48':''}"
          @click="closeStyle"
        >
          <img
            :src="closeIcon"
            onmousedown="stopmousedown(event)"
            onmousemove="stopmousemove(event)"
            onmouseup="stopmouseup(event)"
            onmouseout="stopmouseout(event)"
            onclick="onClose()"
          />
          <!-- <a-icon
            type="close"
            class="close-btn"
            onmousedown="stopmousedown(event)"
            onmousemove="stopmousemove(event)"
            onmouseup="stopmouseup(event)"
            onmouseout="stopmouseout(event)"
            onclick="onClose()"
          />-->
        </span>
      </div>
      <p class="user-login">
        <span class="login-txt">用户登录</span>
        <span class="en-login-txt">USER LOGIN</span>
      </p>
      <div class="login-input">
        <a-form :form="form">
          <a-form-item>
            <a-input
              class="define-input"
              placeholder="请输入用户名称"
              autocomplete="off"
              v-decorator="['userForm.username', { 
                     initialValue:userForm.username,
                     rules: [{required:true,message:'请填写用户名称!'},{max:100,message:'不能超过100个字符!'}] 
                   }]"
            >
              <img :src="userIcon" slot="prefix" />
            </a-input>
          </a-form-item>

          <a-form-item style="margin-bottom:10px">
            <a-input-password
              class="define-input"
              placeholder="请输入登录密码"
              v-decorator="['userForm.password', { 
                     initialValue:userForm.password,
                     rules: [{required:true,message:'请填写登录密码!'},{max:20,message:'不能超过20个字符!'}] 
                   }]"
            >
              <img :src="pwdIcon" slot="prefix" />
            </a-input-password>
          </a-form-item>

          <a-form-item class="remind-area">
            <a-checkbox v-model="userForm.isRemidPwd" class="remid-btn" @change="onChange">记住登录状态</a-checkbox>
            <span class="forget-pwd" @click="forgetPwd">忘记密码？</span>
          </a-form-item>
        </a-form>

        <div class="rows">
          <a-button class="login-btn" type="primary" :style="{background:submitFlag?'#018591':''}" @click="submitSave" :loading="loginLoading">登录</a-button>
        </div>

        <p class="support">
          <span>© 2000-2021 Mysteel.com,All Rights Reserved 上海钢联 版权所有</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import userIcon from "@/assets/images/user.png";
import pwdIcon from "@/assets/images/password.png";
import closeIcon from "@/assets/images/close.png";
import minIcon from "@/assets/images/min.png";
import md5 from "js-md5";
import { mtvLogin } from "@/api/login";
export default {
  name: "login",
  components: {},
  data() {
    return {
      userIcon,
      pwdIcon,
      closeIcon,
      minIcon,
      submitFlag:false,
      minixFlag: false,
      closeFlag: false,
      loginLoading: false,
      form: this.$form.createForm(this, { name: "form" }),
      userForm: {
        username: "",
        password: "",
        isRemidPwd: false
      }
    };
  },
  created() {
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
    try {
      this.$nextTick(() => {
        let $loginMain = document.getElementById("loginMain");
        let ratio = window.devicePixelRatio;
        let prcent = 1 / ratio;
        $loginMain.style.transform = "scale(" + prcent + ")";

        let userInfo = JSON.parse(window.getLoginInfo());
        console.log(userInfo);

        let isRemidPwd = userInfo.data.bRemember;
        if (isRemidPwd) {
          this.userForm.username = userInfo.data.userName;
          this.userForm.password = userInfo.data.password;
          this.userForm.isRemidPwd = isRemidPwd;
        }
        //window.disableResize();
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    minixStyle() {
      this.minixFlag = true;
    },
    closeStyle() {
      this.closeFlag = true;
    },
    onChange() {},
    forgetPwd() {
      this.$router.push({ path: "/findPwd" });
    },
    submitSave() {
      this.submitFlag = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          try {
            //console.log(values);
            let computerInfo = JSON.parse(window.getComputerInfo());
            let computerName = md5(computerInfo.data.computerName);
            let cpuId = computerInfo.data.cupId;
            let diskId = computerInfo.data.diskId;
            let macId = computerInfo.data.macId;
            let DEVICEID =
              computerName.toString() +
              "/" +
              cpuId +
              "/" +
              diskId +
              "/" +
              macId;
            let params = {
              accountName: values.userForm.username,
              deviceId: DEVICEID,
              password: values.userForm.password,
              productNum: "PD_07",
              version: ""
            };
            this.loginLoading = true;
            mtvLogin(params)
              .then(res => {
                this.loginLoading = false;
                if (res.success && res.code === "200") {
                  console.log("登录返回信息", res);
                  let token = res.data.token;
                  let url = window.getMainUrl();
                  window.sessionStorage.setItem("token", token);
                  window.setTokenValue(token);
                  window.saveLoginInfo(
                    values.userForm.username,
                    values.userForm.password,
                    this.userForm.isRemidPwd
                  );
                  window.winMax();
                  window.location.href = url;
                  //this.$router.push({ path: "/index/screenManage" });
                } else {
                  this.$message.warning(res.message);
                }
              })
              .catch(error => {
                this.loginLoading = false;
                console.log(error);
              });
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-main {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 760px;
  height: 420px;
  margin-top: -210px;
  margin-left: -380px;
  background-size: 100%;
  background-image: url("../assets/images/login_bg.png");
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px;
  overflow: hidden;
  //border-radius: 5px;
  .left-side {
    position: relative;
    float: left;
    width: 310px;
    height: 420px;
  }
  .right-side {
    position: relative;
    float: left;
    width: 450px;
    height: 420px;
    .action-btn {
      position: absolute;
      top: 10px;
      right: 8px;
      .login-action-btn {
        width: 28px;
        height: 28px;
        display: inline-block;
        text-align: center;
        img {
          cursor: pointer;
        }
        .min-btn {
          margin-top: 4px;
          font-size: 20px;
          color: #fff;
          cursor: pointer;
        }
        .close-btn {
          margin-top: 4px;
          font-size: 20px;
          color: #fff;
          cursor: pointer;
        }
        &:hover {
          background: #0e3753;
        }
      }
    }
    .user-login {
      padding: 0;
      font-size: 18px;
      .login-txt {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
      }
    }
    .en-login-txt {
      padding-left: 7px;
      font-size: 12px;
      font-family: Arial;
      font-weight: 400;
      color: #ffffff;
    }
    .user-login {
      font-size: 18px;
      padding-bottom: 0;
      padding-top: 58px;
      padding-left: 36px;
    }
    .login-input {
      width: 380px;
      margin: 0 auto;
      margin-top: 39px;
      /deep/ .define-input {
        width: 100%;
        height: 42px;
        line-height: 42px;
        padding: 0;
        input {
          height: 42px;
          line-height: 42px;
          padding-left: 40px;
          background: #0e3753 !important;
        }
      }
    }
  }

  .remind-area {
    margin-bottom: 15px;
  }

  .remid-btn {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    /deep/ .ant-checkbox-inner {
      background-color: unset;
      border: 1px solid #0e3753;
    }

    /deep/ .ant-checkbox-checked {
      .ant-checkbox-inner {
        background-color: #06e9ff !important;
      }

      .ant-checkbox-inner::after {
        border: 2px solid #000;
        border-top: 0;
        border-left: 0;
      }
    }
  }

  .forget-pwd {
    float: right;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #00fcff;
    cursor: pointer;
  }

  .rows {
    .login-btn {
      width: 380px;
      height: 42px;
      border-radius: 2px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      background: #019ba7;
      border: 0;
      &:hover {
        background: #05bfce;
      }
    }
  }

  .support {
    position: absolute;
    bottom: 0;

    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #00788e;
  }

  /deep/ .ant-input-password-icon {
    color: #00fcff;
  }

  /deep/ .ant-checkbox-inner {
    background-color: #0e3753;
    border: 1px solid #0e3753;
  }
}
</style>