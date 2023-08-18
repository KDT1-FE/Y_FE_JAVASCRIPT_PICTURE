 // 삭제
 const deleteBtn= document.querySelectorAll('.delete-btn');
 deleteBtn.addEventListener('click',function(){
     //db정보 삭제
     db.collection('member').doc(queryString.get('id')).delete().then(()=>{
         alert('삭제되었습니다.');
         window.location.href='/'

     })
     
     //이미지 삭제
     var deleteFilename = document.getElementById('image-delete').value;
     var deleteRef = storage.refFromURL(deleteFilename)
     // console.log(deleteRef)

     deleteRef.delete().then(function() {
         console.log("File deleted successfully");
     }).catch(function(error) {
         console.error("Error removing file.", error);
     });


 });