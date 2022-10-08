<template>
  <div>
    <a-form
      class="page-opt"
      :form="form"
      layout="horizontal"
      :labelCol="{ span: 24,xl:24, lg:24}"
      :wrapperCol="{ span: 24,xl:24, lg:24 }"
      labelAlign="left"
    >
      <a-form-item label="播放时长" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
        <a-input-number
          style="width:60%"
          v-decorator="['playTime', { initialValue: defaultOpt.playTime }]"
          :min="1"
          :max="defaultOpt.playTimeType==='minute' || defaultOpt.playTimeType==='sceond'?60:24"
          :step="1"
        ></a-input-number>
        <a-select
          style="width:40%"
          v-decorator="['playTimeType', { initialValue: defaultOpt.playTimeType }]"
        >
          <a-select-option value="hour">小时</a-select-option>
          <a-select-option value="minute">分钟</a-select-option>
          <a-select-option value="sceond">秒</a-select-option>
        </a-select>
      </a-form-item>
      <!-- <a-form-item
        label="切换效果"
        class="m-bottom-0"
        :labelCol="{ span: 5 }"
        :wrapperCol="{ span: 18 }"
      >
        <a-radio-group v-decorator="['playAnimation', { initialValue: defaultOpt.playAnimation }]">
          <a-radio style="float:left;width:100%;" value="0">无特效</a-radio>
          <a-radio class="define-radio" value="1">左滑入</a-radio>
          <a-radio class="define-radio" value="2">右滑入</a-radio>
          <a-radio class="define-radio" value="3">向上滑入</a-radio>
          <a-radio class="define-radio" value="4">向下滑入</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item
        label="切换应用"
        class="m-bottom-0"
        :labelCol="{ span: 5 }"
        :wrapperCol="{ span: 18 }"
      >
        <a-button class="use-btn" :class="{btnActive:defaultOpt.useRange==='one'}" @click="chooseType('one')">仅当前节目</a-button>
        <a-button style="margin-left:10px;" class="use-btn" :class="{btnActive:defaultOpt.useRange==='all'}" @click="chooseType('all')">全部节目</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "ChannelProgramOpt",
  props: {
    defaultOpt: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    const self = this;
    return {
      form: this.$form.createForm(this, {
        name: "ChannelProgramOpt",
        onValuesChange(props, values) {
          const { form } = props;
          let params = form.getFieldsValue();
          params.useRange = self.defaultOpt.useRange;
          self.$emit("program-option-change", {
            ...params,
            ...values
          });
        }
      }),
      loading: false
    };
  },
  mounted() {
  },
  methods: {
    chooseType(type){
       this.form.setFieldsValue({
         playTime:this.defaultOpt.playTime,
         playTimeType:this.defaultOpt.playTimeType,
         useRange:type
       });
    },
  }
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
}
.page-opt {
  padding: 20px;
  .reset-btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: $brightGreen;
    background-color: $db40;
    border-color: $db38;
    &:hover {
      border-color: $brightGreen;
    }
    &:focus,
    &:active {
      border-color: $brightGreen;
      background-color: $db41;
    }
  }
  ::v-deep .ant-form-item {
    margin-bottom: 12px;
    &.m-bottom-0 {
      margin-bottom: 0;
    }
  }
  ::v-deep .ant-form-item-label {
    label {
      color: $white;
      &::after{
        display: none;
      }
    }
  }
  ::v-deep .ant-upload.ant-upload-drag {
    background-color: $db39;
    border-color: $db38;
    &:hover {
      border-color: $brightGreen;
    }
    .ant-upload-text {
      @extend .ft-14;
      color: $white;
      b {
        color: $brightGreen;
      }
    }
  }
}

.define-radio {
  float: left;
  width: 40%;
  margin-top: 17px;
}

.use-btn {
  width: 100px;
  height: 34px;
  color:#00FCFF;
  border: 1px solid #0e3753;
  border-radius: 2px;
}

.btnActive{
  background: #019BA7;
  color:#fff;
}

::v-deep .ant-slider-track {
  background: linear-gradient(90deg, #00fcff, #019ba7);
}

::v-deep .ant-slider-handle {
  border-radius: 0;
  border: 0;
}

::v-deep .ant-input-number {
  width: 100%;
  @include inputNumberStyle;
}
</style>
