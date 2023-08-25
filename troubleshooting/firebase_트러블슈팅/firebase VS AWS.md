[모바일 앱의 백엔드 - AWS vs. Firebase](https://blog.naver.com/PostView.naver?blogId=devks0228&logNo=221835489763&parentCategoryNo=&categoryNo=27&viewDate=&isShowPopularPosts=true&from=search)

- 모바일 앱의 백엔드 관점에서 쓴 글이지만 웹 앱의 관점에서도 동일한 점이 있어 참고하게 되었습니다.

1. Trouble

   > zero-car 서비스와 현재 내 상황에 맞는 플랫폼은 firebase와 AWS 중 무엇일까 고민해 보았습니다.

2. Why?

   > 두 서비스 중에 어느 것을 사용할지 결정하는 기준은 더 좋은 서비스가 아닌 현재 상황에 더 적합한 서비스를 찾는 것이 올바른 선택 방법이라고 생각하기 때문입니다.

3. Solved

   ### [ 결론]

   **Firebase (선택)**

   - 쉽게 설정, 사용, 유지 보수할 수 있다.
   - 간단한 앱을 개발하기에 적합하다.

   **AWS**

   - 크고 복잡한 앱 구축에는 많은 도움이 되지만 단순한 앱에는 과도한 활용이 될 수 있다.
   - 모든 앱의 요구 사항을 충족시킬 수 있는 많은 서비스를 가지고 있어 단일 클라우드로 서비스를 구축할 수 있지만 비용이 많이 들 수 있습니다.

   ### [ 내 서비스 요구 사항 ]

   1. 10일이라는 짧은 개발 시간
   2. 간단한 CRUD 기능만 필요
   3. 간단한 구조의 DB만 사용 됨
   4. DB 구축 경험보다 검색, 정렬, 이미지 미리 보기 등 다양한 기능 구현 경험이 더 중요

   ### [ AWS와 Firebase 비교 ]

    <details>
    <summary>첫 째, AWS와 Firebase의 공통 기능</summary>

   1. Auth (인증 기능)
   2. **_Storage (저장소 기능 : 주요 사용 기능)_**
   3. Push notifications (알림 보내기 기능)
   4. Hosting (호스팅 기능)
   5. Analytics (분석 기능)
   </details>
   <details>
   <summary>둘 째, 앱의 프런트엔드와 통합하는 방법</summary>

   **Firebase**

   1. Android , iOS, Web 용 SDK(Software development kit)를 제공

   - 프런트엔드 개발자는 백엔드 기술에 의존하지 않고도 쉽게 웹 개발 가능

   2. REST API가 있어서 사용자가 원하는 API를 구축할 수도 있습니다.

   **AWS**

   1. Android, iOS, React Native에 통합하는 데 사용할 수 있는 AppSync라는 모바일 개발자에게 매우 좋은 솔루션을 제공
   </details>
   <details>
   <summary>셋 째, AWS와 Firebase의 장점</summary>

   **Firebase**

   1. Cloud Firestore와 Realtime Database라는 두 가지 전용 데이터베이스 서비스를 제공

   - 이 두 데이터베이스는 모두 NoSQL 데이터베이스라서 데이터베이스 설정 및 쿼리를 작성을 걱정할 필요가 없다.
   - 10일 이라는 짧은 개발 기간동안 사용하기에 적합하다.

   **AWS**

   1. 백엔드에서 사용할 수 있는 다양한 유형의 데이터베이스를 제공

   - Firebase는 오직 NoSQL 데이터베이스만 제공한다.
   - 하지만 나의 서비스에서는 NoSQL DB만으로 충분하다.

   2. 개발, 테스트, 앱을 위한 다양한 환경을 제공

   - Firebase에서도 다양한 환경을 제공해 주지만 AWS보다 시간이 좀 더 걸린다.

    </details>
    <details>
    <summary>넷 째. 구축과 유지 보수에 필요한 노력</summary>

   **Firebase** - Firebase 콘솔의 UI는 정말 심플하고 사용하기 매우 간단하다. - 비교적 사용하기 쉬운 SDK를 제공해 줌으로써 많은 시간을 절약할 수 있다.

   **AWS** - AWS가 제공해 주는 서비스는 Firebase보다 10배 더 많다. Firebase와 비교하면 AWS는 약간의 학습 곡선이 있다. - 간단한 실시간 앱을 만들 때도 필요한 API와 데이터베이스를 설정해야 합니다.

    </details>
