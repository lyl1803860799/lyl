# antd-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




项目的第一步，也是我进阶学习的开端，那就是目录的划分
assets 静态资源
components 公共组件，会被复用
resources 资源类js文件，比如预先配置类js
views 布局，ui有关组件



json文件规范一般不允许注释：
"less-loader": "^11.0.0", // loder的作用就是代码到界面的时候转换代码为浏览器认识的


ant-design-vue为了vue3提出了ant-design-vue 2.x版本


(0 , vue__WEBPACK_IMPORTED_MODULE_1__.defineComponent) is not a function
这种报错多半是版本不支持的问题


assets中的文件是会自动被全局引用的