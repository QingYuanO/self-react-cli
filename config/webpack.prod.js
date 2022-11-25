const path = require('path');
//https://webpack.docschina.org/plugins/eslint-webpack-plugin/
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
//https://webpack.docschina.org/plugins/html-webpack-plugin/#root
const HtmlWebpackPlugin = require('html-webpack-plugin');
//https://webpack.docschina.org/plugins/copy-webpack-plugin#root
const CopyPlugin = require('copy-webpack-plugin');
//https://webpack.docschina.org/plugins/mini-css-extract-plugin#root
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//https://webpack.docschina.org/plugins/terser-webpack-plugin/
const TerserWebpackPlugin = require('terser-webpack-plugin');

const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env', // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:10].js',
    chunkFilename: 'static/js/[name].[contenthash:10].chunk.js',
    assetModuleFilename: 'static/js/[hash:10][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders('less-loader'),
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        //webpack内置处理文件资源的功能
        type: 'asset',
        parser: {
          dataUrlCondition: {
            //小于10k的图片转为base64
            //优点：减少请求数量 //缺点：增加文件体积
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
    ],
  },
  resolve: {
    // extensions: ['.jsx', '.js', '.json'], // 自动补全文件扩展名，让jsx可以使用
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, '..', 'node_modules/.cache/.eslintcache'),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          toType: 'dir',
          noErrorOnMissing: true, // 不生成错误
          globOptions: {
            // 忽略文件
            ignore: ['**/index.html'],
          },
          info: {
            // 跳过terser压缩js
            minimized: true,
          },
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  // 开发服务器
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
    hot: true,
    compress: true,
  },
  mode: 'production',
  devtool: 'source-map',
};
