import {storage,db} from './firebase.js'
const selectEmployeeId = localStorage.getItem('selectEmployee') 
const detailForm = document.querySelector('#myForm');

async function selectEmployeeRender (){;
    let selectEmployee = await db.collection('profile').get();
    const storageRef = storage.ref();
    const profile = storageRef.child('image/' +selectEmployeeId+'.jpg');
    const profileImg = await profile.getDownloadURL();
    const array = []
    selectEmployee.forEach((item)=>{
        if(item.data().employeeId == selectEmployeeId){
            array.push(item.data())
            detailForm.insertAdjacentHTML('beforeend',
            `
            <div class="myForm__content">
                        <div class="content_texts">
                            <p class="content_text" for="name">이름 ${item.data().name}</p>
                            <p class="content_text" for="phoneNum">전화번호 ${item.data().phonenum} </p>
                            <p class="content_text" for="position">직급 ${item.data().position}</p>
                            <p class="content_text" for="email">이메일 ${item.data().email} </p>
                        </div>
                        <div class="content_imgs">
                          <img class="content_img" src="${profileImg}" alt=""> 
                        </div>
                    </div>
                    <div class="btn__box">
                    <a class="btn__addi" href="employee_detail_modify.html">수정</a>
                    <a class="btn__cancel" href="/index.html">취소</a>
                    </div> 
                   `)
        }
    }
    
)

} 

selectEmployeeRender()


async function renderTotalEmployees () {
    
    const data = await db.collection('profile').get();
    let totalEmployees = data.size;
    document.querySelector('.search__total').insertAdjacentHTML('beforeend',totalEmployees)
}

renderTotalEmployees();
