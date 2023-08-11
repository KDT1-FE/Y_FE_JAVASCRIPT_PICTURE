const list  = document.getElementById('list');
const btn1 = document.getElementById('nav-btn1');
const btn2 = document.getElementById('nav-btn2')
const checkBoxInput = document.getElementById('inputCheckbox')
const profileImageInput = document.getElementById('inputImg');
const nameInput = document.getElementById('inputName');
const emailInput = document.getElementById('inputEmail');
const phoneInput = document.getElementById('inputPhone');
const categoryInput = document.getElementById('inputCategory');

btn1.addEventListener('click', () => {
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

