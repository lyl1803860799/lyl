const { defineConfig } = require('@vue/cli-service');
const path = require('path')
// 用于处理路径统一的问题
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  runtimeCompiler: true,
  publicPath: "",
  outputDir: "dist",
  configureWebpack: {
    externals: {
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // css: {
  //   // requireModuleExtension: true,
  //   // "css.requireModuleExtension" is not allowed
  //   loaderOptions: {
  //     less: {
  //       modifyVars: {
  //         'primary-color': '#20499E',
  //         'link-color': '#20499E',
  //         'success-color': '#20499E',
  //         'border-radius-base': '2px',
  //       },
  //       lessOptions: {
  //         javascriptEnabled: true
  //       },
  //       javascriptEnabled: true
  //     }
  //   }
  // },
  productionSourceMap: false,
  devServer: {
    // port: 8080,
    // 修改默认端口
    port: 8080,
    host: "127.0.0.1",
    https: false,
    open: false,
    // 配置代理
    // proxy: {
    //   '/api': {
    //     // 以 “/api” 开头的 代理到 下边的 target 属性 的值 中
    //     target: 'http://127.0.0.1:8001/',
    //     changeOrigin: true, // 是否改变域名：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     ws: false, // 是否启用websockets
    //     pathRewrite: {
    //       // 路径重写
    //       '^/': '' // 用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'http://127.0.0.1:8080/user/add'
    //     }
    //     // '^/enterprise-api/': {
    //     //   target: 'https://client.mysteel.com',
    //     //   // target: 'http://192.168.158.122:8080', // 道江本地
    //     //   // target: 'http://192.168.158.126:8080', // 李强本地
    //     //   changeOrigin: true,
    //     //   // pathRewrite: { "/enterprise-api": "" },
    //     // },
    //   }
    // }
    proxy: {
      '^/macro_api/': {
        target: 'https://client.mysteel.com',
        changeOrigin: true,
      },
    }
  },
  lintOnSave: false,
})
