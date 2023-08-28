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
                        this.observers[key].forEach((observers) => observers(val));
                    } // observers의 key값을 호출 : 콜백함수를 실행
                },
            });
        }
    }
    //데이터가 변경이 되는 지 감지하는 함수 (key, cb) cb는 콜백함수
    subscribe(key, cb) {
        Array.isArray(this.observers[key]) ? this.observers[key].push(cb) : (this.observers[key] = [cb]);
    }
}
