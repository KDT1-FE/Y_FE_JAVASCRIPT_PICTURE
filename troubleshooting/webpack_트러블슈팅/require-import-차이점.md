[webpack.config.js 에서는 왜 import를 사용하지 않고 require을 사용 할까?
](https://velog.io/@lsx2003/import%EC%99%80-require%EC%9D%98-%EC%B0%A8%EC%9D%B4)

1. Trouble

   > webpack.config.js 에서 import를 통해 module을 불러올 수 없음

   ```js
   // webpack.config.js

   import path from "path";
   import path from "mini-css-extract-plugin";
   import Dotenv from "dotenv-webpack";

   // SyntaxError: Cannot use import statement outside a module
   ```

2. Why?

   > 번들링을 위해 사용하는 webpack은 node.js 환경에서 구동하므로 require을 사용해야 합니다.

   - require은 CommonJS 문법으로, 외부 파일이나 라이브러리를 불러올 때 사용한다.

   - import는 ES6 문법으로, 외부 파일이나 라이브러리를 불러올 때 사용한다.

   - node.js 에서는 CommonJS 문법인 require을 사용하며, webpack은 node.js 환경에서 구동되므로 외부 모듈을 불러올 때 require을 사용해야 합니다.

3. Solved

   ```js
   // webpack.config.js

   const MiniCssExtractPlugin = require("path");
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   const Dotenv = require("dotenv-webpack");
   ```

cf.

> 리액트 라이브러리를 사용할 때는 import구문이 사용이 가능합니다. 그 이유는 babel에서 imoprt 구문을 require 구문으로 변환해 주기 때문입니다.
