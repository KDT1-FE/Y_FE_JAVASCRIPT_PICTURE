document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector('.add__btn');
const SearchBtn = document.querySelector('.logo-search__search input');
const removeBtn = document.querySelector('.delete__btn');
const addPlayer = document.querySelector('.add__player__list');
const allSelectBtn = document.querySelector('.all__btn');

const moveToPlayerUpload = () =>{
    addBtn.addEventListener("click", ()=>{
        window.location.href="playerUpload.html";
    });
}
moveToPlayerUpload();



const createPlayer = (player)=>{
    const row = document.createElement("tr");
    row.classList.add("player__cell");
    row.setAttribute('data-id', player.id);
    row.innerHTML = `
             <td>
             <div class="player__info">
                 <div class="checkbox__container">
                     <input type="checkbox">
                 </div>
                 <img  class="player__image" src="${player.image}" alt="${player.image}">
                 <span class="player__name">${player.Name}</span>
             </div>
             </td>
             <td>${player.Nation}</td>
             <td>${player.Age}</td>
             <td>${player.position}</td>
    `;
      const playerImage = row.querySelector(".player__image");
      playerImage.addEventListener('click',(event)=>{
        event.stopPropagation();
        localStorage.setItem('selectedPlayer', JSON.stringify(player));
        window.location.href= "playerInfo.html";
    })
    addPlayer.appendChild(row);
};

SearchBtn.addEventListener('keyup',()=>{
  const filterPlayer = SearchBtn.value.toLowerCase();
  const filterRow = document.querySelectorAll('.player__cell');

  filterRow.forEach((cell)=>{
    let cellText = cell.textContent.toLowerCase();
    if(cellText.includes(filterPlayer)){
      cell.style.display='';
    }else{
      cell.style.display = 'none';
    }
  });
});
const removePlayer = () =>{
    const checkboxes = document.querySelectorAll('.checkbox__container input[type="checkbox"]');
    checkboxes.forEach((checkbox)=>{
        if(checkbox.checked){
            const playerId = checkbox.closest('tr').getAttribute('data-id');
            removePlayertoDB(playerId);
            checkbox.closest('tr').remove();
        }
    });
};

const removePlayertoDB= (playerId) =>{
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

allSelectBtn.addEventListener('click',()=>{
  const allCheckboxes = document.querySelectorAll('.checkbox__container input[type="checkbox"]');
  const isSelected = allCheckboxes[0].checked;
  

  allCheckboxes.forEach(checkbox => {
      checkbox.checked = !isSelected;
  });

  allSelectBtn.textContent = isSelected ? '전체 선택' : '전체 해제';
})

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


