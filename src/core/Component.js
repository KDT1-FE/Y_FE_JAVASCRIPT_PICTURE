export default class Component {
  constructor(payload = {}) {
    const { 
      tagName = "div",
      state = {},
      props = {}
    } = payload
    this.el = document.createElement(tagName)
    this.state = state // 컴포넌트 자체적으로 관리하는 값
    this.props = props // 부모 컴포넌트로부터 가져오는 값
    this.render()
  }
  render() {
    // 상속받는 클래스(컴포넌트) 에서 정의
  }
}