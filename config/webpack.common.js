const path = require('path');
// https://webpack.docschina.org/plugins/eslint-webpack-plugin/
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
// https://webpack.docschina.org/plugins/copy-webpack-plugin#root
const CopyPlugin = require('copy-webpack-plugin');
// https://webpack.docschina.org/plugins/mini-css-extract-plugin#root
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const WebpackBar = require('webpackbar');

const { IS_DIV } = require('./constant');

const getStyleLoaders = preProcessor =>
  [
    !IS_DIV ? MiniCssExtractPlugin.loader : 'style-loader',
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
        test: /\.(png|jpe?g|gif|webp)$/,
        // webpack内置处理文件资源的功能
        type: 'asset',
        parser: {
          dataUrlCondition: {
            // 小于10k的图片转为base64
            // 优点：减少请求数量 //缺点：增加文件体积
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
      {
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: 'asset/resource',
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            // "@babel/plugin-transform-runtime", // presets中包含了
            IS_DIV && require.resolve('react-refresh/babel'), // 开启js的HMR功能
          ].filter(Boolean),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.tsx', '.ts'], // 自动补全文件扩展名，让jsx可以使用
    alias: {
      '@/src': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
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
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true,
      cacheLocation: path.resolve(__dirname, '..', 'node_modules/.cache/.eslintcache'),
    }),
    // 配置webpack打包进度
    new WebpackBar({
      name: IS_DIV ? 'run' : 'build',
      color: IS_DIV ? '#00b2a9' : '#ee6139',
    }),
    // 编译时进行 typescript 类型检测
    // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     configFile: path.resolve(__dirname, '../tsconfig.json'),
    //   },
    // }),
  ],
};
