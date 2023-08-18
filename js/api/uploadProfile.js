import { accessKeyId, accessKey } from "/js/config/key.js";

import { bucketName, region } from "/js/constant/aws.js";

import {
  enroll_photo,
  enroll_name,
  enroll_email,
  enroll_phoneNum,
  enroll_position,
} from "../constant/home.js";

AWS.config.update({
  region,
  credentials: new AWS.Credentials(accessKeyId, accessKey),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
});

async function fetchImageAndAssignBlob(url) {
  // assets 폴더 내부의 기본 이미지 blob 객체로 변환
  // s3버킷으로 기본 프로필 이미지 전송 시 사용
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

export const uploadProfileToS3 = async function (e) {
  e.preventDefault();

  let photo = enroll_photo.files[0]
    ? enroll_photo.files[0]
    : await fetchImageAndAssignBlob("/assets/img/profile.jpeg"); // 업로드된 이미지가 없을 시 기본 프로필 이미지 할당

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
      alert("모든 정보를 기입하셔야합니다.");
      console.error(err);
    }
  };

  upload();
};
