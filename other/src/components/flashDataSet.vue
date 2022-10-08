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
            栏目
            <span style="float:right;font-size: 12px;color:#FFA85A;padding-right:16px;">
              <a-checkbox
                class="define-checkbox"
                v-model="isAllCloumn"
                @click="changeAll($event,'column')"
              >全选</a-checkbox>
            </span>
          </template>
          <a-form-item label>
            <ul class="column-ul">
              <li v-for="item in columnList" :key="item.id" @click="checkColumn(item)">
                <span>{{item.sectionName}}</span>
                <img :src="checkedIcon" class="check-pic" v-if="item.checked" />
              </li>
            </ul>
          </a-form-item>
        </a-collapse-panel>

        <a-collapse-panel key="2">
          <template slot="header">
            品种
            <span style="float:right;font-size: 12px;color:#FFA85A;padding-right:16px;">
              <a-checkbox
                class="define-checkbox"
                v-model="isAllCloumn2"
                @click="changeAll($event,'breed')"
              >全选</a-checkbox>
            </span>
          </template>
          <a-form-item label>
            <ul class="breed-ul">
              <li v-for="item in breedList" :key="item.id" @click="checkBreed(item)">
                <span>{{item.name}}</span>
                <img :src="checkedIcon" class="check-pic" v-if="item.checked" />
                <!-- <span class="breed-name">{{item.name}}</span>
                <span class="data-number">
                  <a-input-number
                    class="define-input-num"
                    :min="1"
                    :max="20"
                    :step="1"
                    :precision="0"
                    v-model="item.num"
                    @change="handleChange(item)"
                  ></a-input-number>
                </span>-->
              </li>
            </ul>
          </a-form-item>
          <a-form-item label="快讯数量" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
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
        </a-collapse-panel>
      </a-collapse>
    </a-form>
  </div>
</template>

<script>
//import * as moment from "moment";
// import draggable from "vuedraggable";
//import _ from "lodash";
import SET_DATA from "@/utils/newSetData";
import { flashColumnInfo, flashBreedInfo, flashQueryList } from "@/api/source";
import checkedIcon from "@/assets/images/selected.png";

export default {
  name: "FlashDataSet",
  components: {},
  data() {
    this.lastFetchId = 0;
    //this.fetchIndexInfo = _.debounce(this.fetchIndexInfo, 800);
    const self = this;
    return {
      checkedIcon,
      data: [],
      isAllCloumn: false,
      isAllCloumn2: false,
      flashNum: 20,
      columnList: [],
      defaultColumnCheck: [],
      breedList: [],
      defaultBreedCheck: [],
      activeKey: ["1", "2"],
      form: this.$form.createForm(this, {
        name: "data-set"
      }),
      children: self.value,
      formData: {},
      updateData: JSON.stringify([]),
      isHasDatas:false,
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
    if (this.value && this.value.pageSize) {
      this.isHasDatas = true;
      this.flashNum = this.value.pageSize;
      console.log(this.value)
      if(this.value.categoryId){
        this.defaultBreedCheck = this.value.categoryId.split(",");
      }
      if(this.value.sectionId){
        this.defaultColumnCheck = this.value.sectionId.split(",");
      }
    }
    this.fetchColumnInfo();
  },
  methods: {
    checkColumn(data) {
      let filterData = this.columnList.filter(item => item.checked);
      if (filterData.length === 1 && data.checked) {
        this.$message.warning("最少选择一个栏目");
        return;
      }
      data.checked = !data.checked;
      let filterData2 = this.columnList.filter(item => item.checked);
      if(filterData2.length === this.columnList.length){
        this.isAllCloumn = true;
      }else{
        this.isAllCloumn = false;
      }
      this.fetchFlashInfo();
    },
    checkBreed(data) {
      let filterData = this.breedList.filter(item => item.checked);
      if (filterData.length === 1 && data.checked) {
        this.$message.warning("最少选择一个品种");
        return;
      }
      data.checked = !data.checked;
      let filterData2 = this.breedList.filter(item => item.checked);
      if(filterData2.length === this.breedList.length){
        this.isAllCloumn2 = true;
      }else{
        this.isAllCloumn2 = false;
      }
      this.fetchFlashInfo();
    },
    fetchColumnInfo() {
      flashColumnInfo()
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              res.data.map(item => {
                item.checked = null;
              });
              if(this.isHasDatas){
                if (!this.defaultColumnCheck.length) {
                  this.isAllCloumn = true;
                  res.data.map(item => {item.checked = true;});
                }else{
                  this.isAllCloumn = false;
                  res.data.map(item => {
                    let filter = this.defaultColumnCheck.filter(
                      res => Number(res) === item.id
                    );
                    if (filter.length) {
                      item.checked = true;
                    } else {
                      item.checked = false;
                    }
                  });
                }
              }else{
                if (!this.defaultColumnCheck.length) {
                  res.data[0].checked = true;
                  this.defaultColumnCheck = [res.data[0].id];
                } else {
                  res.data.map(item => {
                    let filter = this.defaultColumnCheck.filter(
                      res => Number(res) === item.id
                    );
                    if (filter.length) {
                      item.checked = true;
                    } else {
                      item.checked = false;
                    }
                  });
                }
              }
              this.columnList = res.data;
              this.fetchBreedInfo();
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchBreedInfo() {
      flashBreedInfo()
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              res.data.map(item => {
                item.num = null;
                item.checked = null;
              });
              if(this.isHasDatas){
                if (!this.defaultBreedCheck.length) {
                  res.data.map(item => {item.checked = true;});
                  this.isAllCloumn2 = true;
                }else{
                  this.isAllCloumn2 = false;
                  res.data.map(item => {
                    let filter = this.defaultBreedCheck.filter(
                      res => Number(res) === item.id
                    );
                    if (filter.length) {
                      item.checked = true;
                    } else {
                      item.checked = false;
                    }
                  });
                }
              }else{
                if (!this.defaultBreedCheck.length) {
                  res.data[0].checked = true;
                  this.defaultBreedCheck = [res.data[0].id];
                } else {
                  res.data.map(item => {
                    let filter = this.defaultBreedCheck.filter(
                      res => Number(res) === item.id
                    );
                    if (filter.length) {
                      item.checked = true;
                    } else {
                      item.checked = false;
                    }
                  });
                }
              }
              this.breedList = res.data;
              this.fetchFlashInfo();
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchFlashInfo() {
      let categoryIds = "";
      let filterData = this.breedList.filter(item => item.checked);
      if (filterData.length === this.breedList.length) {
        categoryIds = "";
      } else {
        let list = [];
        filterData.map(item => list.push(item.id));
        categoryIds = list.join(",");
      }
      let sectionIds = "";
      let filterData2 = this.columnList.filter(item => item.checked);
      if (filterData2.length === this.columnList.length) {
        sectionIds = "";
      } else {
        let list2 = [];
        filterData2.map(item => list2.push(item.id));
        sectionIds = list2.join(",");
      }
      let params = {
        categoryId: categoryIds,
        keyword: "",
        pageNo: 1,
        pageSize: this.flashNum,
        sectionId: sectionIds
      };
      flashQueryList(params)
        .then(res => {
          console.log(res);
          if (res.success) {
            if (res.data && res.data.list.length) {
              this.$emit("data-changed", {
                data: res.data.list,
                saveParams: params
              });
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleChange() {
      this.fetchFlashInfo();
    },
    changeAll(e, type) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
      if (e.target.checked) {
        if (type === "breed") {
          this.breedList.map(item => {
            item.checked = true;
          });
        } else {
          this.columnList.map(item => {
            item.checked = true;
          });
        }
        this.fetchFlashInfo();
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
      this.$emit("data-changed", {
        dataConfig: {
          ...this.formData,
          data: data
        }
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
    background: #021E37;
    border: 1px solid #0e3753;
    border-radius: 2px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    &:hover{
      color: #00FCFF;
      border:1px solid #00FCFF;
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
    .check-pic{
      position: absolute;
      left:0;
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
    background: #021E37;
    border: 1px solid #0e3753;
    border-radius: 2px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
    cursor: pointer;
    &:hover{
      color: #00FCFF;
      border:1px solid #00FCFF;
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
    .check-pic{
      position: absolute;
      left:0;
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
    border: 1px solid #00FCFF;
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
