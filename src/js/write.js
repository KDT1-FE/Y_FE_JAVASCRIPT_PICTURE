import AWS from 'aws-sdk';

const writeName = document.getElementById('name');
const writeEmail = document.getElementById('email');
const writePhone = document.getElementById('phone');
const writeAddress = document.getElementById('address');
const writeImageUrl = document.getElementById('image');
const submitBtn = document.getElementById('submit-button');
const errorName = document.querySelector('.error-name');
const errorEmail = document.querySelector('.error-email');
const errorPhone = document.querySelector('.error-phone');
const errorAddress = document.querySelector('.error-address');
const errorFile = document.querySelector('.error-file');
let uploadFile;
let infos = [];
let isBoolean;

// localStorage 안에 값이 있는지 확인하고 있다면 값 보존
let getItem = localStorage.getItem('infos');

if (getItem) {
  getItem = JSON.parse(getItem);

  getItem.forEach((item) => {
    infos.push(item);
  });
}

writeImageUrl.addEventListener('change', uploadFileChange);
submitBtn.addEventListener('click', createStaff);

// input 입력 유효성 검사
function isInputValid() {
  isBoolean = false;
  if (!writeName.value) {
    errorName.classList.add('active');
  } else {
    errorName.classList.remove('active');
  }
  if (!writeEmail.value) {
    errorEmail.classList.add('active');
  } else {
    errorEmail.classList.remove('active');
  }
  if (!writePhone.value) {
    errorPhone.classList.add('active');
  } else {
    errorPhone.classList.remove('active');
  }
  if (!writeAddress.value) {
    errorAddress.classList.add('active');
  } else {
    errorAddress.classList.remove('active');
  }
  if (!uploadFile) {
    errorFile.classList.add('active');
  } else {
    errorFile.classList.remove('active');
  }
  if (writeName.value && writeEmail.value && writePhone.value && writeAddress.value && uploadFile) isBoolean = true;
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
  if (!isBoolean) return;

  onFileUpload();

  // 새로운 아이템 생성
  const item = {
    id: new Date().getTime(),
    name: writeName.value,
    email: writeEmail.value,
    phone: writePhone.value,
    address: writeAddress.value,
    imageUrl: `https://hong-upload-image.s3.ap-northeast-2.amazonaws.com/${uploadFile.name}`
  };

  writeName.value = '';
  writeEmail.value = '';
  writePhone.value = '';
  writeAddress.value = '';
  writeImageUrl.value = '';

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
