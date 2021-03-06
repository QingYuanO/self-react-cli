const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
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
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
  devServer: {
    port: 8080,
    host: "0.0.0.0",
  },
};
