import {
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
} from "/js/config/aws.js";

import {
  enroll_photo,
  enroll_name,
  enroll_email,
  enroll_phoneNum,
  enroll_position,
} from "../constant/home.js";

AWS.config.update({
  region,
  credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
});

export const uploadProfileToS3 = function (e) {
  e.preventDefault();
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
};
