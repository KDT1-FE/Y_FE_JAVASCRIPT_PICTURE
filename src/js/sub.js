// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, updatePassword, getAuth } from "firebase/auth";
import { getStorage, uploadBytesResumable, getMetadata, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore, doc, setDoc, addDoc, getDocs, collection, query, orderBy, limit, where, or, Timestamp } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXjktja_jwgeu_cQ9ajtG-vtP5nGHZzjo",
  authDomain: "cms-solution-86408.firebaseapp.com",
  projectId: "cms-solution-86408",
  storageBucket: "cms-solution-86408.appspot.com",
  messagingSenderId: "714447279928",
  appId: "1:714447279928:web:219c3429fc0f4c5ed213cd",
  measurementId: "G-E4Q9HYTK7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let storage = getStorage(app);
let auth = getAuth();
let db = getFirestore(app);

const saveButton = document.getElementById("employee-submit")
let name = document.getElementById("employee-name")
let email = document.getElementById("employee-email")
let phone = document.getElementById("employee-phone")
let grade = document.getElementById("employee-grade")
let photo = document.getElementById("employee-img")
const preview = document.getElementById("employee-preview")
let uid;

// 파라미터값 가져오기
const urlParams = new URL(location.href).searchParams;
const checkUid = urlParams.get('uid');

// 파일 종류 이미지로 한정
photo.accept = '.gif, .jpg, .jpeg, .png, .bmp, .ico, .apng, .svg'

// 이미지 업로드 시 미리보기
photo.addEventListener('change', (e)=>{
  const reader = new FileReader();
  reader.onload = ({ target }) => {
    preview.src = target.result;
  };
  reader.readAsDataURL(photo.files[0]);
})

// uid값이 있다면 input value로 반환
if (checkUid){
  async function employeeUpdate(){
    const q = query(collection(db, "employee"),where("uid", "==",checkUid));
    const searchUid = await getDocs(q);
    searchUid.forEach((doc) => {
      const employee = doc.data()
      name.value = employee.name
      email.value = employee.email
      phone.value = employee.phone
      grade.value = employee.grade
      preview.src = employee.imgUrl
    })
    
  }
  uid = checkUid
  employeeUpdate()
}


saveButton.addEventListener("click",async ()=>{

  name = name.value
  email = email.value
  phone = phone.value
  grade = grade.value
  photo = photo.files[0]
  let storageURL, checkResult
  const date = Timestamp.fromDate(new Date());
  if(!checkUid) uid = self.crypto.randomUUID();

  // 정보 입력 됐는지 확인
  function inputCheck () {
    const fileExt = document.getElementById('employee-img').files[1]
    const imgExt = ['gif', 'jpg', 'jpeg', 'png', 'bmp' ,'ico', 'apng', 'svg']
    let photoCheck;
    if (photo || preview.src) photoCheck = true
    const user = [name, email, phone, grade, photoCheck]
    for(let i = 0; i <user.length; i++) {
      if(!user[i]) {
        alert('입력되지 않은 정보가 있습니다');
        checkResult = false
        break;
      }
      checkResult = true
    };
  }
  await inputCheck ()
  

  if (checkResult) {
    try {
        
//      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//      const uid = userCredential.user.uid;

        const photoURL = ref(storage, 'images/' + uid)

        if (checkUid && photo) { 
          deleteObject(photoURL) 
          await uploadBytesResumable(photoURL, photo)
        } else if (!checkUid && photo) { await uploadBytesResumable(photoURL, photo) }

        await getDownloadURL(photoURL)
        .then((url) => {
          return storageURL = url;
        })
        .catch((error) => {
          reportError(error);
        });

        const userRef = doc(getFirestore(), 'employee', uid);
          await setDoc(userRef, {
            email:email,
            date:date,
            name: name,
            phone:phone,
            grade:grade,
            imgUrl : storageURL,
            uid : uid
          });

        // Uid 정보 파라미터로 전송
        if (checkUid){
          alert('임직원 수정이 완료되었습니다.')
        }else{
          alert('임직원 등록이 완료되었습니다.')
        }
        const form = document.createElement('form')
        form.method = 'get'
        form.action = 'employee_write.html'
        const inputUid = document.createElement('input')
        inputUid.type = 'hidden'
        inputUid.name = 'uid'
        inputUid.value = uid
        form.appendChild(inputUid)
        document.body.appendChild(form)
        form.submit();
        
      } catch (error){
        reportError(error);
      }

      
    
  }

  
    
})






// const join = async (email, password) => {
//     try {
//       const auth = getAuth();
//       const { user } = await createUserWithEmailAndPassword(auth, email, password);
//       const { stsTokenManager, uid } = user;
//       setAuthInfo({ uid, email, authToken: stsTokenManager });
//       navigate('/');
//     } catch ({ code, message }) {
//       alert(errorMessage[code]);
//     }
// };


