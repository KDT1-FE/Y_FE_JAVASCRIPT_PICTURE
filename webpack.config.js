const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // 가 페이지 별 번들링 파일 명시, scss 컴파일 파일의 경우 index.js 파일에 import
  entry: {
    index: "./src/js/index.js",
    driverList: "./src/js/driverList.js",
    addDriver: "./src/js/addDriver.js",
    driverProfile: "./src/js/driverProfile.js",
    confirmAccident: "./src/js/confirmAccident.js"
  },
  mode: "production",
  // .js.map 파일 생성
  devtool: "source-map",
  // 번들링 js 파일이 저장될 경로와 이름 지정
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public", "js"),
    clean: true
  },
  watch: true,
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: "../css/style.css" }),
    new Dotenv({
      systemvars: true
    })
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
