import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
      path: '/show/:id',
      component: () => import('@/views/show/index')
    },
    {
      path: '/programDetail/:id',
      component: () => import('@/views/show/programDetail')
    },
    {
      path: '/preview/:id',
      component: () => import('@/views/show/index')
    },
    {
      path: '/component/:id',
      component: () => import('@/views/show/index')
    },
    {
      path: '/404',
      component: () => import('@/views/404')
    }
  ]
})

export default router