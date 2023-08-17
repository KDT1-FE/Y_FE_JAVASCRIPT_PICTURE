

//직원 프로필 페이지
var queryString = new URLSearchParams(window.location.search);

db.collection('employee').doc(queryString.get('id')).get().then((result)=>{
    $('#mainprofileImg').css('background-image', `url(${result.data().imgUrl})`)
    $('#info_name_data').html(result.data().name)
    $('#info_birth_data').html(result.data().birth)
    $('#info_email_data').html(result.data().mail)
    $('#info_phone_data').html(result.data().phone)
    $('#info_join_data').html(result.data().join)
    $('#info_update_data').html(result.data().update.toDate())
}
)

//직원 수정 페이지로 이동

$('#profileEdit').click(function(){
    window.location.href = "./editPage.html?id=" + queryString.get('id')
})

//직원 삭제
$('#profileDel').click(function(){
    db.collection('employee').doc(queryString.get('id')).delete().then((result)=>{
        alert("삭제가 완료되었습니다.");
        window.location.href = "./listPage.html";
    })
})