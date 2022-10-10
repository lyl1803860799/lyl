// 页面布局框架
import Layout from '@/views/layout.vue';
import Blog from '@/views/blog.vue';


const fields = [
    {
        // name: 'welcome',
        path: '/',
        component: Layout,
        // 重定向可能导致router-view不起作用
        redirect: '/welcome',
        meta: {
            title: '首页',
            icon: 'fa fa-yx-home',
        },
        children: [
            {
                name: 'home',
                path: 'welcome',
                component: () => import('@/views/welcome.vue'),
                // 重定向可能导致router-view不起作用
                // redirect: '/welcome',
                meta: {
                    title: '首页',
                    icon: 'fa fa-yx-home',
                },
            }
        ],
    },
    {
        path: '/blog',
        component: Blog,
        // 重定向可能导致router-view不起作用
        // redirect: '/blog',
        meta: {
            title: '首页',
            icon: 'fa fa-yx-home',
        },
    },
    {
        name: 'web',
        path: '/web',
        component: Layout,
        // 重定向可能导致router-view不起作用
        // redirect: '/welcome',
        // meta: {
        //     title: '首页',
        //     icon: 'fa fa-yx-home',
        // },
        children: [
            {
                name: 'git',
                path: 'git',
                component: () => import('@/views/web/gitHub.vue'),
                // 重定向可能导致router-view不起作用
                // redirect: '/welcome',
                meta: {
                    title: '首页',
                    icon: 'fa fa-yx-home',
                },
            },
            {
                name: 'vue',
                path: 'vue',
                component: () => import('@/views/web/vueJs.vue'),
                // 重定向可能导致router-view不起作用
                // redirect: '/welcome',
                meta: {
                    title: '首页',
                    icon: 'fa fa-yx-home',
                },
                // children: [
                //     {
                //         name: 'vueConfig',
                //         path: 'vueConfig',
                //         component: () => import('@/components/blog.vue'),
                //         // 重定向可能导致router-view不起作用
                //         // redirect: '/welcome',
                //         meta: {
                //             title: '首页',
                //             icon: 'fa fa-yx-home',
                //         },
                //     }
                // ],
            },
            {
                name: 'css',
                path: 'css',
                component: () => import('@/views/web/css.vue'),
                // 重定向可能导致router-view不起作用
                // redirect: '/welcome',
                meta: {
                    title: '首页',
                    icon: 'fa fa-yx-home',
                },
            },
            {
                name: 'chart',
                path: 'chart',
                component: () => import('@/views/web/eCharts.vue'),
                // 重定向可能导致router-view不起作用
                // redirect: '/welcome',
                meta: {
                    title: '首页',
                    icon: 'fa fa-yx-home',
                },
            }
        ],
    },{
        name: 'back',
        path: '/back',
        component: Layout,
        // 重定向可能导致router-view不起作用
        // redirect: '/welcome',
        // meta: {
        //     title: '首页',
        //     icon: 'fa fa-yx-home',
        // },
        children: [
            {
                name: 'spring',
                path: 'spring',
                component: () => import('@/views/back/spring.vue'),
                // 重定向可能导致router-view不起作用
                // redirect: '/welcome',
                meta: {
                    title: '首页',
                    icon: 'fa fa-yx-home',
                },
            },
        ],
    },
    {
        name: 'theory',
        path: '/theory',
        component: Layout,
        children: [
            {
                name: 'theory',
                path: 'theory',
                component: () => import('@/views/theory'),
                // 重定向可能导致router-view不起作用
                // redirect: '/welcome',
                meta: {
                    title: '首页',
                    icon: 'fa fa-yx-home',
                },
            },
        ],
    }, {
        name: 'media',
        path: '/media',
        component: Layout,
        children: [
            {
                name: 'photography',
                path: 'photography',
                component: () => import('@/views/media/photoGraphy'),
                // 重定向可能导致router-view不起作用
                // redirect: '/welcome',
                meta: {
                    title: '首页',
                    icon: 'fa fa-yx-home',
                },
            },
            {
                name: 'ps',
                path: 'ps',
                component: () => import('@/views/media/photoShop.vue'),
            },
        ],
    }, {
        name: 'commonCss',
        path: '/commonCss',
        component: Layout,
        children: [
            {
                name: 'button',
                path: 'commonButton',
                // path 名要和url对应
                // 和aside对应的id对应上
                component: () => import('@/views/commonCss/commonButton.vue'),
            },
            {
                name: 'others',
                path: 'others',
                // path 名要和url对应
                // 和aside对应的id对应上
                component: () => import('@/views/commonCss/others'),
            },
        ],
    },
    
];

export default fields;
