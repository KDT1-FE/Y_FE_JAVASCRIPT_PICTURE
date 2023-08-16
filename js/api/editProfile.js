import {
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
} from "/js/config/aws.js";

import {
  edit_photo,
  edit_name,
  edit_email,
  edit_phoneNum,
  edit_position,
} from "../constant/profile.js";

AWS.config.update({
  region,
  credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
});

export const editProfile = function (e) {
  e.preventDefault();
  const photo = edit_photo.files[0]; // 수정할 프로필 사진

  const profileInfo = {
    name: edit_name.value,
    email: edit_email.value,
    phoneNum: edit_phoneNum.value,
    position: edit_position.value,
  }; // 사진을 제외한 프로필 정보

  const key = localStorage.getItem("profile");
  const folerPath = `${key}/`; // 사진과 정보가 들어갈 S3폴더명(로컬스토리지)

  const params_photo = photo
    ? {
        Bucket: bucketName,
        Key: folerPath + "profile_photo",
        Body: photo,
      }
    : null; // 수정할 사진이 채워지지 않을 경우 null;

  const params_info = {
    Bucket: bucketName,
    Key: folerPath + "profile_detail",
    Body: JSON.stringify(profileInfo),
  };

  const edit = async () => {
    try {
      params_photo ? await s3.upload(params_photo).promise() : null;
      console.log("photo edit complete");
      await s3.upload(params_info).promise();
      console.log("info edit complete");
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  edit();
};
