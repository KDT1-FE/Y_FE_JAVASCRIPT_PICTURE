import { accessKeyId, secretAccessKey } from "/js/config/key.js";

import { bucketName, region } from "/js/constant/aws.js";
t;
AWS.config.update({
  region,
  credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
});

const key = localStorage.getItem("profile");
const params01 = {
  Bucket: bucketName,
  Key: `${key}/profile_photo`,
};
const params02 = {
  Bucket: bucketName,
  Key: `${key}/profile_detail`,
};

export const deleteProfile = async function () {
  try {
    await s3.deleteObject(params01).promise();
    console.log("photo deleteted");
    await s3.deleteObject(params02).promise();
    console.log("info deleteted");
    window.location.href = window.location.origin;
  } catch (error) {
    console.error(error);
  }
};
