[scss에서 미디어 쿼리 다루기/ scss 미디어 쿼리 깔끔하게 사용하기](https://eunhee-programming.tistory.com/178#google_vignette)

1. Trouble

2. Why?

   > 너비에 따른 디자인을 다르게 적용하기 위해서 media query를 사용하던 도중 scss에서는 어떻게 활용되는지 궁금하여 공부하게 되었습니다.

3. Solved

   > mixin 안에 media query를 넣어 반응형이 필요한 요소에 include로 불러와 원하는 프로퍼티를 추가해주었습니다.

   ```scss
   // width
   $breakpoint-tablet: 850px;
   $breakpoint-mobile: 450px;

   @mixin tablet {
     @media (min-width: $breakpoint-mobile) and (max-width: $breakpoint-tablet) {
       @content;
     }
   }

   @mixin mobile {
     @media (max-width: $breakpoint-mobile) {
       @content;
     }
   }
   ```

   ```scss
     #load-logo {
       width: 10rem;
       height: 10rem;

       @include tablet {
         width: 15rem;
         height: 15rem;
       }

       @include mobile {
         width: 20rem;
         height: 20rem;
       }
   ```
