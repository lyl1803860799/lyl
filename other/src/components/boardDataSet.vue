<template>
  <div class="data-set">
    <a-form
      :form="form"
      :colon="false"
      labelAlign="left"
      class="mutli-frame"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 23 }"
    >
      <a-collapse v-model="activeKey" expandIconPosition="right">
        <a-collapse-panel key="1">
          <template slot="header">
            指标设置
            <span style="font-size: 12px;color:#FFA85A;padding-left:6px;">（一个卡片仅支持设置一个指标数据）</span>
          </template>
          <a-form-item class="index-input">
            <a-input placeholder="指标编码" v-model="codeValue" style="float:left;width: 80%"></a-input>
            <span class="confirm-btn" @click="fetchIndexInfo"></span>
            <span class="close-btn" @click="clearInput"></span>
          </a-form-item>
          <ul class="url-list">
            <draggable
              v-model="indexCode"
              class="drag"
              @end="onEnd"
              animation="300"
              filter=".forbid"
              :move="onMove"
            >
              <transition-group>
                <li v-for="(data,index) in indexCode" :key="data.key">
                  <div>
                    <img :src="moveIcon" class="move-btn" />
                  </div>
                  <div class="url-input">
                    <span class="index-code">{{data.key}}</span>
                    <span class="index-name">{{data.otherName?data.otherName:data.label}}</span>
                  </div>
                  <div>
                    <span class="edit-btn" @click="editDailog(data)"></span>
                    <span class="delete-btn" @click="delIndexCode(index)"></span>
                  </div>
                </li>
              </transition-group>
            </draggable>
          </ul>
        </a-collapse-panel>
      </a-collapse>
    </a-form>

    <a-modal
      class="define-modal"
      title="修改指标名称"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :form="templateForm" :colon="false">
        <a-form-item
          label="指标编码"
          :labelCol="{ span: 5 }"
          :wrapperCol="{ span: 18 }"
        >{{currentIndexData?currentIndexData.key:''}}</a-form-item>
        <a-form-item label="指标名称" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input
            placeholder="请填写指标名称"
            v-decorator="['otherName', { initialValue: formName.otherName,rules: [{max:50,message:'不能超过50个字!'}]  }]"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import _ from "lodash";
import SET_DATA from "@/utils/newSetData";
import { queryIndexInfo, queryIndexData } from "@/api/template";
import deleteIcon from "@/assets/images/delete.png";
import moveIcon from "@/assets/images/move.png";
import noDataIcon from "@/assets/images/nodata.png";

export default {
  name: "boardDataSet",
  components: { draggable },
  data() {
    this.lastFetchId = 0;
    const self = this;
    return {
      deleteIcon,
      moveIcon,
      noDataIcon,
      visible: false,
      codeValue: "",
      otherName: "",
      currentIndexData: null,
      templateForm: this.$form.createForm(this, { name: "templateForm" }),
      formName: {
        otherName: ""
      },
      activeKey: ["1"],
      data: [],
      fetching: false,
      noContent: false,
      indexCode: [],
      code: [],
      form: this.$form.createForm(this, {
        name: "data-set"
      }),
      children: self.value,
      formData: {},
      updateData: JSON.stringify([])
    };
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: Object,
      default() {
        return {};
      }
    },
    componentType: String,
    dataConfig: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    children: {
      deep: true,
      immediate: true,
      handler(val) {
        this.fetchIndexData(val);
      }
    }
  },
  created() {},
  mounted() {
    this.indexCode = this.value;
  },
  methods: {
    //禁止拖动到id为1的对象
    onMove(e) {
      if (e.relatedContext.element.forbid) return false;
      return true;
    },
    onEnd() {
      //console.log(e);
      this.fetchIndexData(this.indexCode);
    },
    clearInput(){
      this.codeValue = '';
    },
    fetchIndexInfo() {
      if (this.children.length && this.children.length > 0) {
        this.$message.warning("最多添加1个指标");
        return;
      }
      let value = this.codeValue;
      let array = this.children.filter(item=>item.key===value);
      if(array.length>0){
        this.codeValue = "";
        this.$message.warning("指标已存在");
        return;
      }
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.data = [];
      this.fetching = true;
      queryIndexInfo([value]).then(res => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        if (res.success) {
          if (res.data && res.data.length) {
            let list = [];
            let currentData = res.data[0];
            list.push({
              label: currentData.indexShortName,
              key: currentData.indexCode
            });
            this.codeValue = "";
            this.children = list;
            this.indexCode = list;
            this.noContent = false;
          } else {
            this.noContent = true;
            this.$message.warning("未查询到该条指标信息");
          }
          this.data = res.data;
          this.fetching = false;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    fetchIndexData(val) {
      let list = [];
      val.map(item => {
        list.push({ indexCode: item.key, frequencyCode: item.frequencyCode });
      });
      if (list && list.length) {
        queryIndexData(list).then(res => {
          if (res.success) {
            let dataList = [];
            if (res.data && res.data.length) {
              let resDatas = res.data;
              resDatas.map(item => {
                let sort = 0;
                for (let i = 0; i < list.length; i++) {
                  if (list[i] === item.indexCode) {
                    sort = i;
                  }
                }
                item.sort = sort;
              });
              resDatas.sort(function(a, b) {
                return a.sort - b.sort;
              });
              resDatas.map((item,index) => {
                let unitName = item.unitName;
                if (unitName === "百分比") {
                  unitName = "%";
                } else if (unitName === "" || unitName === null) {
                  unitName = "";
                } else if (unitName.indexOf("=") > -1) {
                  unitName = "";
                } else if (unitName.indexOf("点") > -1) {
                  unitName = "";
                }
                let priceRise = item.priceRise;
                if(priceRise === null || priceRise === ''){
                  priceRise = '-';
                }
                let priceRisePercent=item.priceRisePercent;
                if(priceRisePercent === null || priceRisePercent === ''){
                  priceRisePercent = '-';
                }
                dataList.push({
                  name: val[index]['otherName']?val[index]['otherName']:item.indexName,
                  value: item.latestPrice,
                  unit:unitName,
                  changeData: priceRise === '-' || priceRise === null ? priceRise: Number(priceRise).toFixed(2),
                  chg: priceRisePercent === '-' || priceRisePercent === null ? priceRisePercent: Number(priceRisePercent).toFixed(2)
                });
              });
            }
            this.$emit("data-changed", { data:dataList.length>0?dataList[0]:null,indexCodeList: val});
          } else {
            this.$message.warning(res.message);
          }
        });
      }
    },
    handleChange(indexCode) {
      if(!indexCode.length){
        return;
      }
      if (indexCode.length && indexCode.length > 1) {
        this.$message.warning("一个卡片仅支持设置一个指标数据");
        return;
      }
      let currentData = this.data[0];
      indexCode.map(item => {
        if (item.key === currentData.indexCode) {
          let frequencyCode = "";
          if (currentData.frequencyCode === "FQ-0000000021") {
            frequencyCode = "FQ-NT";
          } else if (currentData.frequencyCode === "FQ-0000000004") {
            frequencyCode = "FQ-TD";
          } else if (currentData.frequencyCode === "FQ-0000000007") {
            frequencyCode = "FQ-YY";
          } else if (currentData.frequencyCode === "FQ-0000000005") {
            frequencyCode = "FQ-MM";
          } else if (currentData.frequencyCode === "FQ-0000000006") {
            frequencyCode = "FQ-QQ";
          } else if (currentData.frequencyCode === "FQ-0000000001") {
            frequencyCode = "FQ-HY";
          } else if (currentData.frequencyCode === "FQ-0000000002") {
            frequencyCode = "FQ-DD";
          } else if (currentData.frequencyCode === "FQ-0000000003") {
            frequencyCode = "FQ-WW";
          }
          item.frequencyCode = frequencyCode;
        }
      });
      this.children = indexCode;
      Object.assign(this, {
        indexCode,
        data: [],
        fetching: false
      });
    },
    clearInputData() {
      this.indexCode = "";
      this.form.resetFields();
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    // 更新数据
    configData({ option, componentName, type, functionKey }) {
      return SET_DATA[componentName].call(this, option, type, functionKey);
    },
    editDailog(data) {
      this.templateForm.resetFields();
      this.$nextTick(() => {
        this.formName.otherName = data.otherName ? data.otherName : data.label;
        this.currentIndexData = data;
      });
      this.visible = true;
    },
    delIndexCode(index) {
      this.$confirm({
        title: "提示",
        content: "是否确认删除该指标？",
        onOk: async () => {
          this.indexCode.splice(index, 1);
          this.children = this.indexCode;
          if (this.indexCode.length === 0) {
            this.$emit("data-changed", { data: [], indexCodeList: [] });
          }
        },
        onCancel() {}
      });
    },
    //编辑url
    inputBlur(data) {
      data.disabled = true;
    },
    updateNewData(data) {
      this.$emit("data-changed", {
        dataConfig: {
          ...this.formData,
          data: data
        }
      });
    },
    handleOk() {
      let list = this.deepClone(this.indexCode);
      this.templateForm.validateFields((err, values) => {
        if (!err) {
          list.map(item => {
            if (item.key === this.currentIndexData.key) {
              item.otherName = values.otherName;
            }
          });
          this.indexCode = list;
          this.children = list;
          this.visible = false;
        }
      });
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
input[disabled] {
  border: 0 !important;
  opacity: 1;
  cursor: unset;
}
.mutli-frame {
  ::v-deep .add-data {
    color: #2aa756;
    font-size: 18px;
    padding-left: 10px;
    cursor: pointer;
  }
  ::v-deep .clear-data {
    color: #ff3737;
    font-size: 18px;
    padding-left: 10px;
    cursor: pointer;
  }
  ::v-deep .input-url {
    width: 82%;
  }
}

.url-list {
  list-style: none;
  li {
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #0e3753;
    .url-input {
      float: left;
      width: 80%;
      background-color: transparent;
      color: #00fcff;
      padding: 0 5px;

      border: 0;
      .index-code {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        display: block;
      }
      .index-name {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #00fcff;
        display: block;
      }
    }
    .edit-btn {
      float: left;
      padding-left: 10px;

      cursor: pointer;
    }
    .edit-btn {
      float: left;
      width: 18px;
      height: 18px;
      margin-right: 5px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 18px 18px;
      background-image: url("../assets/images/edit.png");
      display: inline-block;
      cursor: pointer;

      &:hover {
        background-image: url("../assets/images/edit-hover.png");
      }
    }
    .delete-btn {
      float: left;
      width: 18px;
      height: 18px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 18px 18px;
      background-image: url("../assets/images/delete.png");
      display: inline-block;
      cursor: pointer;

      &:hover {
        background-image: url("../assets/images/delete-hover.png");
      }
    }
    .move-btn {
      cursor: move;
    }
  }
}

.define-modal {
  ::v-deep .ant-form-item-children {
    color: #00fcff;
  }
  ::v-deep .ant-form-item-label > label {
    color: #fff;
  }
  ::v-deep .ant-modal-header {
    background: unset;
    border-bottom: 1px solid #0e3753;
  }

  ::v-deep .ant-modal-body {
    max-height: 500px;
    overflow-y: auto;
  }

  ::v-deep .ant-modal-footer {
    border-top: 1px solid #0e3753;
    margin-left: 8px;
    width: 98.5%;
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

.index-input {
  ::v-deep .ant-form-item-children {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.confirm-btn {
  float: left;
  width: 18px;
  height: 18px;
  margin-left: 20px;
  margin-right: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  background-image: url("../assets/images/confirm-normal.png");
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-image: url("../assets/images/confirm-hover.png");
  }
}

.close-btn {
  float: left;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px 18px;
  background-image: url("../assets/images/close-normal.png");
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-image: url("../assets/images/close-hover.png");
  }
}

::v-deep .ant-select-selection__choice__content {
  color: #fff !important;
}

::v-deep .ant-select-selection__choice__remove {
  color: #fff !important;
}

::v-deep .ant-select-selection__choice {
  background-color: #019ba7 !important;
  border: 1px solid #019ba7 !important;
  display: none;
}
</style>
