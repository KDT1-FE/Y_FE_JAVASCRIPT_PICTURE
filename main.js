const list  = document.getElementById('list');
const btn1 = document.getElementById('nav-btn1');
const profileImageInput = document.getElementById('img');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const categoryInput = document.getElementById('category');

btn1.addEventListener('click', () => {
    const profileImage = profileImageInput.files[0];
    const name = nameInput.value;
    const email = emailInput.value;
    const category = categoryInput.value;

    if (profileImage && name && email && category) {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');

        const profileImageElement = document.createElement('img');
        profileImageElement.src = URL.createObjectURL(profileImage);
        profileImageElement.alt = name;
        profileImageElement.width = 50;

        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <strong>${name}</strong>
            <p>${email}</p>
            <p>${category}<p>
        `;

        employeeDiv.appendChild(profileImageElement);
        employeeDiv.appendChild(infoDiv);

        employeeList.appendChild(employeeDiv);

        // Clear input fields
        profileImageInput.value = '';
        nameInput.value = '';
        emailInput.value = '';
        categoryInput.value='';
    } else {
        alert('모든 필드를 입력하세요.');
    }
});
