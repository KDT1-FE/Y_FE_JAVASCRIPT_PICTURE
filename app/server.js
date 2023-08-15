'user strict';

const express = require('express');

const cors = require('cors');

const app = express();
const s3ImageUploader = require('./src/middlewares/imageUploader');
const deleteImageFromS3 = require('./src/middlewares/deleteProfileImage');
const member = require('./src/routes/member');

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(cors());

console.log('@@@@@@@@@@');
console.log(`${__dirname}`);

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', member);
app.use('/member', member);

// 회원 등록 및 이미지 파일 업로드 및 URL 업데이트
app.post(
  '/member/register',
  s3ImageUploader.single('profileImage'),
  async (req, res) => {
    let imgUrl = '';
    let imgKey = '';
    try {
      if (req.file) {
        imgUrl = req.file.location;
        imgKey = req.file.key;
      }

      res.json({
        message: 'Member registered successfully.',
        member: req.body,
        profileImage: { imgUrl, imgKey },
      });
    } catch (error) {
      res.status(500).json({ error: 'Error registering member' });
    }
  },
);

// 이미지 삭제
app.post('/deleteImage/', async (req, res) => {
  const { imgKey } = req.body.imgKey;

  try {
    await deleteImageFromS3(imgKey);

    res.json({ message: 'Image deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting image' });
  }
});

module.exports = app;
