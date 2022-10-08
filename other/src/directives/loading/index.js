import Vue from 'vue'
import Loading from './loading.vue'
import { addClass, removeClass, getStyle } from '@/utils/dom'
/**
 * Vue.extend 接受参数并返回一个构造器，new 该构造器可以返回一个组件实例
 * 当我们 new Mask() 的时候，把该组件实例挂载到一个 div 上
 **/
const Mask = Vue.extend(Loading)

const loadingDirective = {}
loadingDirective.install = (Vue) => {
  // 更新是否显示
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      Vue.nextTick(() => {
        // 控制loading组件显示
        el.instance.visible = true
        // 插入到目标元素
        insertDom(el, el, binding)
      })
    } else {
      removeClass(el, 'xs-loading-parent--relative')
      el.instance.visible = false
    }
  }

  //插入到目标元素
  const insertDom = (parent, el) => {
    parent.appendChild(el.mask)
    if (getStyle(el, 'position') !== 'absolute' && getStyle(el, 'position') !== 'fixed') {
      addClass(parent, 'xs-empty-parent--relative')
    }
  }

  Vue.directive('loading', {
    //第一次绑定到元素时调用
    /* eslint-disable */
    bind: function(el, binding, vnode) {
      const mask = new Mask({
        el: document.createElement('div')
      })
      //用一个变量接住mask实例
      el.instance = mask
      el.mask = mask.$el
      el.maskStyle = {}
      binding.value && toggleLoading(el, binding)
    },
    //所在组件的 VNode 更新时调用--比较更新前后的值
    update: function(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding)
      }
    },
    //指令与元素解绑时调用
    unbind: function(el, binding) {
      el.instance && el.instance.$destroy()
    }
  })
}

export default loadingDirective
