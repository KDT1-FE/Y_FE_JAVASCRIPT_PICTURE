// 환경 변수를 담을 전역 객체
const envVars = {};
const S3_BUCKET = 'y-fe-javascript-picture';

// AWS 설정 초기화 함수
async function initializeAWS() {
  if (!AWS.config.credentials) { // 이미 초기화하였다면 다시 초기화하지 않음
    try {
      const data = await fetch('/env.json');
      const { ACCESS_KEY, SECRET_ACCESS_KEY } = await data.json();

      AWS.config.update({
        credentials: new AWS.Credentials(ACCESS_KEY, SECRET_ACCESS_KEY),
        region: 'ap-northeast-2',
      });
    } catch (error) {
      console.error('Failed to load env.json', error);
    }
  }
}

// 이미지를 불러와서 페이지에 표시하는 함수
function displayImage(imageKey) {
  const imageUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${imageKey}`;
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.alt = '이미지';
  imgElement.classList.add('employee-image'); // 이미지에 스타일을 적용하기 위한 클래스 추가
  imgElement.style.maxWidth = '100px';
  imgElement.style.maxHeight = '100px';
  return imgElement;
}

// 이미지 생성 후 리스트에 추가
function displayEmployee(imageName) {
  const employee = document.createElement('div');
  employee.classList.add('employee');

  const imgElement = displayImage(imageName);
  employee.appendChild(imgElement);
  employeeList.appendChild(employee);
}

// 정보를 localStorage에 저장하는 함수
function saveEmployeeInfoToLocalstorage(employeeInfo) {
  const savedEmployeeInfos = JSON.parse(localStorage.getItem('employeeInfos')) || [];
  savedEmployeeInfos.push(employeeInfo);
  localStorage.setItem('employeeInfos', JSON.stringify(savedEmployeeInfos));
}

// 이미지 업로드 및 리스트에 추가
async function uploadImageAndAddToList(file, employeeInfo) {
  await initializeAWS();

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
  });

  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name,
  };

  try {
    const data = await myBucket.putObject(params).promise();

    console.log('업로드 완료', data);
    // 수정된 이미지 정보 표시
    displayEmployeeWithInfo(employeeInfo);
    saveEmployeeInfoToLocalstorage(employeeInfo);
    
  } catch (error) {
    console.error('업로드 실패', error);
  }
}

// 이미지 업데이트 및 리스트에 추가
async function updateImageAndAddToList(file, employeeInfo) {
  await initializeAWS();

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
  });

  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name,
  };

  try {
    const data = await myBucket.putObject(params).promise();

    console.log('업데이트 완료', data);
    saveEmployeeInfoToLocalstorage(employeeInfo);
    
  } catch (error) {
    console.error('업데이트 실패', error);
  }
}

// 페이지 로드 시 이미지 로드 후 표시
function loadImagesFromLocalstorage() {
  const savedImageNames = JSON.parse(localStorage.getItem('imageNames')) || [];
  savedImageNames.forEach(imageName => {
    displayEmployee(imageName);
  });
}

// localStorage에서 임직원 정보를 불러와서 페이지에 표시
function loadEmployeeInfosFromLocalstorage() {
  const savedEmployeeInfos = JSON.parse(localStorage.getItem('employeeInfos')) || [];
  savedEmployeeInfos.forEach(employeeInfo => {
    displayEmployeeWithInfo(employeeInfo);
  });
}

// 임직원 정보와 함께 임직원을 표시하는 함수
function displayEmployeeWithInfo(employeeInfo) {
  const tableRow = document.createElement('tr');
  tableRow.classList.add('trHover') // css 적용을 위해

  const checkboxCell = document.createElement('td');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('employee-checkbox');
  checkboxCell.appendChild(checkbox);
  tableRow.appendChild(checkboxCell);

  const imgCell = document.createElement('td');
  const imgElement = displayImage(employeeInfo.imageName);
  imgCell.appendChild(imgElement);
  tableRow.appendChild(imgCell);

  const nameCell = document.createElement('td');
  nameCell.innerText = employeeInfo.name;
  tableRow.appendChild(nameCell);

  const emailCell = document.createElement('td');
  emailCell.innerText = employeeInfo.email;
  tableRow.appendChild(emailCell);

  const phoneCell = document.createElement('td');
  phoneCell.innerText = employeeInfo.phone;
  tableRow.appendChild(phoneCell);

  const categoryCell = document.createElement('td');
  categoryCell.innerText = employeeInfo.category;
  tableRow.appendChild(categoryCell);

  const editCell = document.createElement('td');
  const editButton = document.createElement('button');
  editButton.innerText = '수정';
  editButton.classList.add('edit-button');
  editCell.appendChild(editButton);
  tableRow.appendChild(editCell);


  // 이벤트 핸들러 등록
  editButton.addEventListener('click', () => onEditEmployee(employeeInfo));

  employeeList.appendChild(tableRow);
}

// 이미지 정보를 지정한 인덱스에 삽입하는 함수
function insertEmployeeInfoAtIndex(employeeInfo, index) {
  const savedEmployeeInfos = JSON.parse(localStorage.getItem('employeeInfos')) || [];
  const currentIndex = savedEmployeeInfos.findIndex(info => info.imageName === employeeInfo.imageName);

  if (currentIndex === -1) {
    console.error('Employee info not found in the current list.');
    return;
  }

  savedEmployeeInfos.splice(currentIndex, 1); // 수정 전 데이터 삭제

  // 새로운 이미지 정보가 저장될 위치의 인덱스를 조정합니다.
  const insertIndex = Math.min(index, savedEmployeeInfos.length);
  savedEmployeeInfos.splice(insertIndex, 0, employeeInfo);
  localStorage.setItem('employeeInfos', JSON.stringify(savedEmployeeInfos));

}

// 현재 이미지 정보 배열을 가져오는 함수
function getCurrentEmployeeInfos() {
  const savedEmployeeInfos = JSON.parse(localStorage.getItem('employeeInfos')) || [];
  return savedEmployeeInfos;
}

// 이미지 정보 배열을 기반으로 이미지를 재배치하는 함수
function rearrangeEmployeeInfos(employeeInfos) {
  const employeeList = document.getElementById('employee-list');
  employeeList.innerHTML = ''; // 기존 목록을 모두 지움

  employeeInfos.forEach(employeeInfo => {
    displayEmployeeWithInfo(employeeInfo);
  });
 
}

async function onEditEmployee(employeeInfo) {
  const updatedImageFile = await selectImage(); // 이미지 선택 함수 호출

  if (updatedImageFile) {
    // 현재 이미지의 순서와 인덱스를 기록
    const currentEmployeeInfos = getCurrentEmployeeInfos();
    const currentIndex = currentEmployeeInfos.findIndex(info => info.imageName === employeeInfo.imageName);

    // 수정 전의 이미지를 S3에서 삭제
    await deleteImageFromS3(employeeInfo.imageName);

  // 수정된 이미지 업로드 및 정보 업데이트
  const updatedEmployeeInfo = {
    imageName: updatedImageFile.name,
    name: employeeInfo.name,
    email: employeeInfo.email,
    phone: employeeInfo.phone,
    category: employeeInfo.category,
  };

  try {
    await updateImageAndAddToList(updatedImageFile, updatedEmployeeInfo);
    
    // 기존 위치에서 삭제
    await deleteEmployeeInfoFromLocalStorage(employeeInfo);

    // 새로운 위치에 추가
    await insertEmployeeInfoAtIndex(updatedEmployeeInfo, currentIndex);


  } catch (error) {
    console.error('Failed to update employee info', error);
  }
}
}

function selectImage() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        resolve(selectedFile);
      } else {
        reject('No file selected');
      }
    };
    input.click();
  });
}

// form 제출 이벤트 핸들러
async function onFormSubmit(e) {
  e.preventDefault();

  const imageFile = document.getElementById('image').files[0];
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const category = document.getElementById('category').value;

  if (imageFile && name && email && phone && category) {
    const employeeInfo = {
      imageName: imageFile.name,
      name,
      email,
      phone,
      category,
    };

    try {
      await uploadImageAndAddToList(imageFile, employeeInfo);

    } catch (error) {
      console.error('Failed to upload employee info', error);
    }
  }
}

// TableRow 클릭 이벤트 핸들러 등록
function registerImageTdClickHandler() {
  const rows = document.querySelectorAll('tbody tr');

  rows.forEach(row => {
    // 체크박스 클릭 이벤트를 중단시킴
    const checkboxCell = row.querySelector('.employee-checkbox');
    checkboxCell.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    // 수정 버튼 클릭 이벤트를 중단시킴
    const editButton = row.querySelector('.edit-button');
    editButton.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    // 행 클릭 이벤트
    row.addEventListener('click', () => {
      const imageName = row.querySelector('img.employee-image').getAttribute('src').split('/').pop();
      const name = row.querySelector('td:nth-child(3)').textContent;
      const email = row.querySelector('td:nth-child(4)').textContent;
      const phone = row.querySelector('td:nth-child(5)').textContent;
      const category = row.querySelector('td:nth-child(6)').textContent;

      // 프로필 페이지로 데이터 전달 및 이동
      const profileUrl = `/profile.html?imageName=${imageName}&name=${name}&email=${email}&phone=${phone}&category=${category}`;
      window.location.href = profileUrl;
    });
  });
}

// 페이지 로드 시 실행
window.addEventListener('load', () => {
  initializeAWS();
  loadImagesFromLocalstorage();
  loadEmployeeInfosFromLocalstorage();
  registerImageTdClickHandler(); // TableRow 클릭 이벤트 핸들러 등록

  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', onFormSubmit);

  const selectAllCheckbox = document.getElementById('select-all-checkbox');
  selectAllCheckbox.addEventListener('change', onSelectAllCheckboxChange);
});

// 전체 체크박스 선택/해제 이벤트 핸들러
function onSelectAllCheckboxChange(event) {
  const isChecked = event.target.checked;
  const employeeCheckboxes = document.querySelectorAll('.employee-checkbox');
  
  employeeCheckboxes.forEach(checkbox => {
    checkbox.checked = isChecked;
  });
}

// env.json 파일 로드
fetch('/env.json')
  .then(response => response.json())
  .then(data => {
    // 로드한 JSON 데이터를 envVars 객체에 저장
    envVars.ACCESS_KEY = data.ACCESS_KEY;
    envVars.SECRET_ACCESS_KEY = data.SECRET_ACCESS_KEY;
  })
  .catch(error => {
    console.error('Failed to load env.json', error);
  });

// 임직원 삭제 버튼 클릭 이벤트 핸들러
const deleteEmployeeButton = document.getElementById('deleteEmployeeBtn');
deleteEmployeeButton.addEventListener('click', onDeleteEmployee);

// 선택한 임직원 삭제 함수
function onDeleteEmployee() {
  const checkboxes = document.querySelectorAll('.employee-checkbox');

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const employeeInfo = getEmployeeInfoFromCheckbox(checkbox);
      if (employeeInfo) {
        deleteEmployee(employeeInfo);
      }
    }
  });
}

// 체크박스로부터 임직원 정보 추출
function getEmployeeInfoFromCheckbox(checkbox) {
  const employeeRow = checkbox.closest('tr'); 
  if (employeeRow) {
    const imgElement = employeeRow.querySelector('.employee-image'); // .employee-image 클래스를 가진 엘리먼트 찾기
    if (imgElement) {
      const imageName = imgElement.getAttribute('src').split('/').pop();
      return findEmployeeInfoByImageName(imageName);
    }
  }
  return null;
}

// 이미지 이름을 기반으로 임직원 정보 찾기
function findEmployeeInfoByImageName(imageName) {
  const savedEmployeeInfos = JSON.parse(localStorage.getItem('employeeInfos')) || [];
  return savedEmployeeInfos.find(employeeInfo => employeeInfo.imageName === imageName);
}

// 임직원 삭제 함수
function deleteEmployee(employeeInfo) {
  const imageName = employeeInfo.imageName;

  // S3에서 이미지 삭제
  deleteImageFromS3(imageName);

  // LocalStorage에서 임직원 정보 삭제
  deleteEmployeeInfoFromLocalStorage(employeeInfo);

  // 화면에서 임직원 삭제
  removeEmployeeFromUI(imageName);
}

// S3에서 이미지 삭제
async function deleteImageFromS3(imageName) {
  await initializeAWS();

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: imageName,
  };

  try {
    const data = await myBucket.deleteObject(params).promise();
    console.log('이미지 삭제 완료', data);
  } catch (error) {
    console.error('이미지 삭제 실패', error);
  }
}

// LocalStorage에서 임직원 정보 삭제
function deleteEmployeeInfoFromLocalStorage(employeeInfo) {
  const savedEmployeeInfos = JSON.parse(localStorage.getItem('employeeInfos')) || [];
  const updatedEmployeeInfos = savedEmployeeInfos.filter(info => info.imageName !== employeeInfo.imageName);
  localStorage.setItem('employeeInfos', JSON.stringify(updatedEmployeeInfos));
}

// 화면에서 임직원 삭제
function removeEmployeeFromUI(imageName) {
  const employeeRow = document.querySelector(`tr img[src$="${imageName}"]`).closest('tr');
  if (employeeRow) {
    employeeRow.remove();
  }
}

