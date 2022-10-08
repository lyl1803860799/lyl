<template>
  <section class="page-create-app" v-loading="loading">
    <header class="header">
      <div class="head-back">
        <span class="back-prev" @click="handleBack" style="margin-rigth:5px;"></span>
        <span style="padding-left:7px;">
          <a-breadcrumb>
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>节目管理</a-breadcrumb-item>
            <a-breadcrumb-item>节目{{pageId?'编辑':'新增'}}</a-breadcrumb-item>
          </a-breadcrumb>
        </span>
      </div>

      <div class="header__title">
        <i class="back-icon"></i>
        <span class="header__title-text">
          <a-tooltip :title="pageInfo.dataViewName">
            {{ pageInfo.dataViewName }}
          </a-tooltip>
        </span>
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
        <a href="javascript:void(0);" v-if="this.pageId" class="header__btns-item share-hover" @click="openShareModal">
          <img :src="shareHoverIcon" v-if="programLimitType===-1 || programLimitType === null"/>
          <span v-if="programLimitType===-1 || programLimitType === null">共享</span>

          <img :src="sharingIcon" v-if="programLimitType===0 || programLimitType === 1"/>
          <span style="color:#FFCE64" v-if="programLimitType===0 || programLimitType === 1">共享中</span>
        </a>
        <a href="javascript:void(0);" class="header__btns-item setting" @click="handleSetting">
          <img :src="settingIcon" />
          <span>节目设置</span>
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
      <a-tooltip placement="bottom" :title="collapse.left ? '展开组件列表' : '收起组件列表'">
        <div
          :class="`icon icon-left ${collapse.left ? 'collapse' : ''}`"
          @click="handleCollapse('left')"
        ></div>
      </a-tooltip>
      <a-tooltip placement="bottom" :title="collapse.right ? '展开配置面板' : '收起配置面板'">
        <div
          :class="`icon icon-right ${collapse.right ? 'collapse' : ''}`"
          :style="{right:collapse.right?0:iconRight}"
          @click="handleCollapse('right')"
        ></div>
      </a-tooltip>
      <section class="main-left" v-show="!collapse.left">
        <div class="main-left-header">
          <div
            :class="`main-left-header__tab-title ${leftTabActive === 0 ? 'active' : ''}`"
            @click="() => (leftTabActive = 0)"
          >设计</div>
          <div
            :class="`main-left-header__tab-title ${leftTabActive === 1 ? 'active' : ''}`"
            @click="() => (leftTabActive = 1)"
          >图表</div>
        </div>
        <div class="main-left-body" v-show="leftTabActive === 0">
          <div class="main-left-container" style="padding:16px 0;">
            <p style="padding:0 16px;margin-bottom:16px;">
              <a-input-search
                v-model="searchKeys"
                placeholder="输入搜索关键词"
                class="search-input"
                @search="onSearch"
              />
            </p>
            <div class="margin-left-upload-material">
              <a-upload-dragger
                v-decorator="['bgImg']"
                name="file"
                :showUploadList="false"
                :before-upload="beforeUpload"
                :customRequest="customUploadRequest"
                @change="() => {}"
              >
                <p class="ant-upload-drag-icon">
                  <img :src="uploadIcon" class="uplod-pic" />
                  <span class="ant-upload-text">
                    将图片或视频拖到此处或
                    <b class>点击上传</b>
                  </span>
                </p>
              </a-upload-dragger>
            </div>
            <div class="margin-left-chart-component">
              <chart-component
                ref="chartComponent"
                :type="'design'"
                :active="activeMenuKey"
                @dragstart="handleDragStart"
                @dragend="handleDragEnd"
              />
            </div>
          </div>
        </div>
        <div class="main-left-body" v-show="leftTabActive === 1">
          <div class="main-left-container">
            <div class="margin-left-chart-component">
              <chart-component
                ref="chartComponent"
                :type="'chart'"
                :active="activeMenuKey"
                @dragstart="handleDragStart"
                @dragend="handleDragEnd"
              />
            </div>
          </div>
        </div>
      </section>
      <section class="main-content">
        <div class="main-content__body">
          <div
            class="scroll-box"
            ref="scroll-box"
            @scroll="handleScrollBoxScroll"
            :style="scrollBoxStyle"
          >
            <div
              class="scroll-content"
              id="scroll-content"
              :style="contentStyle"
              @click="handleScrollboxCfg"
            >
              <div
                class="scale-box"
                ref="scale-box"
                id="scale-box"
                :style="scaleStyle"
                @drop="handleDrop($event)"
                @dragover="allowDrop($event)"
              >
                <template v-for="(element, i) in list1">
                  <!-- :active="element.active" -->
                  <drag-item
                    :showAction="!showScreenPreview"
                    :x="element.posx"
                    :y="element.posy"
                    :z="element.z"
                    :width="element.option.component.width"
                    :height="element.option.component.height"
                    :key="element.option.domId"
                    :index="i"
                    :active="element.active"
                    :scale="sliderVal / 100"
                    :isdragging="isdragging"
                    @change="handleResizable"
                    @activated="handleActivated"
                    @deactivated="handleDeActivated"
                    @resize="handleItemResize(element.option.domId)"
                    @show-context-menu="handleShowContextMenu($event, i)"
                    @publish="handleComponentPublish"
                    @delete="handleComponentDel"
                    @copy="handleComponentCopy"
                    @isdragging="() => (isdragging = true)"
                    @dragstop="handleDragStop"
                  >
                    <component
                      :is="element.componentName"
                      :ref="element.option.domId"
                      :options="element.option"
                      :isSave="isSave"
                      @data-changed="updateNewsOption($event)"
                    ></component>
                  </drag-item>
                </template>
              </div>
              <div
                class="close-container"
                data-title="退出全屏"
                v-show="showScreenPreview"
                @click="exitScreen"
              ></div>
            </div>
          </div>
          <div class="rule rule-starter"></div>
          <div class="rule rule-x">
            <canvas-ruler
              domId="x-ruler"
              :start="rulerStart.x"
              :dom-width="xRlueWidth + 20"
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
              :dom-height="viewHeight + 20 - rulerStart.y"
              :height="scalePageOption.screenSize.height"
              :scale="sliderVal / 100"
              :type="2"
              :startIndex="scrollBoxVal.top"
            ></canvas-ruler>
          </div>
        </div>
        <div class="main-content__footer">
          <a-select
            :value="selectVal"
            style="width: 120px"
            dropdownClassName="create-app-select"
            @change="handleSelectChange"
            :getPopupContainer="(trigger) => trigger.parentNode"
          >
            <a-select-option
              v-for="item in items"
              :key="item.label"
              :value="item.value"
            >{{ item.label }}</a-select-option>
          </a-select>
          <div class="slider-container">
            <a-icon type="minus" @click="changeSlideVal(-1)" class="slider-icon" />
            <a-slider
              :value="sliderVal"
              :min="1"
              :max="300"
              :step="1"
              @change="handleSliderChange"
              @afterChange="handleChanged"
            />
            <a-icon type="plus" @click="changeSlideVal(1)" class="slider-icon" />
          </div>
        </div>
        <template v-if="showRefLine && curEl">
          <div
            class="drag-ref-line left fadeIn"
            :style="`left: ${rulerStart.x + 20 + ((curEl.posx || 0) * sliderVal) / 100 - pageScrollLeft}px`"
          ></div>
          <div
            class="drag-ref-line right fadeIn"
            :style="
              `left: ${rulerStart.x  + 20 + ((curEl.posx + curEl.width || 0) * sliderVal) / 100 - pageScrollLeft}px`
            "
          ></div>
          <div
            class="drag-ref-line top fadeIn"
            :style="`top: ${rulerStart.y + 20 + ((curEl.posy || 0) * sliderVal) / 100 - pageScrollTop}px`"
          ></div>
          <div
            class="drag-ref-line bottom fadeIn"
            :style="
              `top: ${rulerStart.y + 20 + ((curEl.posy + curEl.height || 0) * sliderVal) / 100 - pageScrollTop}px`
            "
          ></div>
        </template>
      </section>
      <section class="main-right" v-show="!collapse.right">
        <template v-if="curEl && !showSetting">
          <header class="main-right-header">
            <div
              :class="`main-right-header__tab-title ${tabActive === i && tabTitle.length>1 ? 'active' : ''}`"
              v-for="(title, i) in tabTitle"
              :key="title"
              @click="() => (tabActive = i)"
            >{{ title }}</div>
          </header>
          <section class="sigle-right-body main-right-body">
            <div class="tab-card" v-if="tabActive === 0">
              <component
                :is="curEl.id.replace(/\d/g, '')"
                :option="curEl.option || {}"
                :key="curEl.id + curEl.option.domId"
                @option-updated="updateOption"
                @update-chart="handleItemResize(curEl.option.domId)"
              />
            </div>
            <div class="tab-card" v-show="tabActive === 1" :key="curEl.option.domId">
              <new-data-set
                v-if="curEl.id==='scroll-board-style'"
                :title="curEl.option.title"
                :component-type="curEl.id.replace(/\d/g, '')"
                :value="curEl.option.contentOption.indexCodeList"
                @option-updated="updateOption"
                @data-changed="updateOption($event, 'scrollData')"
              ></new-data-set>
              <map-data-set
                v-if="curEl.id==='map-simple'"
                :title="curEl.option.title"
                :option="curEl.option"
                :component-type="curEl.id.replace(/\d/g, '')"
                @option-updated="updateOption"
                @data-changed="updateOption($event, 'mapData')"
              ></map-data-set>
              <chart-data-set
                v-if="curEl.id==='bar-simple' || curEl.id==='line-simple' || curEl.id==='bar-line-double'"
                :title="curEl.option.title"
                :component-type="curEl.id.replace(/\d/g, '')"
                :option="curEl.option.contentOption"
                :value="curEl.option.contentOption.indexCodeList"
                @option-updated="updateOption"
                @data-changed="updateOption($event, 'chartData')"
                @update-chart="handleItemResize(curEl.option.domId)"
              ></chart-data-set>
              <board-data-set
                v-if="curEl.id==='index-board-style'"
                :title="curEl.option.title"
                :component-type="curEl.id.replace(/\d/g, '')"
                :option="curEl.option.contentOption"
                :value="curEl.option.contentOption.indexCodeList"
                @option-updated="updateOption"
                @data-changed="updateOption($event, 'boardData')"
                @update-chart="handleItemResize(curEl.option.domId)"
              ></board-data-set>
              <flash-data-set
                v-if="curEl.id==='flash-news-style'"
                :title="curEl.option.title"
                :component-type="curEl.id.replace(/\d/g, '')"
                :option="curEl.option.contentOption"
                :value="curEl.option.contentOption.saveParams"
                @option-updated="updateOption"
                @data-changed="updateOption($event, 'flashData')"
                @update-chart="handleItemResize(curEl.option.domId)"
              ></flash-data-set>
              <futures-table-data-set
                v-if="curEl.id==='futures-table-style' || curEl.id==='futures-board-style'"
                :id="curEl.id"
                :title="curEl.option.title"
                :component-type="curEl.id.replace(/\d/g, '')"
                :options="curEl.option"
                :value="curEl.option.contentOption.indexCodeList"
                @option-updated="updateOption"
                @data-changed="updateOption($event, 'scrollData')"
              ></futures-table-data-set>
              <news-list-data-set
                v-if="curEl.id==='news-list-style'"
                :title="curEl.option.title"
                :component-type="curEl.id.replace(/\d/g, '')"
                :option="curEl.option.contentOption"
                :value="curEl.option.contentOption.saveParams"
                @option-updated="updateOption"
                @data-changed="updateOption($event, 'newsListData')"
                @update-chart="handleItemResize(curEl.option.domId)"
              ></news-list-data-set>
            </div>
          </section>
        </template>
        <template v-show="!curEl || showSetting">
          <header class="main-right-header">
            <div style="color:#00fcff;">节目设置</div>
          </header>
          <section class="main-right-body">
            <page-opt
              :title="'节目分组'"
              :defaultOpt="pageOption"
              @screen-size-change="handleResize"
              @page-option-change="handlePageOptionChange"
            ></page-opt>
          </section>
        </template>
      </section>
    </main>
    <context-menu
      :itemList="contextMenuData"
      :bodyStyle="contextStyle"
      :visible="showContextMenu"
      @choose="handleManipulateLayer"
      @save="handleComponentSave"
      @close="() => (showContextMenu = false)"
    ></context-menu>
    <publish-page
      :defaultVal="publishInfo"
      :visiable="showPublish"
      @close="() => (showPublish = false)"
      @publish-change="(val) => (publishInfo = val)"
    />
    <bi-dialog
      v-if="visibleEditName"
      title="编辑节目名称"
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
        <a-form-model-item label="节目名称" prop="dataViewName">
          <a-input
            v-model.trim="editNameForm.dataViewName"
            style="width: 280px"
            placeholder="请输入节目名称"
            :max-length="50"
          />
        </a-form-model-item>
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
    <bi-dialog
      class="release-dialog"
      v-if="showRelease"
      title="发布管理"
      @cancel="closeRelease"
      :footer="null"
      :noBackgroundImg="true"
      width="50%"
    >
      <release-management style="flex:1"></release-management>
    </bi-dialog>

    <save-component
      :visible="showSaveComponent"
      :name="componentTitle"
      @close="() => (showSaveComponent = false)"
      @submit="handleComponentSave(true, $event)"
    ></save-component>

    <video id="videoPlayer" controls="controls"></video>

    <a-modal
      class="define-modal"
      title="节目共享"
      :visible="shareVisible"
      :confirmLoading="shareLoading"
      :bodyStyle="{padding:'16px 50px'}"
      @ok="handleShareOk"
      @cancel="handleShareCancel"
    >
      <a-row>
        <a-radio-group v-model="shareForm.shareUserType">
          <a-radio :value="-1">不共享</a-radio>
          <a-radio :value="0">指定用户共享</a-radio>
          <a-radio :value="1">所有用户共享</a-radio>
        </a-radio-group>
      </a-row>
      <a-row v-if="shareForm.shareUserType === 0">
        <div class="select-account">指定账号</div>
        <div class="add-account-container">
          <a-row>
            <a-col :span="19">
              <a-input class="account-input" v-model="shareAccount" placeholder="请输入账号(示例：M4378639)"/>
            </a-col>
            <a-col :span="5">
              <a-button class="confirm-btn" @click="addShareAccount">确认添加</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <ul class="share-list">
                <li v-for="data in shareForm.shareAccountList" :key="data.shareUserAccount">
                  <a-row>
                    <a-col :span="8" class="share-account-name text-center">{{data.shareUserName}}</a-col>
                    <a-col :span="8" class="text-center">{{data.shareUserAccount}}</a-col>
                    <a-col :span="8" class="flex-center">
                      <span class="program-delete-icon" @click="deleteShareAccount(data)"></span>
                    </a-col>
                  </a-row>
                </li>
              </ul>
            </a-col>
          </a-row>
        </div>
      </a-row>
    </a-modal>
  </section>
</template>

<script>
import addOrEditProgram from "./addOrEditProgram.js";
export default addOrEditProgram;
</script>
<style lang="scss">
@import "@/styles/common.scss";
</style>
<style lang="scss" scoped>
@import "./addOrEditProgram.scss";
@import "./newProgram.scss";
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
</style>
