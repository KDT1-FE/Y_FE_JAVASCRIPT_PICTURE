import { Component } from './core/index.js';
import Header from './components/Header.js';
import MoveUp from './components/MoveUp.js';

// Component 클래스를 상속받아서 App 클래스를 제작
class App extends Component {
    constructor() {
        super({
            tagName: 'section',
        });
    }
    render() {
        const headerEl = new Header().el;
        const moveUpEl = new MoveUp().el;
        const routerView = document.createElement('main');

        this.el.append(headerEl, routerView);

        // intersectionObserver

        const target = headerEl;
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        this.el.append(moveUpEl);

        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    moveUpEl.classList.remove('active');
                } else {
                    moveUpEl.classList.add('active');
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(target);
    }
}

export default App;
