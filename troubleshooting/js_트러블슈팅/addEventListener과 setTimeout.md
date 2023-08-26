[EventTarget.addEventListener() mdn](https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener#%EC%9D%B4%EB%B2%A4%ED%8A%B8_%EC%88%98%EC%8B%A0%EA%B8%B0_%EC%BD%9C%EB%B0%B1)

1. Trouble

   > addEventListener의 콜백 함수로 setTimeout 함수가 동작하지 않음

   ```js
   El.addEventListener("click", setTimeout());
   ```

2. Why?

   > addEventListener(type, listener); 구문에서 listener의 조건을 정확히 알지 못함

   - listener 조건<br/>
     handleEvent() 메서드를 포함하는 객체 또는 콜백 함수여야 한다.
     이때 콜백 함수 자체는 handleEvent() 메서드와 같은 매개변수, 같은 반환 값을 가진다.
   - setTimeout() 은 handleEvent() 메서드를 포함하고 있지 않는다.

3. Solved

   > handleEvent() 메서드가 있는 callback 함수로 setTimeout()을 감싸서 사용.

   ```js
   El.addEventListener("click", () => {
     setTimeout();
   });
   ```
