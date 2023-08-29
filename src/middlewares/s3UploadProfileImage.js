const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const AWS = require('../config/awsConfig');

dotenv.config();

const s3 = new AWS.S3();

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

const s3ImageUploader = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      const id = req.body.id || 'default';
      const directory = `${id}/profileImage`;
      const mimeType = file.mimetype;
      const extension = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extension);

      if (!allowedMimeTypes.includes(mimeType)) {
        const error = new Error('invalid file type');
        error.status = 400;
        return cb(error);
      }
      return cb(
        null,
        `${directory}/${basename}${new Date().getTime()}${extension}`,
      );
    },
    acl: 'public-read',
  }),
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB
  },
});

module.exports = s3ImageUploader;
