const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    path: undefined,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/assets/[has:10][ext][query]',
  },
  module: {},
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new ReactRefreshWebpackPlugin(), // 解决js的HMR功能运行时全局变量的问题
  ],
  optimization: {
    // 导致热更新失败
    splitChunks: {
      // chunks: 'all',
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`,
    },
  },
  // 开发服务器
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true, // 解决react-router刷新404问题
  },
  // 模式
  mode: 'development', // 开发模式
  devtool: 'cheap-module-source-map',
});
