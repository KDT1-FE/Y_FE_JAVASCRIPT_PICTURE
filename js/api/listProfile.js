import {
  bucketName,
  region,
  accessKeyId,
  secretAccessKey,
  S3endpoint,
} from "/js/config/aws.js";

import { profileTable } from "../constant.js";

AWS.config.update({
  region,
  credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
});

export const listProfileFromS3 = function () {
  // 프로필 리스트 가져오기
  s3.listObjectsV2({ Bucket: bucketName }, (err, data) => {
    if (err) {
      console.err(err);
    } else {
      data.Contents.forEach((object) => {
        // 각 프로필 정보에 접근

        const tableRow = document.createElement("div"); // 프로필 이미지 & 인적사항 담을 테이블열 생성
        tableRow.classList.add("member-info__main");
        profileTable.appendChild(tableRow);

        let key = object.Key;
        let folderName = key.split("/")[0];
        let fileName = key.split("/")[1];

        if (fileName == "profile_photo") {
          // 1. 사진 가져오기
          const photoContainer = document.createElement("div");
          photoContainer.classList.add("member-info__img");
          tableRow.prepend(photoContainer);

          const photo = document.createElement("img");
          photo.style = "width:200px; height:auto";
          photo.src = `${S3endpoint}/${folderName}/profile_photo`;
          photoContainer.appendChild(photo);

          // 2. 인적사항 가져오기
          s3.getObject(
            { Bucket: bucketName, Key: `${folderName}/profile_detail` },
            (err, data) => {
              let info = JSON.parse(data.Body.toString());
              for (let key in info) {
                const container = document.createElement("div");
                container.classList.add(`member-info__${key}`);
                container.innerText = info[key];
                tableRow.appendChild(container);
              }
            }
          );

          tableRow.addEventListener("click", (e) => {
            localStorage.setItem("profile", folderName);
            window.location.href =
              window.location.origin + "/view/profile.html"; // 페이지 이동
          });
        }
      });
    }
  });
};
