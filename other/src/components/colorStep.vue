<template>
  <ul class="color-list">
    <li class="color-item" v-for="(item, i) in itemArr" :key="`color-item-${i}`">
      <color-input
        class="color-input"
        :elId="id+'_'+i"
        placement="top"
        :value="item.color"
        @change="handleChange($event, 'color', i)"
      ></color-input>
      <a-input-number
        class="step-item"
        :max="1"
        :min="0"
        :step="0.1"
        :value="item.offset"
        @change="handleChange($event, 'offset', i)"
      ></a-input-number>
      <template v-if="i === 0">
        <span class="action" @click="add">+</span>
      </template>
      <template v-else>
        <span class="action" @click="del(i)">-</span>
      </template>
    </li>
  </ul>
</template>

<script>
import ColorInput from './colorInput'
import * as uuid from 'uuid/v1'
export default {
  name: 'ColorStep',
  props: ['value'],
  data() {
    return {
      id:null
    }
  },
  computed: {
    itemArr: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  },
  components: {
    ColorInput
  },
  mounted(){
    this.id = uuid();
  },
  methods: {
    add() {
      this.itemArr = [...this.itemArr, { color: 'rgba(0, 0, 0, 0)', offset: 0 }]
    },
    del(i) {
      const itemArr = this.itemArr
      itemArr.splice(i, 1)
      this.itemArr = itemArr
    },
    handleChange(val, key, index) {
      const itemArr = this.itemArr
      itemArr[index] = { ...itemArr[index], [key]: val }
      this.itemArr = itemArr
    }
  }
}
</script>

<style lang="scss" scoped>
.color-list {
  .color-item {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;

    .color-input {
      display: inline-block;
      height: 32px;
      width: 32px;
    }
    .step-item {
      display: inline-block;
      width: 100px;
      margin-left: 10px;
    }
    .action {
      display: inline-block;
      padding: 5px;
      font-size: 20px;
      margin-left: 10px;
      color: $db28;
      cursor: pointer;
    }
  }
}
</style>
