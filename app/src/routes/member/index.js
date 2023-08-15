'user strict';

const express = require('express');

const router = express.Router();
const ctrl = require('./member.ctrl');

router.get('/', ctrl.member);

router.get('/member', ctrl.newMember);

module.exports = router;
