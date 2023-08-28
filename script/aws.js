// import AWSKeys from './key.js';
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env; 

function onFileUpload(e) {
    const S3_BUCKET = 'employee-management-picture';

    const AWS_CONFIG = {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
        region: 'ap-northeast-2'
    };

    // AWS SDK를 사용하여 인증 정보를 설정하고 서비스에 연결
    AWS.config.update(AWS_CONFIG);

    const s3 = new AWS.S3();

    const file = e.target.files[0];

    // 파일과 파일이름을 넘겨주면 됩니다.
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };

    s3.putObject(params)
        .on('httpUploadProgress', (evt) => {
            alert("UPLOAD SUCCESS")
        })
        .send((err) => {
            if (err) console.log(err)
        })
}

document.getElementById('photo').addEventListener('change', onFileUpload);