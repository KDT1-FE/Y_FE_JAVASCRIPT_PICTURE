import { Component } from './core/index.js';
import Header from './components/Header.js';
<<<<<<< HEAD
import MoveUp from './components/MoveUp.js';
=======
>>>>>>> 1fc9ce8fa663de85a56b2d440b4cc68a624aca55

// Component 클래스를 상속받아서 App 클래스를 제작
class App extends Component {
    constructor() {
        super({
            tagName: 'section',
        });
    }
    render() {
<<<<<<< HEAD
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
=======
        const routerView = document.createElement('main');
        this.el.append(new Header().el, routerView);
>>>>>>> 1fc9ce8fa663de85a56b2d440b4cc68a624aca55
    }
}

export default App;
