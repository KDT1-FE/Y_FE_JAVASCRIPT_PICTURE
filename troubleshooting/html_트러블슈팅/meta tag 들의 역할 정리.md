[참고 문서 링크]()

1. Trouble

   > 아래 meta 태그들을 직접 설명하는데 어려움을 겪었습니다.

   ```html
   <meta charset="UTF-8" />
   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta http-equiv="Permissions-Policy" content="interest-cohort=()" />
   ```

2. Why?

3. Solved

   1. `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`

   - html 파일의 텍스트와 같은 정보들을 인코딩해주는 역할의 태그입니다. 한국이 아닌 나라에서 사이트 접속 시 정보들이 깨지지 않고 잘 인코딩되도록 해주기 위함입니다.

   2. `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`

   - IE는 호환성 보기 모드가 존재하는데, 사용자가 지원하는 브라우저에 따라 오래된 브라우저에서 정상적으로 출력되지 않는 이슈가 발생할 수 있습니다. 이에 모든 IE 버전의 브라우저에 호환성 보기를 무시해주는 태그입니다.

   3. `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`

   - 사용자의 viewport에 따라 웹 서비스를 보여주기 위해 사용하는 태그입니다. width=device-width 는 기기의 화면 width에 맞게 웹 페이지의 width를 설정할 수 있습니다. initial-scale=1.0 는 웹 페이지 최초 로드 시 확대 정도입니다.

   4. `<meta http-equiv="Permissions-Policy" content="interest-cohort=()" />`

   - 광고를 위헤 여러 브라우저의 내용을 계산하는 FLoC에 포함되지 않도록 하기위한 태그입니다.
