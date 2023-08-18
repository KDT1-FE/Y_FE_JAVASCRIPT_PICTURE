firebase.initializeApp({apiKey:"AIzaSyDBWZgf69JelbmqlPPPzj56W5yFL-Q5wZo",authDomain:"project-1-8debf.firebaseapp.com",projectId:"project-1-8debf",storageBucket:"project-1-8debf.appspot.com",messagingSenderId:"386056815137",appId:"1:386056815137:web:92425cb061808073ed9960"});const e=firebase.firestore();firebase.storage();const t=document.querySelector(".item-wrap"),a=document.querySelector(".search-input"),i=document.querySelector(".loading");function d(e){let a=document.createElement("div"),d=document.createElement("a"),r=`
    <div class="profile-info">
        <div class="photo">
            <img src="${e.data().photo}" />
        </div>
        <div class="name"><p>${e.data().name}</p></div>
        <div class="rank"><p>${e.data().rank}</p></div>
        <div class="email"><p>${e.data().email}</p></div>
        <div class="text"><p>${e.data().self}</p></div>
    </div>
    `;a.classList.add("profile-item"),a.append(d),t.append(a),d.innerHTML=r,d.setAttribute("href",`./upload.html?id=${e.data().id}`),i.classList.add("hide")}document.addEventListener("DOMContentLoaded",async()=>{try{let t=e.collection("profile"),a=document.querySelector(".loading");await t.orderBy("name").get().then(e=>{e.forEach(e=>{d(e)})}),a.classList.add("hide")}catch(e){console.error("문서를 가져오는 도중 오류가 발생했습니다",e)}}),a.addEventListener("change",async()=>{try{let r=a.value,o=c.where("name","==",`${r}`),c=e.collection("profile"),n=c.where("rank","==",`${r}`);i.classList.remove("hide"),t.innerHTML="";let s=!1;if(r?(await o.get().then(e=>{e.forEach(e=>{d(e),s=!0})}),await n.get().then(e=>{e.forEach(e=>{d(e),s=!0})})):await c.get().then(e=>{e.forEach(e=>{d(e),s=!0})}),!s){i.classList.add("hide"),alert("검색 결과가 존재하지않습니다!"),t.textContent=`검색 결과가 존재하지 않습니다!`;return}}catch(e){console.error("문서를 가져오는 도중 오류가 발생했습니다",e)}});
//# sourceMappingURL=index.68363c98.js.map
