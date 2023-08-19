db.collection("member")
  .doc(queryString.get("id"))
  .get()
  .then((result) => {
    console.log(result.data());

    const templateDetail = `
        <dl class="profile">       
            <div class="col-1">            
                <dt class="thumbnail" style="background-image: url(${result.data().img})"></dt>  
            </div>
            <div class="col-2">            
                <dt class="name"><b>이름 :</b> ${result.data().name}</dt>
                <dd><b>소속팀</b> : ${result.data().team}</dd>
                <dd><b>직급</b> : ${result.data().rank}</dd>
                <dd><b>내선번호</b> : ${result.data().ext}</dd>
                <dd><b>연락처</b> : ${result.data().phone}</dd>
                <dd><b>이메일</b> : ${result.data().email}</dd>
                <dd><b>기타</b> : ${result.data().memo}</dd>                                  
            </div>
        </dl>                
        `;
    document
      .querySelector(".detail-area")
      .insertAdjacentHTML("beforeend", templateDetail);
  });

if (localStorage.getItem("user") != null) {
  document.querySelector(".edit-btn").addEventListener("click", editBtnClick);
  document.querySelectorAll(".delete-btn").forEach(el => {
    el.addEventListener("click", deleteBtnClick);
});

} else {
  document.querySelector(".edit-btn").addEventListener("click", alertLogin);
  document.querySelector(".delete-btn").addEventListener("click", alertLogin);

}
