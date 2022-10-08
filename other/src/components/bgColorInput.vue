<template>
  <div :name="elId" class="input-group color-picker" ref="colorpicker">
    <template v-if="showInput">
      <a-input-group>
        <a-input v-model="colorVal" @focus="showPicker()" @input="updateFromInput">
          <span
            slot="addonAfter"
            class="input-group-addon color-picker-container"
            style="width: 80px"
          >
            <span
              class="current-color"
              :style="'background-color: ' + colorVal"
              @click="togglePicker()"
            ></span>
            <chrome-picker
              :style="placement === 'top' ? { bottom: '35px' } : { top: '35px' }"
              :value="colors"
              @input="updateFromPicker"
              v-if="displayPicker"
            />
          </span>
        </a-input>
      </a-input-group>
    </template>
    <template v-else>
      <div class="ant-input-container">
        <span
          class="current-color"
          :style="'background-color: ' + colorValue"
          @click="togglePicker()"
        ></span>
        <chrome-picker
          :style="{ top: colorTop+'px',left:colorLeft+'px' }"
          :value="colors"
          @input="updateFromPicker"
          v-if="displayPicker"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'ColorInput',
  props: ["elId",'value', 'showInput', 'placement'],
  data() {
    return {
      colors: {
        hex: '#000000'
      },
      displayPicker: false
    }
  },
  computed: {
    colorVal: {
      get() {
        return this.value
      },
      set(val) {
        this.updateColors(val)
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  },
  components: {
    'chrome-picker': Chrome
  },
  mounted() {
    this.setColor(this.value || '')
  },
  methods: {
    setColor(color) {
      this.updateColors(color)
      this.colorVal = color
    },
    updateColors(color) {
      if (color.slice(0, 1) == '#') {
        this.colors = {
          hex: color
        }
      } else if (color.slice(0, 4) == 'rgba') {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(','),
          hex =
            '#' +
            ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2]))
              .toString(16)
              .slice(1)
        this.colors = {
          hex: hex,
          a: rgba[3]
        }
      }
    },
    showPicker() {
      document.addEventListener('click', this.documentClick)
      this.displayPicker = true
    },
    hidePicker() {
      document.removeEventListener('click', this.documentClick)
      this.displayPicker = false
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker()
    },
    updateFromInput() {
      this.updateColors(this.colorVal)
    },
    updateFromPicker(color) {
      this.colors = color
      if (color.rgba.a == 1) {
        this.colorVal = color.hex
      } else {
        this.colorVal =
          'rgba(' +
          color.rgba.r +
          ', ' +
          color.rgba.g +
          ', ' +
          color.rgba.b +
          ', ' +
          color.rgba.a +
          ')'
      }
    },
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target
      if (el !== target && !el.contains(target)) {
        this.hidePicker()
      }
    },
    handleChange(e) {
      this.colorVal = e.target.value
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  float:left;
  width: 50%;
}
.vc-chrome {
  position: absolute;
  right: 0;
  z-index: 9;
}
.current-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #000;
  cursor: pointer;
}
.ant-input-container {
  width: 42px;
  height: 32px;
  box-sizing: border-box;
  position: relative;

  .an-input-color {
    border-color: $white;
  }
  .ant-input {
    cursor: pointer;
  }
  .color-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    pointer-events: none;
    cursor: pointer;
  }
}
</style>
