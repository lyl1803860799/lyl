<template>
  <div class="data-set" v-loading="fetching">
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
            <span
              v-if="id==='futures-table-style'"
              style="font-size: 12px;color:#FFA85A;padding-left:6px;"
            >（延时1小时，最多支持20个期货合约）</span>
            <span
              v-if="id==='futures-board-style'"
              style="font-size: 12px;color:#FFA85A;padding-left:6px;"
            >（一个卡片支持一个合约【延迟1小时行情】）</span>
          </template>

          <a-tabs :defaultActiveKey="'01'" @change="changeTabs">
            <a-tab-pane v-for="item in nameList" :key="item.futureId" :tab="item.shortName">
              <div class="define-cascader">
                <div class="cascader-frame">
                  <ul class="cascader-ul">
                    <li
                      style="cursor: pointer;"
                      class="cascader-li"
                      :class="{active:currentKey === item.categoryId}"
                      v-for="item in breedContractList"
                      :key="item.categoryId"
                    >
                      <span class="contract-checkbox">
                        <a-checkbox
                          class="define-checkbox"
                          v-model="item.checked"
                          :indeterminate="item.indeterminate"
                          @click="changeAll($event,item)"
                        ></a-checkbox>
                      </span>
                      <span class="select-area">
                        <span @click="selectBreed(item)" class="breed-name">{{item.categoryName}}</span>
                        <span class="arrow-right" @click="selectBreed(item)"></span>
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="cascader-frame">
                  <ul class="cascader-ul">
                    <li class="cascader-li" v-for="item in contractList" :key="item.name">
                      <span class="contract-checkbox">
                        <a-checkbox
                          class="define-checkbox"
                          v-model="item.checked"
                          @click="selectContract($event,item)"
                        >{{item.name}}</a-checkbox>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>

          <!-- <a-form-item label>
            
          </a-form-item>-->
        </a-collapse-panel>
      </a-collapse>
    </a-form>
  </div>
</template>

<script>
//import draggable from "vuedraggable";
import _ from "lodash";
import SET_DATA from "@/utils/newSetData";
import {
  futuresNameList,
  futuresProductContractList,
  getContractData
} from "@/api/source";

export default {
  name: "futuresTableDataSet",
  components: {},
  data() {
    this.lastFetchId = 0;
    //this.fetchIndexInfo = _.debounce(this.fetchIndexInfo, 800);
    const self = this;
    return {
      nameList: [],
      breedContractList: [],
      currentKey: null,
      currentData: {},
      contractList: [],
      visible: false,
      templateForm: this.$form.createForm(this, { name: "templateForm" }),
      activeKey: ["1"],
      activeKey2: "02",
      data: [],
      fetching: false,
      noContent: false,
      indexCode: [],
      code: [],
      form: this.$form.createForm(this, {
        name: "data-set"
      }),
      children: self.value || [],
      formData: {},
      updateData: JSON.stringify([])
    };
  },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
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
    id: String,
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
        if (val && val.length > 0) {
          this.fetchIndexData();
        }
      }
    }
  },
  created() {},
  mounted() {
    this.fetchNameList();
  },
  methods: {
    changeTabs(e) {
      this.contractList = [];
      this.breedContractList = [];
      let localstroage = window.localStorage;
      for (var key in localstroage) {
        if (Object.prototype.hasOwnProperty.call(localstroage, key)) {
          if (window.localStorage[key].indexOf("_categoryId") > -1) {
            localstroage.removeItem(key);
          }
        }
      }
      this.fetchContract({ exchangeId: e });
    },
    selectBreed(data) {
      console.log(data);
      this.currentData = data;
      this.currentKey = data.categoryId;
      let categoryContacts = data.categoryContacts;
      window.localStorage.setItem(
        this.options.domId + "_categoryId",
        data.categoryId
      );
      let list = [];
      if (categoryContacts) {
        categoryContacts.map(item => {
          let filterData = this.children.filter(res => res.key === item);
          list.push({
            name: item,
            checked: filterData.length ? true : false
          });
        });
      }
      this.contractList = list;
    },
    changeAll(e, data) {
      let categoryContacts = data.categoryContacts;
      let list = [];
      this.currentData = data;
      this.currentKey = data.categoryId;
      if (e.target.checked) {
        if (this.id === "futures-table-style") {
          if (this.children.length >= 20) {
            e.target.checked = false;
            data.checked = false;
            this.$message.warning("最多支持20个期货合约");
            return;
          } else {
            if (categoryContacts) {
              let count = 0;
              categoryContacts.map(item => {
                if (this.children.length < 20) {
                  count++;
                  list.push({
                    name: item,
                    checked: e.target.checked
                  });
                  this.children.push({
                    name: data.categoryName,
                    key: item
                  });
                } else {
                  list.push({
                    name: item,
                    checked: false
                  });
                }
              });
              if (count > 0) {
                if (count === categoryContacts.length) {
                  data.indeterminate = false;
                } else {
                  data.indeterminate = true;
                }
              }
            }
          }
        } else {
          this.children = [];
          this.breedContractList.map(item => {
            item.checked = false;
            item.indeterminate = false;
          });
          if (categoryContacts) {
            let count = 0;
            categoryContacts.map((item, index) => {
              if (index === 0) {
                count++;
                list.push({
                  name: item,
                  checked: e.target.checked
                });
                this.children.push({
                  name: data.categoryName,
                  key: item
                });
              } else {
                list.push({
                  name: item,
                  checked: false
                });
              }
            });
            if (count > 0) {
              if (count === categoryContacts.length) {
                data.indeterminate = false;
              } else {
                data.indeterminate = true;
              }
            }
          }
        }
      } else {
        if (categoryContacts) {
          categoryContacts.map(item => {
            list.push({
              name: item,
              checked: e.target.checked
            });
          });
          for (let i = 0; i < this.children.length; i++) {
            let filterData = categoryContacts.filter(
              item => item === this.children[i].key
            );
            if (filterData.length) {
              this.children.splice(i, 1);
              i--;
            }
          }
        }
        data.indeterminate = false;
        this.fetchIndexData();
      }
      if (this.currentKey === data.categoryId) {
        this.contractList = list;
      }
      this.$forceUpdate();
    },
    selectContract(e, data) {
      if (e.target.checked) {
        if (this.id === "futures-table-style") {
          if (this.children.length >= 20) {
            e.target.checked = false;
            data.checked = false;
            this.$message.warning("最多支持20个期货合约");
            return;
          }
          this.children.push({
            name: this.currentData.categoryName,
            key: data.name
          });
        } else {
          // if (this.children.length >= 1) {
          //   e.target.checked = false;
          //   data.checked = false;
          //   this.$message.warning("一个卡片支持一个合约");
          //   return;
          // }
          this.contractList.map(item=>{
            item.checked = false;
          });
          data.checked = true;
          this.children = [
            {
              name: this.currentData.categoryName,
              key: data.name
            }
          ];
        }
      } else {
        for (let i = 0; i < this.children.length; i++) {
          if (this.children[i].key === data.name) {
            this.children.splice(i, 1);
            i--;
          }
        }
      }

      let list = [];
      this.children.map(item => list.push(item.key));
      this.breedContractList.map(item => {
        let categoryContacts = item.categoryContacts;
        let someDatas = _.intersection(categoryContacts, list);
        if (someDatas.length > 0) {
          item.checked = true;
          if (someDatas.length === categoryContacts.length) {
            item.indeterminate = false;
          } else {
            item.indeterminate = true;
          }
        } else {
          item.checked = false;
          item.indeterminate = false;
        }
      });
      if (this.children.length === 0) {
        this.fetchIndexData();
      }
    },
    fetchNameList() {
      this.fetching = true;
      futuresNameList().then(res => {
        this.fetching = false;
        if (res.success) {
          if (res.data && res.data.length) {
            res.data.map((item, index) => {
              item.key = index;
              if (item.exchangeName.indexOf("上海") > -1) {
                item.shortName = "上期所";
              } else if (item.exchangeName.indexOf("大连") > -1) {
                item.shortName = "大商所";
              } else if (item.exchangeName.indexOf("郑州") > -1) {
                item.shortName = "郑商所";
              } else {
                item.shortName = item.exchangeName;
              }
            });
            this.nameList = res.data;
            this.fetchContract({ exchangeId: res.data[0].futureId });
          }
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    fetchContract(params) {
      let _this = this;
      this.fetching = true;
      futuresProductContractList(params).then(res => {
        this.fetching = false;
        if (res.success) {
          if (res.data && res.data.length) {
            let selectList = [];
            this.children.map(item => selectList.push(item.key));
            res.data.map(item => {
              let categoryContacts = item.categoryContacts;
              let someDatas = _.intersection(categoryContacts, selectList);
              if (someDatas.length > 0) {
                item.checked = true;
                if (someDatas.length === categoryContacts.length) {
                  item.indeterminate = false;
                } else {
                  item.indeterminate = true;
                }
              } else {
                item.checked = false;
                item.indeterminate = false;
              }
            });

            this.breedContractList = res.data;
            let categoryContacts;
            if (
              window.localStorage.getItem(this.options.domId + "_categoryId")
            ) {
              let categoryId = window.localStorage.getItem(
                this.options.domId + "_categoryId"
              );
              let filterData = this.breedContractList.filter(
                item => item.categoryId === categoryId
              );
              if (filterData && filterData[0]) {
                this.currentKey = categoryId;
                categoryContacts = filterData[0].categoryContacts;
                this.currentData = filterData[0];
              } else {
                this.currentKey = res.data[0].categoryId;
                categoryContacts = res.data[0].categoryContacts;
                this.currentData = res.data[0];
              }
            } else {
              this.currentKey = res.data[0].categoryId;
              categoryContacts = res.data[0].categoryContacts;
              this.currentData = res.data[0];
            }

            let list = [];
            if (categoryContacts) {
              categoryContacts.map(item => {
                let filterData = this.children.filter(
                  childItem => childItem.key === item
                );
                list.push({
                  name: item,
                  checked: filterData.length ? true : false
                });
              });
            }
            this.contractList = list;
          }
        } else {
          this.$message.warning(res.message);
        }
      });
      setTimeout(function() {
        _this.fetching = false;
      }, 10000);
    },
    fetchIndexData() {
      let list = [];
      if (this.children && this.children.length) {
        this.children.map(item => {
          list.push(item.key);
        });
        getContractData(list).then(res => {
          if (res.success) {
            let dataList = [];
            if (res.data && res.data.length) {
              let resDatas = res.data;
              resDatas.map(item => {
                //console.log(this.children);
                let filterDataName = this.children.filter(
                  childItem => childItem.key === item.contactCode
                );
                //let unitName = item.unitName;
                // if (unitName === "百分比") {
                //   unitName = "%";
                // } else if (unitName === "" || unitName === null) {
                //   unitName = "";
                // } else if (unitName.indexOf("=") > -1) {
                //   unitName = "";
                // } else if (unitName.indexOf("点") > -1) {
                //   unitName = "";
                // }
                let priceRise = item.priceRise;
                if (priceRise === null || priceRise === "") {
                  priceRise = "-";
                }
                let priceRisePercent = item.percent;
                if (
                  priceRisePercent === null ||
                  priceRisePercent === ""
                ) {
                  priceRisePercent = "-";
                }
                if (this.id === "futures-table-style") {
                  if (item.latestPrice === "1000000000000000000.00") {
                    dataList.push({
                      品种名称: filterDataName.length
                        ? filterDataName[0].name
                        : "",
                      期货合约: item.contactCode,
                      最新值: '-',
                      涨跌: null,
                      涨跌幅: null,
                      成交量: '-'
                    });
                  } else {
                    dataList.push({
                      品种名称: filterDataName.length
                        ? filterDataName[0].name
                        : "",
                      期货合约: item.contactCode,
                      最新值: item.latestPrice===null?"-":item.latestPrice,
                      涨跌: priceRise,
                      涨跌幅: priceRisePercent,
                      成交量: item.volume===null?"-":item.volume
                    });
                  }
                } else {
                  if (item.latestPrice === "1000000000000000000.00") {
                    dataList.push({
                      name: filterDataName.length ? filterDataName[0].name : "",
                      contact: item.contactCode,
                      value: null,
                      changeData: "-",
                      chg: "-",
                      volume: "-"
                    });
                  } else {
                    dataList.push({
                      name: filterDataName.length ? filterDataName[0].name : "",
                      contact: item.contactCode,
                      value: item.latestPrice,
                      changeData:
                        priceRise === "-" || priceRise === null
                          ? priceRise
                          : Number(priceRise).toFixed(2),
                      chg:
                        priceRisePercent === "-" || priceRisePercent === null
                          ? priceRisePercent
                          : Number(priceRisePercent).toFixed(2),
                      volume: item.volume
                    });
                  }
                }
              });
            }
            this.$emit("data-changed", {
              data: this.id === "futures-table-style" ? dataList : dataList[0],
              indexCodeList: this.children
            });
          } else {
            this.$message.warning(res.message);
          }
        });
      } else {
        this.$emit("data-changed", {
          data: null,
          indexCodeList: []
        });
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
@media screen and(max-width: 1359px) {
  .data-set {
    ::v-deep .ant-tabs-ink-bar {
      width: 86px !important;
    }
  }
}

@media screen and(min-width: 1360px) {
  .data-set {
    ::v-deep .ant-tabs-ink-bar {
      width: 111px !important;
    }
  }
}

.data-set {
  min-height: 300px;
  ::v-deep .ant-tabs-nav {
    width: 100%;
  }
  ::v-deep .ant-tabs-tab {
    width: 33.33333333333333333%;
    margin: 0;
  }
  ::v-deep .ant-tabs-nav-scroll {
    text-align: center;
  }
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
  ::v-deep .time-setting {
    min-height: 200px;
  }
  .m-bottom-0 {
    margin-bottom: 0;
  }

  .define-cascader {
    width: 100%;
    max-height: 534px;
    border: 1px solid #0e3753;
    display: inline-block;
    .cascader-frame {
      float: left;
      width: 50%;
      &:nth-child(1) {
        border-right: 1px solid #0e3753;
      }
      .cascader-ul {
        width: 100%;
        min-height: 300px;
        max-height: 534px;
        margin: 0;
        padding: 0;
        overflow-y: auto;
        .cascader-li {
          height: 40px;
          &:hover {
            background: #053453;
            ::v-deep .arrow-right {
              background-image: url("../assets/images/arrow-right-hover.png");
            }
            ::v-deep .ant-checkbox-inner {
              border: 1px solid #00fcff !important;
            }
          }
          line-height: 40px;
          .contract-checkbox {
            .define-checkbox {
              color: #fff;
              padding-left: 14px;

              ::v-deep .ant-checkbox-indeterminate {
                .ant-checkbox-inner::after {
                  height: 2px !important;
                }
              }

              ::v-deep .ant-checkbox-inner {
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
          }
          .select-area {
            width: calc(100% - 32px);
            display: inline-block;
            .breed-name {
              padding-left: 8px;
              width: 52%;
              display: inline-block;
              white-space: nowrap;
              word-break: keep-all;
              text-overflow: ellipsis;
            }
          }
          .arrow-right {
            float: right;
            width: 10px;
            height: 10px;
            margin-right: 18px;
            margin-top: 15px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 10px 10px;
            background-image: url("../assets/images/arrow-right.png");
            display: inline-block;
            cursor: pointer;

            &:hover {
              background-image: url("../assets/images/arrow-right-hover.png");
            }
          }
        }
        .active {
          background: #053453;
          ::v-deep .arrow-right {
            background-image: url("../assets/images/arrow-right-hover.png");
          }
          ::v-deep .ant-checkbox-inner {
            border: 1px solid #00fcff !important;
          }
        }
      }
    }
  }
}

input[disabled] {
  border: 0 !important;
  opacity: 1;
  cursor: unset;
}

::v-deep .ant-collapse-content > .ant-collapse-content-box {
  margin-right: 16px;
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
