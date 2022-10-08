<template>
  <section class="chart-component">
    <div v-if="type==='design'">
      <button id="searchImgVideo" style="display:none;" @click="searchInfo">111</button>
      <div class="chart-component-list" style="padding:0 16px;">
        <div
          class="component-btn"
          draggable="true"
          :key="totalComponent['word'][0]['value'][1].id"
          @click="handleDragStart(totalComponent['word'][0]['value'][1], 'click')"
          @dragstart="handleDragStart(totalComponent['word'][0]['value'][1])"
          @dragend="handleDragEnd"
        >
          <img :src="textIcon" />
          <span>文本</span>
        </div>

        <div
          class="component-btn margin-left10"
          draggable="true"
          :key="totalComponent['word'][0]['value'][2].id"
          @click="handleDragStart(totalComponent['word'][0]['value'][2], 'click')"
          @dragstart="handleDragStart(totalComponent['word'][0]['value'][2])"
          @dragend="handleDragEnd"
        >
          <img :src="timeIcon" />
          <span>时间</span>
        </div>

        <div
          class="component-btn margin-left10"
          draggable="true"
          :key="totalComponent['weather'][0]['value'][0].id"
          @click="handleDragStart(totalComponent['weather'][0]['value'][0], 'click')"
          @dragstart="handleDragStart(totalComponent['weather'][0]['value'][0])"
          @dragend="handleDragEnd"
        >
          <img :src="weatherIcon" />
          <span>天气</span>
        </div>

         <div
          class="component-btn margin-top10"
          draggable="true"
          :key="totalComponent['news'][0]['value'][2].id"
          @click="handleDragStart(totalComponent['news'][0]['value'][2], 'click')"
          @dragstart="handleDragStart(totalComponent['news'][0]['value'][2])"
        >
          <img :src="flashIcon" />
          <span>快讯</span>
        </div>

        <div
          class="component-btn margin-top10 margin-left10"
          draggable="true"
          :key="totalComponent['news'][0]['value'][0].id"
          @click="handleDragStart(totalComponent['news'][0]['value'][0], 'click')"
          @dragstart="handleDragStart(totalComponent['news'][0]['value'][0])"
          @dragend="handleDragEnd"
        >
          <img :src="newsIcon" />
          <span>资讯1</span>
        </div>

        <div
          class="component-btn margin-top10 margin-left10"
          draggable="true"
          :key="totalComponent['price'][0]['value'][0].id"
          @click="handleDragStart(totalComponent['price'][0]['value'][0], 'click')"
          @dragstart="handleDragStart(totalComponent['price'][0]['value'][0])"
        >
          <img :src="priceIcon" />
          <span>行情</span>
        </div>

        <div
          class="component-btn margin-top10"
          draggable="true"
          :key="totalComponent['more'][0]['value'][0].id"
          @click="handleDragStart(totalComponent['more'][0]['value'][0], 'click')"
          @dragstart="handleDragStart(totalComponent['more'][0]['value'][0])"
        >
          <img :src="linkIcon" />
          <span>链接</span>
        </div>

        <div
          class="component-btn margin-top10 margin-left10"
          draggable="true"
          :key="totalComponent['news'][0]['value'][1].id"
          @click="handleDragStart(totalComponent['news'][0]['value'][1], 'click')"
          @dragstart="handleDragStart(totalComponent['news'][0]['value'][1])"
          @dragend="handleDragEnd"
        >
          <img :src="informationIcon" />
          <span>热榜</span>
        </div>

        <div
          class="component-btn margin-top10 margin-left10"
          draggable="true"
          :key="totalComponent['news'][0]['value'][3].id"
          @click="handleDragStart(totalComponent['news'][0]['value'][3], 'click')"
          @dragstart="handleDragStart(totalComponent['news'][0]['value'][3])"
          @dragend="handleDragEnd"
        >
          <img :src="newsIcon" />
          <span>资讯2</span>
        </div>
      </div>

      <div class="material-data" style="padding:0 16px;" v-loading="materialLoading">
        <div class="material-list" v-for="record in materialData" :key="record.uuid">
          <div
            class="choose-list"
            v-if="record.materialType==='pic'"
            draggable="true"
            @click="handleFindImgData(record.id, 'click')"
            @dragstart="handleFindImgData(record.id)"
            @dragend="handleDragEnd"
          >
            <!-- <div
              class="choose-pic"
              :style="{backgroundImage:'url('+record.materialThumbnail+')',cursor:'move'}"
            ></div>-->
            <img class="choose-pic" v-lazy="record.materialThumbnail" />
            <div class="choose-info">
              <span class="choose-name">
                <a-tooltip
                  placement="bottomLeft"
                  :title="record.materialName"
                >{{record.materialName}}</a-tooltip>
              </span>
            </div>
          </div>
          <div
            class="choose-list"
            v-if="record.materialType==='video'"
            draggable="true"
            @click="handleFindVideoData(record.id, 'click')"
            @dragstart="handleFindVideoData(record.id)"
            @dragend="handleDragEnd"
          >
            <!-- <div
              class="choose-pic"
              :style="{backgroundImage:'url('+record.materialThumbnail+')',cursor:'move'}"
            >
              <img :src="playVideoIcon" class="play-video" />
            </div>-->
            <img class="choose-pic" v-lazy="record.materialThumbnail" />
            <img :src="playVideoIcon" class="play-video" />
            <div class="choose-info">
              <span class="choose-name">
                <a-tooltip
                  placement="bottomLeft"
                  :title="record.materialName"
                >{{record.materialName}}</a-tooltip>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type==='chart'">
      <div class="chart-component-list chart-table-list" style="margin-top:0;">
        <div
          class="chart-component-btn"
          draggable="true"
          :key="totalComponent['word'][0]['value'][0].id"
          @click="handleDragStart(totalComponent['word'][0]['value'][0], 'click')"
          @dragstart="handleDragStart(totalComponent['word'][0]['value'][0])"
          @dragend="handleDragEnd"
        >
          <img :src="swiperTableIcon" style="width:117px;height:84px;border-bottom:1px solid #0e3753;" />
          <span style="margin-top:10px;color:#00fcff;line-height: 32px;">指标表格</span>
        </div>
      </div>
      
      <div class="chart-component-list chart-table-list" style="margin-top:0;margin-left:10px;">
        <div
          class="chart-component-btn"
          draggable="true"
          :key="totalComponent['word'][0]['value'][3].id"
          @click="handleDragStart(totalComponent['word'][0]['value'][3], 'click')"
          @dragstart="handleDragStart(totalComponent['word'][0]['value'][3])"
          @dragend="handleDragEnd"
        >
          <img :src="indexBoardIcon" style="width:117px;height:84px;border-bottom:1px solid #0e3753;" />
          <span style="margin-top:10px;color:#00fcff;line-height: 32px;">指标看板</span>
        </div>
      </div>

      <div class="chart-component-list chart-table-list">
        <div
          class="chart-component-btn"
          draggable="true"
          :key="totalComponent['word'][0]['value'][4].id"
          @click="handleDragStart(totalComponent['word'][0]['value'][4], 'click')"
          @dragstart="handleDragStart(totalComponent['word'][0]['value'][4])"
          @dragend="handleDragEnd"
        >
          <img :src="futuresTableIcon" style="width:117px;height:84px;border-bottom:1px solid #0e3753;" />
          <span style="margin-top:10px;color:#00fcff;line-height: 32px;">期货表格</span>
        </div>
      </div>

      <div class="chart-component-list chart-table-list" style="margin-left:10px;">
        <div
          class="chart-component-btn"
          draggable="true"
          :key="totalComponent['word'][0]['value'][5].id"
          @click="handleDragStart(totalComponent['word'][0]['value'][5], 'click')"
          @dragstart="handleDragStart(totalComponent['word'][0]['value'][5])"
          @dragend="handleDragEnd"
        >
          <img :src="futuresBoardIcon" style="width:117px;height:84px;border-bottom:1px solid #0e3753;" />
          <span style="margin-top:10px;color:#00fcff;line-height: 32px;">期货看板</span>
        </div>
      </div>

      <div class="chart-component-list chart-table-list">
        <div
          class="chart-component-btn"
          draggable="true"
          :key="totalComponent['chart'][3]['value'][0].id"
          @click="handleDragStart(totalComponent['chart'][3]['value'][0], 'click')"
          @dragstart="handleDragStart(totalComponent['chart'][3]['value'][0])"
          @dragend="handleDragEnd"
        >
          <img :src="mapIcon" style="width:117px;height:84px;border-bottom:1px solid #0e3753;" />
          <span style="margin-top:10px;color:#00fcff;line-height: 32px;">行情地图</span>
        </div>
      </div>

      <div class="chart-component-list chart-table-list" style="margin-left:10px;">
        <div
          class="chart-component-btn"
          draggable="true"
          :key="totalComponent['chart'][0]['value'][0].id"
          @click="handleDragStart(totalComponent['chart'][0]['value'][0], 'click')"
          @dragstart="handleDragStart(totalComponent['chart'][0]['value'][0])"
          @dragend="handleDragEnd"
        >
          <img :src="barIcon" style="width:117px;height:84px;border-bottom:1px solid #0e3753;" />
          <span style="margin-top:10px;color:#00fcff;line-height: 32px;">柱状图</span>
        </div>
      </div>

      <div class="chart-component-list chart-table-list">
        <div
          class="chart-component-btn"
          draggable="true"
          :key="totalComponent['chart'][1]['value'][0].id"
          @click="handleDragStart(totalComponent['chart'][1]['value'][0], 'click')"
          @dragstart="handleDragStart(totalComponent['chart'][1]['value'][0])"
          @dragend="handleDragEnd"
        >
          <img :src="lineIcon" style="width:117px;height:84px;border-bottom:1px solid #0e3753;" />
          <span style="margin-top:10px;color:#00fcff;line-height: 32px;">曲线图</span>
        </div>
      </div>

      <div class="chart-component-list chart-table-list" style="margin-left:10px;">
        <div
          class="chart-component-btn"
          draggable="true"
          :key="totalComponent['chart'][0]['value'][3].id"
          @click="handleDragStart(totalComponent['chart'][0]['value'][3], 'click')"
          @dragstart="handleDragStart(totalComponent['chart'][0]['value'][3])"
          @dragend="handleDragEnd"
        >
          <img :src="doubleAxisIcon" style="width:117px;height:84px;border-bottom:1px solid #0e3753;" />
          <span style="margin-top:10px;color:#00fcff;line-height: 32px;">双轴图</span>
        </div>
      </div>

      <!-- 限制账号 v-if="accountName === 'chengzongliang' || accountName === 'M88191893' || accountName === 'M8850513' || accountName === 'lumengting' || accountName === 'M8850489'"  -->
      <div v-if="accountName === 'lumengting' || accountName === 'M8850489' || accountName === 'M8850519' || accountName === 'M8850476'" class="chart-component-list chart-table-list" 
        style="margin-left:10px;">
        <div
          class="chart-component-btn"
          draggable="true"
          :key="totalComponent['word'][0]['value'][6].id"
          @click="handleDragStart(totalComponent['word'][0]['value'][6], 'click')"
          @dragstart="handleDragStart(totalComponent['word'][0]['value'][6])"
          @dragend="handleDragEnd"
        >
          <img :src="swiperTableIcon" style="width:117px;height:84px;border-bottom:1px solid #0e3753;" />
          <span style="margin-top:10px;color:#00fcff;line-height: 32px;">实时行情</span>
        </div>
      </div>
    </div>

    <!-- <ul class="chart-component__header-wrapper">
      <li
        :class="`chart-component__header-title ${activeKey === index ? 'active' : ''}`"
        v-for="(panel, index) in list2"
        :key="`${index + 1}`"
        @click="handleClick(index)"
      >
        {{ panel.header }}
      </li>
    </ul>
    <div class="chart-component__body-wrapper">
      <div class="upload-btn-wrapper m-top-20" v-if="curPanel.slot === 'img'">
        <a-upload
          name="file"
          accept="image/*"
          :showUploadList="false"
          :customRequest="customRequest"
          @change="handleChange"
        >
          <add-btn title="点击上传图片"> </add-btn>
        </a-upload>
      </div>
      <div class="drag-area">
        <div
          v-for="(element, i) in curPanel.value"
          draggable="true"
          :key="element.id + curPanel.header + i"
          class="drag-item"
          @click="handleDragStart(element, 'click')"
          @dragstart="handleDragStart(element)"
          @dragend="handleDragEnd"
        >
          <a-tooltip :title="element.title.name">
            <div class="drag-item-handle2">{{ element.title.name }}</div>
          </a-tooltip>
          <div class="drag-icon" :style="{ backgroundImage: `url(${element.img})` }"></div>
          <div
            class="drag-item-del"
            v-if="curPanel.slot === 'img'"
            @click.stop="handleDel(element)"
          ></div>
        </div>
      </div>
    </div>-->
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { queryAssembly } from "@/api/myCom";
import { queryMaterialData } from "@/api/material";
import { list } from "@/utils/constants";
import textIcon from "@/assets/images/text.png";
import timeIcon from "@/assets/images/time.png";
import weatherIcon from "@/assets/images/weather.png";
import newsIcon from "@/assets/images/news.png";
import priceIcon from "@/assets/images/price.png";
import flashIcon from "@/assets/images/flash.png";
import informationIcon from "@/assets/images/information.png";
import linkIcon from "@/assets/images/link.png";
import playVideoIcon from "@/assets/images/playVideo.png";
import swiperTableIcon from "@/assets/images/swiperTable.png";
import indexBoardIcon from "@/assets/images/indexBoard.png";
import futuresTableIcon from "@/assets/images/futuresTable.png";
import futuresBoardIcon from "@/assets/images/futuresBoard.png";
import mapIcon from "@/assets/images/map.png";
import barIcon from "@/assets/images/bar.png";
import lineIcon from "@/assets/images/line.png";
import doubleAxisIcon from "@/assets/images/doubleAxis.png";
import * as uuid from "uuid/v1";

export default {
  name: "ChartComponent",
  props: {
    type: {
      type: String,
      default: "design"
    },
    active: {
      type: String,
      default: "chart"
    }
  },
  //components: { addBtn },
  data() {
    const self = this;
    return {
      textIcon,
      timeIcon,
      weatherIcon,
      informationIcon,
      flashIcon,
      newsIcon,
      priceIcon,
      linkIcon,
      playVideoIcon,
      swiperTableIcon,
      indexBoardIcon,
      futuresTableIcon,
      futuresBoardIcon,
      mapIcon,
      barIcon,
      lineIcon,
      doubleAxisIcon,
      activeKey: 0,
      totalComponent: list,
      list2: [],
      materialData: null,
      materialLoading: true,
      materialFlag: false,
      imgList: [],
      videoList: [],
      searchKey: "",
      accountName:self.$store.state.user.userName
    };
  },
  computed: {
    curPanel() {
      return this.list2[this.activeKey] || {};
    }
  },
  watch: {
    active: {
      immediate: true,
      handler(val) {
        if (val) {
          this.activeKey = 0;
          this.setList2();
        }
      }
    }
  },
  methods: {
    ...mapActions(["setComponentList"]),
    handleDragStart(el, action) {
      this.$emit("dragstart", { el, action });
    },
    handleDragEnd() {
      this.$emit("dragend");
    },
    handleFindImgData(id, type) {
      let el = null;
      this.imgList.map(item => {
        if (item.sourceId === id) {
          el = item;
        }
      });
      this.handleDragStart(el, type);
    },
    handleFindVideoData(id, type) {
      let el = null;
      this.videoList.map(item => {
        if (item.sourceId === id) {
          el = item;
        }
      });
      this.handleDragStart(el, type);
    },
    chooseSearch(e) {
      //this.searchKey = e;
      let btn = document.getElementById("searchImgVideo");
      if (btn) {
        btn.setAttribute("data", e);
        btn.click();
      }
    },
    searchInfo() {
      this.materialFlag = false;
      this.materialLoading = true;
      this.getMaterialData("all");
    },
    async getMaterialData(type) {
      let btn = document.getElementById("searchImgVideo");
      let searchKey = btn.getAttribute("data");
      const { data } = await queryMaterialData({
        groupType: type,
        namePrefix: searchKey,
        groupOwnerId: 0,
        pageNum: 1,
        pageSize: 50
      });
      let resDatas = data && data.list ? data.list : [];
      let imgList = [];
      let videoList = [];
      resDatas.map((item, index) => {
        item.uuid = uuid();
        if (item.materialType === "pic") {
          imgList.push({
            id: `image-style${index}`,
            componentName: "bi-image",
            title: {
              name: item.materialName,
              style: { fontFamily: "sans-serif", fontSize: 14 }
            },
            img: item.materialContent,
            sourceId: item.id,
            contentOption: {
              width: 200,
              height: 200,
              style: {
                rotate: 0,
                borderRadius: 0,
                opacity: 1,
                boxShadow: {
                  h: 0,
                  v: 0,
                  blur: 0,
                  color: "#ffffff"
                }
              },
              data: item.materialContent
            }
          });
        } else {
          videoList.push({
            id: `video-style${index}`,
            componentName: "bi-video",
            title: {
              name: item.materialName,
              style: { fontFamily: "sans-serif", fontSize: 14 }
            },
            data: item.materialContent,
            sourceId: item.id,
            contentOption: {
              data: item.materialContent,
              loop: true,
              muted: true
            }
          });
        }
      });
      this.materialFlag = true;
      this.materialLoading = false;
      this.imgList = JSON.parse(JSON.stringify(imgList));
      this.videoList = JSON.parse(JSON.stringify(videoList));
      this.totalComponent.report[0].value = JSON.parse(JSON.stringify(imgList));
      this.setComponentList(this.totalComponent);
      let materialData = JSON.parse(JSON.stringify(resDatas));
      this.$nextTick(() => {
        this.$set(this, "materialData", materialData);
        this.$forceUpdate();
      });
    },
    setList2() {
      let all = null;
      const list = this.totalComponent[this.active];
      if (list.length > 1) {
        all = {
          header: "全部",
          value: list.reduce((pre, next) => {
            return pre.concat(...next.value);
          }, [])
        };
      }
      if (list.length === 0) {
        all = {
          header: "全部",
          value: []
        };
      }
      this.list2 = [all, ...list].filter(item => item);
    },
    // async customRequest(param) {
    //   const pramas = {
    //     file: param.file
    //   };
    //   const { data } = await dataSourceFileUpload(pramas);
    //   this.$message.success("上传成功");
    //   this.fileUrl = data.fileUrl;
    //   let sourceParams = {
    //     sourceName: data.fileName || "图片",
    //     sourceType: 1,
    //     sourceUrl: data.fileUrl,
    //     setJson: JSON.stringify({
    //       ...imageOption.call(this),
    //       data: data.fileUrl
    //     })
    //   };
    //   await createSource(sourceParams);
    //   this.getImageList();
    // },
    handleChange() {},
    // 获取图片列表
    async getImageList(isMouted = false) {
      const { data } = { data: { list: null } };
      // await getSourceList({
      //   sourceType: 1,
      //   pageSize: 10000,
      //   pageNum: 1
      // })
      const imgList = this.totalComponent.report || [];
      imgList.map(item => {
        if (item.slot === "img") {
          item.value = (data.list || []).map((listItem, i) => {
            return {
              id: `image-style${i}`,
              componentName: "bi-image",
              title: {
                name: listItem.sourceName,
                style: { fontFamily: "sans-serif", fontSize: 14 }
              },
              img: listItem.sourceUrl,
              sourceId: listItem.id,
              contentOption:
                (listItem.setJson && JSON.parse(listItem.setJson)) || {}
            };
          });
        }
        return item;
      });
      if (!isMouted) {
        this.setComponentList(this.totalComponent);
      }
    },
    // 获取收藏列表
    async getSavedComponent(isMouted = false) {
      const { data } = await queryAssembly({
        assemblyName: "",
        pageSize: 10000,
        pageNum: 1
      });
      const saveList = this.totalComponent.save || [];
      saveList.map(item => {
        if (item.slot === "save") {
          item.value = (data.list || [])
            .filter(filterItem => {
              try {
                JSON.parse(filterItem.assemblyJson);
                return true;
              } catch {
                return false;
              }
            })
            .map((listItem, index) => {
              const itemDetail = listItem.assemblyJson
                ? JSON.parse(listItem.assemblyJson)
                : {};
              if (itemDetail.option.dataConfig) {
                const editorContent =
                  itemDetail.option?.dataConfig?.dataSource?.editorContent;
                const dataContent =
                  itemDetail.option?.dataConfig?.dataSource?.dataContent;
                itemDetail.option.dataConfig = {
                  ...itemDetail.option.dataConfig,
                  dataSource: {
                    ...itemDetail.option.dataConfig.dataSource,
                    editorContent:
                      typeof editorContent === "object"
                        ? JSON.stringify(editorContent)
                        : editorContent,
                    dataContent:
                      typeof dataContent === "object"
                        ? JSON.stringify(dataContent)
                        : dataContent
                  }
                };
              }
              itemDetail.title.name = listItem.assemblyName;
              itemDetail.option.title.name = listItem.assemblyName;
              return {
                ...listItem,
                ...itemDetail,
                img: listItem.snapshot,
                id: `${itemDetail.id}${index}`
              };
            });
        }
        return item;
      });
      if (!isMouted) {
        this.setComponentList(this.totalComponent);
      }
    },
    // 删除图片
    // handleDel({ sourceId }) {
    //   this.$confirm({
    //     title: "提示",
    //     content: "是否确认删除该图片？",
    //     onOk: async () => {
    //       await delSource({ id: sourceId });
    //       this.$message.success("删除成功");
    //       this.getImageList();
    //     },
    //     onCancel() {}
    //   });
    // },
    handleClick(index) {
      this.activeKey = index;
    }
  },
  async mounted() {
    if (this.type === "design") {
      await this.getMaterialData("all", null);
    }
    await this.getImageList(true);
    //await this.getSavedComponent(true)
    this.setComponentList(this.totalComponent);
  }
};
</script>
<style>
img[src=""],
img:not([src]) {
  opacity: 0;
}
/* img[lazy="loading"] {
		width: 30px!important;
		height: 30px!important;
} */
</style>
<style lang="scss" scoped>
.chart-table-list {
  float: left;
  width: 119px;
  height: 118px;
  border: 1px solid #0e3753;
  border-radius: 2px;
  &:hover{
    border: 1px solid #00fcff;
  }
}
.chart-component {
  display: block;
  // background: $db37;
  color: $white;
  height: 100%;
  overflow: hidden;

  .material-data {
    float: left;
    width: 100%;
    height: calc(100vh - 350px);
    overflow-y: auto;
    .material-list {
      float: left;
      width: 116px;
      height: 118px;
      margin-top: 10px;
      border: 1px solid #0e3753;
      border-radius: 2px;
      .choose-list {
        position: relative;
        float: left;
        width: 100%;
        height: 118px;
        .choose-pic {
          position: relative;
          float: left;
          width: 100%;
          height: 86px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border-bottom: 1px solid #0e3753;
        }
        .play-video {
          position: absolute;
          left: 50%;
          top: 36%;
          width: 50px;
          height: 50px;
          margin-left: -25px;
          margin-top: -25px;
          cursor: pointer;
        }
        .choose-info {
          float: left;
          width: 100%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #05233d;
          .choose-name {
            width: 95px;
            font-size: 14px;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
            margin: auto;
          }
          .choose-btn {
            float: right;
            margin-right: 14px;
            margin-top: 13px;
          }
        }
      }
      &:hover {
        border: 1px solid #00fcff;
      }
    }

    // .material-list:nth-child(even) {
    //   margin-left: 4px;
    // }

    .material-list:nth-child(odd) {
      margin-left: 10px;
    }
  }

  &-list {
    margin-top: 16px;
    .component-btn {
      float: left;
      width: 76px;
      height: 34px;
      line-height: 34px;
      color: #00fcff;
      text-align: center;
      border: 1px solid #0e3753;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      cursor: move;
      span {
        padding-left: 6px;
      }
      &:hover {
        color: #00fcff;
        background-color: #04233f;
        border: 1px solid #019ba7;
      }
    }
    .chart-component-btn {
      float: left;
      width: 100%;
      height: 118px;
      text-align: center;
      cursor: move;
      img {
        width: 100%;
      }
    }
  }

  &__header-wrapper {
    height: 100%;
    background-color: $db36;
    flex-basis: 62px;
    flex-shrink: 0;
    overflow-y: auto;
  }
  &__header-title {
    height: 56px;
    line-height: 56px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    &.active {
      color: $db33;
      background-color: $db37;
    }
  }
  &__body-wrapper {
    padding: 0 14px;
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }
}
.drag-area {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-bottom: 20px;

  .drag-item {
    width: 100%;
    height: 110px;
    border-radius: 4px;
    margin-top: 20px;
    border: 1px solid $db38;
    cursor: move;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    .drag-item-handle2 {
      height: 24px;
      line-height: 24px;
      padding-left: 10px;
      background: linear-gradient(90deg, #008287, #052549);
      box-shadow: 0px 1px 8px 0px rgba(99, 247, 255, 0.06);
      border-radius: 2px 2px 0px 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .drag-icon {
      flex: 1;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .drag-item-del {
      position: absolute;
      top: 5px;
      right: 10px;
      width: 16px;
      height: 16px;
      z-index: 9;
      display: none;
      background-image: url(../../assets/home-project/delete.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
      cursor: pointer;
      &:hover {
        background-image: url(../../assets/home-project/delete_active.png);
      }
    }
    &:hover {
      border: 2px solid $brightGreen;
      .drag-item-del {
        display: block;
      }
    }
  }
}
.upload-btn-wrapper {
  text-align: center;
  width: 100%;
}

.margin-left10 {
  margin-left: 10px;
}

.margin-top10 {
  margin-top: 10px;
}
</style>
