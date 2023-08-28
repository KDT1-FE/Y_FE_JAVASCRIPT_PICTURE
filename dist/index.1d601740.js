firebase.initializeApp({apiKey:"AIzaSyDBWZgf69JelbmqlPPPzj56W5yFL-Q5wZo",authDomain:"project-1-8debf.firebaseapp.com",projectId:"project-1-8debf",storageBucket:"project-1-8debf.appspot.com",messagingSenderId:"386056815137",appId:"1:386056815137:web:92425cb061808073ed9960"});const e=firebase.firestore();firebase.storage();const t=document.querySelector(".loading");function a(){t.classList.add("hide")}const i=document.querySelector(".item-wrap"),r=document.querySelector(".search-input");function o(e){let t=document.createElement("div"),r=document.createElement("a"),o=`
    <div class="profile-info">
        <div class="photo">
            <img src="${e.data().photo}" />
        </div>
        <div class="name"><p>${e.data().name}</p></div>
        <div class="rank"><p>${e.data().rank}</p></div>
        <div class="email"><p>${e.data().email}</p></div>
        <div class="text"><p>${e.data().self}</p></div>
    </div>
    `;t.classList.add("profile-item"),t.append(r),i.append(t),r.innerHTML=o,r.setAttribute("href",`./upload.html?id=${e.data().id}`),a()}document.addEventListener("DOMContentLoaded",async()=>{try{let t=e.collection("profile");await t.orderBy("name").get().then(e=>{e.forEach(e=>{o(e)})}),a()}catch(e){console.error("문서를 가져오는 도중 오류가 발생했습니다",e)}}),r.addEventListener("change",async()=>{try{let n=r.value,c=e.collection("profile"),d=c.where("name","==",`${n}`),s=c.where("rank","==",`${n}`);i.innerHTML="",t.classList.remove("hide");let l=!1;if(n?(await d.get().then(e=>{e.forEach(e=>{o(e),l=!0})}),await s.get().then(e=>{e.forEach(e=>{o(e),l=!0})})):await c.get().then(e=>{e.forEach(e=>{o(e),l=!0})}),!l){a(),alert("검색 결과가 존재하지않습니다!"),i.textContent=`검색 결과가 존재하지 않습니다!`;return}}catch(e){console.error("문서를 가져오는 도중 오류가 발생했습니다",e)}});
//# sourceMappingURL=index.1d601740.js.map
