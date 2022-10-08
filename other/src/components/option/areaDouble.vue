<template>
  <a-form
    class="basic-area"
    :colon="false"
    :form="form"
    :labelCol="{ span: 5 }"
    :wrapperCol="{ span: 18 }"
    labelAlign="left"
  >
    <a-collapse expandIconPosition="right">
      <a-collapse-panel header="标题样式">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <title-style v-decorator="['title', { initialValue: formData.title }]" />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel header="组件大小" v-if="showComponent">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <component-size
            v-decorator="['component', { initialValue: formData.component }]"
            @change="refreshChart"
          />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel header="边距设置">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <grid
            v-decorator="['contentOption.grid', { initialValue: formData.contentOption.grid }]"
          />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel header="坐标轴">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="X轴">
            <a-form-item
              label=""
              :labelCol="{ span: 0 }"
              :wrapperCol="{ span: 24 }"
              class="m-bottom-0"
            >
              <x-axis
                v-decorator="[
                  'contentOption.xAxis',
                  { initialValue: formData.contentOption.xAxis }
                ]"
                @change="refreshChart"
              />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane
            v-for="(tab, i) in formData.contentOption.yAxis"
            :key="`${i + 2}`"
            :tab="`Y轴${i > 0 ? i + 1 : ''}`"
          >
            <a-form-item
              label=""
              :labelCol="{ span: 0 }"
              :wrapperCol="{ span: 24 }"
              class="m-bottom-0"
            >
              <y-axis
                :elId="i"
                v-decorator="[
                  `contentOption.yAxis[${i}]`,
                  { initialValue: formData.contentOption.yAxis[i] }
                ]"
                @change="refreshChart"
              />
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
      </a-collapse-panel>
      <a-collapse-panel header="图例">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <Legend
            v-decorator="['contentOption.legend', { initialValue: formData.contentOption.legend }]"
            @change="refreshChart"
          />
        </a-form-item>
      </a-collapse-panel>
      <a-collapse-panel header="图形效果">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
          <SeriesStyle
            v-decorator="['seriesStyle', { initialValue: seriesStyle }]"
            @change="refreshChart"
          />
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>
  </a-form>
</template>

<script>
import ComponentSize from '@/components/componentSize'
import TitleStyle from '@/components/titleStyle'
import Grid from '@/components/grid'
import XAxis from '@/components/xAxis'
import YAxis from '@/components/yAxis'
import Legend from '@/components/legend'
import SeriesStyle from '@/components/seriesStyle'

export default {
  name: 'AreaDouble',
  props: {
    option: {
      type: Object
    },
    showComponent: {
      default: true
    }
  },
  data() {
    const self = this
    return {
      form: this.$form.createForm(this, {
        name: 'area-double',
        onValuesChange(props, values) {
          if (values.seriesStyle !== undefined) {
            values = {
              contentOption: {
                ...self.formData.contentOption,
                ...values.seriesStyle
              }
            }
          } else if (values.contentOption) {
            if (values.contentOption.yAxis !== undefined) {
              const yAxis = values.contentOption.yAxis
              let index = yAxis.findIndex((item) => !!item)
              self.formData.contentOption.yAxis.splice(index, 1, yAxis[index])
              values = {
                contentOption: {
                  ...self.formData.contentOption
                }
              }
            } else {
              values = {
                contentOption: {
                  ...self.formData.contentOption,
                  ...values.contentOption
                }
              }
            }
          }
          self.$emit('option-updated', values)
        }
      }),
      formData: {
        title: {},
        component: {},
        contentOption: {
          xAxis: {
            axisLabel: {},
            axisLine: {},
            splitLine: {}
          },
          yAxis: [
            {
              axisLabel: {},
              axisLine: {},
              splitLine: {}
            }
          ],
          legend: {},
          wholeRender: 0
        }
      },
      seriesStyle: {}
    }
  },
  components: {
    TitleStyle,
    ComponentSize,
    Grid,
    Legend,
    XAxis,
    YAxis,
    SeriesStyle
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$set(this, 'formData', val || this.formData)
        this.$set(this, 'seriesStyle', {
          series: val.contentOption.series,
          visualMap: val.contentOption.visualMap || null,
          wholeRender: val.contentOption.wholeRender || 0
        })
      }
    }
  },
  methods: {
    refreshChart() {
      this.$emit('update-chart')
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-area {
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
}
</style>
