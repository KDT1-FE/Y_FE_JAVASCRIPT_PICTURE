import { db, storage } from './firebase';

let docId = '';
let imageUrl = '';
const docRef = db.collection('profile');
const btnSubmitEl = document.querySelector('.btn-submit');
const formEl = document.querySelector('form');
const btnCancelEl = document.querySelector('.btn-cancel');
const inputFileEl = document.querySelector('.input-file');
const inputRankEl = document.querySelector('.input-rank');
const inputNameEl = document.querySelector('.input-name');
const inputEmailEl = document.querySelector('.input-email');
const inputSelfEl = document.querySelector('.input-self');
const btnModifyEl = document.querySelector('.btn-modify');
const btnDeleteEl = document.querySelector('.btn-delete');
const imgEl = document.querySelector('.image');
const [hash, queryString] = location.search.split('=');

btnSubmitEl.addEventListener('click', uploadData);
inputFileEl.addEventListener('change', showPreviewImg);
btnCancelEl.addEventListener('click', moveToMainPage);
btnModifyEl.addEventListener('click', removeAttribute);

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        uploadData();
    }
});

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
});

inputFileEl.addEventListener('click', () => {
    return (imageUrl = imgEl.src);
});

if (queryString) {
    setAttribute();
    showUtilBtns();

    docRef
        .get()
        .then((res) => {
            res.forEach((doc) => {
                if (doc.data().id === Number(queryString)) {
                    return (docId = doc.id);
                }
            });
        })
        .catch((error) => {
            console.error('문서 불러오기 중 오류:', error);
        });
} else {
    hideUtilBtns();
}

function showUtilBtns() {
    btnModifyEl.style.display = 'block';
    btnDeleteEl.style.display = 'block';
}

function hideUtilBtns() {
    btnModifyEl.style.display = 'none';
    btnDeleteEl.style.display = 'none';
}

function uploadData() {
    const file = inputFileEl.files[0];
    const storageRef = storage.ref();
    const savePath = storageRef.child('image/' + new Date().getTime());
    const upload = savePath.put(file);

    // 사진이 변경되지 않았을 때
    if (queryString && !inputFileEl.value) {
        const item = {
            rank: inputRankEl.value,
            name: inputNameEl.value,
            email: inputEmailEl.value,
            self: inputSelfEl.value,
        };
        updateProfile(item);
    }
    // 사진이 변경 되었을 때
    if (queryString && inputFileEl.value) {
        upload.on(
            'state_changed',
            null,
            (error) => {
                console.error('실패 사유는', error);
            },
            () => {
                upload.snapshot.ref.getDownloadURL().then((url) => {
                    const item = {
                        rank: inputRankEl.value,
                        name: inputNameEl.value,
                        photo: url,
                        email: inputEmailEl.value,
                        self: inputSelfEl.value,
                    };
                    updateProfile(item, deleteImageFromStorage(imageUrl));
                });
            }
        );
    } else {
        upload.on(
            'state_changed',
            null,
            (error) => {
                console.error('실패 사유는', error);
            },
            () => {
                upload.snapshot.ref.getDownloadURL().then((url) => {
                    const item = {
                        id: new Date().getTime(),
                        rank: inputRankEl.value,
                        name: inputNameEl.value,
                        photo: url,
                        email: inputEmailEl.value,
                        self: inputSelfEl.value,
                    };
                    submitProfileToFirestore(item);
                });
            }
        );
    }
}

function showPreviewImg(e) {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            imgEl.setAttribute('src', event.target.result);
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        getDataFromFirestore();
    } catch (error) {
        console.error('문서를 가져오는 도중 오류가 발생했습니다', error);
    }
});

btnDeleteEl.addEventListener('click', () => {
    const documentRef = docRef.doc(docId);

    deleteImageFromStorage(imgEl.src)
        .then(() => {
            return docRef.get();
        })
        .then((res) => {
            let foundDocId = null;
            res.forEach((doc) => {
                if (doc.data().id === Number(queryString)) {
                    foundDocId = doc.id;
                }
            });

            if (foundDocId) {
                docId = foundDocId;
                return documentRef.delete();
            } else {
                throw new Error('문서를 찾을 수 없습니다');
            }
        })
        .then(() => {
            alert('프로필 삭제가 완료되었습니다');
            moveToMainPage();
        })
        .catch((error) => {
            console.error(error);
        });
});

function deleteImageFromStorage(imageUrl) {
    const imageRef = storage.refFromURL(imageUrl);
    return imageRef.delete();
}

function moveToMainPage() {
    window.location.href = './index.html';
}

function removeAttribute() {
    inputFileEl.removeAttribute('disabled');
    inputRankEl.removeAttribute('disabled');
    inputNameEl.removeAttribute('disabled');
    inputEmailEl.removeAttribute('disabled');
    inputSelfEl.removeAttribute('disabled');
}

function setAttribute() {
    inputFileEl.setAttribute('disabled', '');
    inputRankEl.setAttribute('disabled', '');
    inputNameEl.setAttribute('disabled', '');
    inputEmailEl.setAttribute('disabled', '');
    inputSelfEl.setAttribute('disabled', '');
}

function getDataFromFirestore() {
    docRef.get().then((res) => {
        res.forEach((doc) => {
            if (doc.data().id === Number(queryString)) {
                imgEl.setAttribute('src', `${doc.data().photo}`);
                inputFileEl.value = '';
                inputRankEl.value = doc.data().rank;
                inputNameEl.value = doc.data().name;
                inputEmailEl.value = doc.data().email;
                inputSelfEl.value = doc.data().self;
            }
        });
    });
}

function updateProfile(item, deleteImage) {
    btnSubmitEl.disabled = 'true';
    const documentRef = docRef.doc(docId);
    documentRef
        .update(item)
        .then(() => {
            alert('프로필이 변경되었습니다!');
            moveToMainPage();
            deleteImage;
            btnSubmitEl.disabled = 'false';
        })
        .catch((error) => {
            console.error('Error updating document: ', error);
        });
}

function submitProfileToFirestore(item) {
    docRef
        .add(item)
        .then(() => {
            alert('프로필 등록이 완료되었습니다!');
            moveToMainPage();
            btnSubmitEl.disabled = 'false';
        })
        .catch((error) => {
            console.log(error);
        });
}
