const express = require('express');

const router = express.Router();
const ctrl = require('./member.ctrl');
const s3UploadProfileImage = require('../../middlewares/s3UploadProfileImage');

// 메인페이지
router.get('/', ctrl.view.index);
// 멤버 리스트
router.get('/member/getMembers', ctrl.process.getMembers);
// 멤버 등록 페이지
router.get('/member/newMember', ctrl.view.newMember);

// 멤버 등록
router.post('/member/registerMember', ctrl.process.registerMember);
// 멤버 정보
router.post('/member/getMemberInfo', ctrl.process.getMemberInfo);
// 멤버 정보 수정
router.post('/member/updateMember', ctrl.process.updateMember);
// 멤버 삭제
router.post('/member/deleteMember', ctrl.process.deleteMember);
// 프로필 이미지 업로드 & 프로필 url 업데이트
router.post(
  '/member/uploadProfileImage',
  s3UploadProfileImage.single('profileImage'),
  ctrl.process.uploadProfileImage,
);
// 프로필 이미지 삭제 & 프로필 url 업데이트
router.post('/member/deleteProfileImage', ctrl.process.deleteProfileImage);

module.exports = router;
