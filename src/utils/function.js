export function appReset(appId) {
  const divApp = document.getElementById(appId);
  divApp.innerHTML = "";
  return divApp;
}

export function renderDetailDOM(tag, className, appendDOM, inner = "") {
  const CrEl = document.createElement(tag);
  CrEl.setAttribute("class", className);
  CrEl.innerHTML = inner;
  appendDOM.append(CrEl);
  return CrEl;
}

export function renderDetailDOMById(tag, id, appendDOM, inner = "") {
  const CrEl = document.createElement(tag);
  CrEl.setAttribute("id", id);
  CrEl.innerHTML = inner;
  appendDOM.append(CrEl);
  return CrEl;
}
