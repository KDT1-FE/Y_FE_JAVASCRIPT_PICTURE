const db = firebase.firestore();
const storage = firebase.storage();
var id = new URLSearchParams(window.location.search);
db.collection('product')
    .doc(id.get('id'))
    .get()
    .then((result) => {
        $('#name').val(result.data().이름);
        $('#gender').val(result.data().성별);

        $('#birth').val(result.data().생년);
        $('#species').val(result.data().종);
        // $('#image').HTMLInputElement(result.data().이미지);

        if (result.data().이미지) {
            $('.detail-pic').css(
                'background-image',
                `url(${result.data().이미지})`
            );
        }
        console.log(result.data());
    });
$('#edit').click(function () {
    if (confirm('수정하시겠어요?')) {
        var animalNew = {
            이름: $('#name').val(),
            성별: $('#gender').val(),
            생년: $('#birth').val(),
            종: $('#species').val(),
        };

        var imageFile = $('#image')[0].files[0];
        if (imageFile) {
            var storageRef = storage.ref('images/' + id.get('id'));

            storageRef.put(imageFile).then(() => {
                storageRef.getDownloadURL().then((imageUrl) => {
                    animalNew.이미지 = imageUrl;
                    updateAnimal(animalNew);
                });
            });
        } else {
            updateAnimal(animalNew);
        }
    }
});

function updateAnimal(animalNew) {
    if (!animalNew.이미지) {
        // 이미지 URL이 비어있으면 기존 이미지 URL을 설정
        db.collection('product')
            .doc(id.get('id'))
            .get()
            .then((result) => {
                animalNew.이미지 = result.data().이미지;
                db.collection('product')
                    .doc(id.get('id'))
                    .update(animalNew)
                    .then(() => {
                        window.location.href = 'index.html';
                    })
                    .catch((error) => {
                        console.error('Error updating document:', error);
                    });
            });
    } else {
        db.collection('product')
            .doc(id.get('id'))
            .update(animalNew)
            .then(() => {
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });
    }
}
function imageSelect(event) {
    const imageFile = event.target.files[0];

    if (imageFile) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageUrl = e.target.result;
            $('.detail-pic').css('background-image', `url(${imageUrl})`);
        };

        reader.readAsDataURL(imageFile);
    }
}
$(document).ready(function () {
    $('#name').focus();
});
