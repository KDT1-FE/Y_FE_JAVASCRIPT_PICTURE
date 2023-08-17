
//직원수 조회
db.collection("employee").get().then((querySnapshot)=>{
    var employeeCount = querySnapshot.size;
    var employeeTotal = `<h4>전체 ${employeeCount}</h4>`;
    $('#titleWrap').append(employeeTotal)
});

//직원리스트 페이지
db.collection('employee').orderBy("update", "desc").get().then((snapshot)=>{
    snapshot.forEach((doc)=>{
        var template = `                    
        <div class = "employee"> 
        <input id="checkBox" type="checkbox">
            <div class = "employeeImg" style="background-image:url('${doc.data().imgUrl}')"></div>
            <div class = "employeeinfoWrap">
                <div class = "info_Name">
                    <div class = "info_Img"></div>
                    <div class = "info_Title">${doc.data().name}</div>
                </div>
                <div class = "info_Birth">
                    <div class = "info_Img"></div>
                    <div class = "info_Title">${doc.data().birth}</div>
                </div>
                <div class = "info_Mail">
                    <div class = "info_Img"></div>
                    <div class = "info_Title">${doc.data().mail}</div>
                </div>
                <div class = "info_Phone">
                    <div class = "info_Img"></div>
                    <div class = "info_Title">${doc.data().phone}</div>
                </div> 
                <h2><a href="./profilePage.html?id=${doc.id}">자세히보기 ></a></h2>
            </div>
            </div>
    `;
        $('#tableContent').append(template)

    })
})