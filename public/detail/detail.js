//url query string에 있던 자료를 object로 변환
let queryString = new URLSearchParams(window.location.search);
queryString.get('id')

db.collection('member').doc(queryString.get('id')).get().then((result) => {
    console.log(result.data())

    var templateDetail = `
        <dl class="profile">       
            <div class="col-1">            
                <dt class="thumbnail" style="background-image: url(${result.data().img})"></dt>  
            </div>
            <div class="col-2">            
                <dt class="name"> ${result.data().name}</dt>
                <dd><b>소속팀</b>: ${result.data().team}</dd>
                <dd><b>직급</b>: ${result.data().rank}</dd>
                <dd><b>내선번호</b>: ${result.data().ext}</dd>
                <dd><b>연락처</b>: ${result.data().phone}</dd>
                <dd><b>이메일</b>: ${result.data().email}</dd>
                <dd><b>기타</b>: ${result.data().memo}</dd>                                  
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






