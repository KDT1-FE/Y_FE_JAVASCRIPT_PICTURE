const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // 번들링 위치, scss의 경우 index.js 파일에 import
  entry: {
    index: "./src/js/index.js",
    driverList: "./src/js/pages/driverList.js",
    addDriver: "./src/js/pages/addDriver.js",
    driverProfile: "./src/js/pages/driverProfile.js",
    confirmAccident: "./src/js/pages/confirmAccident.js"
  },
  mode: "development",
  // .js.map 파일 생성
  devtool: "source-map",
  // 번들링 js 파일이 저장될 경로와 이름 지정
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "assets", "js"),
    clean: true
  },
  watch: true,
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: "../css/style.css" }),
    new Dotenv()
  ],
  module: {
    rules: [
      // js 번들링
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            compact: false
          }
        }
      },
      // scss 컴파일 및 번들링
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/
      }
    ]
  },
  experiments: {
    topLevelAwait: true
  }
};
