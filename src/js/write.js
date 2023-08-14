import AWS from 'aws-sdk';

const element = ['name', 'email', 'phone', 'address', 'image'];
const write = {};
const errorMessage = {};
const successMessage = {};
const getAddressBtn = document.getElementById('get-address-btn');
const submitBtn = document.getElementById('submit-button');
let getItem = localStorage.getItem('infos');
let uploadFile;
let infos = [];
let isValid;
element.forEach((el) => {
  errorMessage[el] = document.getElementById(`${el}-error-message`);
  successMessage[el] = document.getElementById(`${el}-success-message`);
  write[el] = document.getElementById(el);
});

write['address'].disabled = true;

// localStorage 안에 값이 있는지 확인하고 있다면 값 보존
if (getItem) {
  getItem = JSON.parse(getItem);
  getItem.forEach((item) => {
    infos.push(item);
  });
}

write['image'].addEventListener('change', uploadFileChange);
getAddressBtn.addEventListener('click', getAddress);
submitBtn.addEventListener('click', createStaff);
write['name'].addEventListener('blur', getNameMessage);
write['email'].addEventListener('blur', getEmailMessage);
write['phone'].addEventListener('blur', getPhoneMessage);

// 이름 유효성 검사
function getNameMessage() {
  if (!write['name'].value) {
    errorMessage['name'].classList.add('active');
    successMessage['name'].classList.remove('active');
    errorMessage['name'].innerText = '이름을 작성해주세요.';
    isValid = false;
  } else {
    errorMessage['name'].classList.remove('active');
    successMessage['name'].classList.add('active');
    successMessage['name'].innerText = 'Success!';
  }
}

function getEmailMessage() {
  if (!write['email'].value) {
    errorMessage['email'].classList.add('active');
    successMessage['email'].classList.remove('active');
    errorMessage['email'].innerText = '이메일을 작성해주세요.';
    isValid = false;
  } else if (!write['email'].value.includes('@')) {
    errorMessage['email'].classList.add('active');
    successMessage['email'].classList.remove('active');
    errorMessage['email'].innerText = '이메일을 형식에 맞춰 작성해주세요.';
    isValid = false;
  } else {
    errorMessage['email'].classList.remove('active');
    successMessage['email'].classList.add('active');
    successMessage['email'].innerText = 'Success';
  }
}

function getPhoneMessage() {
  if (!write['phone'].value) {
    errorMessage['phone'].classList.add('active');
    successMessage['phone'].classList.remove('active');
    errorMessage['phone'].innerText = '휴대폰 번호를 입력해주세요.';
    isValid = false;
  } else if (write['phone'].value.length !== 11) {
    errorMessage['phone'].classList.add('active');
    successMessage['phone'].classList.remove('active');
    errorMessage['phone'].innerText = '휴대폰 번호 11자리를 입력해주세요.';
    isValid = false;
  } else {
    errorMessage['phone'].classList.remove('active');
    successMessage['phone'].classList.add('active');
    successMessage['phone'].innerText = 'Success';
  }
}

// input 입력 유효성 검사
function isInputValid() {
  isValid = true;
  // 이름 검사
  getNameMessage();
  // 이메일 검사
  getEmailMessage();
  // 휴대폰 번호 검사
  getPhoneMessage();

  // 주소 검사
  if (!write['address'].value) {
    errorMessage['address'].classList.add('active');
    successMessage['address'].classList.remove('active');
    errorMessage['address'].innerText = '주소를 입력해주세요.';
    isValid = false;
  } else {
    errorMessage['address'].classList.remove('active');
    successMessage['address'].classList.add('active');
    successMessage['address'].innerText = 'Success';
  }
  // 이미지 업로드 검사
  if (!uploadFile) {
    errorMessage['image'].classList.add('active');
    successMessage['image'].classList.remove('active');
    errorMessage['image'].innerText = '이미지를 업로드해주세요.';
    isValid = false;
  } else {
    errorMessage['image'].classList.remove('active');
    successMessage['image'].classList.add('active');
    successMessage['image'].innerText = 'Success';
  }
}

// 주소 찾기 API
function getAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      write['address'].value = data.address;
    }
  }).open();
}

// uploadFile 변경 함수
function uploadFileChange(e) {
  uploadFile = e.target.files[0];
}

// 이미지 버킷에 업로드하는 함수
async function onFileUpload() {
  const ACCESS_KEY = 'AKIA2NGSQAWSFPZMK367';
  const SECRET_ACCESS_KEY = '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';
  const REGION = 'ap-northeast-2';
  const S3_BUCKET = 'hong-upload-image';

  // AWS ACCESS KEY를 세팅합니다.
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  });

  // 버킷에 맞는 이름과 리전을 설정합니다.
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION
  });

  const file = uploadFile;

  // 파일과 파일이름을 넘겨주면 됩니다.
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name
  };

  myBucket
    .putObject(params)
    .on('httpUploadProgress', (evt) => {
      console.log('success');
    })
    .send((err) => {
      if (err) console.log(err);
    });
}

//임직원 등록 함수
function createStaff() {
  isInputValid();
  if (!isValid) return;

  onFileUpload();

  const phone1 = write['phone'].value.slice(0, 3);
  const phone2 = write['phone'].value.slice(3, 7);
  const phone3 = write['phone'].value.slice(7);

  // 새로운 아이템 생성
  const item = {
    id: new Date().getTime(),
    name: write['name'].value,
    email: write['email'].value,
    phone: `${phone1}-${phone2}-${phone3}`,
    address: write['address'].value,
    imageUrl: `https://hong-upload-image.s3.ap-northeast-2.amazonaws.com/${uploadFile.name}`
  };

  infos.push(item);
  saveToLocalStorage();
  saveToLatelyLocalStorage(item);

  alert('등록이 완료되었습니다.');
  location.href = '/profile.html';
}

function saveToLatelyLocalStorage(item) {
  const data = JSON.stringify(item);

  localStorage.setItem('lately-info', data);
}

function saveToLocalStorage() {
  const data = JSON.stringify(infos);

  localStorage.setItem('infos', data);
}
