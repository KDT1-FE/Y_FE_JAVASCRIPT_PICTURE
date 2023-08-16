import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getFirestore, collection, getDocs, doc, orderBy, query, onSnapshot, deleteDoc, Timestamp, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXVgQW2Xq5fE1SvaVVutpTgX_6ZaotQhQ",
  authDomain: "photo-management-service.firebaseapp.com",
  projectId: "photo-management-service",
  storageBucket: "photo-management-service.appspot.com",
  messagingSbuttonenderId: "110781159358",
  appId: "1:110781159358:web:e9b8fbdc3e60c979178bef",
  measurementId: "G-E657JQPN7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

//상세profile카드 관련 선언
const profileContainer = document.querySelector('.detail-container');
let template = `
    <div class="detail-profile-card">
      <img class="detail-profile-image" src="{{__profile_image__}}" alt="profile image">
      <div class="detail-text-container">
        <h1>{{__profile_name__}}</h1>
        <span class="subtitle">🌞 POSITION</span>
        <span class="inner-text">{{__profile_position__}}</span>
        <span class="subtitle">🔥 GITHUB</span>
        <span class="inner-text">{{__profile_github__}}</span>
        <span class="subtitle">📧 EMAIL</span>
        <span class="inner-text">{{__profile_email__}}</span>
        <span class="subtitle">😎 INTRODUCE</span>
        <span class="inner-text">{{__profile_introduce__}}</span>
      </div>
    </div>
`;
//상세profile카드 추가하기
const q = query(collection(db,"profiles"),orderBy("date"))
let itemNumber = 0;
let clickCount = 0;

onSnapshot(q,(querySnapshot) => {
  querySnapshot.forEach((doc) => {
    //console.log('시작:',doc.data())
    const newProfile = document.createElement("div");
    newProfile.setAttribute("id",doc.id)
    const newProfileIndex = document.createElement("div");
    newProfile.classList.add(`detail-item`);
    newProfileIndex.setAttribute("id",`item${itemNumber}`);
    newProfileIndex.classList.add('detail-index');
    newProfileIndex.innerHTML=`#${itemNumber+1}`;
    template = template.replace('{{__profile_image__}}',doc.data().image)
                        .replace('{{__profile_name__}}', doc.data().name)
                        .replace('{{__profile_position__}}',doc.data().position)
                        .replace('{{__profile_github__}}',doc.data().github)
                        .replace('{{__profile_email__}}',doc.data().email)
                        .replace('{{__profile_introduce__}}',doc.data().introduce);
    newProfile.innerHTML=template;
    profileContainer.append(newProfileIndex);
    profileContainer.append(newProfile);
    template = template.replace(doc.data().image,'{{__profile_image__}}')
                        .replace(doc.data().name, '{{__profile_name__}}')
                        .replace(doc.data().position,'{{__profile_position__}}')
                        .replace(doc.data().github,'{{__profile_github__}}')
                        .replace(doc.data().email,'{{__profile_email__}}')
                        .replace(doc.data().introduce,'{{__profile_introduce__}}');
    itemNumber++;

    //삭제 버튼 생성
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("detail-button")
    deleteBtn.textContent = "❌";
    deleteEvent(deleteBtn, doc);
    newProfile.prepend(deleteBtn);

    //수정 버튼 생성
    const modifyBtn = document.createElement("button");
    modifyBtn.classList.add("detail-button")
    modifyBtn.textContent = "✏️";
    modifyBtn.addEventListener("click",async()=>{
      const textContainer = newProfile.querySelector(".detail-text-container");
      const subtitleSpans = textContainer.querySelectorAll(".subtitle");

    //이미지 수정 버튼 생성
    const imgModifyBtn = document.createElement("input");
    imgModifyBtn.type = "file";
    imgModifyBtn.accept="image/*";
    imgModifyBtn.setAttribute("id","btn__img-modify")
    const imgModifyBtnLabel = document.createElement("label");
    imgModifyBtnLabel.setAttribute("for","btn__img-modify");
    imgModifyBtnLabel.innerText="이미지 수정";
    imgModifyBtn.style.display="none";
    newProfile.insertAdjacentElement("afterend", imgModifyBtnLabel);
    newProfile.insertAdjacentElement("afterend", imgModifyBtn);

    imgModifyBtn.addEventListener("change", async() => {
      const selectedFile = imgModifyBtn.files[0];
      if (selectedFile) {
        const newImagestorageRef = ref(storage, 'image/'+Timestamp.fromDate(new Date())+selectedFile.name);
        await uploadBytes(newImagestorageRef, selectedFile);
        let url = await getDownloadURL(newImagestorageRef);
        let newToSave = {image: url};
        const profileId = newProfile.getAttribute("id");
        imageUpdate(profileId, newToSave);
      } else {
        console.log("No file selected.");
      }
    });
    
      clickCount++;
      switch(clickCount%2){
        case 1:
          //수정할 수 있는 input 만들기
          subtitleSpans.forEach((subtitle,index) => {
          const input = document.createElement("input");
          const innerTextSpan = subtitle.nextElementSibling;
          input.value = innerTextSpan.textContent;
          subtitle.insertAdjacentElement("afterend", input);
          innerTextSpan.style.display = "none";
          });

          break;
        case 0:

          // 수정한 데이터를 저장하기 위한 객체
          const updatedData = {};

          // 각 subtitle에 대한 수정 내용을 updatedData 객체에 추가
          subtitleSpans.forEach((subtitle, index) => {
          const input = subtitle.nextElementSibling;
          const innerTextSpan = input.nextElementSibling;

          innerTextSpan.textContent = input.value;
          innerTextSpan.style.display = "inline";
          input.remove();
      
          const fieldName = subtitle.textContent.slice(3).toLowerCase();
          updatedData[fieldName] = input.value;
          });
          const profileId = newProfile.getAttribute("id");
          dbUpdate(profileId, updatedData);
          // window.location.reload();
          break;
      }
    });
    newProfile.prepend(modifyBtn);

    // 해시값 변화 감지
    window.addEventListener("hashchange", handleHashChange);
    // 초기 로딩 시 해시값에 따른 초기 상태 설정
    handleHashChange();
  });
})

function handleHashChange() {
  const hash = location.hash;
  const itemId = hash.substring(1);
  const targetItem = document.getElementById(itemId);
  if (targetItem) {
    targetItem.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}


function deleteDocument(documentId) {
  const documentRef = doc(db, "profiles", documentId);

  deleteDoc(documentRef)
    .then(() => {
      alert("삭제 완료!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("삭제 중 오류 발생", error);
    });
}

function deleteEvent(target, doc){
  target.addEventListener("click", ()=>{
    deleteDocument(doc.id);
    let imageRef = ref(storage, ref(doc.data().image))
    deleteObject(imageRef);
  });
}

async function dbUpdate (profileId, updatedData){
  try{
    const docRef = doc(db,"profiles",profileId)
    await updateDoc(docRef,updatedData);
    alert("수정 완료!")
    window.location.reload();
  }catch(error){
    console.log("오류발생",error)
  }
}

async function imageUpdate(profileId, newToSave){
  try{
    console.log("함수내부")
    const docRef = doc(db,"profiles",profileId)
    await updateDoc(docRef,newToSave);
    window.location.reload();
  }catch(error){
    console.log('이미지수정 오류발생',error)
  }
}