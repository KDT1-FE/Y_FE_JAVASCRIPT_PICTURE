const list  = document.getElementById('list');
const btn1 = document.getElementById('nav-btn1');
const btn2 = document.getElementById('nav-btn2')
const checkBoxInput = document.getElementById('inputCheckbox')
const profileImageInput = document.getElementById('inputImg');
const nameInput = document.getElementById('inputName');
const emailInput = document.getElementById('inputEmail');
const phoneInput = document.getElementById('inputPhone');
const categoryInput = document.getElementById('inputCategory');

nameInput.value = "hello";
emailInput.value = "email";
phoneInput.value = "phone";
categoryInput.value = "category";


btn1.addEventListener('click', async () => {
    // const checkbox = checkBoxInput.checked;
    const profileImage = profileImageInput.files[0];
    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const category = categoryInput.value;

    if (profileImage && name && email && category && phone) {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');

        const profileImageElement = document.createElement('img');
        profileImageElement.src = URL.createObjectURL(profileImage);
        profileImageElement.className="p-img";
        profileImageElement.alt = name;
        profileImageElement.width = 100;
        profileImageElement.height = 100;


        const infoDiv = document.createElement('div');
        infoDiv.className = 'divText';
        infoDiv.innerHTML = `
            <p class = "p-name">${name}</p>
            <p class = "p-email">${email}</p> 
            <p class = "p-phone">${phone}</p>
            <p class = "p-category">${category}<p>
        `;
       
        const checkBox = document.createElement('label');
        checkBox.innerHTML = `
            <input type="checkbox" class="p-checkbox">
        `;

        employeeDiv.appendChild(checkBox);
          
        employeeDiv.appendChild(profileImageElement);
        employeeDiv.appendChild(infoDiv);

        list.appendChild(employeeDiv);

        try {
            // 이미지를 AWS S3에 업로드하기 위해 putFile 함수 호출
            const result = await putFile(profileImage);
            console.log('Successfully uploaded photo:', result);
            result.key
            //이미지 업로드 성공한 경우, 해당 이미지의 URL을 이용해 화면에 표시하거나 다른 작업 수행
            // const imageUrl = result.Location;

            // ... (이미지 표시 또는 다른 작업)
        } catch (err) {
            console.error('Error uploading photo:', err);
        }

        // Clear input fields
        profileImageInput.value = '';
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        categoryInput.value='';
    } else {
        alert('모든 필드를 입력하세요.');
    }
});

btn2.addEventListener('click', () => {
    const selectCheckbox = document.querySelectorAll('.p-checkbox:checked')

    selectCheckbox.forEach(checkBox => {
        const listItem = checkBox.closest('.employee');
        alert(listItem);
        if(listItem) {
            list.removeChild(listItem)
        }

    })
})
