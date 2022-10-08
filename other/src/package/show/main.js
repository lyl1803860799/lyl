import 'babel-polyfill';
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import Vue from 'vue'
import App from '../../App.vue'
import router from '../../router/show'
import dataV from '@jiaminghi/data-view'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/styles/index.scss' // global css
import CommonComponent from '../../components/index-show'
import store from '../../store'
import vuetimeline from "@growthbunker/vuetimeline"
//loading指令
import loading from '@/directives/loading'

if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;


Vue.use(loading)

Vue.use(vuetimeline);
Vue.use(CommonComponent)
Vue.use(dataV)
Vue.use(Antd)

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#show')
