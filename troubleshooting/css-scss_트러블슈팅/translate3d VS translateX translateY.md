[translate3d vs translateX, translateY](https://stackoverflow.com/questions/22111256/translate3d-vs-translate-performance)

1. Trouble

2. Why?

   > FadeOut Animation의 X축으로의 변화를 디자인하는 과정에서 translate3d과 translateX, translateY의 차이점을 알고 싶어 공부하게 되었습니다.

   ```scss
   @keyframes fadeOut {
     40% {
       transform: translateX(-5rem);
     }
     100% {
       opacity: 0;
       transform: translateX(10rem);
       display: none;
     }
   }
   ```

3. Solved

   - 좋은 퍼포먼스를 원한다면 translate3d를 사용하는 것이 좋다.<br/>
     translate3d는 GPU를 사용(하드웨어 가속)하기 때문에 CSS 퍼포먼스가 일반적인 translate()보다 더 좋다. 따라서 더 좋은 퍼포먼스를 원한다면 translate3d를 사용하는 것이 좋다.

   ```scss
   @keyframes fadeOut {
     40% {
       transform: translate3d(-5rem, 0, 0);
     }
     100% {
       opacity: 0;
       transform: translate3d(10rem, 0, 0);
       display: none;
     }
   }
   ```
