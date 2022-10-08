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
        <a-collapse-panel v-for="panelData in dataTypeList" :key="panelData.id+''">
          <template slot="header">
            {{panelData.columnName}}
            <img
              style="width:16px;height:16px;margin-left:10px;font-size:14px;"
              :src="panelData.isVisible?eyeIcon:eyeInVisibleIcon"
              @click="showPanel($event,panelData)"
            />
            <span style="float:right;font-size: 12px;color:#FFA85A;padding-right:16px;">
              <a-checkbox
                class="define-checkbox"
                v-model="panelData.isAllCloumn"
                @click="changeAll($event,panelData)"
              >全选</a-checkbox>
            </span>
          </template>
          <a-form-item label>
            <ul class="column-ul">
              <li
                v-for="item in panelData.child"
                :key="item.id"
                @click="checkColumn(item,panelData)"
              >
                <span>{{item.columnName}}</span>
                <img :src="checkedIcon" class="check-pic" v-if="item.checked" />
              </li>
            </ul>
          </a-form-item>
        </a-collapse-panel>
      </a-collapse>
      <div style="padding:0 16px;">
        <a-form-item label="资讯数量" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
          <a-input-number
            class="define-input-num"
            :min="1"
            :max="20"
            :step="1"
            :precision="0"
            v-model="flashNum"
            @change="handleChange"
          ></a-input-number>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script>
//import * as moment from "moment";
// import draggable from "vuedraggable";
//import _ from "lodash";
import SET_DATA from "@/utils/newSetData";
import { getNewsList, getNewsColumnTree } from "@/api/source";
import checkedIcon from "@/assets/images/selected.png";
import eyeIcon from "@/assets/images/eye.png";
import eyeInVisibleIcon from "@/assets/images/eye-invisible.png";

export default {
  name: "NewsListDataSet",
  components: {},
  data() {
    this.lastFetchId = 0;
    //this.fetchIndexInfo = _.debounce(this.fetchIndexInfo, 800);
    const self = this;
    return {
      checkedIcon,
      eyeIcon,
      eyeInVisibleIcon,
      data: [],
      flashNum: 20,
      columnList: [],
      defaultColumnCheck: [],
      breedList: [],
      defaultBreedCheck: [],
      activeKey: "",
      form: this.$form.createForm(this, {
        name: "data-set"
      }),
      children: self.value,
      formData: {},
      updateData: JSON.stringify([]),
      isHasDatas: false,
      dataTypeList: [],
      newsList: [],
      allNewsList:[],
      getDataDebounce:null
    };
  },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    },
    title: {
      type: Object,
      default() {
        return {};
      }
    },
    option: {
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
  created() {},
  mounted() {
    this.fetchColumnInfo();
    this.getDataDebounce = this.debounce(this.fetchOneTypeNewsInfo, 800); // 获取最大高度时防抖处理
  },
  methods: {
    checkColumn(data, parentData) {
      let filterData = parentData.child.filter(item => item.checked);
      if (filterData.length === 1 && data.checked) {
        this.$message.warning("最少选择一个条件");
        return;
      }
      data.checked = !data.checked;
      let filterData2 = parentData.child.filter(item => item.checked);
      if (filterData2.length === parentData.child.length) {
        parentData.isAllCloumn = true;
      } else {
        parentData.isAllCloumn = false;
      }

      let params = {
        articleNum: null,
        endTime: new Date().getTime(),
        labelId: [],
        pageNum: 1,
        pageSize: 20,
        searchMap: [],
        sortKey: "articleTime",
        sortType: "desc",
        startTime: null,
        tagSearchInfo: ""
      };
      if (parentData.isAllCloumn) {
        params.tagSearchInfo = parentData.columnRuleToPlatform;
      } else {
        let child = parentData.child;
        if (child && child.length) {
          let filterData = child.filter(childItem => childItem.checked);
          if (filterData.length === 1) {
            params.tagSearchInfo = filterData[0].columnRuleToPlatform;
            if (filterData[0].child && filterData[0].child.length) {
              params.labelId = filterData[0].child.map(res => res.relTagId);
            }
          } else {
            params.tagSearchInfo = parentData.columnRuleToPlatform;
            params.labelId = filterData.map(res => res.relTagId);
          }
        } else {
          params.tagSearchInfo = parentData.columnRuleToPlatform;
        }
      }
      this.getDataDebounce(parentData, params);
    },
    fetchColumnInfo() {
      getNewsColumnTree()
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              let params = this.option.saveParams
                ? this.option.saveParams.params
                : [];
              res.data.map(item => {
                let filterData = params.filter(p => p.id === item.id);
                if (filterData && filterData.length) {
                  item.isVisible = filterData[0].isVisible;
                  item.isAllCloumn = filterData[0].isAllCloumn;
                  if (item.child && item.child.length) {
                    let filterChild = filterData[0].child || [];
                    item.child.map(childItem => {
                      let filterChildData = filterChild.filter(
                        f => f.id === childItem.id
                      );
                      if (filterChildData && filterChildData.length) {
                        childItem.checked = filterChildData[0].checked;
                      } else {
                        childItem.checked = true;
                      }
                    });
                  }
                } else {
                  item.isVisible = true;
                  item.isAllCloumn = true;
                  if (item.child && item.child.length) {
                    item.child.map(childItem => {
                      childItem.checked = true;
                    });
                  }
                }
              });
              this.activeKey = res.data[0].id + "";
              this.dataTypeList = res.data;
              this.flashNum = this.option.saveParams?this.option.saveParams.pageSize:20;
              console.log(this.dataTypeList);
              this.fetchNewsInfo();
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async fetchNewsInfo() {
      let _this = this;
      let newsList = [];
      let allNewsList = [];
      let hasUseData = _this.dataTypeList.filter(item => item.isVisible);
      for (let i = 0; i < hasUseData.length; i++) {
        let params = {
          articleNum: null,
          endTime: new Date().getTime(),
          labelId: [],
          pageNum: 1,
          pageSize: 20,
          searchMap: [],
          sortKey: "articleTime",
          sortType: "desc",
          startTime: null,
          tagSearchInfo: ""
        };
        if (hasUseData[i].isAllCloumn) {
          params.tagSearchInfo = hasUseData[i].columnRuleToPlatform;
        } else {
          let child = hasUseData[i].child;
          if (child && child.length) {
            let filterData = child.filter(childItem => childItem.checked);
            if (filterData.length === 1) {
              params.tagSearchInfo = filterData[0].columnRuleToPlatform;
              if (filterData[0].child && filterData[0].child.length) {
                params.labelId = filterData[0].child.map(res => res.relTagId);
              }
            } else {
              params.tagSearchInfo = hasUseData[i].columnRuleToPlatform;
              params.labelId = filterData.map(res => res.relTagId);
            }
          } else {
            params.tagSearchInfo = hasUseData[i].columnRuleToPlatform;
          }
        }
        const { data } = await getNewsList(params);
        let regEx_html = /<\/?(?!font)[a-z]+?[^>]*?>/gi;
        if (data && data.length) {
          data.map(item => {
            item.content = item.content.replace(regEx_html, "");
          });
          allNewsList.push({
            id: hasUseData[i].id,
            name: hasUseData[i].columnName,
            child: data,
            isVisible:hasUseData[i].isVisible
          });
          newsList.push({
            id: hasUseData[i].id,
            name: hasUseData[i].columnName,
            child: data && data.length?data.slice(0,this.flashNum):data,
            isVisible:hasUseData[i].isVisible
          });
        }
      }
      this.allNewsList = allNewsList;
      this.newsList = newsList;
      this.updateNewData(newsList);
    },
    async fetchOneTypeNewsInfo(parentData, params) {
      const { data } = await getNewsList(params);
      let regEx_html = /<\/?(?!font)[a-z]+?[^>]*?>/gi;
      if (data && data.length) {
        data.map(item => {
          item.content = item.content.replace(regEx_html, "");
        });
      }
      if (this.newsList.length) {
        this.newsList.map(item => {
          if (item.id === parentData.id) {
            item.child = data && data.length?data.slice(0,this.flashNum):data;
            item.isVisible = parentData.isVisible;
          }
        });
      }
      if (this.allNewsList.length) {
        this.allNewsList.map(item => {
          if (item.id === parentData.id) {
            item.child = data;
            item.isVisible = parentData.isVisible;
          }
        });
      }
      console.log(this.newsList)
      this.updateNewData(this.newsList);
    },
    // 防抖函数
    debounce(fn, wait) {
      let timer;
      return function() {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args); // 把参数传进去
        }, wait);
      };
    },
    handleChange(e) {
      let  list= [];
      this.allNewsList.map(item=>{
        let child = item.child;
        let data = [];
        if(child && child.length>0){
          data = child.slice(0,e);
        }
        list.push({
          id: item.id,
          name: item.columnName,
          child: data,
          isVisible:item.isVisible
        });
      });
      this.updateNewData(list);
      //this.fetchNewsInfo();
    },
    changeAll(e, data) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
      if (e.target.checked) {
        data.child &&
          data.child.map(item => {
            item.checked = true;
          });
        let params = {
          articleNum: null,
          endTime: new Date().getTime(),
          labelId: [],
          pageNum: 1,
          pageSize: 20,
          searchMap: [],
          sortKey: "articleTime",
          sortType: "desc",
          startTime: null,
          tagSearchInfo: data.columnRuleToPlatform
        };
        this.fetchOneTypeNewsInfo(data,params);
      }
    },
    showPanel(e, data) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
      let filterData = this.dataTypeList.filter(item => item.isVisible);
      if (filterData.length === 1 && data.isVisible) {
        this.$message.warning("最少显示一个类型");
        return;
      }
      data.isVisible = !data.isVisible;

      let params = {
        articleNum: null,
        endTime: new Date().getTime(),
        labelId: [],
        pageNum: 1,
        pageSize: 20,
        searchMap: [],
        sortKey: "articleTime",
        sortType: "desc",
        startTime: null,
        tagSearchInfo: ""
      };
      if(data.isVisible){
        if (data.isAllCloumn) {
          params.tagSearchInfo = data.columnRuleToPlatform;
        } else {
          let child = data.child;
          if (child && child.length) {
            let filterData = child.filter(childItem => childItem.checked);
            if (filterData.length === 1) {
              params.tagSearchInfo = filterData[0].columnRuleToPlatform;
              if (filterData[0].child && filterData[0].child.length) {
                params.labelId = filterData[0].child.map(res => res.relTagId);
              }
            } else {
              params.tagSearchInfo = data.columnRuleToPlatform;
              params.labelId = filterData.map(res => res.relTagId);
            }
          } else {
            params.tagSearchInfo = data.columnRuleToPlatform;
          }
        }
        this.fetchOneTypeNewsInfo(data,params);
      }else{
        this.newsList.map(item=>{
          item.child = item.child && item.child.length?item.child.slice(0,this.flashNum):item.child;
          if(item.id === data.id){
            item.isVisible = data.isVisible;
          }
        });
        this.allNewsList.map(item=>{
          if(item.id === data.id){
            item.isVisible = data.isVisible;
          }
        });
        this.updateNewData(this.newsList);
      }
      
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    // 更新数据
    configData({ option, componentName, type, functionKey }) {
      return SET_DATA[componentName].call(this, option, type, functionKey);
    },
    updateNewData(data) {
      let params = [];
      this.dataTypeList.map(item => {
        let child = item.child;
        let list = [];
        if (child && child.length) {
          child.map(res => {
            list.push({
              id: res.id,
              checked: res.checked,
              columnName: res.columnName
            });
          });
        }
        params.push({
          id: item.id,
          isAllCloumn: item.isAllCloumn,
          isVisible: item.isVisible,
          columnName: item.columnName,
          child: list
        });
      });
      this.$emit("data-changed", {
        data: data,
        saveParams: { params: params,pageSize:this.flashNum }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.column-ul {
  width: 100%;
  margin: 0;
  padding: 0;
  li {
    position: relative;
    width: calc(50% - 8px);
    height: 34px;
    line-height: 34px;
    background: #021e37;
    border: 1px solid #0e3753;
    border-radius: 2px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    &:hover {
      color: #00fcff;
      border: 1px solid #00fcff;
    }
    &:nth-child(odd) {
      float: left;
    }
    &:nth-child(even) {
      float: right;
    }
    &:not(:nth-child(1)):not(:nth-child(2)) {
      margin-top: 14px;
    }
    .check-pic {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
.breed-ul {
  width: 100%;
  margin: 0;
  padding: 0;
  li {
    position: relative;
    width: calc(50% - 8px);
    height: 34px;
    line-height: 34px;
    background: #021e37;
    border: 1px solid #0e3753;
    border-radius: 2px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
    cursor: pointer;
    &:hover {
      color: #00fcff;
      border: 1px solid #00fcff;
    }
    &:nth-child(odd) {
      float: left;
    }
    &:nth-child(even) {
      float: right;
    }
    &:not(:nth-child(1)):not(:nth-child(2)) {
      margin-top: 14px;
    }
    .check-pic {
      position: absolute;
      left: 0;
      top: 0;
    }
    // float: left;
    // width: 100%;
    // &:not(:first-child) {
    //   margin-top: 12px;
    // }
    // .breed-name {
    //   position: relative;
    //   float: left;
    //   width: calc(50% - 8px);
    //   height: 32px;
    //   line-height: 32px;
    //   text-align: center;
    //   color: #00fcff;
    //   border: 1px solid #0e3753;
    //   display: inline-block;
    // }
    // .data-number {
    //   float: right;
    //   width: calc(50% - 8px);
    //   height: 32px;
    //   line-height: 32px;
    //   text-align: center;
    //   display: inline-block;
    // }
  }
}
.define-checkbox {
  float: right;
  padding-right: 14px;

  ::v-deep .ant-checkbox-inner {
    border-radius: 0;
    background-color: unset;
    border: 1px solid #00fcff;
  }

  ::v-deep .ant-checkbox-checked {
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
.define-input-num {
  width: 100%;
  background-color: #021e37;
  color: #00fcff;
  padding: 0 5px;
  font-size: 14px;
  border: 1px solid #0e3753;
  ::v-deep .ant-input-number-handler-wrap {
    background-color: #021e37;
    opacity: 1;
    border-color: #103c5c;
    &:hover {
      .ant-input-number-handler .anticon {
        color: #00fcff;
      }
    }
    .ant-input-number-handler {
      border-color: #103c5c;
      .anticon {
        color: #fff;
      }
    }
    .ant-input-number-handler-up:hover {
      background: unset !important;
    }
    .ant-input-number-handler:active {
      background: unset !important;
    }
  }
}
input[disabled] {
  border: 0 !important;
  opacity: 1;
  cursor: unset;
}
::v-deep .ant-form-item-label label {
  color: #fff;
  &::after {
    display: none;
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

::v-deep .ant-checkbox-wrapper {
  color: #fff;
}

::v-deep .ant-checkbox-wrapper-checked {
  color: #00fcff;
}

::v-deep .ant-checkbox-inner {
  background: unset;
  border: 1px solid #00fcff;
}

::v-deep .ant-calendar-range-picker-separator {
  color: #00788e;
}

::v-deep .ant-calendar-picker-clear {
  color: #fff !important;
  background: #0e3753 !important;
}
</style>
