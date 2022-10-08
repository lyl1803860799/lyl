### 3.2 vue.config.js 配置
Vue-cli3+ 和 Vue-cli2 的最大区别：在于内置了很多配置，没有 build 文件夹和 config 的配置。但是在开发中，避免不了的还是需要个性化的配置，这里系统讲一下 vue.config.js 的配置。
当遇到需要删除node——modules的时候，不放直接当前目录剪切或者直接从命名
改依赖在package.json改没用，还有一个lock文件


#### 3.2.1 基础版

``` javascript
module.exports = {
  publicPath: './',  // 基本路径
  outputDir: 'dist', // 构建时的输出目录
  assetsDir: 'static', // 放置静态资源的目录
  indexPath: 'index.html', // html 的输出路径
  filenameHashing: true, // 文件名哈希值
  lintOnSave: false, // 是否在保存的时候使用 `eslint-loader` 进行检查。

  // 组件是如何被渲染到页面中的？ （ast：抽象语法树；vDom：虚拟DOM）
  // template ---> ast ---> render ---> vDom ---> 真实的Dom ---> 页面
  // runtime-only：将template在打包的时候，就已经编译为render函数
  // runtime-compiler：在运行的时候才去编译template
  runtimeCompiler: false,

  transpileDependencies: [], // babel-loader 默认会跳过 node_modules 依赖。
  productionSourceMap: false, // 是否为生产环境构建生成 source map

  //调整内部的 webpack 配置
  configureWebpack: () => { },

  chainWebpack: () => { },

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true, // 编译后默认打开浏览器
    host: '0.0.0.0',  // 域名
    port: 8080,  // 端口
    https: false,  // 是否https
    // 显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:10001',
        changeOrigin: true, // 是否跨域
        ws: false, // 是否支持 websocket
        secure: false, // 如果是 https 接口，需要配置这个参数
        pathRewrite: { // 可以理解为一个重定向或者重新赋值的功能
          '^/api': ''    // '^/api': '/'    这种接口配置出来     http://127.0.0.1:10001/login
        }               
        // '^/api': '/api'  这种接口配置出来     http://127.0.0.1:10001/api/login
      }
    }
  }
}
```

3.2.2 高级版及部分Webpack插件介绍
// vue.config.js
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩(可选)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩(可选)

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析，(可选)

const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV); //判断是否是生产环境
/** 正式配置项，以下参数 都是可选**/
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/' : '/', // 打包公共路径
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码，false不需要
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PRODUCTION, // 生产环境的 source map,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require("os").cpus().length > 1, 
  pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'));
    // 压缩图片
    // 需要 npm i -D image-webpack-loader
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        webp: {
          quality: 75
        }
      });
    // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
    if (IS_PRODUCTION) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [{
        analyzerMode: "static"
      }]);
    }
  },
  //webpack的配置项
  configureWebpack: config => {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    if (IS_PRODUCTION) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  css: {
    extract: IS_PRODUCTION,
    requireModuleExtension: false, // 去掉文件名中的 .module
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // `globalVars` 定义全局对象，可加入全局变量
        globalVars: {
          primary: '#333'
        }
      }
    }
  },
  // 配置 webpack-dev-server 行为
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 编译后默认打开浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: { //配置多个跨域
      "/api": {
        target: "http://197.0.0.1:8088",
        changeOrigin: true,
        ws: true, //websocket支持
        secure: false,
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/api2": {
        target: "http://197.0.0.2:8088",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api2": "/"
        }
      },
    }
  }
}

以上配置按需引用，常见的配置项都已经写出，其他特殊可参考Vue-cli 官方文档
3.2.3 部分Webpack插件介绍
添加别名 (alias)
在 Vue 项目开发中，经常需要引入不同文件目录的组件，通常是通过 “ import 组件名 from ‘ 组件路径 ’ ” 的结构来实现对组件的引用，而当文件路径较深或者引用的组件跨越的较远时很容易引用出错，这里我们就要引入alias概念了，“别名”的意思，顾名思义标准名称以外的名称。
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
 
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"));
  }
};


开启 GZIP 压缩
GZIP 是网站压缩加速的一种技术，对于开启后可以加快我们网站的打开速度。经过服务器压缩，客户端浏览器快速解压，可以大大减少网站的流量。
比如： nginx 给你返回 js 文件的时候，会判断是否开启 gzip，然后压缩后再还给浏览器。
但是 nginx 其实会先判断是否有 .gz 后缀的相同文件，有的话直接返回，nginx 不再进行压缩处理。而压缩是要时间的，不同级别的压缩率花的时间也不一样。所以提前准备 gz 文件，可以更加优化，而且你可以把压缩率提高点，这样带宽消耗会更小。
安装
npm install --save-dev compression-webpack-plugin
// 或
yarn add compression-webpack-plugin --save-dev
复制代码
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = ['js', 'css']; // 开启gzip压缩， 按需写入

// 调整内部的 webpack 配置
configureWebpack: config => { 
  const plugins = [];
  plugins.push(new CompressionWebpackPlugin({
    filename: "[path].gz[query]",     // 压缩后的文件策略
    algorithm: "gzip",               // 压缩方式
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),  // 可设置需要压缩的文件类型
    threshold: 10240,     // 大于10240字节的文件启用压缩
    minRatio: 0.8,       // 压缩比率大于等于0.8时不进行压缩
    deleteOriginalAssets: false,   // 是否删除压缩前的文件，默认false
  }));

  config.plugins = [...config.plugins, ...plugins];
},

如果报错：TypeError: Cannot read property 'tapPromise' of undefined，可降低 compression-webpack-plugin 的版本；
默认安装的是7以上的版本，package.json 调整为  "compression-webpack-plugin": "^5.0.0", 就可以啦。
