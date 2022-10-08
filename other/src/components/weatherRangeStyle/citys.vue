<template>
  <a-form :form="form" :colon="false" labelAlign="left">
    <a-form-item>
      <a-dropdown v-model="visible">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <input class="city-input" v-model="formData.data" placeholder="请选择城市" readonly="readonly" />
        </a>
        <div class="define-citys" slot="overlay">
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="热门">
              <div class="city-container">
                <a-button
                  class="city-btn"
                  :class="{active:formData.data===item}"
                  v-for="item in hotCity"
                  :key="item"
                  @click="chooseCity(item)"
                >{{item}}</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="ABC">
              <div class="city-container">
                <a-button
                  class="city-btn"
                  v-for="item in cityListOne"
                  :key="item"
                  @click="chooseCity(item)"
                >{{item}}</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="DEF">
              <div class="city-container">
                <a-button
                  class="city-btn"
                  v-for="item in cityListTwo"
                  :key="item"
                  @click="chooseCity(item)"
                >{{item}}</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="GHJ">
              <div class="city-container">
                <a-button
                  class="city-btn"
                  v-for="item in cityListThree"
                  :key="item"
                  @click="chooseCity(item)"
                >{{item}}</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="5" tab="KLM">
              <div class="city-container">
                <a-button
                  class="city-btn"
                  v-for="item in cityListFour"
                  :key="item"
                  @click="chooseCity(item)"
                >{{item}}</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="6" tab="NPQ">
              <div class="city-container">
                <a-button
                  class="city-btn"
                  v-for="item in cityListFive"
                  :key="item"
                  @click="chooseCity(item)"
                >{{item}}</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="7" tab="RST">
              <div class="city-container">
                <a-button
                  class="city-btn"
                  v-for="item in cityListSix"
                  :key="item"
                  @click="chooseCity(item)"
                >{{item}}</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="8" tab="WXY">
              <div class="city-container">
                <a-button
                  class="city-btn"
                  v-for="item in cityListSeven"
                  :key="item"
                  @click="chooseCity(item)"
                >{{item}}</a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane key="9" tab="Z">
              <div class="city-container">
                <a-button
                  class="city-btn"
                  v-for="item in cityListEight"
                  :key="item"
                  @click="chooseCity(item)"
                >{{item}}</a-button>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-dropdown>
    </a-form-item>
  </a-form>
</template>

<script>
import cityData from "@/utils/cityData.json";
export default {
  name: "Citys",
  props: ["value"],
  data() {
    const self = this;
    return {
      cityData,
      hotCity: [
        "上海",
        "北京",
        "广州",
        "深圳",
        "武汉",
        "天津",
        "杭州",
        "苏州",
        "无锡",
        "宁波",
        "合肥",
        "长沙",
        "重庆",
        "成都",
        "厦门",
        "西安",
        "南京",
        "嘉兴"
      ],
      cityListOne: cityData.city[0].lists
        .concat(cityData.city[1].lists)
        .concat(cityData.city[2].lists),
      cityListTwo: cityData.city[3].lists
        .concat(cityData.city[4].lists)
        .concat(cityData.city[5].lists),
      cityListThree: cityData.city[6].lists
        .concat(cityData.city[7].lists)
        .concat(cityData.city[8].lists),
      cityListFour: cityData.city[9].lists
        .concat(cityData.city[10].lists)
        .concat(cityData.city[11].lists),
      cityListFive: cityData.city[12].lists
        .concat(cityData.city[13].lists)
        .concat(cityData.city[14].lists),
      cityListSix: cityData.city[15].lists
        .concat(cityData.city[16].lists)
        .concat(cityData.city[17].lists),
      cityListSeven: cityData.city[18].lists
        .concat(cityData.city[19].lists)
        .concat(cityData.city[20].lists),
      cityListEight: cityData.city[21].lists,
      visible: false,
      form: this.$form.createForm(this, {
        name: "citys",
        onValuesChange(props, values) {
          const rawVal = self.formData;
          self.$emit("change", { ...rawVal, ...values });
        }
      }),
      formData: {}
    };
  },
  watch: {
    value: {
      deep:true,
      immediate: true,
      handler(val) {
        this.formData = { data: val || "" }; //Object.assign({}, val || {});
      }
    }
  },
  methods: {
    chooseCity(city) {
      this.visible = false;
      this.formData.data = city;
      this.$emit('changeCity',{city});
      //this.$store.commit("SET_WEATHER_CITY", city);
    }
  }
};
</script>

<style lang="scss" scoped>
.city-container{
  width:340px;
  height:300px;
  overflow-y:auto;
}
.city-input {
  width: 100%;
  height: 32px;
  background-color: transparent;
  color: #00fcff;
  padding: 0 5px;
  font-size: 14px;
  border: 1px solid #0e3753;
}

.active {
  color: #fff;
  background: #05bfce;
}

.define-citys {
  width: 340px;
  background: #07375c;
  ::v-deep .ant-tabs-tab-active {
    color: #00fcff !important;
  }

  ::v-deep .ant-tabs-tab {
    color: #fff;
    font-size: 14px;
    margin: 0;
    padding: 10px 5px;
    background: #07375c;
  }

  ::v-deep .ant-tabs-bar {
    margin: 0;
    border-bottom: 0;
  }

  ::v-deep .ant-tabs-ink-bar {
    background-color: #00fcff;
  }

  ::v-deep .city-btn {
    margin-top: 16px;
    margin-left: 20px;
    font-weight: 400;
    color: #00fcff;
    border: 1px solid #0e3753;
    border-radius: 2px;
  }
}
</style>
