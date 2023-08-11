const express = require('express');
const app = express();
const s3ImageUploader = require('./middlewares/imageUploader');
const deleteImageFromS3 = require('./middlewares/deleteProfileImage');
const multer = require('multer');
const storage = multer.memoryStorage();
const imageGetter = require('./routes/imageGetter');
const memberGetter = require('./routes/memberGetter');
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use('/image', imageGetter);
app.use('/member', memberGetter);
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 회원 등록 및 이미지 파일 업로드 및 URL 업데이트
app.post('/member/register', s3ImageUploader.single('profileImage'), async (req, res) => {
  console.log('req.body');
  console.log(req.body);
  console.log('req.file');
  console.log(req.file);
  let imgUrl = '';
  let imgKey = '';
  try {
    if (req.file) {
      imgUrl = req.file.location;
      imgKey = req.file.key;
    }

    res.json({ message: 'Member registered successfully.', member: req.body, profileImage: { imgUrl, imgKey } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering member' });
  }
});

app.delete('/member/deleteImage', async (req, res) => {
  const imgKey = req.params.imgKey;

  try {
    await deleteImageFromS3(imgKey);
    res.json({ message: 'Image deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
