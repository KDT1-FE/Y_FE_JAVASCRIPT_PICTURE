# 프로젝트 매니지먼트 서비스

## 🚀 프로젝트 소개

팀 프로젝트 진행 시 멤버를 등록하고 팀 구성을 도와주는 서비스를 입니다 😁

## 🚀 프로젝트 배포

https://deploy-preview-66--effulgent-axolotl-ab38e8.netlify.app/

## 🚀 과제 요구사항

### ✅ 필수 요구사항

- [x] “AWS S3 / Firebase 같은 서비스”를 이용하여 사진을 관리할 수 있는 페이지를 구현하세요.
- [x] 프로필 페이지를 개발하세요.
- [x] 스크롤이 가능한 형태의 리스팅 페이지를 개발하세요.
- [x] 전체 페이지 데스크탑-모바일 반응형 페이지를 개발하세요.
- [x] 사진을 등록, 수정, 삭제가 가능해야 합니다.
- [x] 유저 플로우를 제작하여 리드미에 추가하세요.

* CSS
  - [x] 애니메이션 구현
  - [x] 상대수치 사용(rem, em)
* JavaScript
  - [x] DOM event 조작

### ✅ 선택 요구사항

- [x] 사진 관리 페이지와 관련된 기타 기능도 고려해 보세요.
- [x] 직원을 등록, 수정, 삭제가 가능하게 해보세요.
- [x] 페이지가 보여지기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [ ] 직원 검색 기능을 추가해 보세요.
- [ ] infinity scroll 기능을 추가해 보세요.
- [ ] 사진을 편집할 수 있는 기능을 추가해 보세요.
- [ ] LocalStorage 사용

## 🚀 프로젝트 내용

|                                                         **메인페이지**                                                          |                                                                           **메인 페이지**                                                                            |
| :-----------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![ezgif-4-85d3eb5036](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/f1320b35-0cb6-419c-bbd5-89d476230300) |                   ![ezgif-4-c21991c473](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/5ef7c8a8-4d4d-49c9-a4e0-18421f6836c5)                    |
|                                           ✓ 전체 리스트 확인<br>✓ floating animation                                            |                                                       ✓ members 이름순 정렬 (최대 6개 출력) <br>✓ lazy-loading                                                       |
|                                                     **멤버 리스트 페이지**                                                      |                                                                        **멤버 리스트 페이지**                                                                        |
|         ![aa](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/1ac8c671-3560-4370-b35a-e7ef132665aa)         |                           ![bb](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/e0a6a6d1-6b22-433c-bd88-a44fe19f36d9)                            |
|                                   ✓ 멤버 리스트 확인<br>✓ 멤버 등록순 정렬 <br>✓ lazy-loading                                   |                                                                             ✓ 멤버 등록                                                                              |
|         ![aa](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/28f3d767-2a52-40dc-908d-59ff376013ff)         | ![스크린샷 2023-08-21 오후 10 15 53](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/bf5bea48-1808-4965-bdc0-f46450e4a12b) &nbsp; &nbsp; |
|                                                      ✓ 삭제 / 수정 / 조회                                                       |                                                     ✓ 수정 & 등록 시 유효성 검사<br>✓ 모든 폼을 채워야 등록 가능                                                     |
|                                                      **팀 리스트 페이지**                                                       |                                                                         **팀 리스트 페이지**                                                                         |
|         ![aa](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/ca601419-3e5f-4a10-95bb-a6d0fa2649b3)         |                           ![dd](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/d5b081e1-f807-43eb-8cb6-945acae43a49)                            |
|                           ✓ 팀 리스트 확인<br>✓ 팀 이름순 정렬<br>✓ hover animaion <br>✓ lazy-loading                           |                                               ✓ 팀 멤버 조회 가능 (프로필만 구현함)<br> ✓ unsplash random 이미지 사용                                                |

## 🚀 유저 플로우

![aa](https://github.com/KDT1-FE/Y_FE_JAVASCRIPT_PICTURE/assets/139189221/caf49cc7-da64-427c-8489-d0573210f1fb)
interaction 기준으로 작성했습니다

## ✍️ 아쉬운 점

- 다른 부분에서 오류처리하느라 firebase에 대해 자세히 공부하지 못했던 것 같아 아쉽습니다.
- 디렉토리 구조가 깔끔하지 못한 것 같습니다. 🥲
- 기능 추가를 많이 못한 것이 아쉽습니다. 팀 페이지도 여유가 된다면 구현해보고 싶습니다.
- 모듈화해서 코드의 재사용성을 높이고자 했는데 오히려 같은 로직을 두번이나 사용해야 했었습니다. 다시한번 더 클린코드에 대해 고민해보게 되는 시간이였습니다..😞
