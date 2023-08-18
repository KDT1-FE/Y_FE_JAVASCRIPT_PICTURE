const list = document.getElementById('list');
const registerBtn = document.getElementById('register-button');
registerBtn.addEventListener('click', showRegistrationForm);

let items = [];

// 등록 폼 열기
function showRegistrationForm() {
    const registrationForm = document.getElementById("registrationForm");
    registrationForm.style.display = "block";
}

// 등록 폼 내부의 등록 버튼
const registerFormBtn = document.getElementById('register-form-button');
registerFormBtn.addEventListener('click', function () {
    addEmployee();
    saveToLocalStorage();
    closeRegistrationForm();
});

// 등록 폼 내의 취소 버튼
const closeFormBtn = document.getElementById('close-form-button');
closeFormBtn.addEventListener('click', closeRegistrationForm);

// 등록 폼 닫기
function closeRegistrationForm() {
    const registrationForm = document.getElementById("registrationForm");
    defaultPhoto.style.display = 'block'; // 기본 이미지 표시
    registrationForm.style.display = "none";
}

// 직원 등록
function addEmployee() {
    const image = document.getElementById("photo")
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const category = document.getElementById("category").value;
    const item = {
        image: uploadedPhoto.src,
        id: new Date().getTime(),
        name: name,
        email: email,
        phone: phone,
        category: category,
        checked: false
    }
    // 배열의 마지막에 아이템 추가
    items.push(item)

    // 요소 생성하기
    const {
        listEl
    } = createListElement(item);

    list.appendChild(listEl);
    closeRegistrationForm();

    saveToLocalStorage();
    location.reload(); // 새로고침을 해야 checkbox 문제 해결됨
}

// 요소 display 생성하기
function createListElement(item) {
    const listEl = document.createElement('div');
    listEl.classList.add('list-row', 'list-item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.classList.add('checkbox');
    checkboxEl.name = 'select';
    checkboxEl.checked = item.checked;

    if (item.checked) {
        listEl.classList.add('checked');
    }

    const imgElDiv = document.createElement('div');
    const imgEl = document.createElement('img');
    imgElDiv.classList.add('list-cell', 'emp-img');
    imgEl.src = item.image;
    imgEl.alt = "picture";
    imgElDiv.append(imgEl);

    const nameEl = document.createElement('div');
    nameEl.classList.add('list-cell', 'emp-name');
    nameEl.innerText = item.name;

    const emailEl = document.createElement('div');
    emailEl.classList.add('list-cell', 'emp-email');
    emailEl.innerText = item.email;

    const phoneEl = document.createElement('div');
    phoneEl.classList.add('list-cell', 'emp-phone');
    phoneEl.innerText = item.phone;

    const categoryEl = document.createElement('div');
    categoryEl.classList.add('list-cell', 'emp-category');
    categoryEl.innerText = item.category;

    // Events
    checkboxEl.addEventListener('change', () => {
        item.checked = checkboxEl.checked;

        if (item.checked) {
            listEl.classList.add('checked');
        } else {
            listEl.classList.remove('checked');
        }
        saveToLocalStorage();
    })

    listEl.append(checkboxEl);
    listEl.append(imgElDiv);
    listEl.append(nameEl);
    listEl.append(emailEl);
    listEl.append(phoneEl);
    listEl.append(categoryEl);

    return {
        listEl
    }
}

// local storage에 있는 요소를 가져와서 생성해줌
function displayLists() {
    // local storage에 있는 요소 가져오기
    loadFromLocalStorage();

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // List Item 요소 생성
        const {
            listEl
        } = createListElement(item);

        // List Div 안에 추가
        list.appendChild(listEl);
    }
}
displayLists();

// 요소를 로컬 스토리지에 저장하기
function saveToLocalStorage() {
    const data = JSON.stringify(items);

    localStorage.setItem('emp_lists', data);
}

// 로컬 스토리지에서 요소 가져오기
function loadFromLocalStorage() {
    const data = localStorage.getItem('emp_lists');

    if (data) {
        items = JSON.parse(data);
    }
}

const deleteButton = document.getElementById('delete-button');

function removeCheckedItems() {
    const checkedItems = document.querySelectorAll('.list-item.checked');

    checkedItems.forEach(item => item.remove()); // item.remove()

    // items 배열에서도 객체 삭제하기
    items = items.filter(item => !item.checked)
}

deleteButton.addEventListener('click', () => {
    removeCheckedItems();
    saveToLocalStorage();
});


const selectAllCheckbox = document.getElementById('select-all');

const item = document.querySelectorAll('.list-item');
const itemCheckbox = document.querySelectorAll('.list-item input[type="checkbox"]');
// input으로 선택해야 함

selectAllCheckbox.addEventListener('change', function () {
    // checked : true 로 됨
    items.forEach(item => {
        item.checked = selectAllCheckbox.checked;
    })

    // classList에 checked 추가하기
    item.forEach(function (item) {
        if (selectAllCheckbox.checked) {
            item.classList.add('checked');
        } else {
            item.classList.remove('checked');
        }
    });
    itemCheckbox.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    })

    saveToLocalStorage();
});


const informationForm = document.getElementById("informationForm");
let empNameFormEl, empEmailFormEl, empPhoneFormEl, empCategoryFormEl, empImageFormEl = null;
// 상세 정보 폼 열기
item.forEach(function(item) {
    const informationFormContent = document.querySelector(".form-content");
    item.addEventListener('click', function(event){

        // 클릭 요소가 input 요소(checkbox)인 경우, 클릭 이벤트 제외
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
            return;
        }

        const empImgElement = item.querySelector('.emp-img img'); // emp-name 클래스를 가진 요소 찾기        
        const empImgSrc = empImgElement.src;

        if (!empImageFormEl) { // 이름이 계속 생성되지 않는 것 방지
            empImageFormEl = document.createElement('div');
            empImageFormEl.classList.add('emp-img');

            const imgTag = document.createElement('img');
            imgTag.src = empImgSrc;
            empImageFormEl.append(imgTag);

            informationFormContent.appendChild(empImageFormEl);
        }

        const empNameElement = item.querySelector('.emp-name'); // emp-name 클래스를 가진 요소 찾기        
        const empName = empNameElement.textContent;

        if (!empNameFormEl) { // 이름이 계속 생성되지 않는 것 방지
            empNameFormEl = document.createElement('div');
            empNameFormEl.classList.add('emp-name');
            informationFormContent.appendChild(empNameFormEl);
        }

        empNameFormEl.innerHTML = '- 이름 : ' + empName;

        const empEmailElement = item.querySelector('.emp-email'); // emp-name 클래스를 가진 요소 찾기        
        const empEmail = empEmailElement.textContent;

        if (!empEmailFormEl) { // 이름이 계속 생성되지 않는 것 방지
            empEmailFormEl = document.createElement('div');
            empEmailFormEl.classList.add('emp-email');
            informationFormContent.appendChild(empEmailFormEl);
        }

        empEmailFormEl.innerHTML = '- 이메일 : ' + empEmail;

        const empPhoneElement = item.querySelector('.emp-phone'); // emp-name 클래스를 가진 요소 찾기        
        const empPhone = empPhoneElement.textContent;

        if (!empPhoneFormEl) { // 이름이 계속 생성되지 않는 것 방지
            empPhoneFormEl = document.createElement('div');
            empPhoneFormEl.classList.add('emp-phone');
            informationFormContent.appendChild(empPhoneFormEl);
        }

        empPhoneFormEl.innerHTML = '- 휴대폰 번호 : ' + empPhone;

        const empCategoryElement = item.querySelector('.emp-category'); // emp-name 클래스를 가진 요소 찾기        
        const empCategory = empCategoryElement.textContent;

        if (!empCategoryFormEl) { // 이름이 계속 생성되지 않는 것 방지
            empCategoryFormEl = document.createElement('div');
            empCategoryFormEl.classList.add('emp-category');
            informationFormContent.appendChild(empCategoryFormEl);
        }

        empCategoryFormEl.innerHTML = '- 구분 : ' + empCategory;

        informationForm.style.display = "block";
    });
});

// 세부 정보 폼 내의 취소 버튼
const closeInfoFormBtn = document.getElementById('close-info-form-button');
closeInfoFormBtn.addEventListener('click', function(){
    closeInformationForm();
    location.reload(); // emp-image가 바뀌지 않는 문제 해결
});

function closeInformationForm() {
    informationForm.style.display = "none";
}

// 등록 폼 내의 사진 업로드
const photoInput = document.getElementById('photo');
const defaultPhoto = document.getElementById('defaultPhoto');
const uploadedPhoto = document.getElementById('uploadedPhoto');

photoInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        defaultPhoto.style.display = 'none'; // 기본 이미지 숨기기

        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedPhoto.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});