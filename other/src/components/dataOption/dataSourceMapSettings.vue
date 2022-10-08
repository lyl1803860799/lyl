<template>
  <a-form :form="form" :colon="false" class="map-settings" labelAlign="right">
    <a-row :gutter="14" v-for="(val, key, index) in formData" :key="key + index + Math.random()">
      <a-col class="gutter-row" :span="8">
        <a-tooltip :mouseEnterDelay="0.5" placement="bottom" :title="key + '设置'">
          <div class="map-data-cell ellipsis">
            {{ key + '设置' }}
          </div>
        </a-tooltip>
      </a-col>
      <a-col class="gutter-row" :span="15" style="padding-left:0;">
        <div class="map-data-cell">
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
          >
            <a-select placeholder="请选择" v-decorator="[key, { initialValue: val || undefined }]">
              <a-select-option
                v-for="(item, index) in columnsList"
                :key="key + '-' + item.columnName + index"
                :value="item.columnName"
              >
                {{ item.columnName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: 'map-settings',
  components: {},
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'MapSettings',
        onValuesChange(props, values) {
          self.$emit('change', { ...self.formData, ...values })
        }
      })
    }
  },
  props: {
    dataMap: {
      type: Object,
      default() {
        return {}
      }
    },
    columnsList: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {},
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        if (this.$isEmpty(val)) {
          for (let k in this.dataMap) {
            this.$set(this.formData, k, undefined)
          }
        } else {
          this.formData = Object.assign(this.formData, val)
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.map-settings {
  .map-data-cell {
    height: 40px;
    line-height: 40px;
    text-align: right;
    color: $white;
    font-size: 12px;
  }
}
</style>
