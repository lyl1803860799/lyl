<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <p class="title">请求头(Headers)</p>
    <a-row class="head">
      <a-col class="head-con" :span="12">KEY</a-col>
      <a-col class="head-con" :span="12">VALUE</a-col>
    </a-row>
    <a-row v-for="(col, i) in formData" :key="`col-${i}`">
      <a-col :span="11">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 23 }" class="m-bottom-0">
          <a-input
            v-decorator="[`requestHeaders[${i}][keyName]`, { initialValue: formData[i].keyName }]"
            placeholder="请输入KEY"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 23 }" class="m-bottom-0">
          <a-input
            v-decorator="[`requestHeaders[${i}][valName]`, { initialValue: formData[i].valName }]"
            placeholder="请输入VALUE"
          ></a-input>
        </a-form-item>
      </a-col>
      <span class="delete" @click="deleteData(i)"></span>
    </a-row>

    <a-form-item label="" :labelCol="{ span: 0 }" :wrapperCol="{ span: 24 }">
      <add-btn title="增加" @add="addCol" class="add-btn"></add-btn>
    </a-form-item>
  </a-form>
</template>

<script>
import AddBtn from '@/components/addBtn'
export default {
  name: 'requestHeaders',
  props: ['value'],
  components: { AddBtn },
  data() {
    const self = this
    return {
      formData: [],
      form: this.$form.createForm(this, {
        name: 'requestHeaders',
        onValuesChange(props, values) {
          const index = values.requestHeaders.findIndex((item) => item)
          const arr = self.formData.map((item, i) => {
            let keyCon, valCon
            if (i == index) {
              keyCon =
                values.requestHeaders[index].keyName !== undefined
                  ? values.requestHeaders[index].keyName
                  : item.keyName
              valCon =
                values.requestHeaders[index].valName !== undefined
                  ? values.requestHeaders[index].valName
                  : item.valName
            } else {
              keyCon = item.keyName
              valCon = item.valName
            }

            return {
              keyName: keyCon,
              valName: valCon
            }
          })
          // let obj = {}
          // arr.forEach((item) => {
          //   if (item.keyName) {
          //     obj[item.keyName] = item.valName
          //   }
          // })
          self.$emit('change', [...arr])
        }
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = val
      }
    }
  },
  methods: {
    addCol() {
      this.formData.push({
        keyName: '',
        valName: ''
      })
    },
    deleteData(i) {
      this.formData.splice(i, 1)
      this.$emit('change', [...this.formData])
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  border-top: 1px solid #112761;
  color: $white;
  font-size: 14px;
  margin-top: 5px;
}
.head {
  color: $white;
  font-size: 12px;
  .head-con {
    background: $addBtnBg;
    text-align: center;
    height: 24px;
    line-height: 24px;
  }
}
.add-btn {
  width: 100%;
  height: 24px;
  line-height: 24px;
  margin-top: 10px;
}
.delete {
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  background: url(~@/assets/home-project/delete.png) no-repeat;
  &:hover {
    background: url(~@/assets/home-project/delete_active.png) no-repeat;
  }
}
</style>
