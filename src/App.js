import { Component } from './core/index.js';
import Header from './components/Header.js';

// Component 클래스를 상속받아서 App 클래스를 제작
class App extends Component {
    constructor() {
        super({
            tagName: 'section',
        });
    }
    render() {
        const routerView = document.createElement('main');
        this.el.append(new Header().el, routerView);
    }
}

export default App;
