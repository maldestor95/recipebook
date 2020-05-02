// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir:'../../dist/client',
  runtimeCompiler: true, //https: //cli.vuejs.org/config/#runtimecompiler
  configureWebpack: {
    // plugins: [new BundleAnalyzerPlugin()],
      devtool: 'source-map',
      // module: {
      //   rules: [{
      //     test: /\.(woff|woff2|eot|ttf|otf)$/,
      //     use: [
      //       'file-loader',
      //     ],
      //   }]}
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