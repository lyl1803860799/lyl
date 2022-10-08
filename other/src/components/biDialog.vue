<template>
  <transition name="opacity-fade" v-on:after-enter="afterEnter">
    <div class="bi-dialog" id="bi-dialog">
      <div
        class="dialog-wrap"
        id="dialog-wrap"
        :style="{ minWidth: popupWidth, width: width }"
        :class="{ 'no-background-img': noBackgroundImg }"
      >
        <div class="dialog-head" :class="{ 'no-background-img': noBackgroundImg }">
          <div class="dialog-title">
            <div class="left">
              <span class="dialog-title-text ellipsis">{{ title }}</span>
            </div>
            <div class="right">
              <div class="close-btn" @click="close">
                <a-icon style="color:#00fcff;" type="close" />
              </div>
              <div class="stripe-icon" :class="{ 'no-background-img': noBackgroundImg }"></div>
            </div>
          </div>
        </div>
        <div class="dialog-content" :class="{ 'no-background-img': noBackgroundImg }">
          <div class="con">
            <slot></slot>
          </div>
        </div>
        <div class="foot" v-if="footer">
          <slot name="footer">
            <div class="cancel" @click="handleCancel">{{ backString }}</div>
            <div class="ok" @click="handleOk">{{ okString }}</div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "biDialog",
  components: {},
  data() {
    return {
      loading: false
    };
  },
  props: {
    title: {
      type: String,
      default: "标题"
    },
    backString: {
      type: String,
      default: "取消"
    },
    okString: {
      type: String,
      default: "确定"
    },
    popupWidth: {
      type: String,
      default() {
        return "460px";
      }
    },
    width: {
      type: String,
      default() {
        return "";
      }
    },
    clickOutSideClose: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    noBackgroundImg: {
      type: Boolean,
      default: false
    },
    footer: {
      default: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
    document
      .getElementById("bi-dialog")
      .addEventListener("click", this.handleDocumentClick, false);
  },
  methods: {
    close() {
      this.$emit("cancel");
    },
    handleCancel() {
      this.$emit("cancel");
    },
    handleOk() {
      this.$emit("submit");
    },
    handleDocumentClick(e) {
      if (!this.clickOutSideClose) return;
      let hidden = true;
      if (document.getElementById("dialog-wrap").contains(e.target)) {
        hidden = false;
      }
      if (hidden) {
        this.$emit("cancel");
      }
    },
    afterEnter() {
      this.$emit("afterEnter");
    }
  },
  beforeDestroy() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
<style lang="scss" scoped>
.bi-dialog {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog-wrap {
    position: relative;
    min-width: 460px;
    max-width: 80%;
    color: #fff;
    z-index: 0;
    cursor: default;
    border: 1px solid #00fcff;
    box-shadow: 0px 0px 19px 0px #005f74;
    background: #061226;
    &.no-background-img {
      border: 1px solid #005f74;
      box-shadow: 0px 0px 5px 0px #005f74;
    }

    .dialog-head {
      height: 46px;
      line-height: 46px;
      width: 100%;
      border-bottom: 1px solid #0e3753;
      //background: url('../assets/dialog/dialog_head.png') left center/100% 100% no-repeat;
      padding: 0 14px 0 19px;
      &.no-background-img {
        background-image: none;
      }
      .dialog-title {
        overflow: hidden;
        height: 46px;
        .left {
          float: left;
          .triangle {
            width: 14px;
            height: 14px;
            //background: url(../assets/home-project/triangle.png) no-repeat;
            float: left;
            margin: 16px 2px 0 0;
          }
          .dialog-title-text {
            float: left;
            font-size: 14px;
            max-width: 250px;
            padding-left: 8px;
            &::after {
              content: " ";
              display: inline-block;
              position: absolute;
              width: 4px;
              height: 16px;
              background: #00fcff;
              left: 12px;
              top: 15px;
            }
          }
        }
        .right {
          float: right;
          .stripe-icon {
            width: 74px;
            height: 12px;
            //background: url('../assets/stripe.png') no-repeat;
            float: right;
            margin: 22px 20px 0 0;
            &.no-background-img {
              background-image: none;
            }
          }
          .close-btn {
            width: 14px;
            height: 14px;
            //background: url('../assets/close.png') no-repeat;
            float: right;
            margin: 19px 0 0 0;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            &::after {
              content: "";
              display: inline-block;
              position: absolute;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              overflow: hidden;
              left: -7px;
              top: -7px;
              background: 0 0;
            }
            &:hover {
              transform: rotateZ(90deg);
            }
          }
        }
      }
    }
    .dialog-content {
      min-height: 140px;
      //background: $dkBg url('../assets/dialog/dialog_con.png') left center/100% 100% no-repeat;
      position: relative;
      padding: 30px 42px 58px;
      &.no-background-img {
        background-image: none;
        padding: 14px 14px 33px;
      }

      .con {
        display: flex;
        justify-content: center;
        max-height: 700px;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    .foot {
      position: absolute;
      bottom: 20px;
      right: 42px;
      display: flex;
      justify-content: flex-end;
      .cancel,
      .ok {
        width: 92px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: $dkBg;
        cursor: pointer;
        border-radius: 2px;
        border: 1px solid $lightGreen;
        &:hover {
          background: $btnActive;
          color: $white;
          border-color: $lightGreen;
        }

        &:focus {
          background: $btnFocus;
        }
      }
      .cancel {
        color: $lightGreen;
      }
      .ok {
        margin-left: 12px;
        background: $lightGreen;
        &:hover {
          background: $btnActive;
          color: $white;
        }
        &:focus {
          background: $btnFocus;
        }
      }
    }
  }
  ::v-deep .ant-form-item-label{
    padding-right: 10px
  }
}
</style>
