[JavaScript 프로젝트에 Firebase 추가](https://firebase.google.com/docs/web/setup?hl=ko#add-sdk-and-initialize)

1. Trouble

   > JS 프로젝트에 Firebase를 처음 추가해 보는 상황이었습니다. 이에 일반 블로그보다 공식 문서를 참고하여 정확한 firebase 추가 방법을 공부해 보았습니다.

2. Why?

3. Solved

   > src/firbase/app.js 파일에 아래와 같이 프로젝트에 firebase를 추가하였습니다.

   ```js
   // app.js

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

   - API KEY 등 주요 데이터에 대한 보안을 위해 dotenv-webpack을 활용하였습니다. 관련 트러블슈팅은 webpack\_트러블슈팅 파일에 기록해 두었습니다.
