import 'babel-polyfill';
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';
import router from "./router/index.js";
import request from './request';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import "@/assets/css/common.less"
import '@/assets/css/iconfont/iconfont.css' // global css
import dataV from '@jiaminghi/data-view'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import vuetimeline from "@growthbunker/vuetimeline"
import './styles/index.scss' // global css
import './styles/animate.min.css' // global css
import moment from 'moment'
import CommonComponent from './components'
import store from './store'
import {
  copyAction
} from './utils/tool'

import VueLazyload from 'vue-lazyload'


if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;

//兼容forEach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function forEach(callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError("this is null or not defined");
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/404.png'),
  loading: require('./assets/loading.gif'),
  attempt: 1
})

Vue.config.productionTip = false;

// 动态更改title
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
Vue.use(vuetimeline);
Vue.use(CommonComponent);
Vue.use(dataV);
Vue.use(Antd);
Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.prototype.$request = request;

// 定义全局时间戳过滤器
Vue.filter('formatDate', function (value, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(pattern)
})
// 自定义全局点击空白处组件指令
import {
  clickOutSide
} from './directives'
Vue.directive('clickOutSide', clickOutSide)
//自定义全局自动聚焦input指令
import {
  focus
} from './directives'
Vue.directive('focus', focus)
//无数据展示指令
import empty from './directives/empty'
Vue.use(empty)
//loading指令
import loading from './directives/loading'
Vue.use(loading)

//数据非空验证
Vue.prototype.$isEmpty = function (data) {
  if (data === null) return true
  if (data === undefined) return true
  if (Object.prototype.toString.call(data) === '[object Array]') return data.length === 0
  if (Object.prototype.toString.call(data) === '[object Object]')
    return Object.keys(data).length === 0
  if (typeof data === 'string') return data.trim() === ''
  return false
}

// 复制操作
Vue.prototype.$copyAction = copyAction

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')