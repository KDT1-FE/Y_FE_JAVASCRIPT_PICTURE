//url query string에 있던 자료를 object로 변환
let queryString = new URLSearchParams(window.location.search);
queryString.get('id')
  

db.collection('member').doc(queryString.get('id')).get().then((result) => {
    console.log(result.data())
    document.getElementById("name").value =` ${result.data().이름}`;
    document.getElementById("tel").value=`${result.data().내선번호}`;
    document.getElementById("phone").value=`${result.data().연락처}`;
    document.getElementById("email").value=`${result.data().이메일}`;
    document.getElementById("team").value=`${result.data().소속팀}`;
    document.getElementById("rank").value=`${result.data().직급}`;
    document.getElementById("memo").value=`${result.data().기타}`;
});


// 수정버튼 클릭 시
const editBtn= document.querySelector('.edit__edit-btn');
editBtn.addEventListener('click',function(){
    
    let editDB = {
        이름 : document.getElementById("name").value,
        내선번호 : document.getElementById("tel").value,
        연락처 : document.getElementById("phone").value,
        이메일 : document.getElementById("email").value,
        소속팀 : document.getElementById("team").value,
        직급 : document.getElementById("rank").value,
        기타 : document.getElementById("memo").value
    }    

    console.log(editDB)

    db.collection('member').doc(queryString.get('id')).update(editDB)
    // window.location.href='/detail/detail.html?id='+ queryString.get('id')
    // console.log(queryString.get('id'))
});

