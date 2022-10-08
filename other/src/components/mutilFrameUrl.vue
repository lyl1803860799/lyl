<template>
  <div>
    <a-form
      :form="form"
      :colon="false"
      labelAlign="left"
      class="mutli-frame"
      :labelCol="{ span: 5 }"
      :wrapperCol="{ span: 18 }"
    >
      <a-form-item label="模式">
        <a-radio-group v-decorator="['linkType', { initialValue: linkType }]" @change="changeType">
          <a-radio :value="'link'">网址</a-radio>
          <a-radio :value="'program'">节目</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="linkType === 'link'" label>
        <a-input
          class="input-url"
          v-decorator="['url', {
          initialValue: url,
          rules: [{required:true,message:'请填写网页地址!'},{max:500,message:'不能超过500个字符!'}]
        }]"
        ></a-input>
        <a-icon type="check-circle" class="add-data" @click="addFrameUrl" />
        <a-icon type="close-circle" class="clear-data" @click="clearInputData" />
      </a-form-item>
      <a-form-item v-if="linkType === 'program'" label style="text-align:center;">
        <a-button class="program-btn" @click="showProgramDialog">节目管理</a-button>
      </a-form-item>
    </a-form>
    <ul class="url-list" v-if="linkType === 'link'">
      <!-- <draggable
        v-model="linkDataList"
        class="drag"
        animation="300"
        filter=".forbid"
        handle=".mover"
        :disabled="disabled"
        chosen-class="chosen"
        force-fallback="true"
      >
        <transition-group>
          <li v-for="(data,index) in linkDataList" :key="data.domId">
            <div class="mover" style="float:left;color:#fff;width:14px;">
              <img :src="moveIcon" class="move-btn" />
              <a-icon type="shrink" style="margin:0;" />
            </div>
            <div style="float:left;width:calc(100% - 14px);">
              <input
                class="url-input"
                type="text"
                :value="data.option.contentOption.src"
                maxlength="500"
                :disabled="data.disabled"
                @blur="inputBlur($event,data)"
              />
              <img :src="editIcon" class="edit-btn" @click="editUrl(data)" />
              <img :src="deleteIcon" class="delete-btn" @click="delUrl(index)" />
            </div>
          </li>
        </transition-group>
      </draggable>-->

      <li v-for="(data,index) in linkDataList" :key="data.domId">
        <input
          class="url-input"
          type="text"
          :value="data.option.contentOption.src"
          maxlength="500"
          :disabled="data.disabled"
          @blur="inputBlur($event,data)"
        />
        <img :src="editIcon" class="edit-btn" @click="editUrl(data)" />
        <img :src="deleteIcon" class="delete-btn" @click="delUrl(index)" />
      </li>
    </ul>
    <ul class="url-list" v-if="linkType === 'program'">
      <draggable
        v-model="programDataList"
        class="drag"
        animation="300"
        filter=".forbid"
        handle=".mover"
        :disabled="disabled"
        chosen-class="chosen"
        force-fallback="true"
        @end="onEnd"
      >
        <transition-group>
          <li v-for="(data,index) in programDataList" :key="data.domId">
            <div class="mover" style="float:left;color:#fff;width:14px;">
              <img :src="moveIcon" class="move-btn" />
              <!-- <a-icon type="shrink" style="margin:0;" /> -->
            </div>
            <div style="float:left;width:calc(100% - 14px);">
              <input
                class="url-input"
                type="text"
                :value="data.option.contentOption.name"
                maxlength="500"
                :disabled="true"
              />
              <img :src="deleteIcon" class="delete-btn" @click="delUrl(index)" />
            </div>
          </li>
        </transition-group>
      </draggable>
      <!-- <li v-for="(data,index) in programDataList" :key="data.domId">
        <input
          class="url-input"
          type="text"
          :value="data.option.contentOption.name"
          maxlength="500"
          :disabled="true"
        />
        <img :src="deleteIcon" class="delete-btn" @click="delUrl(index)" />
      </li>-->
    </ul>

    <a-modal
      class="define-modal"
      :visible="visibleChooseProgram"
      title="选择节目"
      :width="856"
      :confirmLoading="confirmChoosePorgramLoading"
      @cancel="cancelChooseProgram"
      @ok="submitChooseProgram"
    >
      <a-row :gutter="24" style="padding:2px 0;">
        <a-col :span="12">
          <a-tree-select
            :dropdownClassName="'define-tree-select'"
            v-model="programGroupId"
            show-search
            style="float:left;width: 65%"
            :tree-data="programGroupData"
            :replaceFields="replaceTreeFields"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="分组筛选"
            :allowClear="allowClear"
            tree-default-expand-all
            @select="selectProgramGroup"
          ></a-tree-select>
          <a-select
            v-model="programSize"
            placeholder="请选择"
            style="float:right;width: 30%"
            @change="changeSize"
            :allowClear="true"
          >
            <a-select-option v-for="i in programSizeList" :key="i">{{ i }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="12">
          <a-input-search
            v-model="searchTxt"
            placeholder="请输入搜索关键词"
            class="define-search"
            @input="onInput"
            @search="onSearchProgram"
            :maxLength="50"
          />
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-spin class="loading" v-if="tableLoading"></a-spin>
          <a-table
            ref="table"
            class="define-table"
            rowKey="id"
            :locale="tablenodata"
            :showHeader="false"
            :columns="columns"
            :data-source="programData"
            :pagination="pagination"
            @change="handleTableChange"
          >
            <template slot="unqiId" slot-scope="text , record">
              <div class="choose-list" :key="record.id">
                <div
                  class="choose-pic"
                  :style="{backgroundImage:'url('+record.programSnapshot+')'}"
                  @mouseenter="enter(record)"
                  @mouseleave="leave(record)"
                >
                  <div class="hover-modal" v-if="record.isHover">
                    <div class="hover-content">
                      <p class="hover-title">
                        <span>分辨率：{{record.programSize}}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="choose-info">
                  <span class="choose-name">
                    <a-tooltip :title="record.programName" placement="bottom">{{record.programName}}</a-tooltip>
                  </span>
                  <span v-if="record.id != currentId">
                    <a-checkbox
                      class="define-checkbox"
                      :checked="record.checked"
                      @change="onChannge($event,record)"
                    ></a-checkbox>
                  </span>
                </div>
              </div>
            </template>
          </a-table>
          <p style="color:red;font-size:12px;">提示：为确保节目的播放效果，建议同一个频道下的节目分辨率保持一致</p>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import {
  getProgramList,
  getProgramAllGroupInfo,
  programDetailBath
} from "@/api/program";
import { mapState } from "vuex";
import * as uuid from "uuid/v1";
import _ from "lodash";
import { contentOptions, dataOptions, TYPE_SETS } from "@/constants";
import SET_DATA from "@/utils/newSetData";
import editIcon from "@/assets/images/edit.png";
import deleteIcon from "@/assets/images/delete.png";
import AButton from "ant-design-vue/es/button/button";
import moveIcon from "@/assets/images/move.png";

export default {
  components: { AButton, draggable },
  name: "mutilFrameUrl",
  props: ["value", "option"],
  data() {
    //const self = this;
    return {
      editIcon,
      deleteIcon,
      moveIcon,
      url: "",
      linkDataList: [],
      programDataList: [],
      programGroupId: null,
      programData: [],
      programGroupData: [],
      programDataIdList: [],
      allowClear: false,
      replaceTreeFields: {
        key: "unqiId",
        children: "children",
        title: "programName",
        value: "id"
      },
      searchTxt: "",
      programSize: "",
      programSizeList: [
        "1920*1080",
        "1680*1050",
        "1600*900",
        "1400*1050",
        "1400*900",
        "1366*768",
        "1360*768",
        "1280*1024",
        "1280*960",
        "1280*800",
        "1280*720",
        "1080*1920"
      ],
      visibleChooseProgram: false,
      confirmChoosePorgramLoading: false,
      linkType: "link",
      list: [],
      pagination: {
        current: 1,
        defaultPageSize: 6,
        showQuickJumper: true,
        showSizeChanger: false,
        total: 0,
        showTotal: total => `共${total}条`,
        onShowSizeChange: (current, pageSize) => {
          this.table.pageSize = pageSize;
          this.table.pageNumber = 1;
        }
      },
      tablenodata: {
        emptyText: () => (
          <div style="font-size: 14px;font-family: Microsoft YaHei;font-weight: 400;color: #00FCFF;">
            <div class="no-data-area">
              <div>
                <div class="no-data" />
              </div>
              <div>暂无数据，建议您修改分组或搜索条件后查询！</div>
            </div>
          </div>
        )
      },
      columns: [
        {
          title: "节目数据",
          dataIndex: "unqiId",
          key: "unqiId",
          scopedSlots: { customRender: "unqiId" }
        }
      ],
      currentId: null,
      idList: [],
      tableLoading: false,
      selectedCmp: "web-frame-style",
      formData: {},
      form: this.$form.createForm(this, {
        name: "mutil-frame-url"
        // onValuesChange(props, values) {
        //   self.$emit("change", { ...self.formData, ...values });
        // }
      }),
      disabled: false
    };
  },
  computed: {
    ...mapState({
      mapList: state => state.componentList
    }),
    componentList() {
      const mapList = this.mapList
        ? JSON.parse(JSON.stringify(this.mapList))
        : {};
      const result = _.values(mapList)
        .reduce((pre, next) => {
          return pre.concat(...next);
        }, [])
        .reduce((pre, next) => {
          return pre.concat(next.value);
        }, []);

      // 轮播不放地图
      return result;
    },
    children: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  mounted() {
    console.log("------------", this.option.contentOption);
    if (this.children && this.children.length) {
      this.linkType = this.children[0].linkType;
      if (this.linkType === "link") {
        this.linkDataList = this.deepClone(this.children);
      } else {
        let list = [];
        this.children.map(item => {
          let url = item.option.contentOption.src;
          if (url) {
            let array = url.split("?");
            let index = array[0].lastIndexOf("/") + 1;
            let type = this.getQueryString(url, "sourceType");
            let id = array[0].substr(index);
            list.push({
              programId: id,
              sourceType: type && type != "null" ? type : "all"
            });
          }
        });
        if (list.length) {
          programDetailBath(list)
            .then(res => {
              if (res.success) {
                if (res.data && res.data.length) {
                  let resDatas = res.data;
                  this.children.map(item => {
                    let url = item.option.contentOption.src;
                    try {
                      let urlParams = url.split("?")[0];
                      let idList = urlParams.split("/");
                      let filterData = resDatas.filter(
                        childItem =>
                          idList[idList.length - 1] === childItem.programId
                      );
                      if (filterData && filterData.length) {
                        item.option.contentOption.name =
                          filterData[0].programName;
                      }
                    } catch (error) {
                      console.log(error);
                    }

                    this.programDataList = this.deepClone(this.children);
                  });
                }
              } else {
                this.$message.warning(res.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
    this.getAllProgramGroupData();
  },
  methods: {
    onEnd() {
      let list = this.option.contentOption.list;
      console.log(this.programDataList);
      this.children = this.deepClone(this.programDataList);
      setTimeout(function() {
        list.map(item => {
          let name = item.domId;
          let iframe = document.getElementsByName(name);
          if (iframe && iframe[0]) {
            let val = iframe[0].src;
            if (val.indexOf("index.html") > -1) {
              if (iframe && iframe.length) {
                console.log(iframe);
                iframe[0].src = val.replace("index.html", "show.html");
              }
            } else if (val.indexOf("show.html") > -1) {
              if (iframe && iframe.length) {
                console.log(iframe);
                iframe[0].src = val.replace("show.html", "index.html");
              }
            }
          }
        });
      }, 3000);
    },
    addUniqeId(list) {
      if (list && list.length) {
        list.map(item => {
          let children = item.children;
          item.unqiId = item.id + "_" + item.sourceType;
          if (children && children.length) {
            this.addUniqeId(children);
          }
        });
      }

      return list;
    },
    getQueryString(url, name) {
      url = url + "";
      var regstr = "/(\\?|\\&)" + name + "=([^\\&]+)/";
      var reg = eval(regstr);
      //eval可以将 regstr字符串转换为 正则表达式
      var result = url.match(reg);
      if (result && result[2]) {
        return result[2];
      }
      return null;
    },
    enter(item) {
      item.isHover = true;
    },
    leave(item) {
      item.isHover = false;
    },
    addFrameUrl() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.children.length > 9) {
            this.$message.warning("最多添加10个网页地址");
            return;
          }
          let selectedCmp = this.selectedCmp;
          let item = this.componentList.find(item => item.id === selectedCmp);
          const itemContentOption = item.contentOption
            ? item.contentOption
            : { ...contentOptions[item.id.replace(/\d/g, "")].call(this) };
          itemContentOption.src = values.url;
          item.option = {
            contentOption: { ...itemContentOption },
            title: { ...item.title },
            dataConfig: dataOptions[item.id.replace(/\d/g, "")].call(this)
          };
          item.linkType = "link";
          let params = {
            option: item.option,
            componentName: item.componentName
          };
          if (params.componentName === "chart") {
            params.type = TYPE_SETS[item.id.replace(/\d/g, "")] || null;
            params.functionKey = item.id.replace(/\d/g, "") || null;
          }
          item.option = this.configData(params);
          item.domId = uuid();
          item.disabled = true;
          this.linkDataList.push(this.deepClone(item));

          console.log(this.children);

          //this.formData.url = values.url;
          this.url = "";
          this.form.resetFields();
          this.children = this.deepClone(this.linkDataList);
        }
      });
    },
    // 更新数据
    configData({ option, componentName, type, functionKey }) {
      return SET_DATA[componentName].call(this, option, type, functionKey);
    },
    clearInputData() {
      this.url = "";
      this.form.resetFields();
    },
    editUrl(data) {
      data.disabled = false;
    },
    delUrl(index) {
      this.$confirm({
        title: "提示",
        content:
          "是否确认删除该" +
          (this.linkType === "link" ? "网页" : "节目") +
          "地址？",
        onOk: async () => {
          if (this.linkType === "link") {
            this.linkDataList.splice(index, 1);
            this.children = this.deepClone(this.linkDataList);
          } else {
            this.programDataList.splice(index, 1);
            this.children = this.deepClone(this.programDataList);
          }
        },
        onCancel() {}
      });
    },
    //编辑url
    inputBlur(e, data) {
      data.option.contentOption.src = e.target.value;
      data.disabled = true;
      this.children = this.deepClone(this.linkDataList);
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    changeType(e) {
      this.linkType = e.target.value;
      if (e.target.value === "link") {
        this.children = this.deepClone(this.linkDataList);
      } else {
        this.children = this.deepClone(this.programDataList);
      }
    },
    selectProgramGroup(e, data) {
      try {
        this.pagination.current = 1;
        this.pagination.pageSize = 6;
        this.currentProgramData = data.dataRef;
        this.programGroupId = data.dataRef.id;
        this.getProgramData(
          this.programGroupId,
          this.currentProgramData.sourceType,
          this.programSize
        );
      } catch (error) {
        console.log(error);
      }
    },
    getProgramData(id, type) {
      let params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.defaultPageSize,
        namePrefix: this.searchTxt,
        programSize: this.programSize,
        groupOwnerId: id,
        groupType: type
      };
      this.tableLoading = true;
      getProgramList(params)
        .then(res => {
          this.tableLoading = false;
          this.spinning = false;
          let currentId = this.getQueryString(window.location.href, "id");
          this.currentId = currentId;
          if (res.success) {
            let resList = res.data.list;
            if (res.data && res.data.list) {
              for (let i = 0; i < resList.length; i++) {
                resList[i].isHover = false;
                let defineId =
                  resList[i].id +
                  "_" +
                  (type === "share"
                    ? "share"
                    : resList[i].sourceType === null
                    ? "defined"
                    : resList[i].sourceType);
                console.log(defineId, this.idList);
                let filterData = this.idList.filter(item => item == defineId);
                console.log("filterData", filterData);
                if (filterData && filterData.length) {
                  resList[i].checked = true;
                }
              }
            }
            this.pagination.total = res.data.total || 0;
            this.programData = this.addUniqeId(resList);
            let currentPage = this.pagination.current;
            setTimeout(function() {
              let $el = document.getElementsByClassName(
                "ant-pagination-options-quick-jumper"
              );
              if ($el[0]) {
                $el[0].getElementsByTagName("input")[0].value = currentPage;
              }
            }, 100);
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          this.tableLoading = false;
          this.spinning = false;
          console.log(error);
        });
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getProgramData(
        this.programGroupId,
        this.currentProgramData.sourceType,
        this.programSize
      );
    },
    changeSize(e) {
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 6;
      this.programSize = e;
      this.getProgramData(
        this.programGroupId,
        this.currentProgramData.sourceType,
        this.programSize
      );
    },
    showProgramDialog() {
      let idList = [];
      if (this.programDataList && this.programDataList.length) {
        this.programDataList.map(item => {
          let url = item.option.contentOption.src;
          if (url) {
            let type = this.getQueryString(url, "sourceType");
            let array = url.split("?");
            let index = array[0].lastIndexOf("/") + 1;
            let id = array[0].substr(index);
            idList.push(id + "_" + type);
          }
        });
      }
      console.log(idList);
      this.idList = idList;
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 6;
      this.programSize = "";
      this.programGroupId = this.programGroupData[0].id;
      this.currentProgramData = this.programGroupData[0];
      this.visibleChooseProgram = true;
      this.confirmChoosePorgramLoading = false;
      this.programDataIdList = [];
      this.getProgramData(
        this.programGroupId,
        this.currentProgramData.sourceType,
        this.programSize
      );
    },
    cancelChooseProgram() {
      this.visibleChooseProgram = false;
    },
    submitChooseProgram() {
      let data = this.programDataIdList;
      console.log(data);
      if (data && data.length) {
        if (this.children.length > 9) {
          this.$message.warning("最多添加10个节目");
          return;
        }
        this.confirmChoosePorgramLoading = true;
        data.map(item => {
          let selectedCmp = this.selectedCmp;
          let filterData = this.componentList.find(
            res => res.id === selectedCmp
          );
          const itemContentOption = filterData.contentOption
            ? filterData.contentOption
            : {
                ...contentOptions[filterData.id.replace(/\d/g, "")].call(this)
              };
          itemContentOption.name = item.programName;
          itemContentOption.src =
            window.location.origin +
            "/mtv_ui/show.html#programDetail/" +
            item.id +
            "?sourceType=" +
            (this.currentProgramData.sourceType === "share"
              ? "share"
              : item.sourceType
              ? item.sourceType
              : "defined");
          filterData.option = {
            contentOption: { ...itemContentOption },
            title: { ...filterData.title },
            dataConfig: dataOptions[filterData.id.replace(/\d/g, "")].call(this)
          };
          filterData.linkType = "program";
          let params = {
            option: filterData.option,
            componentName: filterData.componentName
          };
          if (params.componentName === "chart") {
            params.type = TYPE_SETS[filterData.id.replace(/\d/g, "")] || null;
            params.functionKey = filterData.id.replace(/\d/g, "") || null;
          }
          filterData.option = this.configData(params);
          filterData.domId = uuid();
          filterData.disabled = true;
          let filter2 = this.programDataList.filter(
            programItem =>
              programItem.option.contentOption.src ===
              filterData.option.contentOption.src
          );
          if (!filter2.length) {
            this.programDataList.push(this.deepClone(filterData));
          }
        });
        this.children = this.deepClone(this.programDataList);
        console.log(this.programDataList);
        //this.getProgramPageInfo(data);
      }
      this.visibleChooseProgram = false;
    },
    getAllProgramGroupData() {
      getProgramAllGroupInfo()
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length) {
              let resDatas = res.data;
              // for (let i = 0; i < resDatas.length; i++) {
              //   if (
              //     resDatas[i].sourceType === "ungroup" &&
              //     (resDatas[i].parentId === 0 ||
              //       resDatas[i].programParentId === 0)
              //   ) {
              //     resDatas.splice(i, 1);
              //     i--;
              //   }
              // }
              this.programGroupData = this.addIdData(resDatas);
              this.currentProgramData = resDatas[0];
              //this.getProgramData(resDatas[0].id,resDatas[0].sourceType)
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
    onSearchProgram(e) {
      this.searchTxt = e;
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 6;
      this.getProgramData(
        this.programGroupId,
        this.currentProgramData.sourceType,
        this.programSize
      );
    },
    onInput(e) {
      let val = e.target.value;
      if (val.trim() === "") {
        this.searchTxt = "";
        this.pagination.current = 1;
        this.pagination.defaultPageSize = 6;
        this.getProgramData(
          this.programGroupId,
          this.currentProgramData.sourceType,
          this.programSize
        );
      }
    },
    onChannge(e, res) {
      console.log(res);
      let data = this.deepClone(this.programData);
      //this.programData.map(item=>{item.checked = false});
      data.map(item => {
        if (item.id === res.id) {
          item.checked = e.target.checked;
        }
      });
      this.programData = this.deepClone(data);
      if (e.target.checked) {
        this.idList.push(res.id + "_" + res.sourceType);
        this.programDataIdList.push(res);
      } else {
        for (let i = 0; i < this.programDataIdList.length; i++) {
          if (this.programDataIdList[i].id === res.id) {
            this.programDataIdList.splice(i, 1);
          }
        }
        for (let i = 0; i < this.idList.length; i++) {
          if (this.idList[i] === res.id + "_" + res.sourceType) {
            this.idList.splice(i, 1);
          }
        }
      }

      this.$forceUpdate();
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = Object.assign(this.formData, val);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@media (min-width: 992px) {
  .url-list {
    list-style: none;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      .url-input {
        float: left;
        width: 70%;
        height: 32px;
        background-color: transparent;
        color: #00fcff;
        padding: 0 5px;
        font-size: 14px;
        border: 0;
        border-bottom: 1px solid #0e3753;
      }
      .edit-btn {
        float: left;
        padding-left: 10px;
        margin-top: 7px;
        cursor: pointer;
      }
      .delete-btn {
        float: left;
        padding-left: 10px;
        margin-top: 7px;
        cursor: pointer;
      }
      // :last-child {
      //   margin-bottom: 20px;
      // }
    }
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
      width: 70%;
    }
  }
}

@media (min-width: 1300px) {
  .url-list {
    list-style: none;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      .url-input {
        float: left;
        width: 82%;
        height: 32px;
        background-color: transparent;
        color: #00fcff;
        padding: 0 5px;
        font-size: 14px;
        border: 0;
        border-bottom: 1px solid #0e3753;
      }
      .edit-btn {
        float: left;
        padding-left: 10px;
        margin-top: 7px;
        cursor: pointer;
      }
      .delete-btn {
        float: left;
        padding-left: 10px;
        margin-top: 7px;
        cursor: pointer;
      }
      // :last-child {
      //   margin-bottom: 20px;
      // }
    }
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
}

.mover {
  cursor: move;
}

.chosen {
  border: solid 2px #3089dc !important;
}

.define-search {
  float: right;
  width: 252px;
  height: 32px;

  input {
    width: 100%;
    height: 32px;
    padding-left: 10px;
    color: #fff;
    border: 1px solid #0e3753;
    background: #071426;
  }

  input::placeholder {
    color: #00788e;
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
}

input[disabled] {
  border: 0 !important;
  opacity: 1;
  cursor: unset;
}

.program-btn {
  width: 80%;
  font-size: 14px;
  color: #fff;
  background: #019ba7;
}

.define-modal {
  ::v-deep .ant-modal-header {
    background: unset;
    border-bottom: 1px solid #0e3753;
  }

  ::v-deep .ant-modal-close-x {
    transition: all 0.3s ease;
  }

  ::v-deep .ant-modal-content {
    .ant-modal-close {
      .ant-modal-close-x {
        transition: all 0.3s ease;
      }
    }
  }

  ::v-deep .ant-modal-body {
    max-height: 600px;
  }

  ::v-deep .ant-modal-footer {
    width: 98.5%;
    margin-left: 10px;
    border-top: 1px solid #0e3753;
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

.define-table {
  background: unset;
  ::v-deep .ant-table-placeholder {
    background: unset;
  }
  ::v-deep .ant-table-tbody > tr {
    float: left;
    width: 33.33333%;
    margin-top: 20px;

    &:hover {
      background: unset !important;
    }
  }

  ::v-deep .ant-table-tbody > tr > td {
    float: left;
    width: 100%;
    border-bottom: 0;
    padding: 0;

    &:hover {
      background: unset !important;
    }
  }

  ::v-deep .ant-table-tbody > tr:not(:nth-child(3n + 0)) {
    td {
      padding: 0 20px 0 0;
    }
  }

  ::v-deep .ant-table {
    margin-bottom: 20px;
  }
}

.choose-list {
  float: left;
  width: 100%;
  height: 184px;
  border: 1px solid #0e3753;

  .choose-pic {
    float: left;
    width: 100%;
    height: 149px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-bottom: 1px solid #0e3753;

    .hover-modal {
      float: left;
      width: 100%;
      height: 149px;
      border: 1px solid #00fcff;
      background: #071426;
      opacity: 0.9;

      .hover-content {
        height: 149px;
        padding: 10px;
        color: #fff;
        font-size: 12px;

        .hover-title {
          margin-top: 5px;
          margin-bottom: 0;
        }

        .template-btn {
          text-align: center;

          .create-project {
            width: 60%;
            height: 40px;
            color: #fff;
            font-size: 14px;
            text-align: center;
            background: #019ba7;
            border-radius: 2px;
            border: 0;
            appearance: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            outline: none;
          }

          .edit-project {
            width: 60%;
            height: 40px;
            margin-top: 29px;
            background: #019ba7;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }

      .hover-info {
        height: 44px;
        line-height: 44px;
        color: #fff;
        font-size: 14px;
        background: #05233e;
      }
    }
  }

  .choose-info {
    float: left;
    width: 100%;
    height: 33px;
    line-height: 33px;
    background: #05233d;

    .define-checkbox {
      float: right;
      padding-right: 14px;

      ::v-deep .ant-checkbox-inner {
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

    .choose-name {
      width: 80%;
      padding-left: 14px;
      font-size: 14px;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
    }
  }
}
.no-data-area {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
}

.no-data {
  width: 228px;
  height: 110px;
  background-size: 100%;
  background-position: center;
  background-image: url("../assets/images/nodata.png");
}

::v-deep .ant-pagination-total-text {
  color: #fff;
  font-size: 14px;
}

::v-deep .ant-pagination-item {
  background: #071426;
  border: 1px solid #0e3753;
  border-radius: 2px;

  &:hover {
    color: #00fcff;
    border: 1px solid #019ba7;
  }

  a {
    color: #fff;
  }
}

::v-deep .ant-pagination-prev,
::v-deep .ant-pagination-next {
  .ant-pagination-item-link {
    background: #071426;
    border: 1px solid #0e3753;
    border-radius: 2px;

    .anticon-left,
    .anticon-right {
      color: #fff;
    }
  }
}

::v-deep .ant-pagination-item-active {
  color: #fff !important;
  background: #019ba7 !important;

  a {
    color: #fff;
  }
}

::v-deep .ant-pagination-options-quick-jumper {
  color: #fff;

  input {
    width: 32px;
    height: 32px;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
    background-color: #071426;
    background-image: none;
    border: 1px solid #0e3753;
  }
}

::v-deep .ant-pagination {
  float: unset;
  text-align: center;
}

::v-deep .ant-select-selection__clear {
  color: #fff !important;
  background: #0e3753 !important;
}
</style>
