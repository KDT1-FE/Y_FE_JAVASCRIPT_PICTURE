const AmazonS3URI = require('amazon-s3-uri');
const AWS = require('../config/awsConfig');

const s3 = new AWS.S3();

function deleteImageFromS3(uri) {
  return new Promise((resolve, reject) => {
    if (!uri) {
      resolve();
      return;
    }

    const { key: imgKey } = AmazonS3URI(uri);

    if (imgKey) {
      s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: imgKey,
      })
        .promise()
        .then(() => resolve())
        .catch((err) => reject(err));
    } else {
      reject(new Error('Failed to extract key from S3 URI'));
    }
  });
}

function deleteImagesFromS3(uris) {
  return Promise.all(uris.map((uri) => deleteImageFromS3(uri)));
}

module.exports = deleteImagesFromS3;
