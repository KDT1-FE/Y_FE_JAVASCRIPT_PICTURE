const path = require("path");

module.exports = {
  entry: {
    index: "./src/js/index.js",
    fb: "./src/js/fb.js"
  },
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "assets", "js"),
    clean: true
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            compact: false
          }
        }
      }
    ]
  },
  experiments: {
    topLevelAwait: true
  }
};
