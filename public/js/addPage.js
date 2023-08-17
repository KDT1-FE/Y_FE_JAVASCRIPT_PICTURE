
//직원 등록 페이지





//이미지 미리보기

    let reader = new FileReader();


    reader.onload = (readerEvent) => {
        document.querySelector("#mainprofileImg").setAttribute('src', readerEvent.target.result);
    };
    document.querySelector("#profileImgEdit").addEventListener("change", (changeEvent) => {
        let imgFile = changeEvent.target.files[0];
        reader.readAsDataURL(imgFile);
        var filename = changeEvent.target.files[0].name;
        console.log(filename)
        document.querySelector("#editContent").innerHTML=filename;
    });


//저장 버튼 클릭시 액션


$('#profileSave').click(function(){
    var progress =`
    <div id="Bar_Background">
        <div id="Bar_Back">
            <div id="Bar_Front"></div>
        </div>
    </div>

    `;
    $('#progressBarWrap').append(progress)

    //이미지저장-storage
    var file = document.querySelector('#profileImgEdit').files[0];
    var storageRef = storage.ref();
    var storageUrl = storageRef.child('image/' + file.name);
    var upload = storageUrl.put(file);
    


    upload.on( 'state_changed',
    //변화시 동작 함수
    null,
    //에러시 동작 함수
    (error)=>{
        console.error('실패 사유는', error);
    },
    //성공시 동작 함수
    () => {
        upload.snapshot.ref.getDownloadURL().then((url) => { 
            console.log('업로드된 경로는', url);
             //폼 저장-db
            var value = {
                name : $('#info_name_data').val(),
                birth : $('#info_birth_data').val(),
                mail : $('#info_email_data').val(),
                phone : $('#info_phone_data').val(),
                join : $('#info_join_data').val(),
                update : new Date(),
                imgUrl: url,
                imgName: document.querySelector('#profileImgEdit').files[0].name
            }
            db.collection('employee').add(value).then((result)=>{
                setTimeout(()=>window.location.href = "./listPage.html",3000);
            }).catch((error)=>{
                console.log(err);
            })

        });
    }
    ) 
    })



    $('#profileImgDel').click(function(){
        $('#profileImgEdit').val('');
        $('#mainprofileImg').attr('src','https://firebasestorage.googleapis.com/v0/b/emsproject-68867.appspot.com/o/image%2Femptyset.png?alt=media&token=31a1d0ab-e2c3-4e95-bd92-9d44bfcd852d');
        $('#editContent').html('');
    })
    