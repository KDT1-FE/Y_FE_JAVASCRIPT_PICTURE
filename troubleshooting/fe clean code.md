[토스ㅣSLASH 21 - 실무에서 바로 쓰는 Frontend Clean Code](https://www.youtube.com/watch?v=edWbHp_k_9Y&t=1058s)

1. Trouble

   > 프로젝트에 필요한 기능들이 많아지면서 파일 및 모듈들을 가독성있고 유지 보수성 높게 관리하는 방법을 알 필요가 있다고 느껴 공부하게 되었습니다.

   ![image](https://github.com/JitHoon/Jithoon/assets/101972330/949b5a12-940b-42e3-b968-69fa912d96ca)
   ![image](https://github.com/JitHoon/Jithoon/assets/101972330/a21455e4-597d-42ef-a5e4-d6bec46ff57d)
   ![image](https://github.com/JitHoon/Jithoon/assets/101972330/06950b7c-7568-447a-b1f6-4c9d80149c98)

2. Why?

   > 클린 코드 의의 = 유지보수 시간 단축

   - 지양해야하는 코드<br/>
     1. 하나의 목적인 코드가 흩뿌려져 있는 경우
     2. 하나의 함수가 여러 가지 일을 하는 경우
     3. 함수의 세부 구현 단계가 제각각인 경우

   > 클린 코드 != 짧은 코드 == 원하는 로직을 빠르게 찾을 수 있는 코드

   - 지향해야하는 코드<br/>
     1. 목적이 동일한 코드끼리 뭉쳐져 **_응집도가 높은 코드_**
        - 당장 몰라도 되는 부분과 핵심 부분 구분하기
        - 핵심 데이터(ex. 제목, 내용, 버튼) -> 세부 구현 -> 결과물
        - 무엇을 하는지는 남겨두고 세부 구현은 내부에 뭉쳐두는 방식 == **_선언적 프로그래밍_** (vs. 명령형 프로그래밍)
     2. 함수가 한 가지 일을 하도록 **_단일책임을 지는 코드_**
     3. 함수의 세부 구현 단계를 통일하여 **_추상화된 코드_**
        - 상황에 따라 필요한 만큼만 추상화하기
        - 추산화 단계가 비슷한 파일끼리 정리하기
   - 추가 팁<br/>
     1. 조건이 많아지면 한글 이름도 유용

3. Solved

   ![image](https://github.com/JitHoon/Jithoon/assets/101972330/cd4a6246-741b-4cc1-9e90-281f7b32f572)

   ![image](https://github.com/JitHoon/Jithoon/assets/101972330/a9794353-9c05-4f45-9f69-b128db9f81c3)

   ![image](https://github.com/JitHoon/Jithoon/assets/101972330/40dd0b81-51ac-4602-b260-06dbc507daaf)

   ![image](https://github.com/JitHoon/Jithoon/assets/101972330/c01f5845-6a8d-4897-bbad-295129e8671d)
