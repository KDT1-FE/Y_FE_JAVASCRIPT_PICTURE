const db = firebase.firestore();
const storage = firebase.storage();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        $('#userName').html(user.displayName);
    } else {
        $('#userName').html('');
    }
});
$('#login').click(function () {
    var email = $('#email').val();
    var password = $('#pw').val();
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
            alert(
                '로그인 성공: ' + result.user.displayName + '님, 환영합니다!'
            );
            console.log(result.user);
            $('#email').val('');
            $('#pw').val('');
            $('#login').prop('disabled', true);
            firebase.auth().onAuthStateChanged((user) => {
                $('#userName').html(user.displayName);
            });
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert(
                '로그인 실패: email 혹은 비밀번호가 일치하지 않습니다. 다시 시도해주세요.'
            );
            $('#email').val('');
            $('#pw').val('');
        });
});

$('#logout').click(function () {
    firebase.auth().signOut();
    $('#login').prop('disabled', false);
});

$('#register').click(function () {
    var email = $('#email-new').val();
    var password = $('#pw-new').val();
    var name = $('#name-new').val();

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result);
            console.log(result.user);
            result.user.updateProfile({ displayName: name });
            alert('가입성공! 로그인해주세요');
            $('#email-new').val('');
            $('#pw-new').val('');
            $('#pw-new').val('');
        })
        .catch((error) => {
            alert('가입 실패: ' + error.message);
        });
});
