
  db.collection('member').get().then((결과)=>{
    console.log(결과);
    결과.forEach((doc)=>{
      console.log(doc.data());
      var template = `<dl class="profile">
                            <dt class="thumbnail" style="background-image: url(${doc.data().이미지})"></dt> 
                            <dt class="name"> ${doc.data().이름}</dt>
                            <dd> ${doc.data().소속팀} ${doc.data().직급}</dd>
                            <dd> ${doc.data().내선번호}</dd>   
                            <dd><a class="more" href="/detail/detail.html?id=${doc.id}">상세 <i class="fa-solid fa-circle-plus"></i></a><p/>       
                        </dl>`
      const wrap = document.querySelector('.container')
      wrap.insertAdjacentHTML('beforeend',template)

    })

  })