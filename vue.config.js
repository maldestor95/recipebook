const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  runtimeCompiler: true, //https: //cli.vuejs.org/config/#runtimecompiler
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
      devtool: 'source-map'
  },
  devServer: {
    proxy:  'http://localhost:3000/'
  }
}