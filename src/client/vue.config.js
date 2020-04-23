// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  runtimeCompiler: true, //https: //cli.vuejs.org/config/#runtimecompiler
  configureWebpack: {
    // plugins: [new BundleAnalyzerPlugin()],
    //   devtool: 'source-map'
    // entry: './src/index.js',
  },
  devServer: {
    proxy:  'http://localhost:3000/'
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  },
  
}