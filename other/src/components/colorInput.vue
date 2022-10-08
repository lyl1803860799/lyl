<template>
  <div :name="elId" class="input-group color-picker" ref="colorpicker">
    <template v-if="showInput">
      <a-input-group>
        <a-input v-model="colorValue" @focus="showPicker()" @input="updateFromInput">
          <span
            slot="addonAfter"
            class="input-group-addon color-picker-container"
            style="width: 80px"
          >
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
import { Chrome } from "vue-color";

export default {
  name: "ColorInput",
  props: ["elId", "value", "showInput", "placement"],
  data() {
    return {
      colorLeft: "",
      colorTop: 0,
      colors: {
        hex: "#000000"
      },
      displayPicker: false
    };
  },
  computed: {
    colorValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.updateColors(val);
        this.$emit("input", val);
        this.$emit("change", val);
      }
    }
  },
  components: {
    "chrome-picker": Chrome
  },
  mounted() {
    let _this = this;
    let el = document.getElementsByClassName("sigle-right-body");
    this.setColor(this.value || "");
    this.handleSize();
    el && el.length && el[0].addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", function() {
      _this.hidePicker();
      _this.handleSize();
    });
  },
  methods: {
    handleScroll() {
      this.handleSize();
    },
    handleSize() {
      let id = this.elId;
      let colorPos = document.getElementsByName(id);
      if (colorPos && colorPos.length) {
        let posInfo = colorPos[0].getBoundingClientRect();
        let top =
          this.placement === "top" ? posInfo.top - 245 : posInfo.top + 40;
        let left = posInfo.left + posInfo.width - 225;
        this.colorTop = top;
        this.colorLeft = left;
      }
    },
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    updateColors(color) {
      if (color.slice(0, 1) == "#") {
        this.colors = {
          hex: color
        };
      } else if (color.slice(0, 4) == "rgba") {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
          hex =
            "#" +
            (
              (1 << 24) +
              (parseInt(rgba[0]) << 16) +
              (parseInt(rgba[1]) << 8) +
              parseInt(rgba[2])
            )
              .toString(16)
              .slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3]
        };
      }
    },
    showPicker() {
      document.addEventListener("click", this.documentClick);
      this.displayPicker = true;
      this.$emit("showKong", true);
    },
    hidePicker() {
      document.removeEventListener("click", this.documentClick);
      this.displayPicker = false;
      this.$emit("showKong", false);
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
      this.handleSize();
    },
    updateFromInput() {
      this.updateColors(this.colorValue);
    },
    updateFromPicker(color) {
      this.colors = color;
      if (color.rgba.a == 1) {
        this.colorValue = color.hex;
      } else {
        this.colorValue =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          color.rgba.a +
          ")";
      }
    },
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (el !== target && !el.contains(target)) {
        this.hidePicker();
      }
    },
    handleChange(e) {
      this.colorValue = e.target.value;
    }
  }
};
</script>

<style lang="scss" scoped>
.input-group {
  width: 100%;
}
.vc-chrome {
  position: fixed;
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
  text-align: center;
  border: 1px solid #0e3753;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

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
