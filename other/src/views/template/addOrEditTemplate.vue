<template>
  <section class="page-create-app" v-loading="loading">
    <header class="header">
      <div class="head-back">
        
          <!-- <a href="javascript:void(0);" class="back" @click="handleBack"></a> -->
        <span class="back-prev" @click="handleBack" style="margin-rigth:5px;"></span>
  
        <span style="padding-left:7px;">
          <a-breadcrumb>
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>模板管理</a-breadcrumb-item>
            <a-breadcrumb-item>模板{{pageId?'编辑':'新增'}}</a-breadcrumb-item>
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
        <a href="javascript:void(0);" class="header__btns-item setting" @click="handleSetting">
          <img :src="settingIcon" />
          <span>模板设置</span>
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
          <!-- <div class="main-left-body__nav-wrapper">
            <ul class="main-left-body__nav-list">
              <li
                :class="{ 'main-left-body__nav-list-item': true, active: activeMenuKey === tab.id }"
                v-for="tab in tabList"
                :key="tab.id"
                @click="() => (activeMenuKey = tab.id)"
              >
                <img
                  width="16px"
                  :src="activeMenuKey === tab.id && tab.activeImg ? tab.activeImg : tab.img"
                />
                {{ tab.name }}
              </li>
            </ul>
            <div
              :class="{
                'main-left-body__nav-list-item save-tab': true,
                active: activeMenuKey === saveTab.id
              }"
              :key="saveTab.id"
              @click="() => (activeMenuKey = saveTab.id)"
            >
              <img
                width="16px"
                :src="
                  activeMenuKey === saveTab.id && saveTab.activeImg
                    ? saveTab.activeImg
                    : saveTab.img
                "
              />
              {{ saveTab.name }}
            </div>
          </div>
          <div class="main-left-body__content">
            <chart-component
              ref="chartComponent"
              :active="activeMenuKey"
              @dragstart="handleDragStart"
              @dragend="handleDragEnd"
            />
          </div>-->
          <!-- <layer-list
            :list="list1"
            :max="layer.max"
            :min="layer.min"
            @layer-change="handleManipulateLayer"
          ></layer-list>-->
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
              :dom-width="xRlueWidth+20"
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
              :class="`main-right-header__tab-title ${tabActive === i && tabTitle.length>1? 'active' : ''}`"
              v-for="(title, i) in tabTitle"
              :key="title"
              @click="() => (tabActive = i)"
            >{{ title }}</div>
          </header>
          <section class="sigle-right-body main-right-body">
            <div class="tab-card" v-show="tabActive === 0">
              <component
                :is="curEl.id.replace(/\d/g, '')"
                :option="curEl.option || {}"
                :key="curEl.id + curEl.option.domId"
                @option-updated="updateOption"
                @update-chart="handleItemResize(curEl.option.domId)"
              />
            </div>
          </section>
        </template>
        <template v-show="!curEl || showSetting">
          <header class="main-right-header">
            <div style="color:#00fcff;">模板设置</div>
          </header>
          <section class="main-right-body">
            <page-opt
              :title="'模板分组'"
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
      title="编辑模板名称"
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
        <a-form-model-item label="模板名称" prop="dataViewName">
          <a-input
            v-model.trim="editNameForm.dataViewName"
            style="width: 280px"
            placeholder="请输入模板名称"
            :max-length="50"
          />
        </a-form-model-item>
        <!-- <a-form-model-item label="模板分组" prop="nodeId">
          <a-select v-model.trim="editNameForm.nodeId" placeholder="请输入分组">
            <a-select-option
              v-for="item in nodeList"
              :key="item.id"
              :value="item.id"
            >{{ item.nodeName }}</a-select-option>
          </a-select>
        </a-form-model-item> -->
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
  </section>
</template>

<script>
import addOrEditTemplate from "./addOrEditTemplate.js";
export default addOrEditTemplate;
</script>
<style lang="scss">
@import "@/styles/common.scss";
</style>
<style lang="scss" scoped>
@import "./addOrEditTemplate.scss";
@import "./newTemplate.scss";
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
