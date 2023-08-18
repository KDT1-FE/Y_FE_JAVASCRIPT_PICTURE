import { db } from './firebase';
const itemWrapEl = document.querySelector('.item-wrap');
const searchInputEl = document.querySelector('.search-input');
const loadingEl = document.querySelector('.loading');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const docRef = db.collection('profile');
        const loadingEl = document.querySelector('.loading');
        await docRef
            .orderBy('name')
            .get()
            .then((res) => {
                res.forEach((doc) => {
                    makeProfileItem(doc);
                });
            });
        loadingEl.classList.add('hide');
    } catch (error) {
        console.error('문서를 가져오는 도중 오류가 발생했습니다', error);
    }
});

searchInputEl.addEventListener('change', async () => {
    try {
        let searchValue = searchInputEl.value;
        const docRef = db.collection('profile');
        const nameQuery = docRef.where('name', '==', `${searchValue}`);
        const rankQuery = docRef.where('rank', '==', `${searchValue}`);
        loadingEl.classList.remove('hide');
        itemWrapEl.innerHTML = '';

        let hasResult = false;

        if (!searchValue) {
            await docRef.get().then((res) => {
                res.forEach((doc) => {
                    makeProfileItem(doc);
                    hasResult = true;
                });
            });
        } else {
            await nameQuery.get().then((res) => {
                res.forEach((doc) => {
                    makeProfileItem(doc);
                    hasResult = true;
                });
            });
            await rankQuery.get().then((res) => {
                res.forEach((doc) => {
                    makeProfileItem(doc);
                    hasResult = true;
                });
            });
        }

        if (!hasResult) {
            loadingEl.classList.add('hide');
            alert('검색 결과가 존재하지않습니다!');
            itemWrapEl.textContent = `검색 결과가 존재하지 않습니다!`;
            return;
        }
    } catch (error) {
        console.error('문서를 가져오는 도중 오류가 발생했습니다', error);
    }
});

function makeProfileItem(doc) {
    const div = document.createElement('div');
    const a = document.createElement('a');
    let template = /* html */ `
    <div class="profile-info">
        <div class="photo">
            <img src="${doc.data().photo}" />
        </div>
        <div class="name"><p>${doc.data().name}</p></div>
        <div class="rank"><p>${doc.data().rank}</p></div>
        <div class="email"><p>${doc.data().email}</p></div>
        <div class="text"><p>${doc.data().self}</p></div>
    </div>
    `;

    div.classList.add('profile-item');
    div.append(a);
    itemWrapEl.append(div);

    a.innerHTML = template;
    a.setAttribute('href', `./upload.html?id=${doc.data().id}`);
    loadingEl.classList.add('hide');
}
