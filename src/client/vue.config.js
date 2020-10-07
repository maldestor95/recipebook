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
    },
     module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {loader: 'file-loader'},
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  {removeTitle: true},
                  {convertColors: {shorthex: false}},
                  {convertPathData: false}
                ]
              }
            }
          ]
        }
      ]
    },
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