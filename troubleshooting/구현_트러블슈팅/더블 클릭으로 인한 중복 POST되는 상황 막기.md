[button 태그의 disabled 속성](http://www.tcpschool.com/html-tag-attrs/button-disabled)

1. Trouble

   > 사용자가 보험자를 db에 새롭게 등록하는 과정에서 등록하기 버튼을 누르게되는데, 버튼을 여러 번 누르게 되면 upload 과정이 중복되어 일어남.

2. Why?

   > 사용자가 버튼을 최초로 누른 후 버튼을 비활성화하여 중복 업로드를 막아야하는데 그러지 못함

3. Solved

   ```js
   // 더블 클릭으로 인한 중복 업로드 방지
   const addDriverFormSubmit = document.querySelector("input[type='submit']");
   addDriverFormSubmit.setAttribute("disabled", true);
   ```
