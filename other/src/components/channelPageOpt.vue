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
      <a-form-item :label="title">
        <a-tree-select
          :dropdownClassName="'define-tree-select'"
          v-decorator="['groupOwnerId', { initialValue: defaultOpt.groupOwnerId }]"
          show-search
          style="width: 100%"
          :tree-data="groupData"
          :replaceFields="replaceTreeFields"
          :defaultValue="defaultValue"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择分组"
          :allowClear="allowClear"
          tree-default-expand-all
        ></a-tree-select>
      </a-form-item>
      <a-form-item
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
      </a-form-item>
      <a-form-item label="播放结束设置" class="m-bottom-0">
        <a-radio-group v-decorator="['playType', { initialValue: defaultOpt.playType }]">
          <a-radio value="0">循环播放</a-radio>
          <a-radio value="1">停在最后一个节目</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import * as uuid from "uuid/v1";
import { getChannelAllGroupInfo } from "@/api/channel";
export default {
  name: "ChannelPageOpt",
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
        name: "coordinated",
        onValuesChange(props, values) {
          const { form } = props;
          self.$emit("page-option-change", {
            ...form.getFieldsValue(),
            ...values
          });
        }
      }),
      replaceTreeFields: {
        key: "unqiId",
        children: "children",
        title: "channelName",
        value: "id"
      },
      defaultValue: "",
      groupData: [],
      allowClear: false,
      visible: false,
      materialData: [],
      loading: false
    };
  },
  mounted() {
    this.getAllGroupData();
    console.log(this.defaultOpt)
  },
  methods: {
    getAllGroupData() {
     getChannelAllGroupInfo().then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              let resDatas = res.data;
              for(let i=0;i<resDatas.length;i++){
                if((resDatas[i].sourceType === 'ungroup' || resDatas[i].sourceType === "all") && resDatas[i].channelParentId === 0){
                  resDatas.splice(i,1);
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

::v-deep .ant-slider-track {
  background: linear-gradient(90deg, #00fcff, #019ba7);
}

::v-deep .ant-slider-handle {
  border-radius: 0;
  border: 0;
}
</style>
