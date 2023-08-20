[webpack mode 설정 (공식 문서)
](https://yamoo9.gitbook.io/webpack/webpack/config-webpack-dev-environment/webpack-mode)

1. Trouble

   > webpack에 배포용 번들링 mode가 따로 있을까?

   ```js
   // webpack.config.js

   module.exports = {
     mode: "development"
   };
   ```

2. Why?

3. Solved

   > 배포용 번들링을 위해서는 파일 크기를 최대한 압축하기 위해 production mode를 사용해야한다.

   - webpack mode에는 developement, none, production 총 세 가지 mode가 있다.

   - mode가 언급된 순서대로 번들링 후의 파일 크기가 작다.

   ```js
   // webpack.config.js

   module.exports = {
     mode: "production"
   };
   ```

   - 따라서 배포용 번들링 파일을 만들 때, production mode를 사용하자.
