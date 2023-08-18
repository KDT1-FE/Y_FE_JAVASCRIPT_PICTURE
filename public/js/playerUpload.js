const lookBtn = document.querySelector('.transfer__btn');
const nameBtn = document.querySelector('.name__btn');
const nationBtn = document.querySelector('.nation__btn');
const ageBtn = document.querySelector('.age__btn');
const positionBtn = document.querySelector('.position__btn');
const imgBtn = document.querySelector('.img__btn');
const uploadBtn = document.querySelector('.upload__btn');

const LookPlayer = () => {
    lookBtn.addEventListener('click', ()=>{
        window.open("https://www.transfermarkt.com/premier-league/marktwerte/wettbewerb/GB1","_blank");

    })
}
LookPlayer();

const db = firebase.firestore();
const storage = firebase.storage();

const Upload = () =>{
   
    uploadBtn.addEventListener('click',()=>{
        const playerName = nameBtn.value; 
        const playerNation = nationBtn.value;
        const playerAge = ageBtn.value;
        const playerPosition = positionBtn.value; 

        let file = imgBtn.files[0];
        let storageRef = storage.ref();
        let storagePath = storageRef.child('image/'+ file.name);
        let uploadWork = storagePath.put(file)

        uploadWork.on('state_changed',
          null,
          (error)=>{
            console.error('Error :', error);
          },
          ()=>{
          
            uploadWork.snapshot.ref.getDownloadURL().then((url)=>{
                console.log('upload path :', url);

                let saveInfo = {
                    'Name' : playerName,
                    'Nation' : playerNation,
                    'Age' : playerAge,
                    'position': playerPosition,
                    'image' : url
                };
                db.collection('Player').add(saveInfo)
                .then((result)=>{
                    alert('업로드 완료');
                    window.location.href="PlayerList.html";
                })
                .catch((error)=>{
                    alert('업로드 실패');
                });
            });
          }
        )
    });
}
Upload();