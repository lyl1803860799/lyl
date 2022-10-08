<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item label="预设" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
      <TransformDropDown v-decorator="['type', { initialValue: formData.type }]" />
    </a-form-item>
    <template v-if="!!formData.type">
      <a-form-item label="x旋转" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
        <div class="rotate-container">
          <a-input-number
            :min="0"
            :max="360"
            :step="1"
            class="input-item"
            v-decorator="['x', { initialValue: formData.x }]"
          ></a-input-number>
          <div class="icon x-left"></div>
          <div class="icon x-right"></div>
        </div>
      </a-form-item>
      <a-form-item label="y旋转" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
        <div class="rotate-container">
          <a-input-number
            :min="0"
            :step="1"
            :max="360"
            class="input-item"
            v-decorator="['y', { initialValue: formData.y }]"
          ></a-input-number>
          <div class="icon y-left"></div>
          <div class="icon y-right"></div>
        </div>
      </a-form-item>
    </template>
    <template v-if="formData.type === 'rotate'">
      <a-form-item label="z旋转" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
        <div class="rotate-container">
          <a-input-number
            :min="0"
            :step="1"
            :max="360"
            class="input-item"
            v-decorator="['z', { initialValue: formData.z }]"
          ></a-input-number>
          <div class="icon z-left"></div>
          <div class="icon z-right"></div>
        </div>
      </a-form-item>
    </template>
  </a-form>
</template>

<script>
import TransformDropDown from '@/components/transformDropDown'

export default {
  name: 'TextTransform',
  props: ['value'],
  data() {
    const self = this
    return {
      form: this.$form.createForm(this, {
        name: 'text-transform',
        onValuesChange(props, values) {
          const rawVal = self.formData
          self.$emit('change', { ...rawVal, ...values })
        }
      }),
      formData: {}
    }
  },
  components: { TransformDropDown },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.formData = Object.assign({}, val || {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rotate-container {
  display: flex;
  .input-item {
    flex: 1;
  }
  .icon {
    @extend .m-left-10;
    width: 30px;
    height: 32px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    &.x-left {
      background-image: url('~@/assets/x-left.png');
    }
    &.x-right {
      background-image: url('~@/assets/x-right.png');
    }
    &.y-left {
      background-image: url('~@/assets/y-left.png');
    }
    &.y-right {
      background-image: url('~@/assets/y-right.png');
    }
    &.z-left {
      background-image: url('~@/assets/z-left.png');
    }
    &.z-right {
      background-image: url('~@/assets/z-right.png');
    }
  }
}
</style>
