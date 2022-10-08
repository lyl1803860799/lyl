<template>
  <a-form :form="form" :colon="false" class="data-map" labelAlign="left">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="6">
        <div class="map-data-cell">
          字段
        </div>
      </a-col>
      <a-col class="gutter-row" :span="10">
        <div class="map-data-cell">
          映射
        </div>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <div class="map-data-cell">
          状态
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="16" v-for="(val, key) in formData" :key="key">
      <a-col class="gutter-row" :span="6">
        <a-tooltip :mouseEnterDelay="0.5" placement="bottom" :title="key">
          <div class="map-data-cell ellipsis">
            {{ key }}
          </div>
        </a-tooltip>
      </a-col>
      <a-col class="gutter-row" :span="10">
        <div class="map-data-cell">
          <a-form-item
            label=""
            :labelCol="{ span: 0 }"
            :wrapperCol="{ span: 24 }"
            class="m-bottom-0"
          >
            <a-input
              placeholder="映射字段"
              v-decorator="[key, { initialValue: val }]"
              @blur="blurMap(key, val)"
            ></a-input>
          </a-form-item>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="8">
        <div class="map-data-cell">
          <div class="circle-icon-true" v-if="verif[key] === true"></div>
          <div class="circle-icon-error" v-else-if="verif[key] === false"></div>
          <div class="circle-icon-ok" v-else></div>
          {{ verif[key] === true ? '匹配成功' : verif[key] === false ? '匹配失败' : '可选' }}
        </div>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import * as _ from 'lodash'
export default {
  name: 'DataMap',
  props: ['value', 'updateData'],
  data() {
    const self = this
    return {
      formData: {},
      form: this.$form.createForm(this, {
        name: 'DataMap',
        onValuesChange(props, values) {
          self.$emit('change', { ...self.formData, ...values })
        }
      }),
      verif: {}
    }
  },
  methods: {
    blurMap(key, val) {
      if (val) {
        if (this.$isEmpty(this.updateData)) {
          this.$set(this.verif, key, false)
          return
        }
        const objArr = (this.updateData && JSON.parse(this.updateData)) || []
        this.$set(
          this.verif,
          key,
          objArr.every((obj) => Object.keys(obj).includes(val))
        )
      } else {
        this.$set(this.verif, key, undefined)
      }
      this.sendNewData()
    },
    sendNewData() {
      if (this.objectValueAllOk(this.formData, this.verif)) {
        const updateData = ((this.updateData && JSON.parse(this.updateData)) || []).map((item) => {
          const result = _.entries(this.formData)
            .map((keys) => {
              return { [keys[0]]: item[keys[1] || keys[0]] }
            })
            .reduce((prev, next) => {
              return Object.assign({}, prev, next)
            }, {})
          return result
        })
        this.$emit('update-newData', updateData)
      }
    },
    objectValueAllOk(object, verif) {
      return Object.keys(object).every((x) => verif[x] !== false)
    },
    checkAllStatus() {
      const objArr = (this.updateData && JSON.parse(this.updateData)) || []
      if (this.$isEmpty(objArr)) {
        this.verif = {}
        return
      }
      for (let i in this.formData) {
        let key = this.formData[i]
        this.$set(
          this.verif,
          i,
          this.formData[i]
            ? objArr.every((obj) => obj && Object.keys(obj).includes(key))
            : undefined
        )
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = Object.assign(this.formData, val)
        }
      }
    },
    updateData: {
      immediate: true,
      handler() {
        this.checkAllStatus()
        this.sendNewData()
      }
    }
  }
}
</script>
<style lang="scss">
.data-map {
  .map-data-cell {
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: $white;
    font-size: 12px;
    input {
      font-size: 12px;
    }
    .circle-icon-true,
    .circle-icon-error,
    .circle-icon-ok {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: $circleGreen;
      border-radius: 50%;
      margin-right: 6px;
    }
    .circle-icon-error {
      background-color: $circleRed;
    }
    .circle-icon-ok {
      background-color: $circleBlue;
    }
  }
}
</style>
