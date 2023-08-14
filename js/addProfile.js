import {
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
  S3endpoint,
} from "/js/config/aws.js";

import {
  btn_openEnrollForm,
  enrollForm,
  btn_addProfile,
  btn_closeEnrollForm,
  enroll_photo,
  enroll_name,
  enroll_email,
  enroll_phoneNum,
  enroll_position,
} from "/js/constant.js";

AWS.config.update({
  region,
  credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
});

btn_openEnrollForm.addEventListener("click", openForm); // 프로필 등록 폼 열기
btn_closeEnrollForm.addEventListener("click", closeForm); // 프로필 등록 폼 닫기
enroll_photo.addEventListener("change", previewImg); // 이미지 프리뷰
btn_addProfile.addEventListener("click", uploadProfileToS3); // s3로 프로필업로드

function previewImg() {
  const imageSrc = URL.createObjectURL(enroll_photo.files[0]);
  document.getElementById("preview").src = imageSrc;
}

function openForm(e) {
  e.preventDefault();
  enrollForm.style.display = "flex";
}

function closeForm(e) {
  e.preventDefault();
  enrollForm.style.display = "none";
}

function uploadProfileToS3(event) {
  event.preventDefault();
  const photo = enroll_photo.files[0]; // 업로드할 프로필 사진
  const profileInfo = {
    name: enroll_name.value,
    email: enroll_email.value,
    phoneNum: enroll_phoneNum.value,
    position: enroll_position.value,
  }; // 사진을 제외한 프로필 정보

  const folerPath = `${profileInfo.name}/`; // 사진과 정보가 들어갈 S3폴더명(일단 이름으로)

  const params_photo = {
    Bucket: bucketName,
    Key: folerPath + "profile_photo",
    Body: photo,
  };

  const params_info = {
    Bucket: bucketName,
    Key: folerPath + "profile_detail",
    Body: JSON.stringify(profileInfo),
  };

  const upload = async () => {
    try {
      await s3.upload(params_photo).promise();
      console.log("photo uploaded");
      await s3.upload(params_info).promise();
      console.log("info uploaded");
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  upload();
}
