let albumBucketName = import.meta.env.VITE_BUCKET_NAME;

AWS.config.region = import.meta.env.VITE_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
});

let s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName },
});

export const generateAlbumImg = (album, userName, albumName) => {
  s3.listObjects(
    { Prefix: userName + "/" + albumName + "/" },
    function (err, data) {
      if (err) {
        return alert("앨범 메인 이미지 로딩 오류: " + err.message);
      } else {
        // console.log(data);
        let href = this.request.httpRequest.endpoint.href;
        let bucketUrl = href + albumBucketName + "/";
        if (!data.Contents[1]) {
          album.style.backgroundImage = "url('./images/album.png')";
        } else {
          let photoKey = data.Contents[1].Key;
          let photoUrl = bucketUrl + encodeURIComponent(photoKey);
          album.style.backgroundImage = `url(${photoUrl})`;
        }
      }
    }
  );
};

export const getUserAlbumData = async (userName) => {
  return new Promise((res, rej) => {
    let albumPhotosKey = encodeURIComponent(userName) + "/";
    s3.listObjectsV2(
      { Prefix: albumPhotosKey, Delimiter: "/" },
      function (err, data) {
        if (err) {
          rej("앨범 목록 생성 오류: " + err.message);
        } else {
          res(data);
        }
      }
    );
  });
};

export const imageUpload = (userName, albumName, img, file) => {
  return new Promise((res, rej) => {
    s3.upload(
      {
        Key: userName + "/" + albumName + "/" + img,
        Body: file,
      },
      (err, data) => {
        if (err) {
          rej("이미지 업로드 오류:", err);
        } else {
          res("업로드 성공:", data.Location);
        }
      }
    );
  });
};

export const deleteImg = (userName, albumName, img) => {
  return new Promise((res, rej) => {
    s3.deleteObject(
      {
        Key: userName + "/" + albumName + "/" + img,
      },
      (err) => {
        if (err) {
          rej("이미지 삭제 오류:", err);
        } else {
          res("삭제 성공");
        }
      }
    );
  });
};

export const getProfileImg = async (userName) => {
  return new Promise((res, rej) => {
    let albumPhotosKey = encodeURIComponent(userName) + "/";
    s3.listObjectsV2(
      { Prefix: albumPhotosKey, Delimiter: "/" },
      function (err, data) {
        if (err) {
          rej("프로필 출력 오류: " + err.message);
        } else {
          if (!data.Contents[1]) {
            res("./images/user.png");
          } else {
            let href = this.request.httpRequest.endpoint.href;
            let bucketUrl = href + albumBucketName + "/";
            let photoKey = data.Contents[1].Key;
            let photoUrl = bucketUrl + encodeURIComponent(photoKey);
            res(photoUrl);
          }
        }
      }
    );
  });
};

export const profileUpload = (userName, file, img) => {
  return new Promise((res, rej) => {
    s3.upload(
      {
        Key: userName + "/" + img,
        Body: file,
      },
      (err, data) => {
        if (err) {
          rej("이미지 업로드 오류:", err);
        } else {
          res("업로드 성공:", data.Location);
        }
      }
    );
  });
};

export const profileDelete = (userName, img) => {
  return new Promise((res, rej) => {
    s3.deleteObject(
      {
        Key: userName + "/" + img,
      },
      (err) => {
        if (err) {
          rej("이미지 삭제 오류:", err);
        } else {
          res("삭제 성공");
        }
      }
    );
  });
};

export const getAlbumImgData = (userName, albumName) => {
  return new Promise((res, rej) => {
    s3.listObjectsV2(
      {
        Prefix: userName + "/" + albumName + "/",
      },
      function (err, data) {
        if (err) {
          rej("이미지 로딩 오류: " + err.message);
        } else {
          res(data);
        }
      }
    );
  });
};
