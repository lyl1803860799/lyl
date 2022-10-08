<template>
  <div
    class="weather-range-container"
    :style="{ width: `${options.component.width}px`, height: `${options.component.height}px` }"
  >
    <!-- <div
      class="weather-range-header"
      v-show="showTitle"
      :style="{
        fontFamily: options.title.style && options.title.style.fontFamily,
        fontSize: `${options.title.style && options.title.style.fontSize}px`,
        lineHeight: `${(options.title.style && options.title.style.fontSize * 2 + 'px') || 2}`,
        opacity: isSave ? 0 : 1
      }"
    >
      {{ options.title.name }}
    </div>-->
    <div
      class="weather-range-content"
      :style="bgStyle"
    >
      <div class="weather-range" :style="wrapperStyle">
        <div class="weather-wrapper" :style="contentStyle">
          <div class="weather-data">
            <a-icon type="environment" class="address-icon" />
            <span class="city-address">{{liveWeather.city}}</span>
          </div>
          <div class="weather-data">
            <span class="icon iconfont icon-weather-1" :style="{fontSize:weatherIconFont+'px'}" v-if="liveWeather.weather==='晴'"></span>
            <span class="icon iconfont icon-duoyun" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='少云'"></span>
            <span class="icon iconfont icon-duoyun" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='晴间多云'"></span>
            <span class="icon iconfont icon-duoyun" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='多云'"></span>
            <span class="icon iconfont icon-weather-3" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='阴'"></span>
            <!-- <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='有风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='平静'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='微风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='和风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='清风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='强风/劲风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='疾风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='大风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='烈风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='风暴'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='狂爆风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='飓风'"></span>
            <span class="icon iconfont icon-weather-3" v-else-if="liveWeather.weather==='热带风暴'"></span> -->
            <span class="icon iconfont icon-haze" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='霾'"></span>
            <span class="icon iconfont icon-haze" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='中度霾'"></span>
            <span class="icon iconfont icon-haze" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='重度霾'"></span>
            <span class="icon iconfont icon-haze" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='严重霾'"></span>
            <span class="icon iconfont icon-weather-4" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='阵雨'"></span>
            <span class="icon iconfont icon-weather-5" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='雷阵雨'"></span>
            <span class="icon iconfont icon-hail" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='雷阵雨并伴有冰雹'"></span>
            <span class="icon iconfont icon-weather-8" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='小雨'"></span>
            <span class="icon iconfont icon-weather-9" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='中雨'"></span>
            <span class="icon iconfont icon-weather-10" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='大雨'"></span>
            <span class="icon iconfont icon-weather-11" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='暴雨'"></span>
            <span class="icon iconfont icon-weather-12" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='大暴雨'"></span>
            <span class="icon iconfont icon-weather-13" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='特大暴雨'"></span>
            <span class="icon iconfont icon-weather-4" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='强阵雨'"></span>
            <span class="icon iconfont icon-weather-5" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='强雷阵雨'"></span>
            <span class="icon iconfont icon-weather-13" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='极端降雨'"></span>
            <span class="icon iconfont icon-weather-8" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='毛毛雨/细雨'"></span>
            <span class="icon iconfont icon-weather-8" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='雨'"></span>
            <span class="icon iconfont icon-weather-9" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='小雨-中雨'"></span>
            <span class="icon iconfont icon-weather-10" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='中雨-大雨'"></span>
            <span class="icon iconfont icon-weather-11" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='大雨-暴雨'"></span>
            <span class="icon iconfont icon-weather-12" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='暴雨-大暴雨'"></span>
            <span class="icon iconfont icon-weather-13" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='大暴雨-特大暴雨'"></span>
            <span class="icon iconfont icon-weather-7" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='雨雪天气'"></span>
            <span class="icon iconfont icon-weather-7" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='雨夹雪'"></span>
            <span class="icon iconfont icon-weather-7" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='阵雨夹雪'"></span>
            <span class="icon iconfont icon-weather-9" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='冻雨'"></span>
            <span class="icon iconfont icon-weather-15" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='雪'"></span>
            <span class="icon iconfont icon-weather-17" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='阵雪'"></span>
            <span class="icon iconfont icon-weather-15" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='小雪'"></span>
            <span class="icon iconfont icon-weather-16" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='中雪'"></span>
            <span class="icon iconfont icon-weather-17" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='大雪'"></span>
            <span class="icon iconfont icon-weather-17" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='暴雪'"></span>
            <span class="icon iconfont icon-weather-15" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='小雪-中雪'"></span>
            <span class="icon iconfont icon-weather-16" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='中雪-大雪'"></span>
            <span class="icon iconfont icon-weather-17" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='大雪-暴雪'"></span>
            <span class="icon iconfont icon-floating-dust" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='浮尘'"></span>
            <span class="icon iconfont icon-stand-storm" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='扬沙'"></span>
            <span class="icon iconfont icon-weather-21" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='沙尘暴'"></span>
            <span class="icon iconfont icon-weather-21" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='强沙尘暴'"></span>
            <span class="icon iconfont icon-typhoon" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='龙卷风'"></span>
            <span class="icon iconfont icon-weather-19" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='雾'"></span>
            <span class="icon iconfont icon-weather-19" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='浓雾'"></span>
            <span class="icon iconfont icon-weather-19" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='强浓雾'"></span>
            <span class="icon iconfont icon-weather-19" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='轻雾'"></span>
            <span class="icon iconfont icon-weather-19" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='大雾'"></span>
            <span class="icon iconfont icon-weather-19" :style="{fontSize:weatherIconFont+'px'}" v-else-if="liveWeather.weather==='特强浓雾'"></span>
            <!-- <span class="icon iconfont icon-weather-1" v-else-if="liveWeather.weather==='热'"></span>
            <span class="icon iconfont icon-frost" v-else-if="liveWeather.weather==='冷'"></span> -->
            <span v-else></span>
            <span class="live-weather">{{liveWeather.weather}}</span>
          </div>
          <div class="weather-data">
            <span class="temperature">{{liveWeather.temperature}}°C</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { weatherSource, weatherInfo } from "@/api/source";
import weatherBgIcon from "@/assets/images/weather_bg.png";
export default {
  name: "weather",
  props: {
    showTitle: {
      default: true
    },
    options: {
      required: true,
      type: Object
    },
    isSave: {
      required: false,
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    getSearchKey() {
      return this.$store.state.weatherCity;
    }
  },
  data() {
    return {
      weatherBgIcon,
      wrapperStyle: "",
      contentStyle: "height:100%;",
      bgStyle:"",
      weatherIconFont:26,
      textEl: "",
      time: "",
      defaultFormat: "YYYY-MM-DD HH:mm:ss",
      clockInterval: null,
      city: this.options.contentOption.data,
      liveWeather: {
        city: "",
        weather: "",
        temperature: ""
      },
      dataInterval:null,
    };
  },
  mounted() {
    let _this = this;
    _this.getAddressCode();
    _this.dataInterval=setInterval(()=>{
      _this.getAddressCode();
    },1 * 60 * 60 * 1000)
  },
  methods: {
    refresh() {},
    getAddressCode() {
      weatherSource({
        city: this.city
      })
        .then(res => {
          if (res.success) {
            this.getWeatherData(res.data);
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getWeatherData(data) {
      weatherInfo({
        city: data
      })
        .then(res => {
          if (res.success) {        
            if (res.data && res.data.lives) {
              this.liveWeather = res.data.lives[0];
            }
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    computedStyle(obj) {
      //console.log('--',obj)
      const { basicStyle } = obj;
      let style = "height:100%;";
      Object.keys(basicStyle).forEach(key => {
        if (typeof basicStyle[key] !== "object") {
          if (["fontSize", "lineHeight", "letterSpacing"].includes(key)) {
            style += `${this.replaceWord(key)}: ${basicStyle[key]}px;`;
          } else {
            style += `${this.replaceWord(key)}: ${basicStyle[key]};`;
          }
        } else {
          Object.keys(basicStyle[key]).forEach(kk => {
            if (basicStyle[key][kk]) {
              style += `${this.replaceWord(kk)}: ${basicStyle[key][kk]};`;
            }
          });
        }
      });

      return style;
    },
    bgSettingStyle(obj) {
      const { basicStyle } = obj;
      let style = "height:"+this.options.component.height+"px;";
      if(basicStyle.bgType === "1"){
        let bgImg = basicStyle.bgImg;
        if(bgImg){
          style += `backgroundImage:url(${bgImg});`;
        }else{
          style += `backgroundImage:url(${this.weatherBgIcon});`;
        }
      }else if(basicStyle.bgType === "0"){
        style += `backgroundColor:${basicStyle.bgColor};`;
      }else{
        style += `backgroundImage:url(${this.weatherBgIcon});`;
      }
      //console.log(style);
      return style;
    },
    computeWrapStyle(obj) {
      let style = "";
      const { basicStyle } = obj;
      if (basicStyle?.textStyle?.textAlign) {
        style += `text-align: ${basicStyle?.textStyle?.textAlign || "left"};`;
      }
      return style;
    },
    createTextEl(obj) {
      const { superLink } = obj;
      const data = obj.transformedData.replace(/\s/g, "&nbsp;");
      if (superLink && superLink.open) {
        return `<a style="${this.contentStyle}" href="${superLink.href ||
          "javascript void(0);"}" target="${superLink.openTarget}">
            ${data}
          </a>`;
      }
      return `<span style="${this.contentStyle}">${data}</span>`;
    },
    // 转换key
    replaceWord(str) {
      return str.replace(/[A-Z]/g, word => {
        return `-${word.toLocaleLowerCase()}`;
      });
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(val) {
        let _this = this;
        if (val.contentOption) {
          if(_this.city != val.contentOption.data){
            _this.city = val.contentOption.data;
            _this.getAddressCode();
          }
          _this.weatherIconFont = val.contentOption.basicStyle.fontSize + 6;
          _this.wrapperStyle = _this.computeWrapStyle(val.contentOption);
          _this.contentStyle = _this.computedStyle(val.contentOption);
          _this.bgStyle = _this.bgSettingStyle(val.contentOption);
          _this.textEl = _this.createTextEl(val.contentOption);
          
        }
      }
    },
    getSearchKey: {
      handler(val) {
        //当词条改变时执行事件
        let _this = this;
        _this.city = val;
        _this.getAddressCode();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.weather-range-container {
  display: flex;
  flex-direction: column;
  .weather-range-header {
    text-align: left;
    color: $white;
    @extend .ft-12;
    padding: 0 10px;
    line-height: 2em;
  }
  .weather-range-content {
    width: 100%;
    height: 100%;
    flex: "auto";
    overflow: hidden;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    .weather-range {
      width: 100%;
      height: 100%;
      //word-break: break-all;
      //word-wrap: break-word;
      .weather-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .weather-data {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .city-address {
            //font-size: 18px;
            //color: #fff;
            padding-left: 10px;
          }

          .live-weather {
            //font-size: 18px;
            //color: #fff;
            padding-left: 10px;
          }

          .temperature {
            //font-size: 20px;
            //color: #fff;
            padding-right: 20px;
          }

          .address-icon {
            padding-left: 20px;
            //font-size: 30px;
          }
          .iconfont {
            //font-size: 30px;
          }
        }
      }
      .mutil-text {
        width: 100%;
        height: 100%;
        color: #fff;
        background: unset;
      }
    }
  }
}
</style>

<style lang="scss">
@keyframes marqueeLeft {
  0% {
    margin-left: 100%;
    transform: translateX(0);
  }
  100% {
    margin-left: 0;
    transform: translateX(-100%);
  }
}
@keyframes marqueeTop {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
