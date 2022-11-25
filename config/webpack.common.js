const path = require('path');
//https://webpack.docschina.org/plugins/eslint-webpack-plugin/
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
//https://webpack.docschina.org/plugins/copy-webpack-plugin#root
const CopyPlugin = require('copy-webpack-plugin');
//https://webpack.docschina.org/plugins/mini-css-extract-plugin#root
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { IS_DIV } = require('./constant');

console.log(IS_DIV);

const getStyleLoaders = preProcessor => {
  return [
    !IS_DIV ? MiniCssExtractPlugin.loader : "style-loader",
    'css-loader',
    !IS_DIV
      ? {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                'postcss-preset-env', // 能解决大多数样式兼容性问题
              ],
            },
          },
        }
      : null,
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: './src/index.tsx',
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
        test: /\.(jsx|js|tsx|ts)$/,
        include: path.resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            // "@babel/plugin-transform-runtime", // presets中包含了
            IS_DIV ? 'react-refresh/babel' : '', // 开启js的HMR功能
          ].filter(Boolean),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.tsx', '.ts'], // 自动补全文件扩展名，让jsx可以使用
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, '..', 'node_modules/.cache/.eslintcache'),
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
};
