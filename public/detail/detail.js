//url query string에 있던 자료를 object로 변환
let queryString = new URLSearchParams(window.location.search);
queryString.get('id')

db.collection('member').doc(queryString.get('id')).get().then((result) => {
    console.log(result.data())

    var templateDetail = `
        <dl class="profile">       
            <div class="col-1">            
                <dt class="thumbnail" style="background-image: url(${result.data().이미지})"></dt>  
            </div>
            <div class="col-2">            
                <dt class="name"> ${result.data().이름}</dt>
                <dd><b>소속팀</b>: ${result.data().소속팀}</dd>
                <dd><b>직급</b>: ${result.data().직급}</dd>
                <dd><b>내선번호</b>: ${result.data().내선번호}</dd>
                <dd><b>연락처</b>: ${result.data().연락처}</dd>
                <dd><b>이메일</b>: ${result.data().이메일}</dd>
                <dd><b>기타</b>: ${result.data().기타}</dd>                                  
            </div>
        </dl>                
        `
    const wrap = document.querySelector('#detail')
    wrap.insertAdjacentHTML('beforeend',templateDetail)
});


const detailEditBtn= document.querySelector('.detail__edit-btn');
detailEditBtn.addEventListener('click',function(){
    window.location.href='/edit/edit.html?id='+ queryString.get('id')
});






