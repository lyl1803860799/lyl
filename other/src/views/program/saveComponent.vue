<template>
  <bi-dialog
    class="save-dialog"
    v-if="visible"
    title="收藏组件"
    @cancel="closeConfirm"
    @submit="handleSubmit"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" style="width: 100%;">
      <a-form-item label="组件名称">
        <a-input v-decorator="['assemblyName', { initialValue: name }]"></a-input>
      </a-form-item>
    </a-form>
  </bi-dialog>
</template>

<script>
import BiDialog from '@/components/biDialog.vue'

export default {
  name: 'SaveComponent',
  props: {
    visible: Boolean,
    name: String
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'save-component' })
    }
  },
  components: { BiDialog },
  methods: {
    closeConfirm() {
      this.$emit('close')
    },
    handleSubmit() {
      if (!this.form.getFieldValue('assemblyName')) {
        this.$message.warning('组件名称不能为空！')
        return
      }
      this.$emit('submit', { assemblyName: this.form.getFieldValue('assemblyName') })
    }
  }
}
</script>
