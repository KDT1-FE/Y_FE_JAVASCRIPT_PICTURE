const firebaseConfig = {
    apiKey: "AIzaSyBRDdAmcnRV3_Ui_Md_vhbyp9-9-eXqzbw",
    authDomain: "javascript-picture.firebaseapp.com",
    projectId: "javascript-picture",
    storageBucket: "javascript-picture.appspot.com",
    messagingSenderId: "487659103783",
    appId: "1:487659103783:web:e98479de1137818dfa9002",
    measurementId: "G-0RSTQFT7N8"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig) 


const db = firebase.firestore();
const storage = firebase.storage();



if (localStorage.getItem('user') != null) {
  console.log('현재로그인중')
  //로컬스토리지에서 유저정보 가져오기
  const localDataUser =localStorage.getItem('user')
  const localName = JSON.parse(localDataUser).displayName;
  console.log(localName)
  document.querySelector('#user-name').innerHTML = localName +'님';
  // document.querySelector('.user-welcome').classList.remove('none');
  document.querySelector('.logout').classList.remove('none');
  document.querySelector('.login').classList.add('none');

}else{
  console.log('현재로그아웃중')
  localStorage.removeItem('user')
  // document.querySelector('.user-welcome').classList.add('none');
  document.querySelector('.logout').classList.add('none');
  document.querySelector('.login').classList.remove('none');
}



//로그인 상태 확인. 로그인,로그아웃,새로고침 등 유저 인증상태 변경시마다 실행됨
firebase.auth().onAuthStateChanged((user)=>{ 
    if(user){
        console.log(user)
        console.log(user.displayName+'로그인 완료')
        // document.querySelector('.user-welcome').classList.remove('none');
        document.querySelector('.logout').classList.remove('none');
        document.querySelector('.login').classList.add('none');

        //로컬스토리지에 유저정보 저장
        localStorage.setItem('user', JSON.stringify(user))        
        // userUid = user.uid;
        // console.log(userUid)

    }else if(user = null){
        localStorage.removeItem('user')
        // document.querySelector('.user-welcome').classList.add('none');
        document.querySelector('.logout').classList.add('none');
        document.querySelector('.login').classList.remove('none');

     }
})


const logoutBtn=document.getElementById('logout-btn')

//로그아웃 버튼 누르면
logoutBtn.addEventListener("click",function(){
  firebase.auth().signOut();
  localStorage.removeItem('user')
  // document.querySelector('.user-welcome').classList.add('none');
  alert('로그아웃 완료!')
  document.querySelector('.logout').classList.add('none');
  document.querySelector('.login').classList.remove('none');

});