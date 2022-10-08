import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css';
import { Layout, Menu, Icon } from 'ant-design-vue';
import * as antIcons from '@ant-design/icons-vue';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import api from './utils/request.js';


//  引入Echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// import './mock';

Vue.config.productionTip = false;

// router.afterEach((to, from) => {
//   /* 路由发生变化修改页面title */
//   if (to.path) {
//     console.log('kk',window.location.pathName)
//     // window.location.pathName = '/main';
//   }
// })


// 注册组件
Object.keys(antIcons).forEach(key => {
  Vue.component(key, antIcons[key])
})
// 添加到全局
Vue.prototype.$antIcons = antIcons;
Vue.prototype.$api = api;

Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Antd);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
