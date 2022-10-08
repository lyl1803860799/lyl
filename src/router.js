import Vue from 'vue'
import Router from 'vue-router'
import fields from './resources/fields';

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


export default new Router({
    routes: [
        ...fields,
    ],
    // mode: 'history',
    // 刷新出现404？
})