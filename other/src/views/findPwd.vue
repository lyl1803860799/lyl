<template>
  <div
    id="pwdMain"
    class="login-main"
    onmousedown="stopmousedown(event)"
    onmousemove="stopmousemove(event)"
    onmouseup="stopmouseup(event)"
    onmouseout="stopmouseout(event)"
  >
    <div class="left-side"></div>
    <div class="right-side">
      <div class="action-btn">
        <a-icon
          type="minus"
          class="min-btn"
          onmousedown="stopmousedown(event)"
          onmousemove="stopmousemove(event)"
          onmouseup="stopmouseup(event)"
          onmouseout="stopmouseout(event)"
          onclick="onMinix()"
        />
        <a-icon
          type="close"
          class="close-btn"
          onmousedown="stopmousedown(event)"
          onmousemove="stopmousemove(event)"
          onmouseup="stopmouseup(event)"
          onmouseout="stopmouseout(event)"
          onclick="onClose()"
        />
      </div>
      <div class="find-pwd">
        <p class="pwd-title" v-if="step!==2">找回密码</p>
        <a-steps class="define-steps" :current="step" v-if="step!==2">
          <span slot="progressDot" slot-scope="{ index, status, prefixCls }">
            <!-- <template slot="content">
              <span>step {{ index }} status: {{ status }}</span>
            </template>-->
            <span :class="`${prefixCls}-icon-dot`" />
          </span>
          <a-step title="验证手机号码" />
          <a-step title="设置新密码" />
          <a-step title="密码重置成功" />
        </a-steps>
        <div class="step-one" v-if="step===0">
          <div>
            <a-input class="define-input" placeholder="请输入手机号码" v-model="user.phone">
              <img :src="phoneIcon" slot="prefix" />
            </a-input>
          </div>
          <div style="position:relative;margin-top:20px;">
            <a-input class="define-input" placeholder="请输入短信验证码" v-model="user.code">
              <img :src="messageIcon" slot="prefix" />
            </a-input>
            <a-button class="get-msg-code" :disabled="codeFlag" @click="getMsgCode">{{msg}}</a-button>
          </div>

          <div class="rows">
            <a-button class="login-btn" type="primary" @click="nextStep" :loading="nextDisabled">下一步</a-button>
          </div>

          <div class="rows">
            <span class="back-login" @click="backLogin">返回账号登录</span>
          </div>
        </div>
        <div class="step-two" v-if="step===1">
          <div>
            <a-select class="define-select" v-model="user.account">
              <a-select-option v-for="item in accounts" :key="item" :value="item">{{ item }}</a-select-option>
            </a-select>
          </div>
          <div style="position:relative;margin-top:20px;">
            <a-input-password class="define-input" placeholder="请设置8-20位登录密码" v-model="user.pwd">
              <img :src="pwdLockIcon" slot="prefix" />
            </a-input-password>
          </div>
          <div style="position:relative;margin-top:20px;">
            <a-input-password
              class="define-input"
              placeholder="请再次输入新的登录密码"
              v-model="user.againPwd"
            >
              <img :src="pwdLockIcon" slot="prefix" />
            </a-input-password>
          </div>

          <div class="rows">
            <a-button class="login-btn" type="primary" @click="save" :loading="saveDisabled">确定</a-button>
          </div>
        </div>
        <div class="step-three" v-if="step===2">
          <a-result
            class="define-result"
            style="padding:62px 32px 0 32px;"
            status="success"
            title="密码重置成功"
          >
            <template #icon>
              <img :src="resultIcon" />
            </template>
            <template #extra>{{count2}}秒后自动跳转到登录界面</template>
          </a-result>
          <div class="rows">
            <a-button class="login-btn" type="primary" @click="backLogin">返回登录页面</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import phoneIcon from "@/assets/images/phone.png";
import messageIcon from "@/assets/images/messageCode.png";
import pwdLockIcon from "@/assets/images/pwd_lock.png";
import resultIcon from "@/assets/images/result.png";
import { sendPwdSms, checkPwdSms, modifiedPwd } from "@/api/login";
export default {
  name: "findPwd",
  components: {},
  data() {
    return {
      phoneIcon,
      messageIcon,
      pwdLockIcon,
      resultIcon,
      step: 0,
      count: 60,
      count2: 6,
      codeFlag: false,
      form: this.$form.createForm(this, { name: "form" }),
      user: {
        account: "",
        phone: "",
        code: "",
        pwd: "",
        againPwd: ""
      },
      msg: "获取验证码",
      uuid: "",
      accounts: [],
      nextDisabled: false,
      saveDisabled: false
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      let $pwdMain = document.getElementById("pwdMain");
      let ratio = window.devicePixelRatio;
      let prcent = 1 / ratio;
      $pwdMain.style.transform = "scale(" + prcent + ")";
    });
  },
  methods: {
    getMsgCode() {
      let phone = this.user.phone;
      let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!reg.test(phone)) {
        this.$message.error(" 手机号码格式不正确，请重新输入");
        return;
      }
      this.codeTime();
      const { data } = sendPwdSms({
        mobile: this.user.phone
      });
      console.log(data);
    },
    codeTime() {
      let _this = this;
      if (_this.count < 1) {
        _this.count = 60;
        _this.codeFlag = false;
        _this.msg = "重新获取验证码";
      } else {
        setTimeout(function() {
          _this.count--;
          _this.codeFlag = true;
          _this.msg = _this.count + "秒后可重新获取";
          _this.codeTime();
        }, 1000);
      }
    },
    backLogin() {
      this.$router.push({ path: "/login" });
    },
    nextStep() {
      let phone = this.user.phone;
      let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!reg.test(phone)) {
        this.$message.error("手机号码格式不正确，请重新输入");
        return;
      }
      this.nextDisabled = true;
      checkPwdSms({
        code: this.user.code,
        mobile: this.user.phone,
        productNum: "PD_07"
      })
        .then(res => {
          this.nextDisabled = false;
          if (res.success && res.code === "200") {
            this.step = 1;
            this.accounts = res.data.accounts;
            if (res.data.accounts && res.data.accounts.length) {
              this.user.account = res.data.accounts[0];
            }
            this.uuid = res.data.uuid;
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          this.nextDisabled = false;
          console.log(error);
        });
    },
    save() {
      let pwd = this.user.pwd;
      let reg = this.passwordValidate(pwd);
      if (!reg) {
        this.$message.warning("数字、字母（区分大小写）或特殊符号至少2种以上");
        return;
      }
      if (this.user.pwd !== this.user.againPwd) {
        this.$message.error("两次密码输入不一致，请重新输入");
        return;
      }
      this.saveDisabled = true;
      modifiedPwd({
        uuid: this.uuid,
        accountName: this.user.account,
        newPwd: this.user.pwd,
        mobile: this.user.phone
      })
        .then(res => {
          this.saveDisabled = false;
          if (res.success && res.code === "200") {
            this.count2 = 6;
            this.step = 2;
            this.uuid = "";
            this.forwardLogin();
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          this.saveDisabled = false;
          console.log(error);
        });
    },
    forwardLogin() {
      let _this = this;
      if (_this.count2 < 1) {
        this.$router.push({ path: "/login" });
      } else {
        setTimeout(function() {
          _this.count2--;
          _this.forwardLogin();
        }, 1000);
      }
    },
    //校验方法
    passwordValidate(str) {
      var rC = {
        lW: "[a-z]", //小写字母
        uW: "[A-Z]", //大写字母
        nW: "[0-9]", //数字
        sW: "[\\u0020-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E]" //特殊字符
      };
      function Reg(str, rStr) {
        var reg = new RegExp(rStr);
        if (reg.test(str)) return true;
        else return false;
      }
      if (str.length < 8 || str.length > 20) {
        return false;
      } else {
        var tR = {
          l: Reg(str, rC.lW),
          u: Reg(str, rC.uW),
          n: Reg(str, rC.nW),
          s: Reg(str, rC.sW)
        };
        if (
          (!tR.l && !tR.u && !tR.n && !tR.s) ||
          (tR.l && !tR.u && !tR.n && !tR.s) ||
          (!tR.l && tR.u && !tR.n && !tR.s) ||
          (!tR.l && !tR.u && tR.n && !tR.s) ||
          (!tR.l && !tR.u && !tR.n && tR.s)
        ) {
          return false;
        } else {
          //密码符合要求
          return true;
        }
      }
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
    .background-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 330px;
      height: 540px;
    }
  }
  .right-side {
    .action-btn {
      position: absolute;
      top: 10px;
      right: 20px;
      .min-btn {
        font-size: 20px;
        padding-right: 15px;
        color: #fff;
        cursor: pointer;
      }
      .close-btn {
        font-size: 20px;
        color: #fff;
        cursor: pointer;
      }
    }
    position: relative;
    float: left;
    width: 450px;
    height: 420px;
    .find-pwd {
      width: 350px;
      margin: 0 auto;
      margin-top: 40px;
      .pwd-title {
        margin-bottom: 30px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
      }
      .define-steps {
        .ant-steps-item-active {
          /deep/ .ant-steps-icon-dot {
            background: #00fcff !important;
          }
          /deep/ .ant-steps-item-title {
            color: #00fcff !important;
          }
        }
        .ant-steps-item-wait {
          /deep/ .ant-steps-item-title {
            color: #244d68;
          }
        }
        /deep/
          .ant-steps-item-wait
          .ant-steps-item-icon
          > .ant-steps-icon
          .ant-steps-icon-dot {
          background: #25547f;
        }
        /deep/
          .ant-steps-item-wait
          > .ant-steps-item-container
          > .ant-steps-item-tail::after {
          background-color: #0e3753;
        }
        /deep/
          .ant-steps-item-process
          > .ant-steps-item-container
          > .ant-steps-item-content
          > .ant-steps-item-title {
          font-weight: 400;
          font-style: normal;
          font-size: 12px;
          color: #333;
        }

        /deep/
          .ant-steps-item-wait
          > .ant-steps-item-container
          > .ant-steps-item-content
          > .ant-steps-item-title {
          font-weight: 400;
          font-style: normal;
          font-size: 12px;
          color: #ccc;
        }

        /deep/.ant-steps-item-finish
          > .ant-steps-item-container
          > .ant-steps-item-content
          > .ant-steps-item-title {
          color: #00fcff !important;
          font-size: 12px;
        }

        /deep/ .ant-steps-dot .ant-steps-item-process .ant-steps-item-icon,
        .ant-steps-dot.ant-steps-small
          .ant-steps-item-process
          .ant-steps-item-icon {
          width: 15px;
          height: 15px;
          line-height: 15px;
        }

        /deep/
          .ant-steps-item-process
          .ant-steps-item-icon
          > .ant-steps-icon
          .ant-steps-icon-dot {
          background: #409eff;
        }

        /deep/ .ant-steps-item-tail {
          margin: 0 0 0 52px;
        }

        /deep/ .ant-steps-item-icon {
          margin-left: 52px;
        }

        /deep/ .ant-steps-item-content {
          width: 116px;
        }

        /deep/
          .ant-steps-item-finish
          .ant-steps-item-icon
          > .ant-steps-icon
          .ant-steps-icon-dot {
          background: #00fcff;
        }

        /deep/ .ant-steps-dot .ant-steps-item-icon,
        .ant-steps-dot.ant-steps-small .ant-steps-item-icon {
          background: #409eff;
        }

        /deep/
          .ant-steps-item-finish
          > .ant-steps-item-container
          > .ant-steps-item-tail::after {
          background: #00fcff;
        }
      }
      .step-one,
      .step-two {
        width: 100%;
        margin-top: 20px;
        .define-input {
          width: 100%;
          height: 42px;
          line-height: 42px;
          padding: 0;
          /deep/ .ant-input {
            height: 42px;
            line-height: 42px;
            padding-left: 40px;
          }
        }
      }
      .step-three {
        margin-top: 50px;
      }
    }
  }

  .get-msg-code {
    position: absolute;
    right: 10px;
    margin-top: 5px;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #00fcff !important;
    border: 0;
    appearance: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    outline: none;
    cursor: pointer;
    background: unset !important;
  }

  button::after {
    border: 0 !important;
    outline: none !important;
  }

  .get-msg-code:active,
  .get-msg-code:hover {
    background: #fff;
  }

  .rows {
    text-align: center;
    margin-top: 26px;
    .login-btn {
      width: 370px;
      height: 42px;
      border-radius: 2px;
      color: #fff;
      background: #019ba7;
      border: 0;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
    }
    .back-login {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #00fcff;
      cursor: pointer;
    }
  }
}
.define-select {
  width: 100%;
  height: 42px;
  line-height: 42px;
  ::v-deep .ant-select-selection {
    height: 42px;
    line-height: 42px;
  }
  ::v-deep .ant-select-selection__rendered {
    line-height: 42px;
  }
  ::v-deep .ant-select-arrow-icon {
    color: #00fcff;
  }
}
.define-result {
  /deep/ .ant-result-icon {
    margin-bottom: 5px;
  }
  /deep/ .ant-result-extra {
    margin-top: 5px;
  }
  /deep/ .ant-result-title {
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #00fcff;
  }
  /deep/ .ant-result-extra {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #00788e;
  }
}

/deep/
  .ant-steps-item-process
  > .ant-steps-item-container
  > .ant-steps-item-tail::after {
  background-color: #0e3753;
}

/deep/ .ant-input-password-icon {
  color: #00fcff;
}
</style>