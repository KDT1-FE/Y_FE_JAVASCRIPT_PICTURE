const registerButton = document.getElementById("register_button");
const closeButton = document.getElementById("close_button");
const registerModal = document.getElementById("register");
const body = document.body;

// 등록 버튼 클릭 시 모달 열기
registerButton.addEventListener("click", () => {
  registerModal.classList.add("show"); 
  body.classList.add("modal-open"); 
});

// 닫기 버튼 클릭 시 모달 닫기
closeButton.addEventListener("click", () => {
  registerModal.classList.remove("show"); 
  body.classList.remove("modal-open"); 
});

// 모달 내에서 등록 작업 처리
document.getElementById("modal_register").addEventListener("click", function () {
  // 입력된 정보 가져오기
  const name = document.getElementById("name_ID").value;
  const email = document.getElementById("email_ID").value; 
  const phone = document.getElementById("phone_ID").value; 
  const rank = document.getElementById("rank_ID").value; 
  const imgInput = document.getElementById("file_input"); 
  const imgURL = imgInput.files[0] ? URL.createObjectURL(imgInput.files[0]) : ""; 

  // 등록된 정보 모달에 표시
  document.getElementById("name_text").innerHTML = name; 
  document.getElementById("email_text").innerHTML = email; 
  document.getElementById("phone_text").innerHTML = phone; 
  document.getElementById("rank_text").innerHTML = rank; 
  document.getElementById("view_img_ID").src = imgURL; 

  // 새로운 리스트 아이템 생성 및 추가
  const mainList = document.getElementById("main_list"); 
  const listItem = document.createElement("div"); 
  listItem.classList.add("list_item"); 
  
  // 체크박스 생성
  const listInput = document.createElement("input");
  listInput.classList.add("list_input"); 
  listInput.type = "checkbox"; 
  listInput.name = "list_checkbox"; 
  listItem.appendChild(listInput); 
  
  // 리스트 아이템 내용을 감싸는 button 생성
  const itemWrap = document.createElement("button");
  itemWrap.classList.add("item_wrap"); 
  itemWrap.id = "item_wrap_button";
  
  // 이미지를 감싸는 div 생성
  const itemImg = document.createElement("div");
  itemImg.classList.add("item_img"); 
  
  // 이미지 요소 생성
  const profileImage = document.createElement("img");
  profileImage.src = imgURL; 
  profileImage.alt = "프로필 이미지"; 
  itemImg.appendChild(profileImage); 
  
  itemWrap.appendChild(itemImg); 
  
  // 정보를 담는 span 요소 생성 및 추가
  const spans = [name, email, phone, rank];
  for (const spanText of spans) {
    const span = document.createElement("span");
    span.textContent = spanText;
    itemWrap.appendChild(span);
  }
  
  listItem.appendChild(itemWrap); 
  mainList.appendChild(listItem); 
  
  registerModal.classList.remove("show");
  body.classList.remove("modal-open"); 
});
