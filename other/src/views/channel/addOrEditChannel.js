import { mapMutations, mapState } from 'vuex'
import * as uuid from 'uuid/v1'
import draggable from "vuedraggable";
import Swiper from "@/utils/swiper-bundle.min.js";
import "@/utils/swiper-bundle.min.css";
import DragItem from '@/components/dragItem'
import ChannelPageOpt from '@/components/channelPageOpt'
import ChannelProgramOpt from '@/components/channelProgramOpt'
import NewDataSet from '@/components/newDataSet'
import MapDataSet from '@/components/mapDataSet'
import ChartDataSet from '@/components/chartDataSet'
import {
  contentOptions,
  contextMenuData,
  dataOptions,
  interactiveOptions,
  TYPE_SETS
} from '@/constants'
import { tabList, saveTab, sliderOptions } from '@/utils/constants'
import SET_DATA from '@/utils/setData'
import { getProgramList,getProgramAllGroupInfo,programDetail,programDetailBath } from "@/api/program";
import { generateImage } from '@/utils/screenshot'
import ChartComponent from '@/components/aside/newChartComponent'
import LayerList from '@/components/aside/layerList'
import CanvasRuler from '@/components/canvasRuler'
import TimeRuler from '@/components/timeRuler'
import SwipeOptionData from '@/components/swipeOptionData'
import ReleaseManagement from '@/components/releaseManagement'
import { WebSocketService } from "@/utils/websocketService";
import { editAssembly } from '@/api/myCom'
import {channelDetail,addChannel,editChannel,getUnNamedChanneleCount} from '@/api/channel'
import BiDialog from '@/components/biDialog.vue'
//import SaveComponent from './saveComponent'
import leftArrow from '@/assets/images/left-arrow.png'
import settingIcon from '@/assets/images/setting.png'
import previewIcon from '@/assets/images/preview.png'
import saveIcon from '@/assets/images/save.png'
import uploadIcon from '@/assets/images/upload.png'
import page404 from '@/views/404';

export default {
  name: 'addOrEditTemplate',
  data() {
    return {
      leftArrow,
      settingIcon,
      previewIcon,
      saveIcon,
      uploadIcon,
      // 控制左右面板收起展开
      collapse: {
        left: false,
        right: false
      },
      loading: false,
      // 当前大大屏的id
      pageId: null,
      channelParentId:null,
      //模板类型
      pageGropType:'defind',
      // 当前大屏挂载节点
      nodeId: 0,
      // 左侧一级目录
      tabList,
      saveTab, // 收藏单列
      // 默认激活一级目录
      activeMenuKey: 'chart',
      // 当前大屏使用的组件列表
      list1: [],
      firstComponetPic:null,
      // 当前操作的元素
      curEl: null,
      curIndex: null,
      dragEl: null,
      // 当前激活的元素
      activeEl: null,
      // 内容区域大小
      viewHeight: 1,
      ruleYHeight:1,
      viewWidth: 1,
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
      channelPageOption: {
        defineSize:'1920*1080',
        screenSize: { width: 1920, height: 1080 },
        bgColor: '#000f3680',
        playType:"0",
        playAnimation:"0",
        opacity:1,
        groupOwnerId:null,
        resizeType: 3,
        bgImg: require('@/assets/newbk.png')
      },
      programPageOption: {
        defineSize:'1920*1080',
        screenSize: { width: 1920, height: 1080 },
        bgColor: '#000f3680',
        playType:"0",
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
      currentProgramIndex:0,
      programNum:0,
      iconRight:"346px",
      treeUniqId:'',
      visibleChooseProgram:false,
      allowClear:false,
      replaceTreeFields: {
        key: "unqiId",
        children: "children",
        title: "programName",
        value: "id"
      },
      programGroupId:null,
      programGroupData:[],
      confirmChoosePorgramLoading:false,
      searchTxt:'',
      programSize:'',
      programSizeList:[
        '1920*1080',
        '1680*1050',
        '1600*900',
        '1400*1050',
        '1400*900',
        '1366*768',
        '1360*768',
        '1280*1024',
        '1280*960',
        '1280*800',
        '1280*720'
      ],
      channelDataList:[],
      previewConfigList:[],
      programData: [],
      //选中的节目id
      programDataIdList:[],
      currentProgramData:null,
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
      columns: [
        {
          title: "节目数据",
          dataIndex: "unqiId",
          key: "unqiId",
          scopedSlots: { customRender: "unqiId" }
        }
      ],
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
      tableLoading:false,
      isComponent: false,
      currentProgramId:null,
      mySwiper: null,
      isShowPrev: false,
      fullScreenLoading: false,
      delProgramVisible:false,
      editProgramVisible:false,
      delProgramConfirmLoading:false,
      timeRulerWidth:null,
      globelPlay:"one",
      currentProgramOption:null
    }
  },
  components: {
    page404,
    DragItem,
    ChannelPageOpt,
    ChannelProgramOpt,
    ChartComponent,
    NewDataSet,
    MapDataSet,
    ChartDataSet,
    CanvasRuler,
    TimeRuler,
    SwipeOptionData,
    ReleaseManagement,
    BiDialog,
    //SaveComponent,
    LayerList,
    draggable
  },
  computed: {
    ...mapState({
      historyList: (state) => state.historyList
    }),
    contentStyle() {
      const { screenSize } = this.programPageOption
      const width = Math.max((screenSize.width * this.sliderVal) / 100, this.viewWidth)
      const height = Math.max((screenSize.height * this.sliderVal) / 100, this.viewHeight)
      return `width: ${width}px;height:${height}px;position: relative;margin:auto;`
    },
    scrollBoxStyle() {
      return `width: calc(100vw - ${382 *
        +!this.collapse.right}px); height: ${this.viewHeight}px`
    },
    rulerStart() {
      let mainContent=document.getElementsByClassName('main-content__body');
      let h = 0;
      if(mainContent && mainContent.length){
        h = mainContent[0].offsetHeight;
      }
      const { screenSize } = this.programPageOption
      const width = Math.max((screenSize.width * this.sliderVal) / 100, this.viewWidth)
      const height = Math.max((screenSize.height * this.sliderVal) / 100, this.viewHeight)

      const scaleWidth = (screenSize.width * this.sliderVal) / 100
      const scaleHeight = (screenSize.height * this.sliderVal) / 100

      let x = (width - scaleWidth) / 2
      let y = (height - scaleHeight) / 2

      if(h > 0){
        y = y+( h - this.viewHeight)/2;
      }

      return { x: x , y: y  }
    },
    rulerWidth() {
      const { screenSize } = this.programPageOption
      const width = Math.max((screenSize.width * this.sliderVal) / 100, this.viewWidth)
      const height = Math.max((screenSize.height * this.sliderVal) / 100, this.viewHeight)
      return {
        x: width,
        y: height
      }
    },
    scalePageOption() {
      return {
        ...this.programPageOption,
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
    this.pageId = this.$route.query?.id;
    this.treeUniqId = this.$route.query?.treeUniqId || '';
    this.pageGropType = this.$route.query?.type || 'defind';
    this.channelParentId = this.$route.query?.channelParentId || null;//分组id回显
    this.nodeId = this.$route.query?.nodeId || 0
    if(!this.pageId){
      this.getUnNamedTemplate();
    }

    // 初始化list
    await this.getChannelProgramInfo()

    this.getAllProgramGroupData();

    this.viewHeight = window.innerHeight - 385
    this.ruleYHeight = window.innerHeight - 295
    this.viewWidth = window.innerWidth - (382 + 20)
    if(!this.channelPageOption.screenSize){
      this.channelPageOption.screenSize={
        height: 1080,
        width: 1920
      }
    }
    const ratio1 = Math.floor((this.viewWidth * 100) / this.channelPageOption.screenSize.width)
    const ratio2 = Math.floor((this.viewHeight * 100) / this.channelPageOption.screenSize.height)
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

    this.$nextTick(()=>{
      let dragArea=document.getElementsByClassName("drag")[0];
      if(dragArea){
        let w = dragArea.firstElementChild.offsetWidth;
        if(w<document.body.offsetWidth){
          this.timeRulerWidth = document.body.offsetWidth
        }else{
          this.timeRulerWidth = w
        }

      }
    })


    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapMutations({
      setSwipeEl: 'SET_SWIPE_EL',
      setHistoryList: 'SET_HISTORY_LIST'
    }),
    /* 处理拖拽逻辑 start */
    handleDragStart({ el, action }) {
      if(el.id === 'scroll-board-style' || el.id === 'map-simple'
      || el.id === 'bar-simple' || el.id === 'line-simple'
      || el.id === 'bar-line-double' || el.id === 'index-board-style' 
      || el.id === 'futures-table-style' || el.id === 'futures-board-style'){
        this.tabTitle = ['样式','数据']
      }else{
        this.tabTitle = ['样式']
      }
      this.curEl = null
      let curEl = this.deepClone(el)
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
        this.setSnap(this.curEl)
      }, 200)
    },
    handleResizable(data) {
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
          posy: curEl.posy
        }
      }
      this.curIndex = data.index
      this.$set(this, 'list1', list)
      this.$set(this, 'curEl', curEl)
      this.showRefLine = true
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
      this.list1.forEach((item, index) => {
        item.active = index === i
        item.option.component.active = item.active
        if (item.active && (
          item.componentName === 'scroll-board' || item.id === 'map-simple'
          || item.id === 'bar-simple'
          || item.id === 'line-simple'
          || item.id === 'bar-line-double')) {
          this.tabTitle = ['样式','数据']
        }else{
          this.tabTitle = ['样式']
        }
        this.tabActive = 0;
      })
      this.curEl = this.list1[i]
      this.activeEl = this.list1[i]
      this.curIndex = i

      // 初始化swipe组件中的激活元素
      this.setSwipeEl(null)
    },
    handleDeActivated(i) {
      this.showRefLine = false
      this.activeEl = null
      this.list1[i]['active'] = false

      // 初始化swipe组件中的激活元素
      this.setSwipeEl(null)
    },
    handleScrollboxCfg() {
      if (!this.activeEl) {
        this.curEl = null
        this.showSetting = true
        this.curIndex = null
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
    handleComponentCopy(index) {
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

      // 更新图层层级
      this.updateLayer()
      this.curEl = newEl
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
      this.debounceTime = setTimeout(() => {
        // 处理取消全屏后需要恢复原始scale
        if (!document.fullscreenElement) {
          this.scaleStyle = {
            ...this.scaleStyle,
            transform: `scale(${this.scalePageOption.scale})`
          }
          this.showScreenPreview = false
          this.isShowPrev = false;
        }
        this.viewHeight = window.innerHeight - 385
        this.ruleYHeight = window.innerHeight - 295
        this.viewWidth =
          window.innerWidth - (382 * +!this.collapse.right + 20)
        let screenSize = this.channelPageOption.screenSize || {};
        if(!screenSize){
          screenSize.width = 1920;
          screenSize.height = 1080;
        }
        const ratio1 = Math.floor((this.viewWidth * 100) / screenSize.width)
        const ratio2 = Math.floor((this.viewHeight * 100) / screenSize.height)
        if (!document.fullscreenElement) {
          this.items.forEach((item) => {
            if (item.label === '自适应') {
              const curVal = Math.min(ratio1, ratio2) + '%'
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
      this.previewConfigList = [];
      let previewConfigList = [];
      if(!this.channelDataList.length)return;
      this.isShowPrev = true;
      this.fullScreenLoading = true;
      const el = document.getElementById("view-scroll-content");
      const rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;

      if (rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        const wscript = new window.ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
      this.showScreenPreview = true;
      //let routeData = this.$router.resolve({ path: "/show/" + data.id });
      //window.open(routeData.href, "_blank");
      this.channelDataList.map(res=>{
        let time = 0;
        const pageOption = this.jsonException(res.programConfig) || null;
        let assemblyList = (
          this.jsonException(res.programTemplateMaterialConfig) || []
        ).map(item => {
          const { component } = item.option;
          if (this.isComponent) {
            component.width = window.innerWidth - 100;
            component.height = window.innerHeight - 100;
          }
          return {
            ...item,
            wrapperStyle: this.setWrapperStyle(component)
          };
        });
        let contentStyle = pageOption ? this.setBgStyle(pageOption) : 'width:100%;height:100%;';
        let playTime = Number(res.playTime);
        if(res.playTimeType==='hour'){
          time = playTime * 60 * 60 * 1000;
        }else if(res.playTimeType==='minute'){
          time = playTime * 60 * 1000;
        }else{
          time = playTime * 1000;
        }
        if(res.useRange==="all"){
          this.globelPlay = "all"
          this.globelAnimate = res.playAnimation;
        }
        if(res.programTemplateMaterialConfig === null){
          assemblyList = [{
            componentName: "page404",
            id: "page-404-style"
          }]
        }
        previewConfigList.push({
          id:res.id,
          playTime:res.playTime,
          playTimeType:res.playTimeType,
          //playAnimation:res.playAnimation,
          useRange:res.useRange,
          contentStyle:contentStyle,
          list1:assemblyList,
          time:time
        });
      });
      this.previewConfigList = previewConfigList;
      this.fullScreenLoading = false;
      let playType=this.channelPageOption.playType;
      if(this.mySwiper){
        this.mySwiper.destroy(true);
      }
      //this.channelPageOption.playAnimation
      if(this.channelPageOption.playAnimation==="0"){
        this.mySwiper = new Swiper(".previewSwiper", {
          initialSlide: 0,
          effect: "creative",
          creativeEffect: {
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          },
          watchSlidesProgress : true,
          centeredSlides: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          autoplay: {
            stopOnLastSlide: playType==="1"?true:false,
          }, //可选选项，自动滑动
          // on:{
          //   progress: function(swiper,progress){
          //     console.log(progress)
          //     for (var i = 0; i < swiper.slides.length; i++){
          //       var slide = swiper.slides[i];
          //       var es = slide.style;
          //       es.webkitAnimation =  es.animation = 'bounceInDown 0.2s 1';
          //     }
          //   },
          // },
        });
      }else if(this.channelPageOption.playAnimation==="1" || this.channelPageOption.playAnimation==="2"){
        this.mySwiper = new Swiper(".previewSwiper", {
          initialSlide: 0,
          watchSlidesProgress : true,
          centeredSlides: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          autoplay: {
            stopOnLastSlide: playType==="1"?true:false,
          }, //可选选项，自动滑动
          // on:{
          //   progress: function(swiper,progress){
          //     console.log(progress)
          //     for (var i = 0; i < swiper.slides.length; i++){
          //       var slide = swiper.slides[i];
          //       var es = slide.style;
          //       es.webkitAnimation =  es.animation = 'bounceInDown 0.2s 1';
          //     }
          //   },
          // },
        });
      }else if(this.channelPageOption.playAnimation==="3"){
        this.mySwiper = new Swiper(".previewSwiper", {
          initialSlide: 0,
          effect: "creative",
          creativeEffect: {
            prev: {
              shadow: true,
              translate: [0, 0, 0],
            },
            next: {
              translate: [0, "100%", 0],
            },
          },
          watchSlidesProgress : true,
          centeredSlides: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          autoplay: {
            stopOnLastSlide: playType==="1"?true:false,
          }, //可选选项，自动滑动
        });
      }else if(this.channelPageOption.playAnimation==="4"){
        this.mySwiper = new Swiper(".previewSwiper", {
          initialSlide: 0,
          effect: "creative",
          creativeEffect: {
            prev: {
              shadow: true,
              translate: [0, 0, 0],
            },
            next: {
              translate: [0, "-100%", 0],
            },
          },
          watchSlidesProgress : true,
          centeredSlides: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          autoplay: {
            stopOnLastSlide: playType==="1"?true:false,
          }, //可选选项，自动滑动
        });
      }else{
        this.mySwiper = new Swiper(".previewSwiper", {
          initialSlide: 0,
          effect : 'fade',
          watchSlidesProgress : true,
          centeredSlides: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          autoplay: {
            stopOnLastSlide: playType==="1"?true:false,
          }, //可选选项，自动滑动
        });
      }
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
      this.isShowPrev = false;
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
      if(!this.channelDataList.length){
        this.$message.warning('请添加节目');
        return;
      }
      if(!this.pageInfo.dataViewName.trim()){
        this.loading = false;
        this.$message.warning('请填写频道名称');
        return;
      }
      //const el = this.$refs['scroll-box']
      const snapshot = this.channelDataList[0].programSnapshot;//await generateImage(el,this.sliderVal);
      try {
        this.loading = true;
        let channelPrograms=[];
        let noProgramIdFlag = false;
        this.channelDataList.map(item=>{
          let rule = {
            uuid:item.uuid,
            //playAnimation: item.playAnimation,
            playTime: item.playTime,
            playTimeType: item.playTimeType,
            sourceType: item.sourceType,
            useRange: item.useRange
          }
          if(item.id === null){
            noProgramIdFlag = true;
          }
          channelPrograms.push({
            programId:item.id,
            programRule:JSON.stringify(rule)
          })
        });
        if(noProgramIdFlag){
          this.loading = false;
          this.$message.warning('不能保存已删除或权限异常的节目');
          return;
        }
        console.log(this.channelPageOption)
        if(this.pageId){
          editChannel({
            channelId: this.pageId,
            channelParentId:this.channelPageOption.groupOwnerId,
            channelName: this.pageInfo.dataViewName,
            channelRule: JSON.stringify(this.channelPageOption),
            channelPrograms:channelPrograms,
            channelSnapshot:snapshot
          }).then(res=>{
            this.loading = false
            this.viewData = true
            if(res.success){
              this.rawPageInfo = JSON.stringify({
                assemblyJson: this.channelDataList,
                dataViewJson: this.channelPageOption,
                dataViewName: this.pageInfo.dataViewName
              })
              this.$message.success(res.message, 1)
              if(isLeave==='returnProgam'){
                let data = this.channelDataList[this.currentProgramIndex-1];
                this.delProgramConfirmLoading = false;
                this.$router.push({
                  path: "/edit/addOrEditProgram",
                  query: {
                    id: data.id,
                    name: data.programName,
                    programParentId:data.programParentId,
                    sourceType:data.sourceType
                  }
                });
              }else if(isLeave==='returnChannel'){
                this.$router.push({ name: '/index/channelManage',params:{treeUniqId:this.treeUniqId} })
              }
            }else{
              this.$message.error(res.message);
            }
          }).catch(error=>{
            this.loading = false
            console.log(error)
          });

        }else{
          addChannel({
            channelName: this.pageInfo.dataViewName,
            channelParentId:this.channelPageOption.groupOwnerId,
            channelRule:JSON.stringify(this.channelPageOption),
            channelPrograms:channelPrograms,
            channelSnapShot:snapshot,
            channelLimitType:1
          }).then(res=>{
            this.loading = false
            if(res.success){
              if(res.data){
                this.pageId = res.data;
              }
              this.viewData = true
              this.rawPageInfo = JSON.stringify({
                assemblyJson: this.channelDataList,
                dataViewJson: this.channelPageOption,
                dataViewName: this.pageInfo.dataViewName
              })
              this.$message.success(res.message, 1)
              if(isLeave==='returnProgam'){
                let data = this.channelDataList[this.currentProgramIndex-1];
                this.delProgramConfirmLoading = false;
                this.$router.push({
                  path: "/edit/addOrEditProgram",
                  query: {
                    id: data.id,
                    name: data.programName,
                    programParentId:data.programParentId,
                    sourceType:data.sourceType
                  }
                });
              }else if(isLeave==='returnChannel'){
                this.$router.push({ name: '/index/channelManage',params:{treeUniqId:this.treeUniqId} })
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
    handleSetting(){
      this.showSetting = true;
    },
    handleSetting2(e){
      e.preventDefault();
      e.stopPropagation();
      this.showSetting = false;
    },
    // 撤回
    handleWithdraw() {
      this.list1 = this.deepClone(this.historyList)
      this.setHistoryList(null)
    },
    /* 顶部操作 end */

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
      this.curEl = this.list1[this.curIndex]
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
      this.$set(this, 'channelPageOption', { ...val, bgImg: val.bgImg || this.channelPageOption.bgImg })
    },
    handleProgramOptionChange(val){
      if(val.useRange==="all"){
        let list = this.deepClone(this.channelDataList);
        list.map(item=>{
          item.playTime=val.playTime;
          item.playTimeType=val.playTimeType;
          //item.playAnimation=val.playAnimation;
          item.useRange=val.useRange;
        });
        this.$set(this,"channelDataList",list);
      }else{
        this.$set(this.channelDataList,this.currentProgramIndex-1, {
          uuid:this.channelDataList[this.currentProgramIndex-1].uuid,
          id:this.channelDataList[this.currentProgramIndex-1].id,
          playTime:val.playTime,
          playTimeType:val.playTimeType,
          //playAnimation:val.playAnimation,
          useRange:val.useRange,
          programName:this.channelDataList[this.currentProgramIndex-1].programName,
          sourceType:this.channelDataList[this.currentProgramIndex-1].sourceType,
          programParentId:this.channelDataList[this.currentProgramIndex-1].programParentId,
          programConfig:this.channelDataList[this.currentProgramIndex-1].programConfig,
          programTemplateMaterialConfig:this.channelDataList[this.currentProgramIndex-1].programTemplateMaterialConfig,
          programSnapshot:this.channelDataList[this.currentProgramIndex-1].programSnapshot
        });
      }
      console.log('更新节目设置：',this.channelDataList)
    },
    setBgStyle(styleObj) {
      let contentStyle = "";
      if (!styleObj) return;
      if (styleObj.bgType === "1") {
        contentStyle += `background-image: url(${styleObj.bgImg});`;
      } else {
        contentStyle += `background-color: ${styleObj.bgColor};`;
      }

      if (styleObj.resizeType) {
        const size =
          +styleObj.resizeType === 1
            ? "100% auto"
            : +styleObj.resizeType === 2
            ? "auto 100%"
            : "100% 100%";
        contentStyle += `background-size: ${size};`;
      }

      if (styleObj.screenSize) {
        const { width, height } = styleObj.screenSize;
        contentStyle += `width: ${width}px; height: ${height}px;`;
      }
      if (!this.isComponent) {
        const { width, height } = styleObj.screenSize;
        let scale = {};
        const { width: innerWidth, height: innerHeight } = window.screen;
        scale = { y: innerHeight / height, x: innerWidth / width };
        contentStyle += "position: absolute; left: 50%; top: 50%;";
        contentStyle += `transform: scale(${scale.x}, ${
          scale.y
        }); margin-left: -${width / 2}px; margin-top: -${height / 2}px;`;
      }
      return contentStyle;
    },
    setWrapperStyle(styleObj,type) {
      let style = "";
      if(type==='preview'){
        if (styleObj.posx) {
          style += `left: ${styleObj.posx}px;`;
        }
        if (styleObj.posy) {
          style += `top: ${styleObj.posy}px;`;
        }
      }else{
        style += `transform:translate(${styleObj.posx}px,${styleObj.posy}px);`;
      }


      if (styleObj.z || styleObj.z === 0) {
        style += `z-index: ${styleObj.z};`;
      }

      if (styleObj.width) {
        style += `width: ${styleObj.width}px;`;
      }

      if (styleObj.height) {
        style += `height:  ${styleObj.height}px;`;
      }
      return style;
    },
    //获取编辑页面频道节目数据
    async getChannelProgramInfo(){
      let _this = this;
      if (!this.pageId) return
      // 保存历史记录
      this.setHistoryList(null)

      this.loading = true;
      setTimeout(function(){
        _this.loading = false;
      },6 * 1000);
      try {
        const { data } = await channelDetail({ channelId: this.pageId })
        this.loading = false
        let channelDataList=[];
        let channelPrograms = data.channelPrograms;
        if(channelPrograms && channelPrograms.length){
          let programTemplateMaterialConfig = this.jsonException(channelPrograms[0].programTemplateMaterialConfig);
          let programInfo = this.jsonException(channelPrograms[0].programRule);
          channelPrograms.map(item=>{
            let programRule = this.jsonException(item.programRule);
            channelDataList.push({
              uuid:programRule.uuid,
              id:item.programId,
              playTime:programRule.playTime,
              playTimeType:programRule.playTimeType,
              //playAnimation:programRule.playAnimation,
              useRange:programRule.useRange,
              programName:item.programName,
              sourceType:item.sourceType,
              programParentId:item.programParentId,
              programConfig:item.programConfig,
              programTemplateMaterialConfig:item.programTemplateMaterialConfig,
              programSnapshot:item.programSnapshot
            });
          });
          this.showSetting = false;
          this.currentProgramId = programInfo.uuid;
          this.currentProgramIndex = 1;
          const pageOption = this.jsonException(channelPrograms[0].programConfig||[]);
          let assemblyList = (programTemplateMaterialConfig || []).map((item, index) => {
            const { component, dataConfig } = item.option;
            if (this.isComponent) {
              component.width = window.innerWidth - 100;
              component.height = window.innerHeight - 100;
            }
            if (dataConfig) {
              const { interval, dataSourceCheckId, dataSourceDictId, wsUrl } =
                dataConfig.dataSource || {};
              if (
                interval &&
                (dataSourceCheckId == 2 ||
                  (dataSourceCheckId == 0 && dataSourceDictId <= 2))
              ) {
                this.waitToInterval[interval] = this.waitToInterval[interval]
                  ? [...this.waitToInterval[interval], { dataConfig, index }]
                  : [{ dataConfig, index }];
              } else if (dataSourceCheckId === 3 && wsUrl) {
                const websocket = new WebSocketService(
                  wsUrl,
                  this.updateWsRecord,
                  index
                );
                dataConfig.dataSource.data = [];

                this.websocketList.push({ websocket, dataConfig, index });
              }
            }
            return {
              ...item,
              wrapperStyle: this.setWrapperStyle(component)
            };
          });
          if(!channelPrograms[0].programId){
            assemblyList = [{
              componentName: "page404",
              id: "page-404-style"
            }]
          }
          this.$set(this, 'list1', assemblyList);
          if(pageOption){
            this.$set(this, 'programPageOption', pageOption)
          }
          console.log(pageOption)
          this.rawPageInfo = JSON.stringify({
            assemblyJson: channelDataList,
            dataViewJson: this.jsonException(data.channelRule),
            dataViewName: data.channelName
          })
          // 初始化图层最大值和最小值
          const layerList = assemblyList.map((item) => item.z)

          this.layer = {
            max: Math.max(...layerList),
            min: Math.min(...layerList)
          }
        }
        let channelPageOption = this.jsonException(data.channelRule);
        channelPageOption.groupOwnerId = data.channelParentId;
        this.$set(this, 'channelDataList', channelDataList)
        this.$set(this, 'channelPageOption', channelPageOption)
        this.pageInfo.dataViewName = data.channelName;
      } catch {
        this.loading = false
      }
    },
    // 获取选中节目数据
    async getProgramPageInfo(resParams,operationType,programInfo) {
      let _this = this;
      if (!resParams.length) return
      // 保存历史记录
      this.setHistoryList(null)

      this.loading = true
      try {
        if(operationType==='selected'){
          this.showSetting = true;
          const { data } = await programDetail({  programId: resParams[0].id, sourceType:resParams[0].sourceType});
          let programTemplateMaterialConfig = data?data.programTemplateMaterialConfig:[];
          let programConfig=data?data.programConfig:[];
          this.confirmChoosePorgramLoading = false;
          this.visibleChooseProgram = false;
          this.loading = false
          let assemblyList = (this.jsonException(programTemplateMaterialConfig) || []).map((item, index) => {
            const { component, dataConfig } = item.option;
            if (this.isComponent) {
              component.width = window.innerWidth - 100;
              component.height = window.innerHeight - 100;
            }
            if (dataConfig) {
              const { interval, dataSourceCheckId, dataSourceDictId, wsUrl } =
                dataConfig.dataSource || {};
              if (interval &&(dataSourceCheckId == 2 || (dataSourceCheckId == 0 && dataSourceDictId <= 2))) {
                this.waitToInterval[interval] = this.waitToInterval[interval]
                  ? [...this.waitToInterval[interval], { dataConfig, index }]
                  : [{ dataConfig, index }];
              } else if (dataSourceCheckId === 3 && wsUrl) {
                const websocket = new WebSocketService(
                  wsUrl,
                  this.updateWsRecord,
                  index
                );
                dataConfig.dataSource.data = [];

                this.websocketList.push({ websocket, dataConfig, index });
              }
            }
            return {
              ...item,
              wrapperStyle: this.setWrapperStyle(component)
            };
          })
          if(resParams[0].id === null){
            assemblyList = [{
              componentName: "page404",
              id: "page-404-style"
            }];
            this.showSetting = false;
            this.currentProgramId = programInfo.programData.uuid;
            this.currentProgramIndex = programInfo.index+1;
            this.$set(this,'currentProgramOption',this.channelDataList[this.currentProgramIndex-1]);
            this.$set(this, 'list1', assemblyList)
          }else{
            this.showSetting = false;
            this.currentProgramId = programInfo.programData.uuid;
            this.currentProgramIndex = programInfo.index+1;
            const pageOption = this.jsonException(programConfig) || null;
            this.$set(this,'currentProgramOption',this.channelDataList[this.currentProgramIndex-1]);
            this.$set(this, 'list1', assemblyList)
            this.$set(this, 'programPageOption', pageOption)
            this.programPageOption.defineSize = pageOption.screenSize.width+"*"+pageOption.screenSize.height;
          }

          this.$forceUpdate();
        }else{
          let list = [];
          let isAllFlag = false;
          console.log('this.channelDataList',this.channelDataList)
          resParams.map(item=>{
            let unqiId = item.id + "_" + (item.sourceType?item.sourceType:'defined');
            let filterData = this.channelDataList.filter(res => (res.id+"_"+(res.sourceType?res.sourceType:'defined')) === unqiId);
            if(!filterData.length){
              list.push({
                programId:item.id,
                sourceType:this.currentProgramData.sourceType==='share'?'share':item.sourceType?item.sourceType:'defined'
              });
            }
          });
          this.channelDataList.map(item=>{
            if(item.useRange==="all"){
              isAllFlag = true;
            }
          });
          if(list.length === 0){
            this.confirmChoosePorgramLoading = false;
            this.visibleChooseProgram = false;
            this.loading = false
            return;
          }
          const { data } = await programDetailBath(list)
          if(data){
            data.map(item=>{
              let uid = uuid();
              console.log(uid)
              this.channelDataList.push({
                uuid:uid,
                id:item.programId,
                playTime:isAllFlag?this.channelDataList[0].playTime:'1',
                playTimeType:isAllFlag?this.channelDataList[0].playTimeType:"hour",
                //playAnimation:isAllFlag?this.channelDataList[0].playAnimation:"0",
                useRange:isAllFlag?"all":"one",
                programName:item.programName,
                sourceType:item.sourceType,
                programParentId:item.programParentId,
                programConfig:item.programConfig,
                programTemplateMaterialConfig:item.programTemplateMaterialConfig,
                programSnapshot:item.programSnapshot,
              });
            });
          }
          this.confirmChoosePorgramLoading = false;
          this.visibleChooseProgram = false;
          this.loading = false

          this.showSetting = false;
          if(!this.currentProgramIndex){
            const assemblyList = (this.jsonException(data[0].programTemplateMaterialConfig) || []).map((item, index) => {
              const { component, dataConfig } = item.option;
              if (this.isComponent) {
                component.width = window.innerWidth - 100;
                component.height = window.innerHeight - 100;
              }
              if (dataConfig) {
                const { interval, dataSourceCheckId, dataSourceDictId, wsUrl } =
                  dataConfig.dataSource || {};
                if (interval &&(dataSourceCheckId == 2 || (dataSourceCheckId == 0 && dataSourceDictId <= 2))) {
                  this.waitToInterval[interval] = this.waitToInterval[interval]
                    ? [...this.waitToInterval[interval], { dataConfig, index }]
                    : [{ dataConfig, index }];
                } else if (dataSourceCheckId === 3 && wsUrl) {
                  const websocket = new WebSocketService(
                    wsUrl,
                    this.updateWsRecord,
                    index
                  );
                  dataConfig.dataSource.data = [];

                  this.websocketList.push({ websocket, dataConfig, index });
                }
              }
              return {
                ...item,
                wrapperStyle: this.setWrapperStyle(component)
              };
            })
            this.currentProgramIndex = 1;
            this.currentProgramId = this.channelDataList[this.currentProgramIndex-1].uuid;
            const pageOption = this.jsonException(data[0].programConfig) || null;
            this.$set(this, 'list1', assemblyList)
            this.$set(this, 'programPageOption', pageOption)
            this.$set(this,'currentProgramOption',this.channelDataList[this.currentProgramIndex-1]);
            this.programPageOption.defineSize = pageOption.screenSize.width+"*"+pageOption.screenSize.height;
          }
        }
         // 开启定时器
         Object.keys(this.waitToInterval || {}).forEach(interval => {
          this.startInterval(interval);
        });

        // 先清空websocket组件的默认数据
        this.websocketList.forEach(wsCmp => {
          this.setOptionData(
            wsCmp.index,
            this.transformData(wsCmp.dataConfig.dataMap, [])
          );
        });
      } catch {
        this.loading = false
      }
    },
    async returnPic(){
      const el = this.$refs['scroll-box']
      const snapshot = await generateImage(el,this.sliderVal);
      return snapshot;
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
        assemblyJson: this.channelDataList,
        dataViewJson: this.channelPageOption,
        dataViewName: this.pageInfo.dataViewName
      })
      if (this.rawPageInfo !== curPageInfo) {
        this.showConfirm = true
      } else {
        this.$router.push({ path: '/index/channelManage' })
      }
    },
    async submit(flag = false) {
      this.showConfirm = false;
      if (flag === true) {
        await this.handleSave(false,'returnChannel');
        if(!this.pageInfo.dataViewName.trim()){
          return;
        }
      }else{
        this.$router.push({ name: '/index/channelManage',params:{treeUniqId:this.treeUniqId} })
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
    getUnNamedTemplate(){
      getUnNamedChanneleCount().then(res=>{
        let num = res.data==0?'':res.data
        this.pageInfo.dataViewName = '未命名频道' + num;
      });
    },
    enter(item) {
      item.isHover = true;
    },
    leave(item) {
      item.isHover = false;
    },
    getAllProgramGroupData() {
      getProgramAllGroupInfo().then(res => {
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
    showProgramDialog(){
      this.pagination.current=1;
      this.pagination.defaultPageSize=6;
      this.programSize='';
      this.programGroupId=this.programGroupData[0].id;
      this.currentProgramData = this.programGroupData[0];
      this.visibleChooseProgram = true;
      this.programDataIdList = this.deepClone(this.channelDataList);
      this.getProgramData(this.programGroupId,  this.currentProgramData.sourceType,this.programSize);
    },
    deleteProgramModal(){
      this.delProgramVisible = true;
    },
    eidtProgramModal(){
      this.editProgramVisible = true;
    },
    deleteProgram(){
      this.channelDataList.splice(this.currentProgramIndex-1,1);
      if(this.channelDataList.length===0){
        this.list1=[];
        this.scaleStyle='';
        this.$set(this,'currentProgramOption',null);
      }else{
        this.chooseOneProgram(this.channelDataList[0],0)
      }
      this.delProgramVisible = false;
    },
    deleteProgarmCancel(){
      this.delProgramVisible = false;
    },
    async saveChannel(){
      if(!this.channelDataList.length){
        this.$message.warning('请添加节目');
        return;
      }
      await this.handleSave(false,'returnProgam');
      this.editProgramVisible = false;
    },
    async cancelSave(){
      this.delProgramConfirmLoading = true;
      let data = this.channelDataList[this.currentProgramIndex-1];
      this.delProgramConfirmLoading = false;
      this.$router.push({
        path: "/edit/addOrEditProgram",
        query: {
          id: data.id,
          name: data.programName,
          programParentId:data.programParentId,
          sourceType:data.sourceType
        }
      });
      this.editProgramVisible = false;
    },
    cancelModal(){
      this.editProgramVisible = false;
    },
    cancelChooseProgram(){
      this.visibleChooseProgram = false;
    },
    submitChooseProgram(){
      let data=this.programDataIdList;
      console.log(data)
      if(data && data.length){
        this.confirmChoosePorgramLoading = true;
        this.getProgramPageInfo(data);
      }
    },
    changeSize(e){
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 6;
      this.programSize = e;
      this.getProgramData(this.programGroupId,  this.currentProgramData.sourceType,this.programSize);
    },
    selectProgramGroup(e,data){
      try {
        this.pagination.current = 1;
        this.pagination.pageSize = 6;
        this.currentProgramData = data.dataRef;
        this.programGroupId = data.dataRef.id;
        this.getProgramData(this.programGroupId,  this.currentProgramData.sourceType,this.programSize);
      } catch (error) {
        console.log(error);
      }
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getProgramData(this.programGroupId, this.currentProgramData.sourceType,this.programSize);
    },
    onInput(e) {
      let val = e.target.value;
      if (val.trim() === "") {
          this.searchTxt = "";
          this.pagination.current = 1;
          this.pagination.defaultPageSize = 6;
          this.getProgramData(this.programGroupId, this.currentProgramData.sourceType, this.programSize);
      }
    },
    onSearchProgram(e){
      this.searchTxt = e;
      this.pagination.current = 1;
      this.pagination.defaultPageSize = 6;
      this.getProgramData(this.programGroupId,  this.currentProgramData.sourceType,this.programSize);
    },
    getProgramData(id, type,size) {
      this.tableLoading = true;
      let params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.defaultPageSize,
        namePrefix: this.searchTxt,
        programSize: size,
        groupOwnerId: id,
        groupType: type
      };
      getProgramList(params)
        .then(res => {
          this.tableLoading = false;
          if (res.success) {
            if (res.data && res.data.list) {
              res.data.list.map(item => {
                item.unqiId = item.id + "_" + (item.sourceType?item.sourceType:'defined');
                item.isHover = false;
                let filterData = this.programDataIdList.filter(res => (res.id+"_"+(res.sourceType?res.sourceType:'defined')) === item.unqiId)
                if(filterData.length){
                  item.checked = true;
                }else{
                  item.checked = false;
                }
              });
            }
            this.pagination.total = res.data.total || 0;
            this.programData = res.data.list;
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
          console.log(error);
        });
    },
    onChannge(e,res) {
      console.log(res)
      let data = this.deepClone(this.programData);
      //this.programData.map(item=>{item.checked = false});
      data.map(item => {
        if (item.id === res.id) {
          item.checked = e.target.checked;
        }
      });
      this.programData = this.deepClone(data);
      if(e.target.checked){
        this.programDataIdList.push(res);
      }else{
        for(let i=0;i<this.programDataIdList.length;i++){
          if(this.programDataIdList[i].id === res.id){
            this.programDataIdList.splice(i,1);
          }
        }
      }
      this.$forceUpdate();
    },
    chooseOneProgram(data,i){
      this.getProgramPageInfo([data],'selected',{index:i,programData:data});
    },
    onMove(e) {
      if (e.relatedContext.element.forbid) return false;
      return true;
    },
    onEnd(e) {
      let _this = this;
      console.log(e);
      _this.channelDataList.map((item,index)=>{
        if(item.uuid === _this.currentProgramId){
          _this.currentProgramIndex = index+1;
        }
      });
    }
  },

}
