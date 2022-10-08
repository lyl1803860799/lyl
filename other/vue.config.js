const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true,
  publicPath: "",
  outputDir: "dist",
  pages: {
    index: {
      // 入口文件
      entry: 'src/main.js',
      // 入口的html文件位置
      template: 'public/index.html',
      // 入口html文件在构建后的输出文件名
      filename: 'index.html',
      // 网页标题栏标题内容
      title: '上海钢联数据可视化平台',
      // 入口项目所需要的chunk(chunk-vendors：三方库，chunk-common：公共内容，alpha: 入口自己的chunk)
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    //展示入口
    show: {
      entry: 'src/package/show/main.js',
      template: 'public/show.html',
      filename: 'show.html',
      title: '上海钢联数据可视化平台',
      chunks: ['chunk-vendors', 'chunk-common', 'show']
    },
  },
  configureWebpack: {
    externals: {},
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#0C69B3',
          'link-color': '#0C69B3',
        },
        lessOptions: {
          javascriptEnabled: true
        },
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: 'src/styles/variable.scss' //文件的路径
        })
        .end()
    })

    config.module.rule('compile')
      .test(/\.js$/)
      .include
      .add(resolve('src'))
      .add(resolve('test'))
      .add(resolve('node_modules/webpack-dev-server/client'))
      .add(resolve('node_modules'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          ['@babel/preset-env', {
            modules: false
          }]
        ]
      })

  },
  productionSourceMap: false,
  devServer: {
    port: 8080,
    host: "127.0.0.1",
    https: false,
    open: false,
    overlay: {
      warnings: false,
      errors: false,
    },
    proxy: {
      '^/mtv-api': {
        target: 'https://client.mysteel.com',
        changeOrigin: true,
      },
    }
  },
  lintOnSave: false,
};