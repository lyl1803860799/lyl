<template>
  <div class="swiper">
    <a-form :form="form" :colon="false" v-show="!swipeEl" labelAlign="left">
      <!-- <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }">
        <swipe-header
          v-decorator="['contentOption.list', { initialValue: formData.contentOption.list }]"
          @edit="handleEdit"
        />
      </a-form-item> -->
      <a-collapse v-model="activeKey" expandIconPosition="right">
        <a-collapse-panel key="1" header="组件大小">
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
          >
            <component-size
              v-decorator="['component', { initialValue: formData.component }]"
              @change="refreshChart"
            />
          </a-form-item>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="网页地址">
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
          >
            <mutil-frame-url
              v-decorator="['contentOption.list', { initialValue: formData.contentOption.list }]"
              :option="option"
              @change="refreshChart"
            />
          </a-form-item>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="组件配置">
          <a-form-item label="轮播间隔" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
            <a-input-number
              :min="3"
              :step="1"
              v-decorator="[
                'contentOption.autoPlaySpeed',
                { initialValue: formData.contentOption.autoPlaySpeed }
              ]"
            ></a-input-number>
          </a-form-item>
          <!-- <a-form-item
            label="是否显示子组件标题"
            :labelCol="{ span: 9 }"
            :wrapperCol="{ span: 11 }"
          >
            <a-switch
              v-decorator="[
                'contentOption.show',
                { initialValue: formData.contentOption.show, valuePropName: 'checked' }
              ]"
            ></a-switch>
          </a-form-item> -->
        </a-collapse-panel>
        <!-- <a-collapse-panel header="标题样式">
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
          >
            <title-style v-decorator="['title', { initialValue: formData.title }]" />
          </a-form-item>
        </a-collapse-panel> -->
      </a-collapse>
    </a-form>
    <div class="detail-wrapper" v-if="swipeEl">
      <div class="header">
        <div class="back" @click="handleBack">
          <a-icon class="icon" type="left"></a-icon>
          返回&ensp;/&ensp;
        </div>
        <h3 class="title">{{ swipeEl.option.title.name }}</h3>
      </div>
      <component
        :is="swipeEl.id.replace(/\d/g, '')"
        :show-component="false"
        :option="swipeEl.option || {}"
        @option-updated="updateOption"
        @update-chart="handleItemResize(swipeEl.option.domId)"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ComponentSize from '@/components/componentSize'
import MutilFrameUrl from '@/components/mutilFrameUrl'
import TitleStyle from '@/components/titleStyle'
import SwipeHeader from '@/components/swipeHeader'

export default {
  name: 'Swiper',
  props: ['option'],
  components: {
    ComponentSize,
    MutilFrameUrl,
    TitleStyle,
    SwipeHeader
  },
  data() {
    const self = this
    return {
      activeKey:['1','2','3'],
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
        //console.log('轮播组件',this.formData.contentOption)
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
    refreshChart() {
      this.$emit('update-chart')
    },
    // 更新 样式配置
    updateOption(val) {
      let defaultOption = Object.assign({}, { ...this.swipeEl.option }, { ...val })
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
      const curEl = this.formData.contentOption.list[this.curIndex]
      this.setSwipeEl(curEl)
      this.$emit('option-updated', {
        contentOption: {
          ...this.formData.contentOption
        }
      })
    },
    handleItemResize(refKey) {
      this.$refs[refKey] && this.$refs[refKey][0] && this.$refs[refKey][0].refresh()
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
.swiper {
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
      display: flex;
      align-items: center;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        margin: 0;
      }
    }
  }
}
</style>
