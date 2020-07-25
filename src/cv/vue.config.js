module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  publicPath: '/cv',
  devServer: {
    proxy: {
      '^/tt': {
        target: 'http://localhost:3000/',
        ws: true,
        changeOrigin: true
      },
      '^/': {
        target: 'http://localhost:3000/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.md$/,
        loader: 'raw-loader' // npm install -D raw-loader
      }]
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/styles/variables.scss";'
      }
    }
    // module: {
    //   rules: [
    //     {
    //       test: /\.scss$/,
    //       use: [
    //         'vue-style-loader',
    //         'css-loader',
    //         {
    //           loader: 'sass-loader',
    //           options: {
    //             // Prefer `dart-sass`
    //             implementation: require('sass'),
    //           },
    //         },
    //       ]
    //     }
    //   ]
    // }
  }
}
