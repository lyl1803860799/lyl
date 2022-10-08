<template>
  <section class="page-create-app" v-loading="loading">
    <header class="header">
      <div class="head-back">
        <span class="back-prev" @click="handleBack" style="margin-rigth:5px;"></span>
        <span style="padding-left:7px;">
          <a-breadcrumb>
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>频道管理</a-breadcrumb-item>
            <a-breadcrumb-item>频道{{pageId?'编辑':'新增'}}</a-breadcrumb-item>
          </a-breadcrumb>
        </span>
      </div>

      <div class="header__title">
        <i class="back-icon"></i>
        <span class="header__title-text">{{ pageInfo.dataViewName }}</span>
        <a-tooltip title="编辑" placement="bottom"><span class="edit" @click="editName"></span></a-tooltip>
      </div>
      <div class="header__btns">
        <!-- <a-tooltip placement="bottom" title="我的数据" overlayClassName="overlay-class-name">
          <div class="header__btns-item data"></div>
        </a-tooltip>-->
        <!-- <a-tooltip placement="bottom" title="撤回" overlayClassName="overlay-class-name">
          <a
            v-show="historyList"
            href="javascript:void(0);"
            class="header__btns-item withdraw"
            @click="handleWithdraw"
          ></a>
        </a-tooltip>-->
        <a href="javascript:void(0);" class="header__btns-item setting" @click="handleSetting">
          <img :src="settingIcon" />
          <span>频道设置</span>
        </a>
        <a href="javascript:void(0);" class="header__btns-item preview" @click="handlePreview">
          <img :src="previewIcon" />
          <span>预览</span>
        </a>
        <a href="javascript:void(0);" class="header__btns-item save" @click="handleSave(true)">
          <img :src="saveIcon" />
          <span>保存</span>
        </a>
        <!-- <a-tooltip placement="bottom" title="发布" overlayClassName="overlay-class-name">
          <a href="javascript:void(0);" class="header__btns-item publish" @click="handlePublish"></a>
        </a-tooltip>
        <a-tooltip placement="bottom" title="发布管理" overlayClassName="overlay-class-name">
          <a href="javascript:void(0);" class="header__btns-item release" @click="handleRelease"></a>
        </a-tooltip>-->
      </div>
    </header>
    <main class="main">
      <a-tooltip placement="bottom" :title="collapse.right ? '展开配置面板' : '收起配置面板'">
        <div
          :class="`icon icon-right ${collapse.right ? 'collapse' : ''}`"
          :style="{right:collapse.right?0:iconRight}"
          @click="handleCollapse('right')"
        ></div>
      </a-tooltip>

      <section class="main-content" @click="handleSetting">
        <div class="main-content__body">
          <div class="scroll-content" :style="contentStyle">
            <div class="scale-box" ref="scroll-box" :style="scaleStyle" @click="handleSetting2">
              <template v-for="(element, i) in list1">
                <div
                  class="component-wrapper"
                  v-if="element.componentName !== 'page404'"
                  :key="`${element.option.domId}_${i}`"
                  :style="element.wrapperStyle"
                >
                  <component
                    :is="element.componentName"
                    :ref="element.option.domId"
                    :options="element.option"
                  ></component>
                </div>
                <div
                  v-else
                  :key="`${element.componentName}_${i}`"
                >
                  <component
                    :is="element.componentName"
                  ></component>
                </div>
              </template>
            </div>
          </div>
          <div class="rule rule-starter"></div>
          <div class="rule rule-x">
            <canvas-ruler
              domId="x-ruler"
              :start="rulerStart.x"
              :dom-width="viewWidth + 20"
              :width="scalePageOption.screenSize.width"
              :scale="sliderVal / 100"
              :height="20"
              :dom-height="20"
              :type="1"
              :startIndex="scrollBoxVal.left"
            ></canvas-ruler>
          </div>
          <div class="rule rule-y">
            <canvas-ruler
              domId="y-ruler"
              :start="rulerStart.y"
              :width="20"
              :dom-width="20"
              :dom-height="ruleYHeight"
              :height="scalePageOption.screenSize.height - rulerStart.y"
              :scale="sliderVal / 100"
              :type="2"
              :startIndex="scrollBoxVal.top"
            ></canvas-ruler>
          </div>
        </div>
      </section>
      <section class="main-right" v-show="!collapse.right">
        <template v-if="!showSetting">
          <header class="main-right-header">
            <div style="color:#00fcff;">节目播放设置</div>
          </header>
          <section class="main-right-body">
            <div class="tab-card">
              <channel-program-opt
                :defaultOpt="channelDataList[currentProgramIndex-1]"
                @program-option-change="handleProgramOptionChange"
              ></channel-program-opt>
            </div>
          </section>
        </template>
        <template v-if="showSetting">
          <header class="main-right-header">
            <div style="color:#00fcff;">频道设置</div>
          </header>
          <section class="main-right-body">
            <channel-page-opt
              :title="'频道分组'"
              :defaultOpt="channelPageOption"
              @screen-size-change="handleResize"
              @page-option-change="handlePageOptionChange"
            ></channel-page-opt>
          </section>
        </template>
      </section>
    </main>
    <footer class="footer">
      <div class="program-info" @click="handleSetting">
        <div class="define-card-title">节目单</div>
        <div class="program-data">
          <span class="program-num">
            第
            <font>{{currentProgramIndex}}</font> 个节目 / 共
            <font>{{channelDataList.length}}</font> 个节目
          </span>
          <span style="float:left;padding-left:46px;">
            <a-tooltip title="新增" placement="bottom">
              <span class="program-add-icon" @click="showProgramDialog()" />
            </a-tooltip>
            <a-tooltip title="编辑" placement="bottom" v-if="channelDataList.length">
              <span class="program-edit-icon" @click="eidtProgramModal()"/>
            </a-tooltip>
            <a-tooltip title="编辑" placement="bottom" v-else>
              <span class="program-disabled-edit-icon"/>
            </a-tooltip>
            <a-tooltip title="删除" placement="bottom" v-if="channelDataList.length">
              <span class="program-delete-icon" @click="deleteProgramModal()" />
            </a-tooltip>
            <a-tooltip title="删除" placement="bottom" v-else>
              <span class="program-disabled-delete-icon" />
            </a-tooltip>
          </span>
        </div>
      </div>
      <!-- <div class="program-time-range" @click="handleSetting">
        <div v-for="data in channelDataList" :key="data.uuid">

        </div>
      </div> -->
      <div class="program-swiper-list">
        <div class="mySwiper">
          <draggable
            v-model="channelDataList"
            class="drag"
            @end="onEnd"
            animation="300"
            filter=".forbid"
            :move="onMove"
          >
            <transition-group>
              <div
                class="mySwiper-slide"
                :class="{active:currentProgramId === data.uuid}"
                v-for="(data,index) in channelDataList"
                :key="data.uuid"
              >
                <div
                  class="choose-program"
                  :style="{backgroundImage:'url('+data.programSnapshot+')'}"
                  @click="chooseOneProgram(data,index)"
                >
                  <div class="choose-program-time">
                    {{data.playTime}}
                    <span v-if="data.playTimeType==='hour'">小时</span>
                    <span v-if="data.playTimeType==='minute'">分钟</span>
                    <span v-if="data.playTimeType==='sceond'">秒</span>
                  </div>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </footer>
    <bi-dialog
      v-if="visibleEditName"
      title="编辑频道名称"
      okString="确定"
      @cancel="cancelEditName"
      @submit="submitEditName"
    >
      <a-form-model
        ref="ruleForm"
        :model="editNameForm"
        :rules="rules"
        labelAlign="right"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="频道名称" prop="dataViewName">
          <a-input
            v-model.trim="editNameForm.dataViewName"
            style="width: 280px"
            placeholder="请输入频道名称"
            :max-length="50"
          />
        </a-form-model-item>
        <!-- <a-form-model-item label="频道分组" prop="nodeId">
          <a-select v-model.trim="editNameForm.nodeId" placeholder="请输入分组">
            <a-select-option
              v-for="item in nodeList"
              :key="item.id"
              :value="item.id"
            >{{ item.nodeName }}</a-select-option>
          </a-select>
        </a-form-model-item>-->
      </a-form-model>
    </bi-dialog>

    <bi-dialog class="confirm-dialog" v-if="showConfirm" title="提示" @cancel="closeConfirm">
      <div class="content">您正在编辑中，是否离开编辑页？</div>
      <template slot="footer">
        <div class="btn cancel" @click="closeConfirm">取消</div>
        <div class="btn leave-or-save" @click="submit(true)">离开并保存</div>
        <div class="btn leave-or-save" @click="submit">离开不保存</div>
      </template>
    </bi-dialog>

    <a-modal
      class="define-modal"
      title="删除确认"
      :visible="delProgramVisible"
      :confirmLoading="delProgramConfirmLoading"
      @ok="deleteProgram"
      @cancel="deleteProgarmCancel"
    >
      <div style="display:flex;align-items: center;">
        <div>
          <a-icon type="question-circle" style="color: #faad14;font-size:20px;" />
        </div>
        <div style="padding-left:10px;color:#fff;font-size: 16px;">删除确认</div>
      </div>
      <div
        style="text-align:left;margin-top:10px;padding-left:30px;color:#fff;font-size: 14px;"
      >是否确认删除该节目？</div>
    </a-modal>

    <a-modal
      class="define-modal"
      title="保存提示"
      :visible="editProgramVisible"
      :confirmLoading="delProgramConfirmLoading"
      @cancel="cancelModal"
      :okText="'保存'"
      :cancelText="'不保存'"
    >
      <div style="display:flex;align-items: center;">
        <div>
          <a-icon type="question-circle" style="color: #faad14;font-size:20px;" />
        </div>
        <div style="padding-left:10px;color:#fff;font-size: 16px;">保存确认</div>
      </div>
      <div
        style="text-align:left;margin-top:10px;padding-left:30px;color:#fff;font-size: 14px;"
      >是否保存当前频道设置信息？</div>
      <template slot="footer">
        <a-button key="back" @click="cancelSave">
          不保存
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="saveChannel">
          保存
        </a-button>
      </template>
    </a-modal>

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
            rowKey="unqiId"
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
                    <div class="hover-info">
                      <span class="choose-name">
                        <a-tooltip :title="record.programName" placement="bottom">{{record.programName}}</a-tooltip> 
                      </span>
                    </div>
                  </div>
                </div>
                <div class="choose-info">
                  <span class="choose-name">
                    <a-tooltip :title="record.programName" placement="bottom">{{record.programName}}</a-tooltip> 
                  </span>
                  <span>
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
          <p style="color:#c32c2c;font-size:12px;">提示：为确保节目的播放效果，建议同一个频道下的节目分辨率保持一致</p>
        </a-col>
      </a-row>
    </a-modal>

    <div
      id="view-scroll-content"
      class="scroll-content"
      v-show="isShowPrev"
      v-loading="fullScreenLoading"
    >
      <div class="swiper previewSwiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(data,index) in previewConfigList"
            :key="data.id+'_'+index"
            :data-swiper-autoplay="data.time"
          >
            <div class="scale-box" :style="data.contentStyle">
              <template v-for="(element, i) in data.list1">
                <div
                  class="component-wrapper"
                   v-if="element.componentName !== 'page404'"
                  :key="`${element.option.domId}_${i}`"
                  :style="element.wrapperStyle"
                >
                  <component
                    :is="element.componentName"
                    :ref="element.option.domId"
                    :options="element.option"
                  ></component>
                </div>
                <div
                   v-else
                  :key="`${element.componentName}_${i}`"
                >
                  <component
                    :is="element.componentName"
                  ></component>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="close-container" data-title="退出全屏" @click="exitScreen"></div>
    </div>
  </section>
</template>

<script>
import addOrEditChannel from "./addOrEditChannel.js";
export default addOrEditChannel;
</script>
<style lang="scss">
@import "@/styles/common.scss";
</style>
<style lang="scss" scoped>
@import "./addOrEditChannel.scss";
@import "./newChannel.scss";
</style>

<style lang="scss">
.ant-select-dropdown {
  &.create-app-select {
    background-color: $db40 !important;
    border: 1px solid $db46 !important;
    .ant-select-dropdown-menu-item {
      color: $white;
      &-selected,
      &:hover {
        background-color: $db47 !important;
        color: $brightGreen !important;
      }
    }
    .ant-select-dropdown-menu {
      background: none;
    }
  }
}
.close-container {
  height: 20px;
  width: 20px;
  background-image: url(~@/assets/icon/exit.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  position: absolute;
  right: 40px;
  top: 40px;
  border-radius: 50%;
  z-index: 9999;
  cursor: pointer;

  &:hover {
    background-image: url(~@/assets/icon/exit-a.png);

    &:after {
      position: absolute;
      right: -10px;
      bottom: -40px;
      content: attr(data-title);
      color: #00fcff;
      border: 1px solid #00fcff;
      padding: 6px 11px;
      min-height: 16px;
      line-height: 16px;
      white-space: nowrap;
      word-break: keep-all;
    }
  }
}

.define-radio {
  float: left;
  width: 40%;
  margin-top: 17px;
}
</style>
