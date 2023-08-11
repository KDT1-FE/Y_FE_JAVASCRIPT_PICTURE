const AWS = require('../awsConfig');

const s3 = new AWS.S3();

function deleteImageFromS3(imgKey) {
  console.log('[deleteImageFromS3] imgKey : ', imgKey);

  if (imgKey) {
    s3.deleteObject(
      {
        bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: imgKey,
      },
      (err, data) => {
        if (err) {
          throw err;
        }
      }
    );
  }
}

module.exports = deleteImageFromS3;
