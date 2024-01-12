const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const { fetchSettings, fetchArchiveFiles, findEmailFullname, sendEmail, confirmCode, newPassword } = require('../controllers/PublicControllers');

const router = express.Router();

router.get('/fetch-settings', fetchSettings);
router.get('/fetch-archive', fetchArchiveFiles);
router.post('/find-account', findEmailFullname);
router.post('/send-email', sendEmail);
router.post('/confirm-code', confirmCode);
router.post('/new-password', newPassword);

module.exports = router;

