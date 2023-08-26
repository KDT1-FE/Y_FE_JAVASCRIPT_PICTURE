[manifest.json mdn](https://developer.mozilla.org/ko/docs/Mozilla/Add-ons/WebExtensions/manifest.json)<br/>
[MOZI_PWA에 대한 생각](https://mozi.vercel.app/blog/thinking-about-pwa)

1. Trouble

2. Why?

   > favicon 사용 시에 manifest.json 도 함께 사용된다는 것을 알게되어 공부해 보았습니다.

3. Solved

   > manifest.json 파일은 프로그레시브 웹 앱 (PWA)이 검색될 수 있도록 해주는 간단한 파일이다. 앱의 이름, 시작 URL, 아이콘등 웹사이트를 앱으로 인식할 수 있게 해주는 여러가지 정보를 입력한다.

   **_작성 예시_**

   ```JSON
   {
   "applications": {
   "gecko": {
    "id": "addon@example.com",
    "strict_min_version": "42.0",
    "strict_max_version": "50.*",
    "update_url": "https://example.com/updates.json"
   }
   },

   "background": {
   "scripts": ["jquery.js", "my-background.js"],
   "page": "my-background.html"
   },

   "browser_action": {
   "default_icon": {
   "19": "button/geo-19.png",
   "38": "button/geo-38.png"
   },
   "default_title": "Whereami?",
   "default_popup": "popup/geo.html"
   },

   "commands": {
   "toggle-feature": {
   "suggested_key": {
   "default": "Ctrl+Shift+Y",
   "linux": "Ctrl+Shift+U"
   },
   "description": "Send a 'toggle-feature' event"
   }
   },

   "content_security_policy": "script-src 'self' https://example.com; object-src 'self'",

   "content_scripts": [
   {
   "exclude_matches": ["*://developer.mozilla.org/*"],
   "matches": ["*://*.mozilla.org/*"],
   "js": ["borderify.js"]
   }
   ],

   "default_locale": "en",

   "description": "...",

   "icons": {
   "48": "icon.png",
   "96": "icon@2x.png"
   },

   "manifest_version": 2,

   "name": "...",

   "page_action": {
   "default_icon": {
   "19": "button/geo-19.png",
   "38": "button/geo-38.png"
   },
   "default_title": "Whereami?",
   "default_popup": "popup/geo.html"
   },

   "permissions": ["webNavigation"],

   "version": "0.1",

   "web_accessible_resources": ["images/my-image.png"]
   }

   ```

**_설명_**

manifest.json 을 통해 웹 앱 설치 배너 트리거가 가능하다. 또한 key를 사용함에 따라서 앱의 이름, 아이콘, 테마 색깔등을 정의할 수 있다.

manifest의 display key를 사용해 PWA를 설치했을 때 브라우저에서 어떻게 보여질지 제어할 수 있다. 예를 들어, display 속성을 이용해 설치된 PWA에 한하여 standalone이나 fullscreen 속성을 사용하면 웹 앱을 마치 네이티브 앱인 것처럼 보여지게 할 수 있다.

> 여기서 PWA(Progressive Web App)란, 점진적인 웹 앱으로, 이는 기본적인 웹에 점진적으로 여러가지 기능을 추가할 수 있음을 의미한다.

프로그레시브 웹 앱은 웹이 앱과 같은 사용자 경험을 제공할 수 있다는 믿음에 기반한다. 이에 2015년에 크롬에 설치 가능한 웹 앱이라는 기능을 포함시켰고 기술이 먼저 나왔지만 이를 가리킬 용어가 없었다.
온라인 경험을 더 가치있게 만들어주는 일련의 복잡한 기법들을 간단히 부를 수 있는 방법이 필요하여 이 웹 앱을 프로그레시브 웹 앱(Progressive Web App)이라고 부르게 되었다.

베리먼과 러셀은 PWA의 특징을 아홉가지로 [문서화](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)하였다.

- 반응형, 오프라인에서도 작동, 앱과 유사함, 최신 버전 유지, 보안, SEO, 재사용 유도, 설치 가능, 링크 가능
