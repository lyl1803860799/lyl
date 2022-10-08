<template>
  <div class="swiper-header">
    <h1 class="carousel-header">轮播组件</h1>
    <div class="cmp-list">
      <div class="cmp-list-header">子组件管理</div>
      <ul class="cmp-list-container">
        <li class="cmp-list__item" v-for="(item, i) in children" :key="item.domId">
          <div class="title-wrapper" @click="edit(item, i)">
            <a-icon class="icon" type="edit"></a-icon>
            <span class="cmp-list__item-title">{{ item.option.title.name }}</span>
          </div>
          <span class="btn">
            <span class="action" @click="resort(i, -1)">
              <a-icon class="icon" type="arrow-up"></a-icon>上移
            </span>
            <span class="action" @click="resort(i, 1)">
              <a-icon class="icon" type="arrow-down"></a-icon>下移
            </span>
            <span class="action" @click="del(i)">
              <a-icon class="icon" type="delete"></a-icon>删除
            </span>
          </span>
        </li>
      </ul>
    </div>
    <template v-if="showAction">
      <a-row type="flex" class=" m-bottom-20 m-top-20">
        <a-col :span="6" class="m-left-20">选择组件</a-col>
        <a-col :span="9">
          <a-select v-model="selectedCmp" :getPopupContainer="(trigger) => trigger.parentNode">
            <a-select-option v-for="item in componentList" :key="item.id" :value="item.id">{{
              item.title.name
            }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" style="text-align: center">
          <a-button type="green" @click="addChild" :disabled="!selectedCmp">添加子组件</a-button>
        </a-col>
      </a-row>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as uuid from 'uuid/v1'
import _ from 'lodash'
import { contentOptions, dataOptions, TYPE_SETS } from '@/constants'
import SET_DATA from '@/utils/setData'

export default {
  name: 'SwipeHeader',
  props: {
    value: {
      type: Array
    },
    showAction: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedCmp: ''
    }
  },
  computed: {
    ...mapState({
      mapList: (state) => state.componentList
    }),
    componentList() {
      const mapList = this.mapList ? JSON.parse(JSON.stringify(this.mapList)) : {}
      const result = _.values(mapList)
        .reduce((pre, next) => {
          return pre.concat(...next)
        }, [])
        .reduce((pre, next) => {
          return pre.concat(next.value)
        }, [])

      // 轮播不放地图
      return result.filter(
        (item) => item.componentName !== 'swipe' && item.componentName !== 'bi-map'
      )
    },
    children: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  },
  methods: {
    addChild() {
      let item = this.componentList.find((item) => item.id === this.selectedCmp)
      if (!item.option) {
        const itemContentOption = item.contentOption
          ? item.contentOption
          : { ...contentOptions[item.id.replace(/\d/g, '')].call(this) }

        item.option = {
          contentOption: { ...itemContentOption },
          title: { ...item.title },
          dataConfig: dataOptions[item.id.replace(/\d/g, '')].call(this)
        }
      }
      let params = {
        option: item.option,
        componentName: item.componentName
      }
      if (params.componentName === 'chart') {
        params.type = TYPE_SETS[item.id.replace(/\d/g, '')] || null
        params.functionKey = item.id.replace(/\d/g, '') || null
      }
      item.option = this.configData(params)
      item.domId = uuid()
      this.children.push(this.deepClone(item))
      this.selectedCmp = ''
    },
    // 更新数据
    configData({ option, componentName, type, functionKey }) {
      return SET_DATA[componentName].call(this, option, type, functionKey)
    },
    resort(index, add) {
      if ((add > 0 && index < this.children.length - 1) || (add < 0 && index > 0)) {
        this.children[index + add] = this.children.splice(index, 1, this.children[index + add])[0]
      }
    },
    del(index) {
      this.$confirm({
        title: '提示',
        content: '是否确认删除该子组件？',
        onOk: async () => {
          this.children.splice(index, 1)
        },
        onCancel() {}
      })
    },
    edit(item, index) {
      this.$emit('edit', { item, index })
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper-header {
  color: $white;
  h1.carousel-header {
    @extend .ft-16;
    @extend .p-left-20;
    color: $white;
    font-weight: normal;
  }
  .cmp-list {
    padding: 0 20px;
    color: $white;
    &.header {
      @extend .ft-14;
      height: 50px;
      line-height: 50px;
    }
    .cmp-list-container {
      .cmp-list__item {
        @extend .ft-12;
        display: flex;
        align-items: center;
        .icon {
          color: $db28;
          @extend .p-right-5;
        }
        .title-wrapper {
          flex: 1;
          color: $white;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &:hover {
            color: $db28;
          }
        }

        .btn {
          .action {
            color: $white;
            cursor: pointer;
            &:hover {
              color: $db28;
            }
            & + .action {
              @extend .m-left-10;
            }
          }
        }
      }
    }
  }
  .add-btn {
    width: 100%;
  }
  .ant-btn-green {
    background-color: $dropActive;
    border: none;
    color: $white;
    border-radius: 2px;
  }
}
</style>
