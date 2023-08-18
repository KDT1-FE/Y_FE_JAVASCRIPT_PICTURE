////// Component //////
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

////// Router //////
function routeRender(routes) {
    if (!location.hash) {
        //히스토리 내역에 기록을 남기지 않으면서 페이지를 이동시킴
        history.replaceState(null, '', '/#/');
    }
    const [hash, queryString = ''] = location.hash.split('?');
    const routerView = document.querySelector('main');

    // 쿼리스트링을 객체로 변환
    const query = queryString.split('&').reduce((acc, cur) => {
        // 배열 구조 분해 할당을 통해 key, value값 저장
        const [key, value] = cur.split('=');
        // acc에 key, value값을 저장 (객체를 만들어서 리턴)
        acc[key] = value;
        return acc;
    }, {});

    history.replaceState(query, '');

    // #/about으로 부터 시작

    const currentRoute = routes.find((route) => {
        return new RegExp(`${route.path}/?$`).test(hash);
    });
    routerView.innerHTML = '';
    routerView.append(new currentRoute.component().el);

    window.scrollTo(0, 0);
}

export function createRouter(routes) {
    return function () {
        window.addEventListener('popstate', () => {
            routeRender(routes);
        });
        routeRender(routes);
    };
}

////// createStore //////
export class Store {
    constructor(state) {
        this.state = {};
        this.observers = {};
        for (const key in state) {
            Object.defineProperty(this.state, key, {
                get: () => {
                    return state[key]; // state의 key값을 리턴
                },
                set: (val) => {
                    state[key] = val;
                    if (Array.isArray(this.observers[key])) {
                        // state의 key값을 val로 설정
                        this.observers[key].forEach((observers) =>
                            observers(val)
                        );
                    } // observers의 key값을 호출 : 콜백함수를 실행
                },
            });
        }
    }
    //데이터가 변경이 되는 지 감지하는 함수 (key, cb) cb는 콜백함수
    subscribe(key, cb) {
        Array.isArray(this.observers[key])
            ? this.observers[key].push(cb)
            : (this.observers[key] = [cb]);
    }
}
