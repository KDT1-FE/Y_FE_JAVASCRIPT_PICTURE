let albumBucketName = import.meta.env.VITE_BUCKET_NAME;

AWS.config.region = import.meta.env.VITE_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
});

let s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName },
});

export const addUser = (albumName) => {
  return new Promise((res, rej) => {
    albumName = albumName.trim();
    let albumKey = encodeURIComponent(albumName);
    s3.headObject({ Key: albumKey + "/" }, function (err, data) {
      if (!err) {
        rej("존재하는 아이디");
      }
      if (err.code !== "NotFound") {
        rej("유저 생성 오류: " + err.message);
      }
      s3.putObject({ Key: albumKey + "/" }, function (err, data) {
        if (err) {
          rej("유저 생성 오류: " + err.message);
        }
        res("생성 완료!!");
      });
    });
  });
};

export const addUserAlbum = (albumName, userId) => {
  return new Promise((res, rej) => {
    userId = userId.trim();
    let userIdKey = encodeURIComponent(userId);
    s3.headObject({ Key: userIdKey + "/" + albumName + "/" }, function (err) {
      if (!err) {
        alert("이미 존재하는 앨범 이름 입니다.");
        rej("이미 존재하는 앨범 이름 입니다.");
      }
      if (err.code !== "NotFound") {
        rej("앨범 생성 오류: " + err.message);
      }
      s3.putObject({ Key: userIdKey + "/" + albumName + "/" }, function (err) {
        if (err) {
          rej("앨범 생성 오류: " + err.message);
        }
        res("생성 완료!!");
      });
    });
  });
};

export const deleteUserAlbum = (albumName, userId) => {
  return new Promise((res, rej) => {
    userId = userId.trim();
    let userIdKey = encodeURIComponent(userId);
    s3.listObjects(
      { Prefix: userIdKey + "/" + albumName + "/" },
      function (err, data) {
        if (err) {
          rej("앨범 삭제 오류: ", err.message);
        }
        let objects = data.Contents.map(function (object) {
          return { Key: object.Key };
        });
        s3.deleteObjects(
          {
            Delete: { Objects: objects, Quiet: true },
          },
          function (err) {
            if (err) {
              rej("앨범 삭제 오류: ", err.message);
            }
            res("삭제 완료!!");
          }
        );
      }
    );
  });
};

export const addUserData = (json) => {
  return new Promise((res, rej) => {
    s3.upload(
      { Key: "users.json", Body: json, ContentType: "application/json" },
      (err) => {
        if (err) {
          console.error("유저 데이터 입력 오류:", err);
          rej(err);
        } else {
          console.log("json");
          res();
        }
      }
    );
  });
};

export const deleteUserData = (albumName) => {
  return new Promise((res, rej) => {
    let albumKey = encodeURIComponent(albumName) + "/";
    s3.listObjects({ Prefix: albumKey }, function (err, data) {
      if (err) {
        rej("유저 삭제 오류: ", err.message);
      }
      let objects = data.Contents.map(function (object) {
        return { Key: object.Key };
      });
      s3.deleteObjects(
        {
          Delete: { Objects: objects, Quiet: true },
        },
        function (err) {
          if (err) {
            rej("유저 삭제 오류: ", err.message);
          }
          console.log("album");
          res();
        }
      );
    });
  });
};

// export const addDefaultData = (json) => {
//   const body = JSON.stringify([]);
//   s3.upload(
//     { Key: "users.json", Body: body, ContentType: "application/json" },
//     (err, data) => {
//       if (err) {
//         console.error("Error creating new JSON:", err);
//       } else {
//         console.log("New JSON created:", data.Location);
//       }
//     }
//   );
// };

// addDefaultData();
