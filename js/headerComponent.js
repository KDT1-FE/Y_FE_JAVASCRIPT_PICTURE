const headerTemplate = `
<div class="header-box">
  <span class="header-name waviy">
    <span style="--i:1">S</span>
    <span style="--i:2">O</span>
    <span style="--i:3">L</span>
    <span style="--i:4">M</span>
    <span style="--i:5">I</span>
  </span>
  <div class="menu-container">
    <a href="/" class="px-2 sm:px-7">
      <span>Human Resources</span>
    </a>
    <a href="/pages/moreInfo/moreinfo.html" class="px-2 sm:px-7">
      <span>More Info</span>
    </a>
    <a href="/pages/playground/playground.html" class="px-2 sm:px-7">
      <span>Playground</span>
    </a>
  </div>
</div>
`;
const appHeader = document.getElementById("app-header");
appHeader.innerHTML = headerTemplate;
