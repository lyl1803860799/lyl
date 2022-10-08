import VueRouter from 'vue-router'
//登录页面
import login from '@/views/login';
//找回密码
import findPwd from '@/views/findPwd';
//屏幕管理
import screenManage from '@/views/screen/screenManage';
//频道管理
import channelManage from '@/views/channel/index';
//频道管理-新增/编辑
import addOrEditChannel from '@/views/channel/addOrEditChannel.vue';
//节目管理
import programManage from '@/views/program/index';
//节目管理-新增/编辑
import addOrEditProgram from '@/views/program/addOrEditProgram.vue';
//模板管理
import templateManage from '@/views/template/index';
//模板管理-新增/编辑
import addOrEditTemplate from '@/views/template/addOrEditTemplate.vue';
//素材管理
import materialManage from '@/views/materialManage';
//基础数据
import basisData from '@/views/basisData/index';
//股指地图
import indexMap from '@/views/indexMap/index';

var router = new VueRouter({
    //mode: 'history',
    //base:'mtv_ui',
    routes: [{
            path: '/',
            component: login,
            children: []
        }, {
            path: '/login',
            component: login,
            children: []
        },{
            path: '/findPwd',
            component: findPwd
        },
        {
            path:'/indexMap',
            component:indexMap
        },
        {
            path: '/programDetail/:id',
            component: () => import('@/views/show/programDetail')
          },
        {
            path: '/index', //屏幕管理
            redirect: '/index/screenManage',
            component: () => import('@/views/index'),
            children: [{
                    path: 'screenManage',
                    name:'/index/screenManage',
                    component: screenManage
                },
                {
                    path: 'channelManage',
                    name:'/index/channelManage',
                    component: channelManage
                },
                {
                    path: 'programManage',
                    name:'/index/programManage',
                    component: programManage
                },
                {
                    path: 'templateManage',
                    name:'/index/templateManage',
                    component: templateManage
                },
                {
                    path: 'materialManage',
                    component: materialManage
                },
                {
                    path: 'basisData',
                    component: basisData
                }
            ]
        },
        {
            path: '/edit', //新增/编辑模板
            redirect: '/edit/addOrEditTemplate',
            component: () => import('@/views/edit'),
            children: [{
                path: 'addOrEditTemplate',
                component: addOrEditTemplate
            }]
        },
        {
            path: '/edit', //新增/编辑节目
            component: () => import('@/views/edit'),
            children: [{
                path: 'addOrEditProgram',
                component: addOrEditProgram
            }]
        },
        {
            path: '/edit', //新增/编辑节目
            component: () => import('@/views/edit'),
            children: [{
                path: 'addOrEditChannel',
                component: addOrEditChannel
            }]
        },
        {
            path: '/404',
            component: () => import('@/views/404')
        }
    ]
})
export default router