<template>
  <a-form class="series-style" :form="form" :colon="false" labelAlign="left">
    <!-- <a-form-item>
      <a-col class="label" :span="8">
        效果选择
        <a-tooltip>
          <span slot="title">
            1.系列渐变：对单个系列进行颜色设置 <br />
            2.整体渐变：针对整个图表的颜色进行设置
          </span>
          <a-icon type="question-circle" class="m-left-5 label-icon" theme="filled"></a-icon>
        </a-tooltip>
      </a-col>
      <a-col :span="15">
        <a-radio-group
          v-decorator="['wholeRender', { initialValue: formData.wholeRender }]"
          @change="wholeRenderChanged($event.target.value)"
        >
          <a-radio :value="0"> 系列渐变 </a-radio>
          <a-radio :value="1"> 整体渐变</a-radio>
        </a-radio-group>
      </a-col>
    </a-form-item> -->
    <template>
      <a-tabs default-active-key="1">
        <a-tab-pane v-for="(tab, i) in formData.series" :key="`${i + 1}`" :tab="tab.tabTitle">
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 23 }"
            class="m-bottom-0"
          >
            <compnent
              :is="tab.type + '-style'"
              v-decorator="[`series[${i}]`, { initialValue: formData.series[i] }]"
            />
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </template>
  </a-form>
</template>

<script>
import * as _ from 'lodash'
import BarStyle from '@/components/barStyle'
import LineStyle from '@/components/lineStyle'
import PieStyle from '@/components/pieStyle'
import ColorSets from '@/components/colorSets'

export default {
  name: 'SeriesStyle',
  props: ['value'],
  data() {
    const self = this
    return {
      visualMap: {
        type: 'continuous',
        show: false,
        color: ['#0000ff']
      },
      formData: {},
      form: this.$form.createForm(this, {
        name: 'series-style',
        onValuesChange(props, values) {
          if (values.visualMap === undefined) {
            if (values.series !== undefined) {
              const index = values.series.findIndex((item) => item)
              //console.log('111111111111111111111',values.series[index])
              if(values.series[index].type==="line"){
                values.series[index].itemStyle=values.series[index].lineStyle;
              }
              self.formData.series.splice(index, 1, values.series[index])
              self.$emit('change', { ...self.formData })
            } else {
              self.$emit('change', { ...self.formData, ...values })
            }
          }
        }
      })
    }
  },
  components: {
    BarStyle,
    ColorSets,
    LineStyle,
    PieStyle
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val || {})
        if (val.visualMap) {
          this.visualMap = { ...this.visualMap, ...val.visualMap[0] }
        }
        this.setSeriesTitle()
      }
    }
  },
  methods: {
    setSeriesTitle() {
      const series = this.formData.series || []
      let map = {
        bar: {
          label: '柱状图',
          value: 0
        },
        line: {
          label: '折线图',
          value: 0
        },
        pie: {
          label: '饼图',
          value: 0
        }
      }
      this.formData.series = series.map((s) => {
        return {
          ...s,
          tabTitle: `${map[s.type]['label']}${++map[s.type]['value']}`
        }
      })
    },
    wholeRenderChanged(val) {
      if (val === 1) {
        this.$set(this.formData, 'visualMap', [this.visualMap])
      } else {
        this.$set(this.formData, 'visualMap', null)
      }
    },
    handleVisualMap(color) {
      const value = { ...this.formData, visualMap: [_.merge({}, this.visualMap, { color: color })] }
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.series-style {
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
  .label-icon {
    color: $db23;
  }
  .label {
    color: $white;
  }
}
</style>
