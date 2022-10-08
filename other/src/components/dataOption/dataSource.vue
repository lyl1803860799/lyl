<template>
  <div class="data-source">
    <a-form :form="form" :colon="false" labelAlign="right">
      <a-form-item
        label="数据源选择"
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 12 }"
        class="m-bottom-0"
      >
        <a-select
          v-decorator="['dataSourceCheckId', { initialValue: formData.dataSourceCheckId }]"
          @change="changeDataSourceCheck"
          :getPopupContainer="(trigger) => trigger.parentNode"
        >
          <a-select-option v-for="item in dataSourceCheckList" :key="item.id" :value="item.id">
            {{ item.dataSourceCheckName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <div class="api-style" v-show="formData.dataSourceCheckId == 2">
        <div class="api-body">
          <p class="title">请求方式和地址:</p>
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
          >
            <a-select
              v-decorator="['method', { initialValue: formData.method }]"
              placeholder="请选择请求方式"
              style="width:100px;"
              :getPopupContainer="(trigger) => trigger.parentNode"
            >
              <a-select-option v-for="item in methodOptions" :key="item.id" :value="item.name">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <p>URL:</p>
          <p>
            {{
              formData.method == 'get'
                ? ' 将回调参数配置到url中，例：http://192.168.202.89:9099/pricing/web/forecast/getAvgPriceTrendMbi?breedName=螺纹钢&areaName=全国'
                : 'http://192.168.202.89:9099/mbi/dataView/getDataForApi'
            }}
          </p>
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
          >
            <a-textarea
              v-decorator="['apiUrl', { initialValue: formData.apiUrl }]"
              placeholder="请输入请求地址"
              :rows="4"
            />
          </a-form-item>
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
            v-show="formData.method === 'post'"
          >
            <post-body v-decorator="['body', { initialValue: formData.body }]" />
          </a-form-item>

          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
          >
            <request-headers
              v-decorator="['headers', { initialValue: formData.headers }]"
            ></request-headers>
          </a-form-item>
        </div>
      </div>
      <div class="ws-style" v-show="formData.dataSourceCheckId == 3">
        <div class="ws-body">
          <p class="title">URL:将回调参数配置到url中,例:ws://127.0.0.1:3000</p>
          <a-form-item
            label="最大展示数据量"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }"
            class="m-bottom-0"
          >
            <a-input-number
              :min="0"
              :max="99999"
              v-decorator="['wsMaxLength', { initialValue: formData.wsMaxLength }]"
            ></a-input-number>
          </a-form-item>
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
          >
            <a-textarea
              v-decorator="['wsUrl', { initialValue: formData.wsUrl }]"
              placeholder="请输入URL地址"
              :rows="8"
            />
          </a-form-item>

          <a-button type="green" class="add-btn" @click="openWs">开启连接</a-button>
          <a-button type="green" class="add-btn f-r" @click="closeWs">关闭连接</a-button>
        </div>
      </div>
      <div class="data-base" v-show="formData.dataSourceCheckId == 0">
        <div>
          <a-form-item
            label="数据源类型"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 12 }"
            class="m-bottom-0"
          >
            <a-select
              placeholder="请选择数据源类型"
              v-decorator="['dataSourceDictId', { initialValue: formData.dataSourceDictId }]"
              @change="changeDict"
              :getPopupContainer="(trigger) => trigger.parentNode"
            >
              <a-select-option v-for="item in dictList" :key="item.id" :value="item.id">
                {{ item.dataSourceDictName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="我的数据"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 12 }"
            class="m-bottom-0"
          >
            <a-select
              placeholder="请选择我的数据"
              v-decorator="['dataSourceId', { initialValue: formData.dataSourceId }]"
              @change="changeDataSource"
              :getPopupContainer="(trigger) => trigger.parentNode"
            >
              <a-select-option v-for="item in dataSourceList" :key="item.id" :value="item.id">
                {{ item.dsName }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
            v-show="formData.dataSourceDictId == 1 || formData.dataSourceDictId == 2"
          >
            <a-radio-group v-decorator="['sourceMode', { initialValue: formData.sourceMode }]">
              <a-radio :value="0"> SQL模式 </a-radio>
              <a-radio :value="1"> 可视化模式 </a-radio>
            </a-radio-group>
          </a-form-item>
          <div
            class="sql-mode"
            v-show="
              (formData.dataSourceDictId == 1 || formData.dataSourceDictId == 2) &&
                formData.sourceMode == 0
            "
          >
            <a-button
              v-if="
                (formData.dataSourceDictId == 1 || formData.dataSourceDictId == 2) &&
                  formData.dataSourceId
              "
              class="edit-sql"
              type="link"
              style="padding-left:0;"
              @click="openEditDialog"
              >编辑Sql
            </a-button>
          </div>
          <div
            class="view-mode"
            v-show="
              (formData.dataSourceDictId == 1 || formData.dataSourceDictId == 2) &&
                formData.sourceMode == 1
            "
          >
            <a-form-item
              label="表"
              :labelCol="{ span: 8 }"
              :wrapperCol="{ span: 12 }"
              class="m-bottom-0"
            >
              <a-select
                placeholder="请选择表"
                v-decorator="['dataTableName', { initialValue: formData.dataTableName }]"
                :getPopupContainer="(trigger) => trigger.parentNode"
              >
                <a-select-option
                  v-for="(item, index) in tableList"
                  :key="item + index"
                  :value="item"
                >
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-collapse class="second-collapse" :activeKey="['1', '2']" expandIconPosition="right">
              <a-collapse-panel key="1" header="图表设置">
                <a-form-item
                  label=""
                  :labelCol="{ span: 0 }"
                  :wrapperCol="{ span: 24 }"
                  class="m-bottom-0"
                >
                  <data-source-map-settings
                    v-decorator="['columns', { initialValue: formData.columns }]"
                    :dataMap="dataMap"
                    :columnsList="formData.dataTableName ? dataTable[formData.dataTableName] : []"
                  />
                </a-form-item>
              </a-collapse-panel>
              <a-collapse-panel key="2" header="条件设置">
                <a-form-item
                  label="排序设置"
                  :labelCol="{ span: 6 }"
                  :wrapperCol="{ span: 18 }"
                  class="m-bottom-0"
                  v-show="header !== '地图'"
                >
                  <sort-condition
                    v-decorator="['sort', { initialValue: formData.sort }]"
                    :columnList="formData.dataTableName ? dataTable[formData.dataTableName] : []"
                    :orderByList="orderByList"
                  />
                </a-form-item>
                <a-form-item
                  label=""
                  :labelCol="{ span: 0 }"
                  :wrapperCol="{ span: 24 }"
                  class="m-bottom-0 m-top-5"
                >
                  <ace-editor
                    v-decorator="['queryStr', { initialValue: formData.queryStr }]"
                    :height="260"
                  ></ace-editor>
                </a-form-item>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
      </div>
      <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
        <ace-editor
          v-decorator="['editorContent', { initialValue: formData.editorContent }]"
          :height="400"
          :readOnly="readOnly"
          v-show="
            formData.dataSourceCheckId == 1 ||
              (formData.dataSourceCheckId == 0 &&
                (formData.dataSourceDictId == 1 || formData.dataSourceDictId == 2) &&
                formData.sourceMode != 1) ||
              (formData.dataSourceCheckId == 0 &&
                (formData.dataSourceDictId == 3 || formData.dataSourceDictId == 4))
          "
          :key="formData.dataSourceCheckId + 'editor'"
        ></ace-editor>
      </a-form-item>
      <a-form-item
        v-show="
          formData.dataSourceCheckId == 2 ||
            formData.dataSourceCheckId == 3 ||
            (formData.dataSourceCheckId == 0 &&
              (formData.dataSourceDictId == 1 || formData.dataSourceDictId == 2))
        "
        label=""
        :labelCol="{ span: 0 }"
        :wrapperCol="{ span: 24 }"
        class="m-bottom-0"
      >
        <div class="item-wrapper">
          <a-switch
            size="small"
            :default-checked="true"
            :disabled="true"
            style="margin-right:5px"
          />
          <div class="input-number-container">
            自动更新：每
            <a-input-number
              size="small"
              class="input-number-item"
              :min="3"
              v-model="interval"
              @change="handleIntervalChange"
            ></a-input-number
            >秒更新一次
          </div>
        </div>
      </a-form-item>
      <a-form-item
        v-show="
          formData.dataSourceCheckId == 2 ||
            formData.dataSourceCheckId == 3 ||
            (formData.dataSourceCheckId == 0 &&
              (formData.dataSourceDictId == 1 || formData.dataSourceDictId == 2))
        "
        label=""
        :labelCol="{ span: 0 }"
        :wrapperCol="{ span: 24 }"
        class="add-btn-container m-bottom-0"
      >
        <a-button type="green" class="add-btn" @click="checkData(true)">查看数据响应结果</a-button>
      </a-form-item>
    </a-form>
    <bi-dialog v-if="visible" title="数据响应结果" @cancel="cancel" :footer="null">
      <ace-editor
        :value="dataContent"
        :height="500"
        :width="500"
        :lang="lang"
        readOnly
      ></ace-editor>
    </bi-dialog>
    <bi-dialog
      v-if="editVisible"
      title="编辑Sql脚本"
      okString="确定"
      @cancel="editVisible = false"
      @submit="submit"
    >
      <ace-editor v-model="sqlContent" :height="500" :width="600" lang="sql"></ace-editor>
    </bi-dialog>
  </div>
</template>

<script>
import { format } from 'sql-formatter'
import biDialog from '@/components/biDialog'
import AceEditor from '@/components/edit/aceEditor'
import postBody from './postBody'
import requestHeaders from './requestHeaders'
import dataSourceMapSettings from './dataSourceMapSettings'
import SortCondition from '@/components/sortCondition'
import {
  dictDataSource,
  queryDataSource,
  getDataBySql,
  getDataForApi,
  getDataTableByDataSource,
  getDataByView
} from '@/api/dataSource'
import { WebSocketService } from '@/utils/websocketService'

export default {
  name: 'dataSource',
  components: {
    AceEditor,
    biDialog,
    postBody,
    requestHeaders,
    dataSourceMapSettings,
    SortCondition
  },
  props: {
    value: [String, Object, Number],
    dataMap: {
      type: Object,
      default() {
        return {}
      }
    },
    header: {
      type: String,
      default: ''
    }
  },
  data() {
    const self = this
    return {
      dictList: [],
      dataSourceCheckList: [
        { id: 0, dataSourceCheckName: '我的数据源' },
        { id: 1, dataSourceCheckName: '静态数据' },
        { id: 2, dataSourceCheckName: 'API' },
        { id: 3, dataSourceCheckName: 'websocket' }
      ],
      dataSourceList: [],
      formData: {},
      form: this.$form.createForm(this, {
        name: 'DataSource',
        onValuesChange(props, values) {
          if (values.dataSourceCheckId !== undefined) {
            self.formData = {
              ...self.formData,
              dataSourceDictId: undefined,
              dataSourceId: undefined,
              editorContent: '',
              ...self.emptyObject
            }
          }
          if (values.dataSourceDictId !== undefined) {
            self.formData = {
              ...self.formData,
              dataSourceId: undefined,
              editorContent: '',
              ...self.emptyObject
            }
          }
          if (values.dataSourceId !== undefined) {
            self.formData = {
              ...self.formData,
              ...self.emptyObject
            }
          }

          if (
            values.editorContent !== undefined &&
            // 静态数据需要保证是json数据
            (self.formData.dataSourceCheckId === 1 ||
              (self.formData.dataSourceCheckId === 0 &&
                (self.formData.dataSourceDictId == 3 || self.formData.dataSourceDictId == 4))) &&
            self.isJson(values.editorContent)
          ) {
            self.dataContent = values.editorContent
            values.dataContent = values.editorContent
          }
          self.$emit('change', { ...self.formData, ...values })
        }
      }),
      readOnly: false,
      lang: 'json',
      visible: false,
      dataContent: [],
      interval: 30, //间隔时间发送
      intervalId: null,
      editVisible: false, //编辑弹窗
      sqlContent: '', //编辑sql

      methodOptions: [
        { id: 1, name: 'get' },
        { id: 2, name: 'post' }
      ],

      websock: null,

      tableList: [], //表下拉
      dataTable: {},
      columnsList: [], //查表的
      orderByList: [
        { id: 0, value: 'asc', name: '正序' },
        { id: 1, value: 'desc', name: '倒序' }
      ],
      emptyObject: {
        dataTableName: undefined,
        columns: {},
        queryStr: '',
        // 排序条件
        sort: {
          orderColumns: undefined,
          orderBy: 'asc'
        }
      }
    }
  },
  created() {
    //this.dictFind()
  },
  mounted() {
    // this.startInterval()
  },
  methods: {
    handleIntervalChange() {
      this.$emit('change', { ...this.formData, interval: this.interval })
      // this.startInterval()
    },
    // 开启定时器
    startInterval() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
      this.intervalId = setTimeout(() => {
        this.checkData(false, false)
      }, this.interval * 1000)
    },
    // 关闭定时器
    pauseInterval() {
      if (this.intervalId) {
        clearTimeout(this.intervalId)
        this.interval = 30
      }
    },
    //查询字典
    async dictFind() {
      const { data } = await dictDataSource()
      this.dictList = data
    },
    //数据源 选择
    changeDataSourceCheck(val) {
      if (val == 1) {
        this.lang = 'json'
        this.readOnly = false
      }
      this.dataContent = JSON.stringify([])
      this.$emit('change', {
        ...this.formData,
        dataContent: this.dataContent
      })
      this.$nextTick(() => {
        this.form.setFieldsValue({
          dataSourceDictId: undefined,
          dataSourceId: undefined,
          editorContent: '',
          ...this.emptyObject
        })
      })
    },
    //数据源类型 选择
    changeDict(val) {
      if (val == 1 || val == 2) {
        this.lang = 'sql'
      }

      this.form.setFieldsValue({
        dataSourceId: undefined,
        editorContent: '',
        ...this.emptyObject
      })

      this.readOnly = true
    },
    //我的数据 选择
    changeDataSource(val) {
      const dataSource = this.dataSourceList.filter((item) => item.id == val)[0]
      const dataSourceDictId = dataSource.dataSourceDictId
      if (dataSourceDictId == 3 || dataSourceDictId == 4) {
        const fileContent = dataSource.fileContent
        if (this.isJson(fileContent)) {
          this.form.setFieldsValue({
            editorContent: (fileContent && JSON.stringify(JSON.parse(fileContent), null, 4)) || ''
          })
          this.readOnly = true
        } else {
          this.$message.error('数据不可用')
          this.form.setFieldsValue({
            editorContent: ''
          })
        }
      } else {
        this.readOnly = false
        this.form.setFieldsValue({ editorContent: '' })
      }
      this.$nextTick(() => {
        this.form.setFieldsValue({
          ...this.emptyObject
        })
      })
    },
    //获取我的数据源
    async queryDataSourceList(id) {
      const { data } = await queryDataSource({
        dataSourceDictId: id,
        sortColumn: '',
        pageNum: 1,
        pageSize: 999
      })
      this.dataSourceList = data.list || []
      const arr = this.dataSourceList.map((item) => item.id)
      if (!arr.includes(this.formData.dataSourceId)) {
        this.form.setFieldsValue({ dataSourceId: undefined })
      }
    },
    //根据数据库ID 获取数据库表结构
    async getDataTableByDataSourceId(id) {
      const { data } = await getDataTableByDataSource({ dataSourceId: id })
      this.dataTable = data
      this.tableList = Object.keys(data)
    },
    //开启websocket
    openWs() {
      if (!this.form.getFieldValue('wsUrl')) {
        this.$message.error('WebSocket路径不能为空')
        return
      }
      const self = this
      self.dataContent = []
      this.websock = new WebSocketService(this.form.getFieldValue('wsUrl'), (data) => {
        let arr = JSON.parse(data)
        let datas = Array.isArray(self.dataContent)
          ? self.dataContent
          : JSON.parse(self.dataContent)
        let ends = datas.concat(arr).slice(-self.formData.wsMaxLength)
        if (ends.length === 0) return
        self.dataContent = JSON.stringify(ends)
        self.$emit('change', {
          ...self.formData,
          dataContent: self.dataContent
        })
        console.log('wsdata', self.dataContent)
      })
    },
    closeWs() {
      if (!this.websock) return
      this.websock.lockReconnect = true
      this.websock.wsInstance.close()
      console.log('手动关闭')
    },
    //查看数据源响应结果
    async checkData(showMessage, showDialog = true) {
      let res, params
      if (this.formData.dataSourceCheckId == 2) {
        let obj = {}
        this.formData.headers.forEach((item) => {
          if (item.keyName) {
            obj[item.keyName] = item.valName
          }
        })
        if (this.formData.method == 'post') {
          params = {
            apiUrl: this.formData.apiUrl,
            method: this.formData.method,
            body: this.formData.body,
            headers: obj
          }
        } else {
          params = {
            apiUrl: this.formData.apiUrl,
            method: this.formData.method,
            headers: obj
          }
        }

        res = await getDataForApi(params)
      } else if (this.formData.dataSourceCheckId == 0) {
        if (!this.formData.dataSourceDictId) {
          showMessage && this.$message.error('请选择数据源类型')
          return
        }
        if (!this.formData.dataSourceId) {
          showMessage && this.$message.error('请选择我的数据')
          return
        }
        if (this.formData.sourceMode == 0) {
          if (!this.formData.editorContent.trim()) {
            showMessage && this.$message.error('代码编辑不能为空')
            return
          }

          res = await getDataBySql({
            dataSourceId: this.formData.dataSourceId,
            sql: this.form.getFieldValue('editorContent')
          })
        } else {
          if (!this.formData.dataTableName) {
            showMessage && this.$message.error('请选择数据表')
            return
          }
          res = await getDataByView({
            dataSourceId: this.formData.dataSourceId,
            dataTableName: this.formData.dataTableName,
            columns: Object.values(this.formData.columns).filter((item) => item),
            queryStr: this.form.getFieldValue('queryStr'),
            orderBy: this.formData.sort.orderBy,
            orderColumns: this.formData.sort.orderColumns
          })
        }
      }
      this.lang = 'json'
      this.visible = showDialog || this.visible
      if (this.formData.dataSourceCheckId !== 3) {
        this.dataContent = (res.data && JSON.stringify(res.data, null, 4)) || ''
      } else {
        let a = JSON.parse(this.dataContent)
        console.log(a)
      }

      this.$emit('change', {
        ...this.formData,
        dataContent: this.dataContent
      })
      // this.startInterval()
    },
    //关闭查看弹窗
    cancel() {
      this.visible = false
    },
    //编辑Sql
    openEditDialog() {
      this.editVisible = true
      this.sqlContent = format(this.form.getFieldValue('editorContent'))
    },
    submit() {
      this.form.setFieldsValue({ editorContent: format(this.sqlContent) })
      this.editVisible = false
    },
    // json校验
    isJson(jsonStr) {
      let result = false
      try {
        JSON.parse(jsonStr)
        result = true
      } catch {
        result = false
      }
      return result
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val, oldVal) {
        if (val) {
          this.formData = Object.assign({}, val)
          this.interval = this.formData.interval || 30
          if (this.formData.sourceMode === undefined) {
            this.formData.sourceMode = 0
          }
          if (this.formData.wsMaxLength === undefined) {
            this.formData.wsMaxLength = 1000
          }
          if (
            this.formData.dataSourceDictId &&
            this.formData.dataSourceDictId != oldVal?.dataSourceDictId
          ) {
            this.queryDataSourceList(this.formData.dataSourceDictId)
          }
          if (
            this.formData.dataSourceId &&
            this.formData.dataSourceId != oldVal?.dataSourceId &&
            (this.formData.dataSourceDictId == 1 || this.formData.dataSourceDictId == 2)
          ) {
            this.getDataTableByDataSourceId(this.formData.dataSourceId)
          }

          if (this.formData.dataSourceDictId == 1 || this.formData.dataSourceDictId == 2) {
            this.formData.editorContent = format(this.formData.editorContent)
          } else {
            this.formData.editorContent =
              (this.isJson(this.formData.editorContent) &&
                JSON.stringify(JSON.parse(this.formData.editorContent), null, 4)) ||
              '' // 格式化
          }

          this.dataContent = val.dataContent || []
        }
      }
    }
  },
  beforeDestroy() {
    this.pauseInterval()
  }
}
</script>
<style lang="scss" scoped>
.data-source {
  ::v-deep .ant-form-item-label {
    label {
      color: $white;
      font-size: 12px;
    }
  }
  .ant-select {
    font-size: 12px;
  }
  .add-btn-container {
    padding: 0 10%;
    .add-btn {
      width: 100%;
    }
    .ant-btn-green {
      background-color: $dropActive;
      border: none;
      color: $white;
      border-radius: 2px;
    }
  }
  .item-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: $white;
    font-size: 12px;
  }
  ::v-deep .ant-input-number {
    @include inputNumberStyle;
  }
  .input-number-item {
    width: 60px;
    margin: 0 5px;
  }
  .api-style {
    .api-body {
      color: $white;
      p {
        word-wrap: break-word;
        font-size: 12px;
        margin: 5px 0;
        &.title {
          border-top: 1px solid rgb(17, 39, 97);
          font-size: 14px;
        }
      }
    }
  }
  .ws-style {
    .ws-body {
      color: $white;
      p {
        word-wrap: break-word;
        font-size: 12px;
        margin: 12px 0;
      }
    }
  }
}
</style>
