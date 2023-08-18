function script(uid){
    const id = document.getElementById(uid);
    const url = "http://localhost:5005/picture.html?";
    console.log(uid);

    const firebaseConfig = {
        apiKey: "AIzaSyBLJjgAJr-CPkOMvQ5cXo_7XxRB457ClOY",
        authDomain: "kakaojs-7b84e.firebaseapp.com",
        projectId: "kakaojs-7b84e",
        storageBucket: "kakaojs-7b84e.appspot.com",
        messagingSenderId: "225584743925",
        appId: "1:225584743925:web:7800682de75fbae054ccbc",
        measurementId: "G-NCXB18TBVK"
    };

    // Initialize Firebase
    const db = firebase.firestore();
    const storage = firebase.storage();


    /*$('#send').click(function(){
        
        var file = document.querySelector('#image').files[0];
        var storageRef = storage.ref();
        var route = storageRef.child('image/'+ file.name);
        var uploadFile = route.put(file);

        uploadFile.on( 'state_changed', 
            // 변화시 동작하는 함수 
            null, 
            //에러시 동작하는 함수
            (error) => {
                console.error('실패사유는', error);
            }, 
            // 성공시 동작하는 함수
            () => {
                uploadFile.snapshot.ref.getDownloadURL().then((url) => {
                    console.log('업로드된 경로는', url);
                    var toSave = { 
                        name : $('#name').val(),
                        email : $('#email').val(),
                        phonenumber : $('#phonenumber').val(),
                        image : url
                    }
                    db.collection('friends').add(toSave).then((result)=>{
                        console.log(result);
                        window.location.href = '/index.html';
                    }).catch((error)=>{
                        console.log(error)
                    })
                });
            }
        );

        
    });*/
    //const docRef = doc(db, "cities", "SF");
    console.log(db.collection('friends').get())
    //console.log($('.container').length); 

    //$('.container').remove();

    db.collection('friends').get().then((res) => {
        res.forEach((doc) => {
        console.log(doc.id, uid);
        if (doc.id === uid){
            console.log("inside if")
            var template = ` <p>밑에 뜨는 프로필을 수정해주세요! 새로운 이미지를 클릭하고 몇초 뒤에 창이 뜨니 클릭은 꼭! 한번만 해주세요.</p>
            <div class="product">
              <button type="button" onclick="script('${doc.id}');">
                <img class="image" src="${doc.data().image}" alt="프로필 사진"/>
                <div class="flex-grow-1 p-4">
                  <h5 class="name">${doc.data().name}</h5>
                  <p class="email">${doc.data().email}</p>
                  <p class="phonenumber">${doc.data().phonenumber}</p>
                  <input class="form-control mt-2" type="file" id="image">
                  <button class="btn btn-danger mt-3" id="update"><span>사진 업데이트</span></button>
                </div>
              </button>
              </div>`;
            /*for (var i = 0; i < $('.container').length; i++){
                console.log("inside for loop");
                $('.container').remove($('.container')[i]);
            }*/
            $('.container').append(template);
            $('#update').click(function(){

            var file = document.querySelector('#image').files[0];
            var storageRef = storage.ref();
            var route = storageRef.child('image/'+ file.name);
            var uploadFile = route.put(file);

            uploadFile.on( 'state_changed', 
                // 변화시 동작하는 함수 
                null, 
                //에러시 동작하는 함수
                (error) => {
                    console.error('실패사유는', error);
                }, 
                // 성공시 동작하는 함수
                () => {
                    uploadFile.snapshot.ref.getDownloadURL().then((url) => {
                        console.log('업로드된 경로는', url);
                        var toSave = { 
                            name : doc.data().name,
                            email : doc.data().email,
                            phonenumber : doc.data().phonenumber,
                            image : url
                        }
                        db.collection('friends').doc(doc.id).update(toSave).then((result)=>{
                            console.log(result);
                            window.location.href = '/index.html';
                        }).catch((error)=>{
                            console.log(error)
                        })
                    });
                }
            ); })

                //console.log("inside update");
                //db.collection('friends').where('email', '==', doc.data().email).delete();
                //route.put(document.querySelector('#image').files[0])
                //firestore.collection("friends").document(doc.id).update("image", imageUri.toString())

            console.log($('.container'));
        } else {
            //$('.container').remove(template);
        }})

        
           /* var file = document.querySelector('#image').files[0];
            var storageRef = storage.ref();
            var route = storageRef.child('image/'+ file.name);
            var uploadFile = route.put(file);

            uploadFile.on( 'state_changed', 
                // 변화시 동작하는 함수 
                null, 
                //에러시 동작하는 함수
                (error) => {
                    console.error('실패사유는', error);
                }, 
                // 성공시 동작하는 함수
                () => {
                    uploadFile.snapshot.ref.getDownloadURL().then((url) => {
                        console.log('업로드된 경로는', url);
                        var toSave = { 
                            name : $('#name').val(),
                            email : $('#email').val(),
                            phonenumber : $('#phonenumber').val(),
                            image : url
                        }
                        db.collection('friends').add(toSave).then((result)=>{
                            console.log(result);
                            window.location.href = '/index.html';
                        }).catch((error)=>{
                            console.log(error)
                        })
                    });
                })
            });*/
    });
    
    console.log($('.container').length); 
};