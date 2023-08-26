[display none이 transition에 적용되지 않는 이유](https://velog.io/@dev-tinkerbell/display-none%EC%9D%B4-transition%EC%9D%B4-%EC%95%88%EB%A8%B9%ED%9E%88%EB%8A%94-%EC%9D%B4%EC%9C%A0)<br/>
[css display none 애니메이션 오류 수정하기](https://songsong.dev/entry/css-display-none-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EC%88%98%EC%A0%95%ED%95%98%EA%B8%B0)

1. Trouble

   > load 이벤트 이후 load 요소를 화면과 DOM에서 사라지게 하기위해 animation 안에 display: none을 적용해 보았지만 요소가 서서히 사라지는 효과가 적용되지 않았다.

   ```scss
   @keyframes fadeOut {
     0% {
       display: block;
     }
     100% {
       display: none;
     }
   }
   ```

2. Why?

   > 애니메이션이 재생되기 전, 렌더 트리에서 이미 none이 먼저 반영된 후 none으로의 animation을 '보여주기'가 진행되므로 애니메이션이 동작할 수 없다.

3. Solved

   > opacity를 추가 활용

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
