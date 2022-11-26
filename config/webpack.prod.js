const path = require('path');

//https://webpack.docschina.org/plugins/html-webpack-plugin/#root
const HtmlWebpackPlugin = require('html-webpack-plugin');
//https://webpack.docschina.org/plugins/mini-css-extract-plugin#root
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//https://webpack.docschina.org/plugins/terser-webpack-plugin/
const TerserWebpackPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common');

const { merge } = require('webpack-merge');

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:10].js',
    chunkFilename: 'static/js/[name].[contenthash:10].chunk.js',
    assetModuleFilename: 'static/js/[hash:10][ext][query]',
    clean: true,
  },
  module: {},
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`,
    },
  },
  mode: 'production',
  devtool: 'source-map',
});
