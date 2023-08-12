// putFile 함수를 정의하고 업로드할 이미지 파일을 매개변수 file로 받는다.
const putFile = file => {
    const albumBucketName = 'js-employee-bucket'; // S3의 버킷 이름
    const region = 'ap-northeast-2'; // 서울
    // const accessKeyId = '    '; // IAM에서 생성한 사용자의 accessKeyId
    // const secretAccessKey = '    '; // IAM에서 생성한 사용자의 secretAccessKey
    
    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey
    }); 
    
    // 업로드를 관리하는 'upload' 객체를 생성하고
    // 업로드할 이미지 파일의 정보와 업로드 옵션을 설정한다. 
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: file.name,
        Body: file,
        ACL: "public-read"
      }
    });
    
    // 'upload' 객체의 업로드 작업을 수행하는 프로미스 생성
    const promise = upload.promise();
  

    // 업로드 작업의 프로미스가 성공하면 첫 번째 콜백함수가 호풀되어 콘솔에 출력
    // 작업이 실패하면 두 번째 콜백 함수가 호출되어 에러메시지와 함께 에러 내용 콘솔 출력
    promise.then(
      function(data) {
        console.log("Successfully uploaded photo.");
      },
      function(err) {
        return console.log("There was an error uploading your photo: ", err.message);
      }
    );
  };