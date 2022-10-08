<template>
  <div class="swipe-data">
    <a-form :form="form" :colon="false" v-show="!swipeEl" labelAlign="left">
      <a-form-item :labelCol="{ span: 0 }" :wrapperCol="{ span: 23 }">
        <swipe-header
          :show-action="false"
          v-decorator="['contentOption.list', { initialValue: formData.contentOption.list }]"
          @edit="handleEdit"
        />
      </a-form-item>
    </a-form>

    <div class="detail-wrapper" v-if="swipeEl">
      <div class="header">
        <div class="back" @click="handleBack">
          <a-icon class="icon" type="left"></a-icon>
          返回&ensp;/&ensp;
        </div>
        <h3 class="title">{{ swipeEl.option.title.name }}</h3>
      </div>
      <data-set
        v-if="swipeEl.option.dataConfig"
        :title="swipeEl.option.title"
        :component-type="swipeEl.id.replace(/\d/g, '')"
        :dataConfig="swipeEl.option.dataConfig"
        @option-updated="updateOption"
        @data-changed="updateOption($event, 'data')"
      ></data-set>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SwipeHeader from '@/components/swipeHeader'
import DataSet from '@/components/dataSet'
import SET_DATA from '@/utils/setData'
import { TYPE_SETS } from '@/constants'

export default {
  name: 'Swiper',
  props: ['option'],
  components: {
    SwipeHeader,
    DataSet
  },
  data() {
    const self = this
    return {
      formData: {},
      selectedCmp: null,
      form: this.$form.createForm(this, {
        name: 'swiper',
        onValuesChange(props, values) {
          if (values.contentOption !== undefined) {
            values = {
              contentOption: {
                ...self.formData.contentOption,
                ...values.contentOption
              }
            }
          }
          self.$emit('option-updated', values)
        }
      }),
      curIndex: null
    }
  },
  computed: {
    ...mapState({
      swipeEl: (state) => state.swipeEl
    })
  },
  watch: {
    option: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.formData = Object.assign({}, val)
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setSwipeEl: 'SET_SWIPE_EL'
    }),
    // 更新 数据配置
    updateOption(val, action) {
      let defaultOption = Object.assign({}, { ...this.swipeEl.option }, { ...val })
      if (action === 'data') {
        let params = {
          option: defaultOption,
          componentName: this.swipeEl.componentName
        }
        if (params.componentName === 'chart') {
          params.type = TYPE_SETS[this.swipeEl.id.replace(/\d/g, '')] || null
          params.functionKey = this.swipeEl.id.replace(/\d/g, '') || null
        }
        defaultOption = this.configData(params)
      }
      this.$set(this.formData.contentOption.list, this.curIndex, {
        ...this.swipeEl,
        option: { ...defaultOption },
        width: +defaultOption.component.width,
        height: +defaultOption.component.height,
        posx: +defaultOption.component.posx,
        posy: +defaultOption.component.posy,
        z: +defaultOption.component.z,
        active: defaultOption.component.active
      })
      this.setSwipeEl(this.formData.contentOption.list[this.curIndex])
      this.$emit('option-updated', {
        contentOption: {
          ...this.formData.contentOption
        }
      })
    },
    // 更新数据
    configData({ option, componentName, type, functionKey }) {
      return SET_DATA[componentName].call(this, option, type, functionKey)
    },
    handleEdit({ item, index }) {
      this.curIndex = index
      this.setSwipeEl(item)
    },
    handleBack() {
      this.curIndex = null
      this.setSwipeEl(null)
    }
  }
}
</script>

<style lang="scss" scoped>
.swipe-data {
  ::v-deep .ant-form-item-label {
    label {
      color: $white;
      &::after{
        display: none;
      }
    }
  }
  ::v-deep .ant-input-number {
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
  .m-bottom-0 {
    margin-bottom: 0;
  }

  .detail-wrapper {
    color: $white;
    .header {
      @extend .ft-12;
      @extend .p-left-20;
      @extend .p-top-20;
      @extend .p-bottom-20;
      .back {
        display: inline-block;
        cursor: pointer;
        .icon {
          color: $db28;
          @extend .p-right-5;
        }
        &:hover {
          color: $db28;
        }
      }

      .title {
        @extend .ft-16;
        display: inline-block;
        color: $white;
      }
    }
  }
}
</style>
