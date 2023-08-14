const addBtn = document.querySelector('.add__btn');
const addPlayer = document.querySelector('.add__player__list');
const moveToPlayerUpload = () =>{
    addBtn.addEventListener("click", ()=>{
        window.location.href="playerUpload.html";
    });
}
moveToPlayerUpload();
const db = firebase.firestore();
// db.collection('Player').get().then((snapshot)=>{
//   snapshot.forEach((player)=>{
//     addBtn.addEventListener('click', ()=>{
//         const newPlayer = document.createElement('tr');
//         newPlayer.innerHTML = `
//         <tr>
//         <td>
//         <div class="player__info">
//             <div class="checkbox__container">
//                 <input type="checkbox">
//             </div>
//             <img src="./assets/picture/player_list2.jpg" alt="rashford">
//             <span>${player.data().Name}</span>
//         </div>
//         </td>
//         <td>${player.data().nation}</td>
//         <td>${player.data().age}</td>
//         <td>${player.data().position}</td>
//     </tr>
//         `;
//         addPlayer.appendChild(newPlayer);
    
//     })
//   })
// })
