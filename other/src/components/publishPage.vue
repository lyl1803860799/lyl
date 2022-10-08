<template>
  <bi-dialog
    v-if="visiable"
    :title="`发布(${defaultVal.dataViewName})`"
    :footer="null"
    @cancel="() => $emit('close')"
  >
    <a-form
      class="publish-form"
      style="width: 100%; display: block"
      :form="publishForm"
      :layout="'vertical'"
    >
      <a-form-item label="名称">
        <a-input
          v-decorator="['name', { initialValue: defaultVal.dataViewName }]"
          :max-length="50"
          :disabled="defaultVal.type !== 'COMPONENT'"
        ></a-input>
      </a-form-item>
      <a-form-item label="版本">
        <a-input v-decorator="['version']" :max-length="50"></a-input>
      </a-form-item>
      <a-form-item label=" " :colon="false" v-show="defaultVal.type !== 'COMPONENT'">
        <span :class="['publish-status', (defaultVal.isDeploy && 'active') || '']">
          {{ defaultVal.isDeploy ? '已发布' : '未发布' }}
        </span>
        <a-switch
          size="small"
          v-show="defaultVal.isDeploy"
          v-decorator="['status', { initialValue: defaultVal.isDeploy, valuePropName: 'checked' }]"
          @change="cancelDeploy"
        />
        <add-btn
          v-if="defaultVal.isDeploy"
          class="publish-btn f-r"
          :title="defaultVal.type === 'COMPONENT' ? '发布组件' : '发布大屏'"
          :show-icon="false"
          @add="handlePublish"
        ></add-btn>
      </a-form-item>
      <div v-show="!defaultVal.isDeploy">
        <div class="publish-btn-container">
          <add-btn
            class="publish-btn"
            :title="defaultVal.type === 'COMPONENT' ? '发布组件' : '发布大屏'"
            :show-icon="false"
            @add="handlePublish"
          ></add-btn>
        </div>
        <div class="publish-info">
          <a-icon type="info-circle" class="m-right-10" />
          发布后，获得{{ defaultVal.type === 'COMPONENT' ? '组件' : '大屏' }}分享链接
        </div>
      </div>
      <a-form-item label="分享链接" v-show="defaultVal.isDeploy">
        <a-input disabled v-decorator="['shareLink', { initialValue: defaultVal.shareLink }]">
          <span class="link-btns" slot="addonAfter">
            <a-tooltip title="刷新">
              <a-icon type="reload" class="m-right-5" @click="handlePublish" />
            </a-tooltip>
            <a-tooltip title="复制">
              <span class="top-icon copy-link" @click="copyLink"></span>
            </a-tooltip>
          </span>
        </a-input>
      </a-form-item>
    </a-form>
  </bi-dialog>
</template>

<script>
import BiDialog from '@/components/biDialog'
import AddBtn from '@/components/addBtn'
import { deployDataView, cancelDeployDataView } from '@/api/myProject'
import { deployAssembly, cancelDeployAssembly } from '@/api/myCom'

export default {
  name: 'PublishPage',
  props: {
    defaultVal: {
      type: Object
    },
    visiable: Boolean
  },
  data() {
    const self = this
    return {
      publishForm: this.$form.createForm(this, {
        name: 'coordinated',
        onValuesChange(props, values) {
          self.$emit('publish-change', { ...self.defaultVal, ...values })
        }
      })
    }
  },
  components: {
    BiDialog,
    AddBtn
  },
  methods: {
    async cancelDeploy() {
      let response = {}

      try {
        if (this.defaultVal.type === 'COMPONENT') {
          if (!this.defaultVal?.params?.id) return
          response = await cancelDeployAssembly({
            id: this.defaultVal.params.id
          })
          response.data && (this.$parent.publishInfo.isDeploy = false)
          this.$message.success(response.message)
        } else {
          // this.publishForm.setFieldsValue({ status: true })
          // this.$parent.publishInfo.isDeploy = true
          this.$confirm({
            title: '提示',
            content: '取消发布后，将会删除所有的大屏版本信息',
            onOk: async () => {
              response = await cancelDeployDataView({
                id: +this.$parent.pageId
              })
              this.$parent.getPageInfo()
              this.$message.success(response.message)
            },
            onCancel: () => {
              this.publishForm.setFieldsValue({ status: true })
            }
          })
        }
      } catch {
        this.$message.error('取消发布失败')
      }
    },
    async handlePublish() {
      try {
        let response = {}
        let data = {}
        if (this.defaultVal.type !== 'COMPONENT') {
          response = await deployDataView({
            id: +this.$parent.pageId,
            nodeId: +this.$parent.nodeId || 0,
            deployVersion: this.publishForm.getFieldsValue(['version']).version
          })
          data = response.data
          this.$parent.getPageInfo()
        } else {
          response = await deployAssembly({
            assemblyName: this.publishForm.getFieldsValue(['name']).name,
            assemblyJson: JSON.stringify(this.defaultVal.assemblyJson),
            assemblyId: this.defaultVal.assemblyId,
            snapshot: this.defaultVal.snapshot,
            deployVersion: this.publishForm.getFieldsValue(['version']).version
          })
          data = response.data
          data.deployAddress && (this.$parent.publishInfo.isDeploy = true)
        }
        this.$message.success(response.message)

        const prePath = process.env.NODE_ENV === 'production' ? '/datav' : ''
        const shareLink = `${location.origin + prePath}/show.html#${
          this.defaultVal.type !== 'COMPONENT' ? 'show' : 'component'
        }/${data.deployAddress}`
        this.publishForm.setFieldsValue({
          status: true,
          shareLink
        })
      } catch {
        this.$message.error('发布失败')
      }
    },
    copyLink() {
      const text = this.publishForm.getFieldsValue(['shareLink'])
      this.$copyAction(text.shareLink)
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-form {
  color: $brightGreen;
  ::v-deep .ant-form-item-control-wrapper {
    float: initial !important;
  }
  ::v-deep .ant-switch {
    background: $db40;
    border-color: $db38;
    &.ant-switch-checked {
      background-color: $brightGreen;
      border-color: transparent;
    }
  }

  .publish-status {
    @extend .ft-12;
    @extend .m-right-10;
    padding-left: 1.2em;
    height: 24px;
    line-height: 24px;
    position: relative;
    color: $white;

    &:before {
      content: '';
      position: absolute;
      right: 3.8em;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: $lightWhite;
      transition: all 0.2s;
    }
    &.active {
      &:before {
        background-color: $green;
      }
    }
  }
  .publish-btn-container {
    padding: 25px 0;
    border-top: 1px solid $db26;
    .publish-btn {
      display: block;
      width: 100%;
    }
  }
  .link-btns {
    color: $brightGreen;
    cursor: pointer;
    .top-icon {
      &.copy-link {
        width: 14px;
        height: 14px;
        background-size: cover;
      }
    }
  }
}
</style>
