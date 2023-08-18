const express = require('express');

const router = express.Router();
const ctrl = require('./member.ctrl');
const s3UploadProfileImage = require('../../middlewares/s3UploadProfileImage');

// 메인페이지
router.get('/', ctrl.view.index);
// 직원 리스트
router.get('/member/getMembers', ctrl.process.getMembers);
// 직원 등록 페이지
router.get('/member/newMember', ctrl.view.newMember);
// 직원 정보 수정
router.get('/member/editMember/:id', ctrl.view.editMember);
// 직원 정보 조회
router.get('/member/getMemberInfo/:id', ctrl.process.getMemberInfo);

// 직원 등록
router.post('/member/registerMember', ctrl.process.registerMember);
// 직원 정보 업데이트
router.post('/member/updateMember', ctrl.process.updateMember);
// 직원 정보 수정
router.post(
  '/member/editMember',
  s3UploadProfileImage.none(),
  ctrl.process.editMember,
);
// s3 업로드 후 정보 수정
router.post(
  '/member/uploadS3andEditMember',
  s3UploadProfileImage.single('profileImage'),
  ctrl.process.uploadS3andEditMember,
);

// 직원 삭제
router.post('/member/deleteMember', ctrl.process.deleteMember);
// 프로필 이미지 업로드 & 프로필 url 업데이트
router.post(
  '/member/uploadProfileImage',
  s3UploadProfileImage.single('profileImage'),
  ctrl.process.uploadProfileImage,
);
// 프로필 이미지 삭제 & 프로필 url 업데이트
router.post('/member/deleteProfileImage', ctrl.process.deleteProfileImage);

// 직원 단일 삭제
router.delete('/member/deleteMember/:id', ctrl.process.deleteSingleMember);

module.exports = router;
