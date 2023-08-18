const selectedPlayerData = JSON.parse(localStorage.getItem('selectedPlayer'));
const viewPlayer = (selectedPlayerData) => {
   const profilePage = document.createElement("section");
   profilePage.classList.add("player__profile");
   profilePage.innerHTML = `
      <div class="profile__container">
            <div class="player__image">
               <img src="${selectedPlayerData.image}" alt="동적 생성 예정 이미지">
            </div>
            <div class="player__desc">
                <div class="main__desc">
                    <div class="main__title">
                        <h2>${selectedPlayerData.Name}</h2>
                    </div>
                    <div class="update__info">
                        <button class="update__btn">프로필 변경</button>
                    </div>
                </div>
                <hr>
                <div class="sub__desc">
                    <div class="sub__key">
                        <h2>국적</h2>
                        <h2>나이</h2>
                        <h2>포지션</h2>
                        
                    </div>
                    <div class="sub__value">
                    <h2>${selectedPlayerData.Nation}</h2>
                    <h2>${selectedPlayerData.Age}</h2>
                    <h2>${selectedPlayerData.position}</h2>
                    </div>
                </div>
                <div class="save__profile">
                    <button class="save__btn">확인</button>
                </div>
            </div>
        </div>
   `;
   document.body.appendChild(profilePage);
}

viewPlayer(selectedPlayerData);

window.onload = function(){
    const updateBtn = document.querySelector('.update__info .update__btn');
    const openModal = document.querySelector('.update__modal');
    const saveModalBtn = document.querySelector('.save__btn-modal');
    updateBtn.addEventListener('click',()=>{
        openModal.style.display="block";
        document.body.style.overflow= "hidden";

        document.querySelector('#new-Name').value = selectedPlayerData.Name;
        document.querySelector('#new-Nation').value = selectedPlayerData.Nation;
        document.querySelector('#new-Age').value = selectedPlayerData.Age;
        document.querySelector('#new-Position').value = selectedPlayerData.position;

    });
   const  closeModal = () =>{
        openModal.style.display= "none";
        document.body.style.overflow = "auto";
    }
    
    window.addEventListener('click',(event)=>{
        if(event.target===openModal){
            openModal.style.display= "none";
            document.body.style.overflow = "auto";
            console.log('click');
        }
    })
    const updatePage = (updatedData) =>{
        const updateName = document.querySelector('.main__title h2');
        const updateNation = document.querySelector('.sub__value h2:nth-child(1)')
        const updateAge = document.querySelector('.sub__value h2:nth-child(2)');
        const updatePosition = document.querySelector('.sub__value h2:nth-child(3)');
        const updateImage = document.querySelector('.player__image img');

        updateName.textContent = updatedData.Name;
        updateNation.textContent = updatedData.Nation;
        updateAge.textContent = updatedData.Age;
        updatePosition.textContent = updatedData.position;
        if(updateImage){
            updateImage.src = updatedData.image;
        }
    }

    const saveModal = () =>{
        const newName = document.querySelector('#new-Name').value;
        const newNation =  document.querySelector('#new-Nation').value;
        const newAge = document.querySelector('#new-Age').value;
        const newPosition =  document.querySelector('#new-Position').value;
        const newImage = document.querySelector('#new-Image').files[0];

       const updatedData = {
        ...selectedPlayerData,
        Name: newName !== "" ? newName: selectedPlayerData.Name,
        Nation: newNation !== "" ? newNation : selectedPlayerData.Nation,
        Age: newAge !== "" ? newAge : selectedPlayerData.Age,
        position: newPosition !== "" ? newPosition : selectedPlayerData.position
       }
       /* firebase 데이터 반영 */ 
       selectedPlayerId = selectedPlayerData.id;
       const db = firebase.firestore();
       const storage = firebase.storage();

       if(newImage){
        let storageRef = storage.ref();
        let storagePath = storageRef.child('image/'+ newImage.name);
        let updateWork = storagePath.put(newImage)

        updateWork.on('state_changed',
         null,
         (error)=>{
            console.error('Error : ', error);
         },
         ()=>{
            updateWork.snapshot.ref.getDownloadURL().then((updateUrl)=>{
                updatedData.image = updateUrl;
                   db.collection('Player').doc(selectedPlayerId).update(updatedData)
                   .then(()=>{
                      updatePage(updatedData);
                      closeModal();
                      alert('선수 정보 수정이 완료됐습니다.');
                      console.log('업데이트 완료');
                   })
                   .catch((error)=>{
                      alert('선수 정보 수정을 실패했습니다.')
                      console.error('선수 정보 수정 실패', error);
                   });
                localStorage.setItem('selectedPlayer',JSON.stringify(updatedData));
            });
         }
        )

       }else{
        db.collection('Player').doc(selectedPlayerId).update(updatedData)
             .then(()=>{
                
                updatePage(updatedData);
                closeModal();
                alert('선수 정보 수정이 완료됐습니다.');
                console.log('업데이트 완료');
             })
             .catch((error)=>{
                alert('선수 정보 수정을 실패했습니다.')
                console.error('선수 정보 수정 실패', error);
             });
        
        localStorage.setItem('selectedPlayer',JSON.stringify(updatedData));

       }
     
    
       }
    const SavePage = ()=>{
        const saveBtn = document.querySelector('.save__btn');
        saveBtn.addEventListener('click',()=>{
            window.location.href="playerList.html";
           })
    }
    saveModalBtn.addEventListener('click',saveModal)
    SavePage();
};

