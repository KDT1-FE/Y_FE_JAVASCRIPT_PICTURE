const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // 가 페이지 별 번들링 파일 명시, scss 컴파일 파일의 경우 index.js 파일에 import
  entry: {
    login: "./src/js/login/login.js",
    main: "./src/js/main/main.js",
    create: "./src/js/create/create.js",
    profile: "./src/js/profile/profile.js",
    confirm: "./src/js/confirm/confirm.js"
  },
  // 배포 시, 최종 번들링 파일 용량 개선
  mode: "production",
  // .js.map 파일 생성
  devtool: "source-map",
  // 번들링 js 파일이 저장될 경로와 이름
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public", "js"),
    clean: true
  },
  // 변경 사항 라이브로 반영
  watch: true,
  plugins: [
    // 컴파일된 CSS 파일 저장될 경로와 이름
    new MiniCssExtractPlugin({ filename: "../css/style.css" }),
    // API key 보안용 .env 사용
    new Dotenv({
      systemvars: true
    })
  ],
  module: {
    rules: [
      // bable을 활용한 js 번들링
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
      // scss 컴파일
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/
      }
    ]
  },
  // 번들링 후 asset 및 entrypoint size가 300 KiB 이상 일 때 경고 문구 날리기
  // default 244 kiB
  performance: {
    hints: false,
    maxEntrypointSize: 300000,
    maxAssetSize: 300000
  }
};
