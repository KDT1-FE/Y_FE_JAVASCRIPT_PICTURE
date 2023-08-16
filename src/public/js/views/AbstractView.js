// 모든 view가 상속받을 일종의 템플릿 같은 것을 만든다.

export default class {
  constructor(params) {
    this.params = params;
  }
  /**
   *
   * @param {string} title 문서의 제목을 변경한다
   */
  setTitle(title) {
    document.title = title;
  }

  async getHtml() {
    return '';
  }
}
