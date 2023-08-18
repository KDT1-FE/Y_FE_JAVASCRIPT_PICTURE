const db = firebase.firestore();
const storage = firebase.storage();

console.log(new Date());
$('#send').click(function () {
    var file = document.querySelector('#image').files[0];
    var storageRef = storage.ref();
    var storageSavePath = storageRef.child('image/' + file.name);
    var storageUpload = storageSavePath.put(file);
    storageUpload.on(
        'state_changed',
        null,
        (error) => {
            console.error('실패사유는', error);
        },
        () => {
            storageUpload.snapshot.ref.getDownloadURL().then((url) => {
                var animal = {
                    이름: $('#name').val(),
                    종: $('#species').val(),
                    성별: $('#gender').val(),
                    생년: $('#birth').val(),
                    이미지: url,
                    유저아이디: '',
                    유저이름: '',
                };
                console.log('업로드된 경로는', url);
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        animal.유저아이디 = user.uid;
                        console.log(user);
                        animal.유저이름 = user.displayName;
                        animal['등록일'] = new Date();

                        var formattedDate = animal['등록일'].toLocaleString(); // 일반적인 날짜 형식으로 변환

                        animal['등록일'] = formattedDate;
                        db.collection('product')
                            .add(animal)
                            .then((result) => {
                                console.log(result.id); // 성공
                                console.log(animal);
                                window.location.href = 'index.html';
                            })
                            .catch((error) => {
                                // 실패
                                console.log(error);
                                alert('등록에 실패했습니다.');
                            });
                    } else {
                        if (
                            confirm(
                                '로그인 후 등록이 가능합니다. 로그인 하시겠어요?'
                            )
                        ) {
                            window.location.href = 'login.html';
                        }
                    }
                });
            });
        }
    );
});
