const path = require("path");
// /https://www.webpackjs.com/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require("html-webpack-plugin");
//https://webpack.docschina.org/plugins/mini-css-extract-plugin/
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//https://webpack.docschina.org/plugins/terser-webpack-plugin/
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
module.exports = (env, options) => {
  const isProd = options.mode === "production";
  const config = {
    mode: "development",
    entry: {
      main: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // 生成 index.html
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin(),
    ],
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin({ parallel: true })],
      //是否在生产环境压缩优化
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          use: ["babel-loader"],
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg|png|jpeg|jpg|gif)(\?.*)?$/i,
          exclude: /public/,
          use: {
            loader: "url-loader",
          },
        },
      ],
    },
    devServer: {
      port: 8080,
      host: "localhost",
      hot: true,
      //是否直接打开网址
      open: true,
    },
    devtool: "source-map",
  };

  return config;
};
