//url query string에 있던 자료를 object로 변환
let queryString = new URLSearchParams(window.location.search);
queryString.get('id')
  

db.collection('member').doc(queryString.get('id')).get().then((result) => {
    console.log(result.data())
    document.getElementById("name").value =` ${result.data().name}`;
    document.getElementById("tel").value=`${result.data().ext}`;
    document.getElementById("phone").value=`${result.data().phone}`;
    document.getElementById("email").value=`${result.data().email}`;
    document.getElementById("team").value=`${result.data().team}`;
    document.getElementById("rank").value=`${result.data().rank}`;
    document.getElementById("memo").value=`${result.data().memo}`;
});


// 수정버튼 클릭 시
const editBtn= document.querySelector('.edit__edit-btn');
editBtn.addEventListener('click',function(){    
    let editDB = {
        name : document.getElementById("name").value,
        ext : document.getElementById("tel").value,
        phone : document.getElementById("phone").value,
        email : document.getElementById("email").value,
        team : document.getElementById("team").value,
        rank : document.getElementById("rank").value,
        memo : document.getElementById("memo").value
    }    

    db.collection('member').doc(queryString.get('id')).update(editDB)
    window.location.href='/detail/detail.html?id='+ queryString.get('id')
});


const deleteBtn= document.querySelector('.edit__delete-btn');
deleteBtn.addEventListener('click',function(){
    db.collection('member').doc(queryString.get('id')).delete().then(()=>{
        alert('삭제되었습니다.');
        window.location.href='/'
    })
});

