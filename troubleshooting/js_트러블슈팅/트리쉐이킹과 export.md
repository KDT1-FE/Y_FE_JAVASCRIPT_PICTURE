[default export 와 named export의 차이점](https://zereight.tistory.com/1134)

1. Trouble

   > Firebase와 Webpack을 함께 사용하면, 트리쉐이킹으로 인해 최종 빌드에 포함되는 Firebase 코드의 양을 줄이도록 최적화해줍니다. 이때 webpack의 도움 외 다른 방법으로 트리쉐이킹을 할 수 있다는 것을 알게 되어 공부해 보았습니다.

2. Why?

   > export default component의 경우, import components from "components" 형태로 가져오게 되는데, 이는 tree shaking이 되지 않는다.

3. Solved

   > export를 선호하면 좋다는 생각이 들었습니다!

   1. export default

   - 하나의 파일에서 하나의 변수를 export한다.
   - import할 때 아무 이름으로나 import 가능하다.
   - let, const같은 것을 바로 export default 할 수는 없다.

   - import components from "components" 형태로 가져오게 되는데, 이는 tree shaking이 되지 않는다.

   2. named export

   - 한 파일 내에서 여러 변수들을 export하는 것이 가능하다.
   - import할 때에는 export할때 사용된 변수명을 동일하게 설정해야한다.
   - 다른 이름으로 alias할때에는 as를 사용한다.
