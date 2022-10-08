<template>
  <div class="main" :style="{backgroundImage:'url('+leftSideIcon+')'}">
    <a-menu class="define-menu" v-model="current" mode="vertical">
      <a-menu-item
        v-if="noAuth"
        :class="{active:this.currentMenu==='screen'}"
        key="1"
        @click="selectItem('screen','/index/screenManage')"
      >
        <img :src="this.currentMenu==='screen'?screenActiveIcon:screenIcon" />
        <span class="menu-name">屏幕管理</span>
      </a-menu-item>
      <a-menu-item
        v-if="authFlag"
        :class="{active:this.currentMenu==='channel'}"
        key="2"
        @click="selectItem('channel','/index/channelManage')"
      >
        <img :src="this.currentMenu==='channel'?channelActiveIcon:channelIcon" />
        <span class="menu-name">频道管理</span>
      </a-menu-item>
      <a-menu-item
        v-if="authFlag"
        :class="{active:this.currentMenu==='program'}"
        key="3"
        @click="selectItem('program','/index/programManage')"
      >
        <img :src="this.currentMenu==='program'?programActiveIcon:programIcon" />
        <span class="menu-name">节目管理</span>
      </a-menu-item>
      <a-menu-item
        v-if="authFlag"
        :class="{active:this.currentMenu==='template'}"
        key="4"
        @click="selectItem('template','/index/templateManage')"
      >
        <img :src="this.currentMenu==='template'?templateActiveIcon:templateIcon" />
        <span class="menu-name">模板管理</span>
      </a-menu-item>
      <a-menu-item
        v-if="authFlag"
        :class="{active:this.currentMenu==='material'}"
        key="5"
        @click="selectItem('material','/index/materialManage')"
      >
        <img :src="this.currentMenu==='material'?materialActiveIcon:materialIcon" />
        <span class="menu-name">素材管理</span>
      </a-menu-item>
      <a-menu-item
        v-if="authFlag"
        :class="{active:this.currentMenu==='basis'}"
        key="6"
        @click="selectItem('basis','/index/basisData')"
      >
        <img :src="this.currentMenu==='basis'?basisActiveIcon:basisIcon" />
        <span class="menu-name">基础数据</span>
      </a-menu-item>
    </a-menu>
    <div class="help-book">
      <div class="help-area" @click="getHelpBook">
        <span class="help-icon" />
        <span class="help-font">帮助文档</span>
      </div>
    </div>
  </div>
</template>
<script>
import { accountAuth } from "@/api/login";
import helpIcon from "@/assets/images/help_normal.png";
import screenIcon from "@/assets/images/screen.png";
import screenActiveIcon from "@/assets/images/screen-active.png";
import channelIcon from "@/assets/images/channel.png";
import channelActiveIcon from "@/assets/images/channel-active.png";
import programIcon from "@/assets/images/program.png";
import programActiveIcon from "@/assets/images/program-active.png";
import templateIcon from "@/assets/images/template.png";
import templateActiveIcon from "@/assets/images/template-active.png";
import materialIcon from "@/assets/images/material.png";
import materialActiveIcon from "@/assets/images/material-active.png";
import basisIcon from "@/assets/images/basis.png";
import basisActiveIcon from "@/assets/images/basis-active.png";
import leftSideIcon from "@/assets/images/left-side.png";
export default {
  name: "sideNavMenu",
  components: {},
  data() {
    return {
      helpIcon,
      leftSideIcon,
      screenIcon,
      screenActiveIcon,
      channelIcon,
      channelActiveIcon,
      programIcon,
      programActiveIcon,
      templateIcon,
      templateActiveIcon,
      materialIcon,
      materialActiveIcon,
      basisIcon,
      basisActiveIcon,
      current: ["1"],
      currentMenu: "screen",
      authFlag: false,
      noAuth: false
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(val) {
        String(val);
        console.log("val:", val);
        let type = "screen";
        if (val.path === "/index/screenManage") {
          type = "screen";
        } else if (val.path === "/index/channelManage") {
          type = "channel";
        } else if (val.path === "/index/programManage") {
          type = "program";
        } else if (val.path === "/index/templateManage") {
          type = "template";
        } else if (val.path === "/index/materialManage") {
          type = "material";
        } else if (val.path === "/index/basisData") {
          type = "basis";
        }
        this.currentMenu = type;
        this.$forceUpdate();
      },
      deep: true
    }
  },
  created() {
    this.getUserAuth();
  },
  methods: {
    getUserAuth() {
      accountAuth()
        .then(res => {
          if (res.data === 3) {
            this.authFlag = true;
            this.noAuth = true;
          } else if (res.data === 2) {
            this.authFlag = false;
            this.noAuth = true;
          } else if (res.data === 1) {
            this.authFlag = false;
            this.noAuth = false;
            this.$message.warning("无权限！");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectItem(type, path) {
      this.currentMenu = type;
      //跳转页面入口
      this.$router.push({
        path: path
      });
    },
    getHelpBook() {
      window.ShowHelperDoc("https://client.mysteel.com/mtv_ui/mtv-help.pdf#/");
    }
  }
};
</script>
<style lang="less" scoped>
@media screen and(max-height:700px) {
  .help-area {
    padding: 8px 0 !important;
    .help-icon {
      float: left;
      width: 14px;
      height: 14px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 14px 14px;
      background-image: url("../../assets/images/help_normal.png");
      display: inline-block;
      cursor: pointer;

      &:hover {
        background-image: url("../../assets/images/help_hover.png");
      }
    }
    &:hover {
      color: #00fcff;
      .help-icon {
        background-image: url("../../assets/images/help_hover.png");
      }
    }
  }
}
@media (min-width: 800px) {
  .main {
    .help-book {
      position: relative;
      width: 100%;
      bottom: 0;
      text-align: center;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      .help-area {
        width: 78px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 18px 0;
        border-top: 1px solid #0e3753;
        cursor: pointer;
        .help-icon {
          float: left;
          width: 14px;
          height: 14px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 14px 14px;
          background-image: url("../../assets/images/help_normal.png");
          display: inline-block;
          cursor: pointer;

          &:hover {
            background-image: url("../../assets/images/help_hover.png");
          }
        }
        &:hover {
          color: #00fcff;
          .help-icon {
            background-image: url("../../assets/images/help_hover.png");
          }
        }
      }
    }
  }
}
@media (min-width: 1300px) {
  .main {
    .help-book {
      position: absolute;
      width: 100%;
      bottom: 0;
      text-align: center;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      .help-area {
        width: 78px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 18px 0;
        border-top: 1px solid #0e3753;
        cursor: pointer;
        .help-icon {
          float: left;
          width: 14px;
          height: 14px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 14px 14px;
          background-image: url("../../assets/images/help_normal.png");
          display: inline-block;
          cursor: pointer;

          &:hover {
            background-image: url("../../assets/images/help_hover.png");
          }
        }
        &:hover {
          color: #00fcff;
          .help-icon {
            background-image: url("../../assets/images/help_hover.png");
          }
        }
      }
    }
  }
}
.main {
  position: relative;
  width: 90px;
  height: calc(100vh - 50px);
  background-size: 100%;
  overflow-y: auto;
}
.help-font {
  padding-left: 4px;
  &:hover {
    color: #00fcff;
  }
}
.define-menu {
  background: unset;
  border-right: 0;
  li {
    color: #fff;
    margin-top: 0;
    margin-bottom: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    height: 98px;
    line-height: 30px;
    .menu-name {
      height: 16px;
      line-height: 10px;
    }
    &:hover {
      background-color: #063e66;
    }
  }
  .ant-menu-item-selected {
    background: unset;
  }
  .active {
    color: #00fcff;
    background-color: #063e66;
    border-left: 3px solid #00fcff;
  }
}
</style>