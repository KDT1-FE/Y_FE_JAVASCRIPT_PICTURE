import {storage,db} from './firebase.js'


const selectEmployee = localStorage.getItem('selectEmployee');
    const employees = await db.collection('profile').get();
    const storageRef = storage.ref();
        const profile = storageRef.child('image/' +selectEmployee+'.jpg');
        const profileImg = await profile.getDownloadURL();

    
async function defaultSetmodifyPage(){
    const employee = [];
    
    
    employees.forEach((item)=>{
        
        if (item.data().employeeId == selectEmployee){
            employee.push(item.data())
        }
    });
    
    document.querySelector('#name').value = employee[0].name;
    document.querySelector('#phoneNum').value = employee[0].phonenum;
    document.querySelector('#email').value = employee[0].email;
    document.querySelector('#position').value = employee[0].position;
    
    
    const imageInput = document.getElementById('img');
    const imagePreview = document.getElementById('imagePreview');
    
    
    imagePreview.src = `${profileImg}`
    imageInput.addEventListener('change', function(event) {
      const selectedImage = event.target.files[0];
      
      if (selectedImage) {
        const reader = new FileReader();
    
        reader.onload = function() {
          imagePreview.src = reader.result;
        };
    
        reader.readAsDataURL(selectedImage);
      } else {
        imagePreview.src = `${profileImg}`
      }
    });
}
defaultSetmodifyPage();


const employeeRef = db.collection('profile').doc(selectEmployee);

document.querySelector('#myForm').addEventListener('submit',async (e)=>{
    e.preventDefault();
    // 정보수정
    const modifyData = {
        name : document.querySelector('#name').value,
        phonenum : document.querySelector('#phoneNum').value,
        email : document.querySelector('#email').value,
        position : document.querySelector('#position').value,
    }
    employeeRef.update(modifyData).then()

    // 사진수정
    const imageInput = document.getElementById('img');
    const formData = new FormData(e.target);
    const file = formData.get("img")
    if (imageInput.value){
        const storageRef = storage.ref();
        console.log(storageRef);
        const filePath = "image/"+selectEmployee+".jpg";
        await storageRef.child(filePath).delete();
        await storageRef.child(filePath).put(file);

    }


    setTimeout(()=>{window.location.href="/employee_detail.html"},500)


    }
    )

    async function renderTotalEmployees () {
      let totalEmployees = 0;
      const test = await db.collection('profile').get();
      
      test.forEach(()=>{
          totalEmployees++;
      })
      document.querySelector('.search__total').innerHTML += totalEmployees    
  }
  
  renderTotalEmployees();

  