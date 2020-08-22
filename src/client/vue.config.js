// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir:'../server/static',
  runtimeCompiler: true, //https: //cli.vuejs.org/config/#runtimecompiler
  configureWebpack: {
    // plugins: [new BundleAnalyzerPlugin()],
    resolve: {
      alias: {
        /* Use vuetify from the app, not from fence-vue */
        vuetify: path.resolve(__dirname, "node_modules/vuetify"),
      },
    }
  },
  devServer: {
    proxy:  'http://localhost:3000/',

  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  publicPath: "/",
};