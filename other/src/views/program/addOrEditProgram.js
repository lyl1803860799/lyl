import { mapMutations, mapState } from 'vuex'
import * as uuid from 'uuid/v1'
import DragItem from '@/components/dragItem'
import PageOpt from '@/components/pageOpt'
import ContextMenu from '@/components/contextMenu'
import PublishPage from '@/components/publishPage'
import NewDataSet from '@/components/newDataSet'
import FuturesTableDataSet from '@/components/futuresTableDataSet'
import MapDataSet from '@/components/mapDataSet'
import ChartDataSet from '@/components/chartDataSet'
import BoardDataSet from '@/components/boardDataSet'
import FlashDataSet from '@/components/flashDataSet'
import NewsListDataSet from '@/components/newsListDataSet'
import {
  contentOptions,
  contextMenuData,
  dataOptions,
  interactiveOptions,
  TYPE_SETS
} from '@/constants/newIndex'
import { videoBg, webPageBg } from '@/constants/pic'
import { tabList, saveTab, sliderOptions } from '@/utils/constants'
import SET_DATA from '@/utils/newSetData'
import { generateImage } from '@/utils/screenshot'
import ChartComponent from '@/components/aside/newChartComponent'
import LayerList from '@/components/aside/layerList'
import CanvasRuler from '@/components/canvasRuler'
import SwipeOptionData from '@/components/swipeOptionData'
import ReleaseManagement from '@/components/releaseManagement'

import { editAssembly } from '@/api/myCom'
import { uploadMaterial} from "@/api/material";
import {templateDetail} from '@/api/template'
import {
  programDetail,
  addProgram,editProgram,
  getUnNamedProgramCount,
  settingProgramShare,
  getShareAccountInfo,
  getShareUsers} from '@/api/program'
import BiDialog from '@/components/biDialog.vue'
import SaveComponent from './saveComponent'
import leftArrow from '@/assets/images/left-arrow.png'
import settingIcon from '@/assets/images/setting.png'
import previewIcon from '@/assets/images/preview.png'
import saveIcon from '@/assets/images/save.png'
import uploadIcon from '@/assets/images/upload.png'
import shareHoverIcon from '@/assets/images/share-hover.png'
import sharingIcon from '@/assets/images/sharing.png'

export default {
  name: 'addOrEditProgram',
  data() {
    return {
      leftArrow,
      settingIcon,
      previewIcon,
      saveIcon,
      uploadIcon,
      shareHoverIcon,
      sharingIcon,
      // 控制左右面板收起展开
      collapse: {
        left: false,
        right: false
      },
      loading: false,
      // 当前大大屏的id
      pageId: null,
      templateGropType:null,
      //节目中引用的模板
      templateId:null,
      // 当前大屏挂载节点
      nodeId: 0,
      // 左侧一级目录
      tabList,
      saveTab, // 收藏单列
      // 默认激活一级目录
      activeMenuKey: 'chart',
      // 当前大屏使用的组件列表
      list1: [],
      // 当前操作的元素
      curEl: null,
      curIndex: null,
      dragEl: null,
      // 当前激活的元素
      activeEl: null,
      // 内容区域大小
      viewHeight: 1,
      viewWidth: 1,
      xRlueWidth:1,
      // 缩放百分比列表
      items: [],
      baseItems: [],
      selectVal: '50%',
      sliderVal: 50,
      // 组件默认配置
      optionCollection: contentOptions,
      // 处理resize延迟
      debounceTime: null,
      // 控制显示隐藏辅助线
      showRefLine: true,
      // 当开始拖动时，显示所有组件的边框用于对齐
      isdragging: false,
      // 右侧配置面板
      tabTitle: ['样式'],
      tabActive: 0,

      // 缩放面板样式
      scaleStyle: {},

      // 滚动数值
      scrollBoxVal: { left: 0, top: 0 },

      // 右侧页面配置初始化图
      pageOption: {
        defineSize:'1920*1080',
        screenSize: { width: 1920, height: 1080 },
        bgColor: '#000000',
        bgType:"1",
        opacity:1,
        groupOwnerId:null,
        resizeType: 3,
        bgImg: require('@/assets/newbk.png')
      },
      // 右键菜单
      contextMenuData: contextMenuData,
      showContextMenu: false,
      contextStyle: {},
      contextItemIndex: null,
      layer: { min: 0, max: 0 },

      // 大屏预览操作
      showScreenPreview: false,

      // 发布
      showPublish: false,
      pageInfo: {
        dataViewName: ''
      },
      // 发布组件
      componentInfo: {
        dataViewName: ''
      },
      publishInfo: {},
      // 样式配置
      defaultOption: {},

      // 保存初始数据，在返回时需要确认弹窗
      rawPageInfo: null,
      showConfirm: false,
      //保存
      isSave: false,
      viewData: null,
      showSetting:true,
      //发布管理弹窗
      showRelease: false,
      // 组件收藏弹窗，支持修改组件名称
      showSaveComponent: false,
      componentTitle: '',

      // 组件列表添加图层列表
      leftTabActive: 0,

      //编辑名称
      visibleEditName: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      editNameForm: {
        dataViewName: '',
        nodeId: this.$route.query.nodeId
      },
      nodeList: [{ id: this.$route.query.nodeId, nodeName: this.$route.query.nodeName }],
      rules: {
        dataViewName: [{ required: true, message: '请填写名称!', trigger: 'blur' }],
        nodeId: [{ required: true, message: '请选择分组', trigger: 'change' }]
      },
      searchKeys:'',
      programParentId:null,
      iconRight:"346px",
      isCopy:false,
      pageScrollLeft:0,
      pageScrollTop:0,
      treeUniqId:'',
      currentSourceType:'defined',
      shareVisible:false,
      shareLoading:false,
      shareForm:{
        programId:null,
        shareUserType:-1,
        shareAccountList:[],
      },
      shareAccount:'',
      programLimitType:-1,
      oldShareData:{
        shareUserType:null,
        shareAccountList:[]
      }
    }
  },
  components: {
    DragItem,
    PageOpt,
    ContextMenu,
    PublishPage,
    ChartComponent,
    NewDataSet,
    FuturesTableDataSet,
    MapDataSet,
    ChartDataSet,
    BoardDataSet,
    FlashDataSet,
    NewsListDataSet,
    CanvasRuler,
    SwipeOptionData,
    ReleaseManagement,
    BiDialog,
    SaveComponent,
    LayerList
  },
  computed: {
    ...mapState({
      historyList: (state) => state.historyList
    }),
    contentStyle() {
      const { screenSize } = this.pageOption
      const width = Math.max((screenSize.width * this.sliderVal) / 100, this.viewWidth)
      const height = Math.max((screenSize.height * this.sliderVal) / 100, this.viewHeight)
      return `width: ${width}px;height:${height}px;position: relative;margin:auto;`
    },
    scrollBoxStyle() {
      let w = 382;
      if(document.getElementsByClassName("main-right") && document.getElementsByClassName("main-right")[0]){
        let rightW = document.getElementsByClassName("main-right")[0].offsetWidth;
        if(rightW<=382){
          if(rightW){
            w = rightW
          }else{
            if(document.body.offsetWidth>1120){
              w = 382;
            }else{
              w = window.localStorage.getItem("rightWidth");
            }
          }
        }
      }
      return `width: calc(100vw - ${280 * +!this.collapse.left}px - ${w *
        +!this.collapse.right}px); height: ${this.viewHeight}px;margin:auto;`
    },
    rulerStart() {
      const { screenSize } = this.pageOption
      const width = Math.max((screenSize.width * this.sliderVal) / 100, this.viewWidth+16)
      const height = Math.max((screenSize.height * this.sliderVal) / 100, this.viewHeight)
      const scaleWidth = (screenSize.width * this.sliderVal) / 100
      const scaleHeight = (screenSize.height * this.sliderVal) / 100
      let x = (width - scaleWidth) / 2
      let y = (height - scaleHeight) / 2
      return { x: x , y: y  }
    },
    rulerWidth() {
      const { screenSize } = this.pageOption
      const width = Math.max((screenSize.width * this.sliderVal) / 100, this.viewWidth)
      const height = Math.max((screenSize.height * this.sliderVal) / 100, this.viewHeight)
      return {
        x: width,
        y: height
      }
    },
    scalePageOption() {
      return {
        ...this.pageOption,
        scale: this.sliderVal / 100
      }
    }
  },
  watch: {
    scalePageOption: {
      immediate: true,
      handler(val) {
        const { bgColor, bgImg, resizeType, screenSize, scale,opacity,bgType } = val
        this.scaleStyle = {
          width: `${screenSize.width}px`,
          height: `${screenSize.height}px`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          opacity:opacity,
          transform: `scale(${scale})`,
          'margin-left': `-${screenSize.width / 2}px`,
          'margin-top': `-${screenSize.height / 2}px`,
          'background-size': `${
            +resizeType === 3 ? '100% 100%' : +resizeType === 1 ? '100% auto' : 'auto 100%'
          }`
        }
        if(bgType==="1"){
          this.scaleStyle['background-image'] =`url(${bgImg})`;
        }else{
          this.scaleStyle['background-color'] =bgColor;
        }
        //console.log(this.scaleStyle)
      }
    }
  },
  async mounted() {
    this.treeUniqId = this.$route.query?.treeUniqId || '';
    this.pageId = this.$route.query?.id
    this.currentSourceType = this.$route.query?.sourceType || 'defined';
    this.templateId = this.$route.query?.templateId;
    this.templateGropType = this.$route.query?.templateGropType;
    this.programParentId = this.$route.query?.programParentId || null;//分组id回显 
    if(this.templateId){
      await this.queryTemplateInfo();
    }
    this.nodeId = this.$route.query?.nodeId || 0
    if(!this.pageId){
      this.getUnNamedTemplate();
    }

    // 初始化list
    await this.getPageInfo()

    let rightEl = document.getElementsByClassName("main-right");
    let initW = 382;
    if(rightEl&&rightEl[0]){
      if(rightEl[0].offsetWidth <= 382){
        if(rightEl[0].offsetWidth){
          initW = rightEl[0].offsetWidth;
          window.localStorage.setItem("rightWidth",initW);
        }else{
          initW = window.localStorage.getItem("rightWidth");
        }
      }
    }

    this.viewHeight = window.innerHeight - 160
    this.viewWidth = window.innerWidth - (280 + initW + 16);
    this.xRlueWidth = window.innerWidth - (280 + initW + 16);
    const ratio1 = (this.viewWidth * 100) / this.pageOption.screenSize.width
    const ratio2 = (this.viewHeight * 100) / this.pageOption.screenSize.height
    const items = [
      {
        label: '自适应',
        value: Math.min(ratio1, ratio2) + '%'
      }
    ].concat(...sliderOptions)
    this.selectVal = items[0].value
    this.handleSelectChange(this.selectVal)
    this.$set(this, 'baseItems', this.deepClone(items))
    this.$set(this, 'items', this.deepClone(items))

    window.addEventListener('resize', this.handleResize)
    window.addEventListener('keydown', this.keyboard)

    let localstroage = window.localStorage;
    for(var key in localstroage){
      if(Object.prototype.hasOwnProperty.call(localstroage,key)){
          if(window.localStorage[key].indexOf('_categoryId')>-1){
            localstroage.removeItem(key);
          }
      }
    }
  },
  methods: {
    ...mapMutations({
      setSwipeEl: 'SET_SWIPE_EL',
      setHistoryList: 'SET_HISTORY_LIST'
    }),
    keyboard(e){
      //console.log(e)
      if(e.target && (e.target.className==="ant-slider" || e.target.className==="")){
        e.preventDefault();
      }
      if(e.target && e.target.id==="videoPlayer"){
        e.preventDefault();
      }
      if(this.curEl){
        if(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40){
          let x,y;
          if(e.keyCode === 37){
            //向左
            x = this.curEl.posx - 1;
            y = this.curEl.posy;
          }else if(e.keyCode === 38){
            //向上
            x = this.curEl.posx;
            y = this.curEl.posy - 1;
          }else if(e.keyCode === 39){
            //向右
            x = this.curEl.posx + 1;
            y = this.curEl.posy;
          } else if(e.keyCode === 40){
            //向下
            x = this.curEl.posx;
            y = this.curEl.posy + 1;
          }
          this.handleResizable({
            x: x, 
            y: y, 
            index: this.curIndex
          });
        }
      }
    },
    /* 处理拖拽逻辑 start */
    handleDragStart({ el, action }) {
      if(el.id === 'scroll-board-style' || el.id === 'map-simple' 
      || el.id === 'bar-simple' || el.id === 'line-simple' 
      || el.id === 'bar-line-double' || el.id === 'index-board-style'
      || el.id === 'index-board-style' || el.id === 'flash-news-style'
      || el.id === 'futures-table-style' || el.id === 'futures-board-style' 
      || el.id === 'news-list-style'){
        this.tabTitle = ['样式','数据']
      }else{
        this.tabTitle = ['样式']
      }
      this.curEl = null
      let curEl = this.deepClone(el)
      this.showSetting = false;
      if (!curEl.option) {
        const contentOption = curEl.contentOption
          ? curEl.contentOption
          : { ...this.optionCollection[curEl.id.replace(/\d/g, '')].call(this) }

        // 交互
        let actionComponent = null
        let actionPanel = null
        if (interactiveOptions[curEl.id.replace(/\d/g, '')]) {
          actionComponent = curEl.id.replace(/\d/g, '') + '-action'
          actionPanel = interactiveOptions[curEl.id.replace(/\d/g, '')].call(this)
        }
        curEl.option = {
          contentOption,
          title: { ...curEl.title },
          component: {
            active: true,
            width: contentOption.width || 400,
            height: contentOption.height || 400
          },
          dataConfig: dataOptions[curEl.id.replace(/\d/g, '')].call(this),
          actionPanel,
          actionComponent
        }
        let params = {
          option: curEl.option,
          componentName: curEl.componentName
        }
        if (params.componentName === 'chart') {
          params.type = TYPE_SETS[curEl.id.replace(/\d/g, '')] || null
          params.functionKey = curEl.id.replace(/\d/g, '') || null
        }
        curEl.option = this.configData(params)
      }
      // 需要先定义下拖拽的数据，否则容易出现死循环
      this.activeEl = curEl
      this.dragEl = curEl
      if (action === 'click') {
        this.handleDrop({ pageX: 0, pageY: 0 })
      } else {
        this.showRefLine = true
      }
    },
    handleDragEnd() {
      // this.activeEl = this.curEl
    },
    handleDrop(ev) {
      // 保存历史记录
      this.setHistoryList(this.deepClone(this.list1))

      this.showRefLine = false
      ev.preventDefault && ev.preventDefault()
      this.curEl = this.deepClone(this.dragEl)
      this.dragEl = null
      this.curEl.posx = ev.pageX - 332 < 50 ? 50 : ev.pageX - 332
      this.curEl.posy = ev.pageY - 108 < 50 ? 50 : ev.pageY - 108
      this.curEl.width = this.curEl.option.component.width
      this.curEl.height = this.curEl.option.component.height
      this.curEl.z = this.list1.length + 1
      this.curIndex = this.list1.length
      this.curEl.active = true
      this.curEl.option = {
        ...this.curEl.option,
        component: {
          ...this.curEl.option.component,
          posx: this.curEl.posx,
          posy: this.curEl.posy,
          z: this.curEl.z,
          active: this.curEl.active
        },
        domId: uuid()
      }
      if (this.curEl.componentName === 'swipe') {
        const { contentOption } = this.curEl.option
        if (contentOption?.list) {
          contentOption.list = contentOption.list.map((child) => {
            return {
              ...child,
              domId: uuid()
            }
          })
        }
      }
      this.list1.forEach((item) => {
        item.active = false
        item.option.component.active = item.active
      })
      this.list1.push({ ...this.curEl })

      // 更新图层层级
      this.updateLayer()
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    handleDragStop() {
      setTimeout(() => {
        this.isdragging = false
        this.showRefLine = false

        // 设置磁吸
        //this.setSnap(this.curEl)
      }, 200)
    },
    handleResizable(data) {
      let $scrollBox = document.getElementsByClassName("scroll-box");
      let list = this.deepClone(this.list1)
      const curEl = list[data.index]
      curEl.posx = data.x
      curEl.posy = data.y
      curEl.width = data.width || curEl.width
      curEl.height = data.height || curEl.height
      curEl.option = {
        ...curEl.option,
        component: {
          ...curEl.option.component,
          width: curEl.width,
          height: curEl.height,
          posx: curEl.posx,
          posy: curEl.posy,
          isChangeSize:true
        }
      }
      this.curIndex = data.index
      this.$set(this, 'list1', list)
      this.$set(this, 'curEl', curEl)
      this.showRefLine = true

      if($scrollBox &&  $scrollBox.length){
        let pageScrollLeft =  $scrollBox[0].scrollLeft;
        let pageScrollTop =  $scrollBox[0].scrollTop;
        this.pageScrollLeft = pageScrollLeft;
        this.pageScrollTop = pageScrollTop;
      }
    },
    // 设置磁吸
    setSnap(curEl) {
      if (!curEl) return
      const snapArr = this.list1
        .filter((item, i) => i !== this.curIndex)
        .map((item) => {
          const top = item.posy
          const left = item.posx
          const right = item.posx + item.width
          const bottom = item.posy + item.height
          return [
            [top, bottom],
            [left, right]
          ]
        })

      const curPos = [
        curEl.posy,
        curEl.posy + curEl.height,
        curEl.posx,
        curEl.posx + curEl.width
      ].map((pos, index) => {
        if (index < 2) {
          const res = snapArr.reduce((pre, next) => {
            return pre.concat(pos - next[0][0], pos - next[0][1])
          }, [])
          res.sort((a, b) => {
            return Math.abs(a) - Math.abs(b)
          })
          return res
        } else {
          const res = snapArr.reduce((pre, next) => {
            return pre.concat(pos - next[1][0], pos - next[1][1])
          }, [])
          res.sort((a, b) => {
            return Math.abs(a) - Math.abs(b)
          })
          return res
        }
      })

      const minx = Math.abs(curPos[2][0]) < Math.abs(curPos[3][0]) ? curPos[2][0] : curPos[3][0]
      const miny = Math.abs(curPos[0][0]) < Math.abs(curPos[1][0]) ? curPos[0][0] : curPos[1][0]
      if (Math.abs(minx) < 50) {
        curEl.posx = curEl.posx - minx
        curEl.option.component.posx = curEl.posx
      }
      if (Math.abs(miny) < 50) {
        curEl.posy = curEl.posy - miny
        curEl.option.component.posy = curEl.posy
      }
    },
    handleActivated(i) {
      let currentComponent = null;
      this.list1.forEach((item, index) => {
        item.active = index === i
        item.option.component.active = item.active
        if(index === i){
          console.log('item',item)
          currentComponent = item;
        }
        //this.tabActive = 0;
      })
      if(currentComponent){
        if (currentComponent.active && (
          currentComponent.componentName === 'scroll-board' 
          || currentComponent.id === 'map-simple' 
          || currentComponent.id === 'bar-simple' 
          || currentComponent.id === 'line-simple' 
          || currentComponent.id === 'bar-line-double' 
          || currentComponent.id === 'index-board-style'
          || currentComponent.id === 'flash-news-style' 
          || currentComponent.id === 'futures-table-style' 
          || currentComponent.id === 'futures-board-style' 
          || currentComponent.id === 'news-list-style')) {
          this.tabTitle = ['样式','数据'];
        }else{
          this.tabTitle = ['样式'];
          this.tabActive = 0;
        }
      }
      this.collapse.right = false;
      this.curEl = this.list1[i]
      this.activeEl = this.list1[i]
      this.curIndex = i

      // 初始化swipe组件中的激活元素
      this.setSwipeEl(null)

      this.$nextTick(() => {
        this.handleResize()
        //console.log(this.tabTitle)
      })
    },
    handleDeActivated(i) {
      this.showRefLine = false
      if(!this.isCopy){
        this.activeEl = null
      }
      this.list1[i]['active'] = false

      // 初始化swipe组件中的激活元素
      this.setSwipeEl(null)
    },
    handleScrollboxCfg() {
      if (!this.activeEl) {
        this.curEl = null
        this.showSetting = true
        this.collapse.right = false;
        this.curIndex = null

        this.$nextTick(() => {
          this.handleResize()
        })
      }else{
        this.showSetting = false;
      }
    },
    // 监听滚动，保持刻度尺更新
    handleScrollBoxScroll(e) {
      this.$set(this, 'scrollBoxVal', {
        top: e.target.scrollTop || 0,
        left: e.target.scrollLeft || 0
      })
    },
    handleItemResize(refKey) {
      //console.log(this.list1)
      this.$refs[refKey] && this.$refs[refKey][0] && this.$refs[refKey][0].refresh()
    },
    /* 处理拖拽逻辑 end */

    /* 处理缩放逻辑 start */
    handleSelectChange(val) {
      this.selectVal = val
      this.sliderVal = +val.slice(0, -1)
    },
    handleSliderChange(val) {
      this.sliderVal = val
      this.selectVal = val + '%'
    },
    handleChanged(val) {
      this.sliderVal = val
      // 先在基础的选项中查找
      const percentageVal = val + '%'
      const hasExist = this.baseItems.some((bi) => bi.value === percentageVal)
      if (hasExist) {
        this.$set(this, 'items', this.deepClone(this.baseItems))
      } else {
        const newItems = this.deepClone(this.baseItems)
        newItems.unshift({ value: percentageVal, label: percentageVal })
        this.$set(this, 'items', newItems)
      }
      this.selectVal = percentageVal
    },
    changeSlideVal(val) {
      if ((val < 0 && this.sliderVal > 1) || (val > 0 && this.sliderVal < 300)) {
        this.handleChanged(this.sliderVal + val)
      }
    },
    /* 处理缩放逻辑 end */

    /* 处理右键逻辑 start */
    handleShowContextMenu({ x, y }, index) {
      this.contextStyle = {
        left: `${x}px`,
        top: `${y}px`
      }
      this.showContextMenu = true
      this.contextItemIndex = index
    },
    handleManipulateLayer({ value: key, index }) {
      let list = this.deepClone(this.list1)
      const layerItem = list[index === undefined ? this.contextItemIndex : index]
      const zList = list.map((item, i) => {
        return {
          z: item.z,
          rawIdx: i
        }
      })
      zList.sort((a, b) => a.z - b.z)
      let greaterIndex = zList.findIndex((item) => item.z > layerItem.z)
      let litterIndex = zList.filter((item) => item.z < layerItem.z).length - 1
      let curZ = 0
      switch (key) {
        case 'add':
          if (greaterIndex >= 0) {
            curZ = zList[greaterIndex].z
            list[zList[greaterIndex].rawIdx] = {
              ...list[zList[greaterIndex].rawIdx],
              z: layerItem.z,
              option: {
                ...list[zList[greaterIndex].rawIdx].option,
                component: {
                  ...list[zList[greaterIndex].rawIdx].option.component,
                  z: layerItem.z
                }
              }
            }
          }
          break
        case 'minus':
          if (litterIndex >= 0) {
            curZ = zList[litterIndex].z
            list[zList[litterIndex].rawIdx] = {
              ...list[zList[litterIndex].rawIdx],
              z: layerItem.z,
              option: {
                ...list[zList[litterIndex].rawIdx].option,
                component: {
                  ...list[zList[litterIndex].rawIdx].option.component,
                  z: layerItem.z
                }
              }
            }
          }
          break
        case 'top':
          curZ = this.layer.max
          zList.forEach((item, i) => {
            if (i >= greaterIndex) {
              list[item.rawIdx] = {
                ...list[item.rawIdx],
                z: zList[i - 1].z,
                option: {
                  ...list[item.rawIdx].option,
                  component: {
                    ...list[item.rawIdx].option.component,
                    z: zList[i - 1].z
                  }
                }
              }
            }
          })
          break
        case 'bottom':
          curZ = this.layer.min
          zList.forEach((item, i) => {
            if (i <= litterIndex) {
              list[item.rawIdx] = {
                ...list[item.rawIdx],
                z: zList[i + 1].z,
                option: {
                  ...list[item.rawIdx].option,
                  component: {
                    ...list[item.rawIdx].option.component,
                    z: zList[i + 1].z
                  }
                }
              }
            }
          })
          break
      }
      layerItem.z = curZ
      layerItem.option = {
        ...layerItem.option,
        component: {
          ...layerItem.option.component,
          z: layerItem.z
        }
      }
      this.$set(this, 'list1', list)
      this.updateLayer()
    },
    updateLayer() {
      const zList = this.list1.map((item) => item.z)
      // 更新图层层级
      this.layer.max = Math.max(...zList)
      this.layer.min = Math.min(...zList)
    },
    // 组件收藏
    async handleComponentSave(flag, data) {
      const item = this.deepClone(this.list1[this.contextItemIndex])
      if (flag === true) {
        this.isSave = true
        const el = this.$refs[item.option.domId][0].$el
        const itemJson = this.transformJson(item)
        this.$nextTick(async () => {
          const snapshot = await generateImage(el, this.sliderVal)
          this.isSave = false
          const response = await editAssembly({
            id: 0,
            assemblyId: 0,
            nodeId: 0,
            snapshot,
            assemblyJson: JSON.stringify(itemJson),
            assemblyName: data.assemblyName || item?.option?.title?.name
          })
          this.$message.success(response.message, 1)
          this.$refs.chartComponent.getSavedComponent()
          this.showSaveComponent = false
        })
      } else {
        this.componentTitle = item?.option?.title?.name
        this.showSaveComponent = true
      }
    },
    /* 处理右键逻辑 end */

    /* 组件操作 start */
    async handleComponentPublish(index) {
      this.contextItemIndex = index
      const curCmp = this.list1[index]
      this.isSave = true
      const el = this.$refs[curCmp.option.domId][0].$el
      const itemJson = this.transformJson(curCmp)
      this.$nextTick(async () => {
        const snapshot = await generateImage(el, this.sliderVal)
        this.isSave = false
        this.publishInfo = {
          dataViewName: curCmp.option.title.name,
          isDeploy: false,
          type: 'COMPONENT',
          assemblyJson: itemJson,
          assemblyId: 0,
          snapshot
        }
        this.showPublish = true
      })
    },
    handleComponentDel(index) {
      // 保存历史记录
      this.setHistoryList(this.deepClone(this.list1))

      this.curEl = null
      this.curIndex = null
      this.list1.splice(index, 1)
    },
    handleComponentCopy(data) {
      let e = data.event;
      e.stopPropagation();
      let index = data.index;
      // 保存历史记录
      this.setHistoryList(this.deepClone(this.list1))

      this.curEl = null
      this.curIndex = null
      let newEl = this.deepClone(this.list1[index])
      this.curIndex = this.list1.length
      newEl = {
        ...newEl,
        option: {
          ...newEl.option,
          component: {
            ...newEl.option.component,
            posx: newEl.posx + 100,
            posy: newEl.posy + 100,
            z: this.list1.length + 1,
            active: true
          },
          domId: uuid()
        },
        posx: newEl.posx + 100,
        posy: newEl.posy + 100,
        z: this.list1.length + 1,
        active: true
      }
      if (newEl.componentName === 'swipe') {
        const { contentOption } = newEl.option
        if (contentOption?.list) {
          contentOption.list = contentOption.list.map((child) => {
            return {
              ...child,
              domId: uuid()
            }
          })
        }
      }
      this.list1.forEach((item) => {
        item.active = false
        item.option.component.active = item.active
      })
      this.list1.push({ ...newEl })
      this.isCopy = true;
      // 更新图层层级
      this.updateLayer()
      this.activeEl = newEl
      this.curEl = newEl
      this.showSetting = false;
      setTimeout(function(){
        this.isCopy = false;
      },10)
    },
    /* 组件操作 start */

    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    /* 监听resize */
    handleResize() {
      if (this.debounceTime) {
        clearTimeout(this.debounceTime)
      }
      //iconRight
      if(document.body.offsetWidth>1200){
        this.iconRight = "346px";
      }else{
        if(document.getElementsByClassName("main-right") && document.getElementsByClassName("main-right")[0]){
          let rightW = document.getElementsByClassName("main-right")[0].offsetWidth-16;
          this.iconRight = (rightW-16)+"px";
        }
      }
      this.debounceTime = setTimeout(() => {
        let rightEl = document.getElementsByClassName("main-right");
        // 处理取消全屏后需要恢复原始scale
        if (!document.fullscreenElement) {
          this.scaleStyle = {
            ...this.scaleStyle,
            transform: `scale(${this.scalePageOption.scale})`
          }
          this.showScreenPreview = false
        }
        let initW = 382;
        if(rightEl&&rightEl[0]){
          if(rightEl[0].offsetWidth <= 382){
            if(rightEl[0].offsetWidth){
              if(document.body.offsetWidth>1120){
                initW = rightEl[0].offsetWidth;
              }else{
                initW = rightEl[0].offsetWidth+20;
              }
              window.localStorage.setItem("rightWidth",initW);
            }else{
              initW = window.localStorage.getItem("rightWidth");
            }
          }
        }
        this.xRlueWidth =
          window.innerWidth - (280 * +!this.collapse.left + initW * +!this.collapse.right + 16);
        this.viewHeight = window.innerHeight - 160
        this.viewWidth =
          window.innerWidth - (280 * +!this.collapse.left + initW * +!this.collapse.right + 16)
        const { screenSize } = this.pageOption
        const ratio1 =(this.viewWidth * 100) / screenSize.width
        const ratio2 = (this.viewHeight * 100) / screenSize.height
        const curVal = Math.min(ratio1, ratio2) + '%'
        if (!document.fullscreenElement) {
          this.baseItems.forEach(item=>{
            if (item.label === '自适应') {
              item.value = curVal;
            }
          });
          this.items.forEach((item) => {
            if (item.label === '自适应') {
              if (this.selectVal === item.value) {
                this.selectVal = curVal
                this.handleSelectChange(curVal)
              }
              item.value = ['25%', '50%', '100%', '150%', '200%', '250%', '300%'].includes(curVal)
                ? Math.min(ratio1, ratio2) + 1 + '%'
                : curVal
            }
          })
        }
      }, 300)
    },

    /* 顶部操作 start */
    // 预览
    async handlePreview() {
      this.scaleStyle = {
        ...this.scaleStyle,
        transform: `scale(${screen.width / this.pageOption.screenSize.width}, ${screen.height /
          this.pageOption.screenSize.height})`
      }
      
      const el = document.getElementById('scroll-content')
      try {
        let videoElList = el.querySelectorAll('video');
        if(videoElList && videoElList.length){
          for(let i=0;i<videoElList.length;i++){
            let url = videoElList[i].getAttribute("src");
            videoElList[i].setAttribute("src","");
            videoElList[i].setAttribute("src",url);
          }
        }
      } catch (error) {
        console.log(error)
      }
      const rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen

      if (rfs) {
        rfs.call(el)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        const wscript = new window.ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
      this.showScreenPreview = true
    },
    exitScreen() {
      const el = document
      const cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen

      if (cfs) {
        cfs.call(el)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        const wscript = new window.ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
      this.showScreenPreview = false
      this.scaleStyle = {
        ...this.scaleStyle,
        transform: `scale(${this.scalePageOption.scale})`
      }
    },
    // 发布
    async handlePublish() {
      await this.handleSave()
      if (!this.viewData) return
      this.publishInfo = this.pageInfo
      this.showPublish = true
    },
    // 保存
    async handleSave(flag = false,isLeave) {
      let _this = this;
      this.viewData = false
      const curPageInfo = JSON.stringify({
        assemblyJson: this.list1,
        dataViewJson: this.pageOption,
        dataViewName: this.pageInfo.dataViewName
      })
      console.log('新增or修改',this.rawPageInfo === curPageInfo && !flag)
      if (this.rawPageInfo === curPageInfo && !flag) {
        this.viewData = true
        return
      }
      let snapshotType = '';
      let snapshot = null;
      const el = this.$refs['scale-box']
      const { width, height } = this.pageOption.screenSize
      const listObj = this.list1.map((item) => {
        const itemJsonObj = this.transformJson(item)
        if(itemJsonObj.id.indexOf("video-style")>-1){
          snapshotType='video';
        }else if(itemJsonObj.id.indexOf("basic-swipe")>-1){
          snapshotType='iframe';
        }else if(itemJsonObj.id.indexOf("map-simple")>-1){
          let domId = itemJsonObj.option.domId;
          let center = window.localStorage.getItem('center_'+domId);
          let zoom = window.localStorage.getItem('zoom_'+domId);
          if(center && zoom){
            itemJsonObj.option.dataConfig['mapCenter'] = this.deepClone(center.split(','));
            itemJsonObj.option.dataConfig['mapZoom'] = zoom;
          }
          for (let i = 0; i < window.localStorage.length; i++) {
            let key = window.localStorage.key(i);
            console.log(key)
            if (key.indexOf('zoom_')>-1 || key.indexOf('center_')>-1) {
              window.localStorage.removeItem(key);
            }
          }
        }else if(itemJsonObj.id.indexOf("news-list-style")>-1){
          itemJsonObj.option.contentOption.data=[];
        }
        return itemJsonObj
      })
      
      try {
        if(!this.pageInfo.dataViewName.trim()){
          this.loading = false;
          this.$message.warning('请填写节目名称');
          return;
        }
        // if(!this.pageOption.groupOwnerId){
        //   this.loading = false;
        //   this.$message.warning('请选择节目分组');
        //   return;
        // }
        if(this.pageOption.bgColor===""){
          this.pageOption.bgColor = "#000";
        }
        _this.loading = true;
        console.log(listObj)
        if(this.pageId){
          let params = {
            programId: this.pageId,
            programName: this.pageInfo.dataViewName,
            programTemplatesConfig:'[]',
            programTemplateMaterialConfig: JSON.stringify(listObj),
            programConfig: JSON.stringify(this.pageOption),
            programSnapshot:snapshot,
            programParentId: this.pageOption.groupOwnerId,
            programSize: width+'*'+height,
            sourceType:'defined',
            syncInfo:false
          };
          if(this.programLimitType === 0 || this.programLimitType === 1){
            _this.editProgramCommon(params,isLeave,snapshotType,el,1);
            
          }else{
            _this.editProgramCommon(params,isLeave,snapshotType,el);
          }
        }else{
          if(snapshotType==='video'){
            snapshot = videoBg
          }else if(snapshotType==='iframe'){
            snapshot = webPageBg
          }else{
            snapshot = await generateImage(el,this.sliderVal)
          }
          addProgram({
            isProgram:1,
            programName: this.pageInfo.dataViewName,
            programEnName:'',
            programConfig:JSON.stringify(this.pageOption),
            programTemplatesConfig:'[]',
            programTemplateMaterialConfig:JSON.stringify(listObj),
            programSnapshot:snapshot,
            programParentId: this.pageOption.groupOwnerId,
            programLimitType:-1,
            programSize: width+'*'+height,
            isCopy:0
          }).then(res=>{
            this.loading = false
            if(res.success){
              if(res.data){
                this.pageId = res.data;
              }
              this.viewData = true
              this.rawPageInfo = JSON.stringify({
                assemblyJson: this.list1,
                dataViewJson: this.pageOption,
                dataViewName: this.pageInfo.dataViewName
              })
              this.$message.success(res.message, 1)
              if(isLeave){
                this.$router.push({ name: '/index/programManage',params:{treeUniqId:this.treeUniqId} })
              }
            }else{
              this.$message.error(res.message);
            }
          }).catch(error=>{
            this.loading = false
            console.log(error)
          });
        }
        
      } catch {
        this.viewData = false
        this.loading = false
      }
    },
    async editProgramCommon(params,isLeave,snapshotType,el,count){
      let _this = this;
      let snapshot = null;
      if(snapshotType==='video'){
        snapshot = videoBg
      }else if(snapshotType==='iframe'){
        snapshot = webPageBg
      }else{
        snapshot = await generateImage(el,this.sliderVal)
      }
      params.programSnapshot = snapshot;
      editProgram(params).then(res=>{
        this.loading = false
        if(res.success){
          this.programParentId = this.pageOption.groupOwnerId;
          this.viewData = true
          this.rawPageInfo = JSON.stringify({
            assemblyJson: this.list1,
            dataViewJson: this.pageOption,
             dataViewName: this.pageInfo.dataViewName
          })
          this.$message.success(count===2?"更新成功！":res.message, 1)
          if((isLeave && !count) || (isLeave && count===2)){
            this.$router.push({ name: '/index/programManage',params:{treeUniqId:_this.treeUniqId} })
          }
          if(count === 1){
            this.$confirm({
              content: '节目内容已更新，是否同步更新共享节目内容？',
              icon: '',
              okText:'更新',
              onOk() {
                return new Promise((resolve, reject) => {
                  _this.loading = true;
                  params.syncInfo = true;
                  _this.editProgramCommon(params,isLeave,snapshotType,el,2);
                  setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
              },
              cancelText: '不更新',
              onCancel() {
                //this.$confirm.destroyAll();
                if(isLeave){
                  _this.$router.push({ name: '/index/programManage',params:{treeUniqId:_this.treeUniqId} })
                }
              },
            });
          }
        }else{
            this.$message.error(res.message);
        }
      }).catch(error=>{
        this.loading = false
        console.log(error)
      });
    },
    handleSetting(){
      this.showSetting = true;
      this.collapse.right = false;
      this.$nextTick(() => {
        this.handleResize()
      })
    },
    // 撤回
    handleWithdraw() {
      this.list1 = this.deepClone(this.historyList)
      this.setHistoryList(null)
    },
    /* 顶部操作 end */
    updateNewsOption(val){
      console.log('--------------------------',val)
      if(val.type === "newsListData"){
        this.updateOption(val, 'newsListData');
      }
    },
    // 更新 样式配置
    updateOption(val, action) {
      if (this.curIndex === null) return
      if (this.curIndex !== this.list1.length - 1) {
        this.setHistoryList(null)
      }
      let defaultOption
      if(action === 'scrollData'){
        this.curEl.option.contentOption.data = val.data;
        this.curEl.option.contentOption.indexCodeList = val.indexCodeList;
        defaultOption = Object.assign({}, { ...this.curEl.option })
      }else if(action === 'chartData'){
        if(val.data.legend){
          this.curEl.option.contentOption.indexCodeList = val.indexCodeList;
          this.curEl.option.contentOption.legend.data = val.data.legend;
          this.curEl.option.contentOption.series = val.data.series;
          this.curEl.option.contentOption.xAxis.data = val.data.x;
          this.curEl.option.contentOption.yAxis = val.data.y;
          this.curEl.option.contentOption.chartParams = val.chartParams;
        }
        defaultOption = Object.assign({}, { ...this.curEl.option });
      }else if(action === 'boardData'){
        this.curEl.option.contentOption.indexCodeList = val.indexCodeList;
        this.curEl.option.contentOption.data = val.data;
        defaultOption = Object.assign({}, { ...this.curEl.option });
      }else if(action === 'flashData' || action === 'newsListData'){
        this.curEl.option.contentOption.saveParams = val.saveParams;
        this.curEl.option.contentOption.data = val.data;
        defaultOption = Object.assign({}, { ...this.curEl.option });
      }else{
        defaultOption = Object.assign({}, { ...this.curEl.option }, { ...val });
      }
      if (action === 'data' || action === 'scrollData' || val.contentOption !== undefined) {
        let params = {
          option: defaultOption,
          componentName: this.curEl.componentName
        }
        if (params.componentName === 'chart') {
          params.type = TYPE_SETS[this.curEl.id.replace(/\d/g, '')] || null
          params.functionKey = this.curEl.id.replace(/\d/g, '') || null
        }
        defaultOption = this.configData(params)
      }
      this.$set(this.list1, this.curIndex, {
        ...this.curEl,
        option: { ...defaultOption },
        width: +defaultOption.component.width,
        height: +defaultOption.component.height,
        posx: +defaultOption.component.posx,
        posy: +defaultOption.component.posy,
        z: +defaultOption.component.z,
        active: defaultOption.component.active
      })
      this.curEl = this.deepClone(this.list1[this.curIndex])
      if (action === 'data') {
        this.handleItemResize(this.curEl.option.domId)
      }
    },
    // 更新数据
    configData({ option, componentName, type, functionKey }) {
      return SET_DATA[componentName].call(this, option, type, functionKey)

      // this.$forceUpdate()
    },
    // 更新 背景配置
    handlePageOptionChange(val) {
      this.$set(this, 'pageOption', { ...val, bgImg: val.bgImg || this.pageOption.bgImg })
    },
    async queryTemplateInfo(){
      let _this = this;
      // 保存历史记录
      this.setHistoryList(null)

      this.loading = true;
      setTimeout(function(){
        _this.loading = false;
      },6 * 1000);
      try {
        const { data } = await templateDetail({ templateId: this.templateId,groupType:this.templateGropType })
        this.loading = false
        const assemblyList = (this.jsonException(data.materialsConfig) || []).map((item) => {
          if (item.option.dataConfig) {
            const editorContent = item?.option?.dataConfig?.dataSource?.editorContent
            const dataContent = item?.option?.dataConfig?.dataSource?.dataContent
            item.option.dataConfig = {
              ...item.option.dataConfig,
              dataSource: {
                ...item.option.dataConfig.dataSource,
                editorContent:
                  typeof editorContent === 'object' ? JSON.stringify(editorContent) : editorContent,
                dataContent:
                  typeof dataContent === 'object' ? JSON.stringify(dataContent) : dataContent
              }
            }
          }
          return item
        })
        
        const pageOption = this.jsonException(data.templateConfig) || this.pageOption
        pageOption.groupOwnerId = null;
        pageOption.defineSize = pageOption.screenSize.width+"*"+pageOption.screenSize.height;
        this.pageOption.defineSize = pageOption.screenSize.width+"*"+pageOption.screenSize.height;
        this.$set(this, 'list1', assemblyList)
        this.$set(this, 'pageOption', pageOption)
        const prePath = process.env.NODE_ENV === 'production' ? '/datav' : ''
        const shareLink = `${location.origin + prePath}/show.html#show/${data.deployAddress}`
        this.$set(this, 'pageInfo', {
          ...data,
          shareLink: +data.isDeploy === 1 ? shareLink : '',
          isDeploy: +data.isDeploy === 1
        })
        //this.pageInfo.dataViewName=data.templateName;
        this.publishInfo = this.pageInfo

        // this.rawPageInfo = JSON.stringify({
        //   assemblyJson: assemblyList,
        //   dataViewJson: pageOption,
        //   dataViewName: data.templateName
        // })

        // 初始化图层最大值和最小值
        const layerList = assemblyList.map((item) => item.z)

        this.layer = {
          max: Math.max(...layerList),
          min: Math.min(...layerList)
        }
      } catch {
        this.loading = false
      }
    },
    // 获取节目当前页面数据
    async getPageInfo() {
      let _this = this;
      if (!this.pageId) return
      // 保存历史记录
      this.setHistoryList(null)

      this.loading = true;
      setTimeout(function(){
        _this.loading = false;
      },6 * 1000);
      try {
        const { data } = await programDetail({ programId: this.pageId,sourceType:this.currentSourceType })
        this.loading = false
        const assemblyList = (this.jsonException(data.programTemplateMaterialConfig) || []).map((item) => {
          if (item.option.dataConfig) {
            const editorContent = item?.option?.dataConfig?.dataSource?.editorContent
            const dataContent = item?.option?.dataConfig?.dataSource?.dataContent
            item.option.dataConfig = {
              ...item.option.dataConfig,
              dataSource: {
                ...item.option.dataConfig.dataSource,
                editorContent:
                  typeof editorContent === 'object' ? JSON.stringify(editorContent) : editorContent,
                dataContent:
                  typeof dataContent === 'object' ? JSON.stringify(dataContent) : dataContent
              }
            }
          }
          return item
        })
        
        const pageOption = this.jsonException(data.programConfig) || this.pageOption
        pageOption.groupOwnerId=this.programParentId;
        this.$set(this, 'list1', assemblyList)
        this.$set(this, 'pageOption', pageOption)
        this.programLimitType = data.programLimitType;
        this.pageOption.defineSize = pageOption.screenSize.width+"*"+pageOption.screenSize.height;
        const prePath = process.env.NODE_ENV === 'production' ? '/datav' : ''
        const shareLink = `${location.origin + prePath}/show.html#show/${data.deployAddress}`
        this.$set(this, 'pageInfo', {
          ...data,
          shareLink: +data.isDeploy === 1 ? shareLink : '',
          isDeploy: +data.isDeploy === 1
        })
        this.pageInfo.dataViewName=data.programName;
        this.publishInfo = this.pageInfo

        this.rawPageInfo = JSON.stringify({
          assemblyJson: assemblyList,
          dataViewJson: pageOption,
          dataViewName: data.programName
        })

        // 初始化图层最大值和最小值
        const layerList = assemblyList.map((item) => item.z)

        this.layer = {
          max: Math.max(...layerList),
          min: Math.min(...layerList)
        }
      } catch {
        this.loading = false
      }
    },
    // 处理json
    jsonException(json) {
      try {
        let res = JSON.parse(json)
        return res
      } catch {
        return null
      }
    },
    // 转化json
    transformJson(data) {
      const dataObj = this.deepClone(data)
      let editorContent = dataObj?.option?.dataConfig?.dataSource?.editorContent || null
      let editorContentObj = this.jsonException(editorContent) || editorContent
      let dataContent = dataObj?.option?.dataConfig?.dataSource?.dataContent || null
      let dataContentObj = this.jsonException(dataContent) || dataContent
      if (editorContent) {
        dataObj.option.dataConfig.dataSource.editorContent = editorContentObj
      }
      if (dataContent) {
        dataObj.option.dataConfig.dataSource.dataContent = dataContentObj
      }
      return dataObj
    },
    // 左右两侧是否隐藏
    handleCollapse(refKey) {
      this.collapse[refKey] = !this.collapse[refKey]
      this.$nextTick(() => {
        this.handleResize()
      })
    },
    // 返回
    handleBack() {
      const curPageInfo = JSON.stringify({
        assemblyJson: this.list1,
        dataViewJson: this.pageOption,
        dataViewName: this.pageInfo.dataViewName
      })
      if (this.rawPageInfo !== curPageInfo) {
        this.showConfirm = true
      } else {
        this.$router.push({ name: '/index/programManage',params:{treeUniqId:this.treeUniqId} })
      }
    },
    async submit(flag = false) {
      this.showConfirm = false;
      if (flag === true) {
        await this.handleSave(false,flag);
        if(!this.pageInfo.dataViewName.trim()){
          return;
        }
      }else{
        this.$router.push({ name: '/index/programManage',params:{treeUniqId:this.treeUniqId} })
      }
    },
    closeConfirm() {
      this.showConfirm = false
    },
    //发布管理
    handleRelease() {
      this.showRelease = true
    },
    closeRelease() {
      this.showRelease = false
    },

    //编辑名称
    editName() {
      this.visibleEditName = true
      this.editNameForm.dataViewName = this.pageInfo.dataViewName;
    },
    cancelEditName() {
      this.visibleEditName = false
    },
    async submitEditName() {
      if(this.editNameForm.dataViewName.trim()===''){
        return;
      }
      this.pageInfo.dataViewName = this.editNameForm.dataViewName
      //await this.handleSave()
      //this.getPageInfo()
      this.visibleEditName = false
    },
    onSearch(){
      this.$refs.chartComponent.chooseSearch(this.searchKeys);
    },
    beforeUpload(file) {
      let isLtSize = null;
      let message = "";
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "video/mp4"
      ) {
        if (file.type.indexOf("image") > -1) {
          isLtSize = file.size / 1024 / 1024 < 5;
          message = "素材过大，请注意上传素材的大小不要超过规定限制";
        } else {
          isLtSize = file.size / 1024 / 1024 < 20;
          message = "素材过大，请注意上传素材的大小不要超过规定限制";
        }
        if (!isLtSize) {
          this.$message.error(message);
        }
      } else {
        message = "文件格式不正确，请选择支持的图片或视频格式文件！";
        this.$message.error(message);
        isLtSize = false;
      }

      return isLtSize;
    },
    async customUploadRequest(param) {
      let _this = this;
      let fileType = "";
      let zipFile = null;
      if (param.file.type.indexOf("image") > -1) {
        fileType = "pic";
        zipFile = param.file;
        const pramas = {
          originFile: param.file,
          zipFile: zipFile,
          materialType: fileType
        };
        this.uploadFile(pramas);
      } else {
        fileType = "video";
        var video = param.file;
        var url = URL.createObjectURL(video);
        document.getElementById("videoPlayer").src = url;
        setTimeout(() => {
          zipFile = _this.creatImg(param.file.name);
          const pramas = {
            originFile: param.file,
            zipFile: zipFile,
            materialType: fileType
          };
          _this.uploadFile(pramas);
        }, 800);
      }
    },
    creatImg(name) {
      const video = document.getElementById("videoPlayer");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const imgHeight = video.videoHeight;
      const imgWidth = video.videoWidth;
      ctx.drawImage(video, 0, 0, imgWidth, imgHeight);

      this.imgSrc = canvas.toDataURL("image/png");

      // console.log('imgSrc ' + imgHeight + ' ' + imgWidth)
      //console.log(this.imgSrc);

      var blob = this.dataURLtoBlob(this.imgSrc, "image/png"); //base64转blob，全局函数
      var file = new File([blob], name, {
        type: "image/png",
        lastModified: Date.now()
      }); //blob转file

      return file;
    },
    dataURLtoBlob(dataURI, type) {
      var binary = atob(dataURI.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    },
    uploadFile(pramas) {
      uploadMaterial(pramas)
        .then(res => {
          if (res.success) {
            this.$message.success("上传成功");
          } else {
            this.$message.warning(res.message);
          }
          this.$refs.chartComponent.chooseSearch(this.searchKeys);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUnNamedTemplate(){
      getUnNamedProgramCount().then(res=>{
        let num = res.data==0?'':res.data
        this.pageInfo.dataViewName = '未命名节目' + num;
        this.$forceUpdate();
      });
    },
    openShareModal(){
      this.shareForm.programId = this.pageId;
      this.shareForm.shareUserType = this.programLimitType===null?-1:this.programLimitType;
      getShareUsers(this.pageId).then(res => {
        if(res.success){
          this.shareForm.shareAccountList = res.data;
          this.shareVisible = true;
          console.log(res)
          this.oldShareData={
            shareUserType:this.shareForm.shareUserType,
            shareAccountList:res.data
          };
        }else{
          this.$message.error(res.message);
        }
      }).catch(error => {
        this.shareVisible = true;
        console.log(error);
      });
    },
    addShareAccount(){
      if(this.shareForm.shareAccountList.length>=20){
        this.$message.warning('最多添加20个账号');
        return;
      }
      let accountName = this.$store.state.user.userName;
      if(this.shareAccount === accountName){
        this.$message.warning('不能添加自身账号')
        return;
      }
      this.shareAccountInfo();
    },
    deleteShareAccount(data){
      for(let i=0;i<this.shareAccountList.length;i++){
        if(data.id === this.shareAccountList[i].id){
          this.shareAccountList.splice(i,1);
        }
      }
    },
    isArrayEquar(a, b) {
      // 判断数组的长度
      if (a.length !== b.length) {
        return false
      } else {
        // 循环遍历数组的值进行比较
        for (let i = 0; i < a.length; i++) {
            if (a[i].shareUserAccount !== b[i].shareUserAccount) {
                return false
            }
        }
        return true;
      }
    },
    handleShareOk(){
      let list = [];
      if(this.shareForm.shareUserType === 0){
        if(this.shareForm.shareAccountList.length === 0){
          this.$message.warning('请添加账号');
          return;
        }
        this.shareForm.shareAccountList.map(item => {
          list.push({
            shareUserName:item.shareUserName,
            shareUserAccount:item.shareUserAccount
          });
        });
      }
      this.shareLoading = true;
      if(this.shareForm.shareUserType === 0){
        console.log('去除以下判断')
        // if(this.oldShareData.shareUserType === this.shareForm.shareUserType && this.isArrayEquar(this.oldShareData.shareAccountList,list)){
        //   this.shareLoading = false;
        //   this.shareVisible = false;
        //   return;
        // }
      }else{
        if(this.oldShareData.shareUserType === this.shareForm.shareUserType){
          this.shareLoading = false;
          this.shareVisible = false;
          return;
        }
      }
      settingProgramShare({
        programId: this.shareForm.programId,
        shareAccounts: list,
        shareType:this.shareForm.shareUserType
      }).then(res => {
        if(res.success){
          this.$message.success('共享设置成功！');
          this.shareLoading = false;
          this.shareVisible = false;
          this.programLimitType = this.shareForm.shareUserType;
        }else{
          this.$message.error(res.message);
        }
      }).catch(error => {
        this.shareLoading = false;
        console.log(error);
      });
    },
    handleShareCancel(){
      this.shareVisible = false;
    },
    async shareAccountInfo(){
      // let accountName = this.$store.state.user.userName;
      const { data } = await getShareAccountInfo(this.shareAccount);
      if (data) {
        this.shareForm.shareAccountList.push({
          id:uuid(),
          shareUserName:data.shareUserName,
          shareUserAccount:data.shareUserAccount
        });
        this.shareAccount = '';
      }
    },
    
  },
  
}
