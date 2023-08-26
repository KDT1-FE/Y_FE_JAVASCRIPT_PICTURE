[dotenv-webpack npm 공홈](https://www.npmjs.com/package/dotenv-webpack)<br/>
[dotenv-webpack 활용법 블로그](https://abangpa1ace.tistory.com/entry/Configs-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98%EB%A5%BC-%EC%84%A0%EC%96%B8%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-React-%EA%B8%B0%EC%A4%80#google_vignette)

1. Trouble

   > firebase의 api key, 회원가입에 필요한 아이디, 비밀번호가 소스코드에 그대로 노출이 되어서 이를 보안해줄 방법을 찾다가 dotenv를 알게되어 적용해보았습니다.

   ```js
   import { initializeApp } from "firebase/app";

   // Firebase web app 구성(configuration)
   const firebaseConfig = {
     apiKey: "보안이 필요한 내용",
     authDomain: "보안이 필요한 내용",
     projectId: "보안이 필요한 내용",
     storageBucket: "보안이 필요한 내용",
     messagingSenderId: "보안이 필요한 내용",
     appId: "보안이 필요한 내용",
     measurementId: "보안이 필요한 내용",
     storageBucket: "보안이 필요한 내용"
   };

   const app = initializeApp(firebaseConfig);

   export default app;
   ```

2. Why?

3. Solved

```js
// webpack.config.js

const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    // API key 보안용 .env 사용
    new Dotenv({
      systemvars: true
    })
  ]
};
```

```.env
// .env

API_KEY = 보안할 내용
STORAGE_BUCKET = 보안할 내용
```

```js
import { initializeApp } from "firebase/app";

// Firebase web app 구성(configuration)
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  storageBucket: process.env.STORRAGE_BUCKET
};

const app = initializeApp(firebaseConfig);

export default app;
```
