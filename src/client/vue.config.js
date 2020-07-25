// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir:'../server/static',
  runtimeCompiler: true, //https: //cli.vuejs.org/config/#runtimecompiler
  configureWebpack: {
    // plugins: [new BundleAnalyzerPlugin()],
      devtool: 'source-map',
      // module: {
      //   rules: [{
      //     test: /\.(woff|woff2|eot|ttf|otf|png|jpe?g)$/,
      //     use: [
      //       'file-loader',
      //     ],
      //   }]}
  },
  devServer: {
    proxy:  'http://localhost:3000/',

  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/variables.scss";`
      }
    }
  },
  publicPath:'/'
}