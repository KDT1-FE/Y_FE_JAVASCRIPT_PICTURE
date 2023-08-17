//직원 수정 페이지

var imgUrl, file, imgUrlUpdated;
var queryString = new URLSearchParams(window.location.search);
var employeeID = queryString.get('id');
var enableSubmit = false;

getEmployeeData();

function getEmployeeData(){
    db.collection('employee')
    .doc(employeeID)
    .get()
    .then((result)=>{
        console.log(result.data());

        imgUrl = result.data().imgUrl;
        if(imgUrl != undefined){
            $('#mainprofileImg').attr('src', imgUrl)
        } else{
            $('#mainprofileImg').attr('src', 'https://firebasestorage.googleapis.com/v0/b/emsproject-68867.appspot.com/o/image%2Femptyset.png?alt=media&token=31a1d0ab-e2c3-4e95-bd92-9d44bfcd852d')
        }
        
        $('#info_name_data').val(result.data().name)
        $('#info_birth_data').val(result.data().birth)
        $('#info_email_data').val(result.data().mail)
        $('#info_phone_data').val(result.data().phone)
        $('#info_join_data').val(result.data().join)
        $('#info_update_data').val(result.data().update)
        $('#editContent').html(result.data().imgName)
    });
}



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


//수정 내용 저장(업데이트)

$('#profileSave').click(function(e){
    
    //저장 클릭시 프로그레스바 노출
    var progress =`
    <div id="Bar_Background">
        <div id="Bar_Back">
            <div id="Bar_Front"></div>
        </div>
    </div>

    `;
    $('#progressBarWrap').append(progress)


    e.stopPropagation();
    var fileCheck = $('#profileImgEdit').val();
        if(fileCheck) {
            saveImgData();
            return;
        }
        saveDataInStore(imgUrl);
    });



    function saveImgData(){
        var file = document.querySelector('#profileImgEdit').files[0];
        var storageRef = storage.ref();
        var storageUrl = storageRef.child('image/' + file.name);
        var upload = storageUrl.put(file);

        upload.on(
            'state_changed',
            null,

            (error) => {
                console.error('실패사유는', error);
            },
            //업로드 성공시 업데이트 될 데이터를 employee에 저장
            ()=>{
                upload.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log('이미지 업로드 경로: ', url);
                    //업데이트 이미지로 url변경
                    imgUrlUpdated = url;
                    console.log('업데이트 후 url: ', imgUrlUpdated);

                    var value = {
                        name : $('#info_name_data').val(),
                        birth : $('#info_birth_data').val(),
                        mail : $('#info_email_data').val(),
                        phone : $('#info_phone_data').val(),
                        join : $('#info_join_data').val(),
                        update : new Date(),
                        imgUrl: imgUrlUpdated,
                        imgName: file.name
                    };
        
                    db.collection('employee')
                    .doc(employeeID)
                    .update(value)
                    .then((result)=>{
                        console.log('db업데이트 완료');
                        setTimeout(()=>window.location.href = "./listPage.html",3000);
                    }).catch((err)=>{
                        console.log(err);
                    })
                });
            }
        
        );
        }

        //폼 저장-db
        function saveDataInStore(imgUrlparams){

            var file = document.querySelector('#profileImgEdit').files[0];
            var storageRef = storage.ref();
            var storageUrl = storageRef.child('image/' + new Date());
            var upload = storageUrl.put(file);

            
            var value = {
                name : $('#info_name_data').val(),
                birth : $('#info_birth_data').val(),
                mail : $('#info_email_data').val(),
                phone : $('#info_phone_data').val(),
                join : $('#info_join_data').val(),
                update : new Date(),
                imgUrl: imgUrlparams,
            };

            db.collection('employee')
            .doc(employeeID)
            .update(value)
            .then((result)=>{
                console.log('db업데이트 완료');
                setTimeout(()=>window.location.href = "./listPage.html",3000);
            }).catch((err)=>{
                console.log(err);
            })
    
        }



$('#profileImgDel').click(function(){
    $('#profileImgEdit').val('');
    $('#mainprofileImg').attr('src','https://firebasestorage.googleapis.com/v0/b/emsproject-68867.appspot.com/o/image%2Femptyset.png?alt=media&token=31a1d0ab-e2c3-4e95-bd92-9d44bfcd852d');
    $('#editContent').html('');
})