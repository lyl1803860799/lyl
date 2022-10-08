<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="地图" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <a-select
        v-decorator="['mapName', { initialValue: formData.mapName }]"
        :getPopupContainer="(trigger) => trigger.parentNode"
      >
        <a-select-option v-for="option in mapList" :key="option.value" :value="option.value">{{
          option.label
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }" class="m-bottom-0">
      <start-point
        v-decorator="['startPoint', { initialValue: formData.startPoint }]"
      ></start-point>
    </a-form-item>
    <a-form-item label="标识图标显示" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <a-switch
        v-decorator="['showIcon', { initialValue: formData.showIcon, valuePropName: 'checked' }]"
      ></a-switch>
    </a-form-item>
    <a-form-item label="标识图标" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15 }">
      <map-icon v-decorator="['symbolIcon', { initialValue: formData.symbolIcon }]"></map-icon>
    </a-form-item>
    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }">
      <lines v-decorator="['lines', { initialValue: formData.lines }]"></lines>
    </a-form-item>
  </a-form>
</template>

<script>
import StartPoint from '@/components/mapStyle/startPoint'
import Lines from '@/components/mapStyle/lines'
import MapIcon from '@/components/mapStyle/mapIcon'
import { CITY_SELECTION_MAP } from '@/constants/geoJson/cityMap'

export default {
  name: 'MapDetail',
  props: ['value'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'map-detail',
        onValuesChange(props, values) {
          self.$emit('change', { ...self.formData, ...values })
        }
      }),
      mapList: CITY_SELECTION_MAP
    }
  },
  components: { StartPoint, Lines, MapIcon },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val)
      }
    }
  }
}
</script>
