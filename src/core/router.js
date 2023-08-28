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
