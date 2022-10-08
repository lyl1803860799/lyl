<template>
  <a-row type="flex" justify="space-between" align="middle" class="sort-condition">
    <a-select
      class="order-column"
      :placeholder="'请选择'"
      :value="orderColumns"
      @change="handleChange($event, 'orderColumns')"
      :getPopupContainer="(trigger) => trigger.parentNode"
    >
      <a-select-option
        v-for="(item, index) in columnList"
        :key="item.columnName + index + 'column'"
        :value="item.columnName"
      >
        {{ item.columnName }}
      </a-select-option>
    </a-select>
    <a-select
      class="order-by"
      :placeholder="'请选择'"
      :value="orderBy"
      @change="handleChange($event, 'orderBy')"
      :getPopupContainer="(trigger) => trigger.parentNode"
    >
      <a-select-option v-for="item in orderByList" :key="item.id" :value="item.value">
        {{ item.name }}
      </a-select-option>
    </a-select>
  </a-row>
</template>

<script>
export default {
  name: 'SortCondition',
  props: ['value', 'columnList', 'orderByList'],
  data() {
    return {
      orderColumns: '',
      orderBy: ''
    }
  },
  methods: {
    handleChange(value, key) {
      this.$emit('change', { ...this.$data, [key]: value })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.orderColumns = val?.orderColumns || undefined
        this.orderBy = val?.orderBy || undefined
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-condition {
  margin-top: 5px;
  .order-column {
    flex: 3;
  }
  .order-by {
    flex: 2;
    margin-left: 5px;
  }
}
</style>
