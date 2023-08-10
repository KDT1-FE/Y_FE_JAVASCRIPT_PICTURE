const joinBtn=document.getElementById('join-btn')
const loginBtn=document.getElementById('login-btn')
const logoutBtn=document.getElementById('logout-btn')

//가입하기 버튼 누르면
joinBtn.addEventListener("click",function(){
    const joinName = document.getElementById("join__name").value;
    const joinEmail = document.getElementById("join__email").value;
    const joinPw = document.getElementById("join__pw").value;
    
    firebase.auth().createUserWithEmailAndPassword(joinEmail,joinPw).then((result)=>{
        console.log(result);
        console.log(result.user);
        result.user.updateProfile( {displayName : joinName} )

    })
});


//로그인 버튼 누르면
loginBtn.addEventListener("click",function(){
    const loginEmail = document.getElementById("login__email").value;
    const loginPw = document.getElementById("login__pw").value;

    firebase.auth().signInWithEmailAndPassword(loginEmail,loginPw).then((result)=>{
        console.log('로그인 완료!'+result.user)
        alert('로그인 완료!')
        
    })
});

//로그아웃 버튼 누르면
logoutBtn.addEventListener("click",function(){
    firebase.auth().signOut();
    alert('로그아웃 완료!')
});