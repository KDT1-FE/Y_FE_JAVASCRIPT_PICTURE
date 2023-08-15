document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector('.add__btn');
const removeBtn = document.querySelector('.delete__btn');
const addPlayer = document.querySelector('.add__player__list');
const moveToPlayerUpload = () =>{
    addBtn.addEventListener("click", ()=>{
        window.location.href="playerUpload.html";
    });
}
moveToPlayerUpload();

const createPlayer = (player)=>{
    const row = document.createElement("tr");
    row.setAttribute('data-id', player.id);
    row.innerHTML = `
             <td>
             <div class="player__info">
                 <div class="checkbox__container">
                     <input type="checkbox">
                 </div>
                 <img src="${player.image}" alt="${player.image}">
                 <span class="player__name">${player.Name}</span>
             </div>
             </td>
             <td>${player.Nation}</td>
             <td>${player.Age}</td>
             <td>${player.position}</td>
    `;
    addPlayer.appendChild(row);
};

const removePlayer = () =>{
    const checkboxes = document.querySelectorAll('.checkbox__container input[type="checkbox"]');
    checkboxes.forEach((checkbox)=>{
        if(checkbox.checked){
            const playerId = checkbox.closest('tr').getAttribute('data-id');
            deletePlayer(playerId);
            checkbox.closest('tr').remove();
        }
    });
};

const deletePlayer= (playerId) =>{
    db.collection("Player").doc(playerId).delete()
      .then(()=>{
        alert("선수가 방출 되었습니다!");
      })
      .catch((error)=>{
        alert("에러 발생");
        console.error("Error : ", error);
      });
};

removeBtn.addEventListener('click',()=>{
    removePlayer();
});
const db = firebase.firestore();

db.collection("Player")
  .get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
        const playerId= doc.id;
        const playerData = doc.data();
        playerData.id = playerId;
        createPlayer(playerData);
    });
  })
  .catch((error)=>{
    console.log("Error : " , error);
  });
});


