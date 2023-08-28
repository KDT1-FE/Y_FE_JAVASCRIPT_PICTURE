export class Component {
    constructor(payload = {}) {
        // 객체 구조분해 할당을 통해서 tagName을 가져옴, 기본값은 div tag
        const { tagName = 'div', state = {}, props = {} } = payload;
        // this.el은 tagName을 가진 엘리먼트를 생성
        this.el = document.createElement(tagName);
        this.props = props;
        this.state = state;
        this.render();
    }

    render() {
        // ...
    }
}
