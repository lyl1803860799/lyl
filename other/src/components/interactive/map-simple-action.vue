<template>
  <section class="map-simple-action">
    <a-form
      class="map-simple-action"
      :colon="false"
      labelAlign="left"
      :form="form"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
    >
      <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }" style="padding-left:16px;">
        <span class="slot-title" slot="label">事件</span>
      </a-form-item>
      <a-form-item
        class="m-bottom-0"
        label="下钻"
        :labelCol="{ span: 19 }"
        :wrapperCol="{ span: 3 }"
        style="padding-left:16px;"
      >
        <a-switch
          v-decorator="[
            'actionPanel.click',
            { initialValue: formData.actionPanel.click, valuePropName: 'checked' }
          ]"
        ></a-switch>
      </a-form-item>
      <a-collapse defaultActiveKey="1" expandIconPosition="right">
        <a-collapse-panel key="1" header="下钻设置">
          <a-form-item label="展示类型" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
            <a-select
              v-decorator="[
                'actionPanel.openType',
                { initialValue: formData.actionPanel.openType }
              ]"
              :getPopupContainer="(trigger) => trigger.parentNode"
            >
              <a-select-option value="newPage">打开新页面</a-select-option>
              <a-select-option value="currentWindow">当前窗口弹出</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="URL获取方式"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 15 }"
            class="m-bottom-0"
          ></a-form-item>
          <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 23 }">
            <a-radio-group
              v-decorator="[
                'actionPanel.clickPos',
                { initialValue: formData.actionPanel.clickPos }
              ]"
              @change="handleChange"
            >
              <a-radio value="all"> 手动输入 </a-radio>
              <a-radio value="specific"> 从下钻参数中获取 </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="地址："
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 15 }"
          ></a-form-item>
          <div v-show="formData.actionPanel.clickPos === 'specific'">
            <a-form-item label="跳转位置" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col :span="16">
                  <a-select
                    placeholder="请选择"
                    v-decorator="[
                      'actionPanel.pageUrl',
                      { initialValue: formData.actionPanel.pageUrl }
                    ]"
                  >
                    <a-select-option
                      v-for="option in pageList"
                      :key="option.value"
                      :value="option.value"
                      >{{ option.label }}</a-select-option
                    >
                  </a-select>
                </a-col>
                <a-col :span="6">
                  <add-btn
                    style="width: 60px;height: 30px;line-height: 30px;"
                    :show-icon="false"
                    title="查看"
                    @add="showPreview"
                  ></add-btn>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item
              label="地图参数映射："
              :labelCol="{ span: 8 }"
              :wrapperCol="{ span: 15 }"
            ></a-form-item>
            <a-row type="flex" :gutter="16" justify="space-between" align="middle">
              <a-col :span="12" class="param-map-item">
                <a-form-item label="映射">
                  <a-select
                    placeholder="请选择映射的参数"
                    v-decorator="[
                      'actionPanel.mapInfo.key',
                      { initialValue: formData.actionPanel.mapInfo.key }
                    ]"
                    :getPopupContainer="(trigger) => trigger.parentNode"
                  >
                    <a-select-option v-for="op in dataMapList" :key="op" :value="op">{{
                      op
                    }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12" class="param-map-item">
                <a-form-item label="字段">
                  <a-input
                    placeholder="请输入映射字段"
                    v-decorator="[
                      'actionPanel.mapInfo.value',
                      { initialValue: formData.actionPanel.mapInfo.value }
                    ]"
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <div v-show="formData.actionPanel.clickPos === 'all'">
            <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 23 }">
              <a-textarea
                :auto-size="{ minRows: 4, maxRows: 4 }"
                placeholder="请输入下钻地址，例：http(s)://www.baidu.com"
                v-decorator="[
                  'actionPanel.pageUrl',
                  { initialValue: formData.actionPanel.pageUrl }
                ]"
              ></a-textarea>
            </a-form-item>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-form>

    <bi-dialog
      v-if="showLink"
      title="跳转的大屏地址"
      @cancel="
        () => {
          showLink = false
        }
      "
      :noBackgroundImg="true"
      width="50%"
    >
      <div class="link-address">{{ formData.actionPanel.pageUrl }}</div>
      <template slot="footer">
        <div class="btn" @click="$copyAction(formData.actionPanel.pageUrl)">复制</div>
      </template>
    </bi-dialog>
  </section>
</template>

<script>
import AddBtn from '@/components/addBtn'
import BiDialog from '@/components/biDialog'
import { queryDataView } from '@/api/myProject'

export default {
  name: 'MapSimpleAction',
  props: {
    option: {
      type: Object
    }
  },
  data() {
    const self = this
    return {
      pageList: [],
      dataMapList: ['name', 'from_name'],
      showLink: false,
      form: this.$form.createForm(this, {
        name: 'map-simple-action',
        onValuesChange(props, values) {
          if (values.actionPanel) {
            if (values.actionPanel.mapInfo) {
              values = {
                actionPanel: {
                  ...self.formData.actionPanel,
                  mapInfo: {
                    ...self.formData.actionPanel.mapInfo,
                    ...values.actionPanel.mapInfo
                  }
                }
              }
            } else {
              values = {
                actionPanel: {
                  ...self.formData.actionPanel,
                  ...values.actionPanel
                }
              }
            }
          }
          self.$emit('option-updated', values)
        }
      }),
      formData: {
        title: {},
        component: {},
        contentOption: {},
        actionPanel: {}
      }
    }
  },
  components: { AddBtn, BiDialog },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$set(this, 'formData', val || this.formData)
      }
    }
  },
  methods: {
    showPreview() {
      if (!this.formData.actionPanel.pageUrl) {
        this.$message.warning('请选择跳转位置')
        return
      }
      this.showLink = true
    },
    async getScreenList() {
      const { data } = await queryDataView({
        nodeId: -1,
        dataViewName: '',
        pageNum: 1,
        pageSize: 1000000
      })

      if (data) {
        const prePath = process.env.NODE_ENV === 'production' ? '/datav' : ''
        this.pageList = (data.list || [])
          .filter((screen) => +screen.isDeploy === 1)
          .map((screen) => {
            return {
              label: screen.dataViewName,
              value: `${location.origin + prePath}/show.html#show/${screen.deployAddress}`
            }
          })
      }
    },
    handleChange() {
      this.form.setFieldsValue({
        actionPanel: {
          pageUrl: '',
          mapInfo: {
            key: undefined,
            value: ''
          }
        }
      })
      this.formData.actionPanel = {
        ...this.formData.actionPanel,
        pageUrl: '',
        mapInfo: {
          key: undefined,
          value: ''
        }
      }
    }
  },
  mounted() {
    this.getScreenList()
  }
}
</script>

<style lang="scss" scoped>
.map-simple-action {
  ::v-deep .ant-form-item-label {
    label {
      color: $white;
    }
  }
  ::v-deep .ant-input-number {
    width: 100%;
    @include inputNumberStyle;
  }
  ::v-deep .ant-tabs {
    color: $white;
    &-bar {
      border: none;
    }
    &-tab-active,
    &-tab:hover {
      color: $brightGreen;
    }
    &-ink-bar {
      background-color: $brightGreen;
    }
    &-tab-arrow-show {
      color: $white;
    }
  }
  ::v-deep .ant-input {
    padding: 10px;
  }
  .m-bottom-0 {
    margin-bottom: 0;
  }
  .slot-title {
    font-weight: 600;
    padding-left: 10px;
    position: relative;
    &:before {
      content: '';
      width: 2px;
      height: 12px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: $white;
    }
  }

  .link-address {
    text-align: center;
    color: $white;
    flex: 1;
  }
  .btn {
    width: 92px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: $lightGreen;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      background: $btnActive;
    }
  }
}
</style>
