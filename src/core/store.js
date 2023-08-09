export class Store {
  constructor(state) {
    this.state = {}; // 상태(데이터)
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        // Getter
        get: () => state[key],
        // Setter
        set: (val) => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            // 호출할 콜백이 있는 경우!
            this.observers[key].forEach((observer) => observer(val));
          }
        },
      });
    }
  }
  subscribe(key, cb) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : (this.observers[key] = [cb]);
  }
}
