[CSS 상대 단위 em과 rem 비교](https://www.daleseo.com/css-em-rem/)

1. Trouble

2. Why?

   > 이번 프로젝트에서는 rem을 활용하여 반응형 웹 페이지를 만들어 보았습니다. 이때 em과 rem을 혼용해서 잘못 사용하는 경우가 많다고 알고 있어서 이번 기회에 제대로 두 단위의 차이를 비교해 보았습니다.

3. Solved

   `em`의 경우, 해당 단위가 사용되고 있는 요소의 `font-size` 속성값이 기준이 됩니다.

   ```css
   div {
     font-size: 20px;
     width: 10em; /* 200px */
   }
   ```

   반면에 `rem`에서 `r`은 `root`, 즉 최상위 요소를`font-size` 속성값 의미합니다. HTML에서 최상위 요소는 `<html>` 입니다. 따라서 `rem` 경우, `html` 요소의 `font-size` 속성값이 기준이 됩니다.

   ```css
   html {
     font-size: 16px;
   }

   div {
     font-size: 20px;
     width: 10rem; /* 160px */
   }
   ```
