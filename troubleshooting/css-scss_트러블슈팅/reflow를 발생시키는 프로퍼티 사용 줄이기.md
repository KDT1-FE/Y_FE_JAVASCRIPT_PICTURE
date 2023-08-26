[reflow, repaint를 활용한 렌더링 최적화](https://velog.io/@wlwl99/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%B5%9C%EC%A0%81%ED%99%94#1-%EB%B6%88%ED%95%84%EC%9A%94%ED%95%9C-%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%EC%9D%84-%EC%A4%84%EC%9D%B8%EB%8B%A4)

1. Trouble

   > 브라우저 렌더링 과정을 공부해보고 reflow를 발생시키는 CSS 프로퍼티 사용을 지양하기 위해 공부해 보았습니다.

2. Why?

   > ... -> flow -> paint 순서로 브라우저가 렌더링 되는 과정에서,reflow를 발생시키는 CSS 프로퍼티를 repaint만 발생시키는 CSS 프로퍼티로 대체한다면 렌더링 최적화를 할 수 있다.

3. Solved

   > 리팩토링 진행중
