import Main from "../pages/main.js";
import Post from "../pages/post.js";
import Edit from "../pages/edit.js";
import Detail from "../pages/detail.js";

// 베이스 URL 저장 => 나중에 도메인으로 바꿔주거나, URL 긁어오는 방법 찾아서 자동 할당
export const BASE_URL = "http://localhost:1234";

// 정규표현식을 활용해 원하는 element 반환
export const routes = [
  { path: /^\/$/, element: Main },
  { path: /^\/post$/, element: Post },
  { path: /^\/edit\/[\w]+$/, element: Edit },
  { path: /^\/detail\/[\w]+$/, element: Detail },
];
