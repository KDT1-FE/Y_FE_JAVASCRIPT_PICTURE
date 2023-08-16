import {
  S3endpoint,
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
} from "../config/aws.js";

AWS.config.update({
  region,
  credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
});

export const getProfile = () => {
  s3.listObjectsV2({ Bucket: bucketName }, (err, data) => {
    if (err) {
      console.err(err);
    } else {
      console.log(data);
    }
  });

  const key = localStorage.getItem("profile");
  const photo = document.getElementById("profile-photo");
  photo.src = S3endpoint + "/" + key + "/profile_photo";

  s3.getObject(
    { Bucket: bucketName, Key: `${key}/profile_detail` },
    (err, data) => {
      let info = JSON.parse(data.Body.toString());
      for (let key in info) {
        let obj = document.getElementsByClassName(`profile__${key}`)[0];
        let detail = document.createElement("span");
        detail.innerText = info[key];
        obj.appendChild(detail);
      }
    }
  );
};

getProfile();
