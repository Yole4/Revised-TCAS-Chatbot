const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const { fetchSettings, fetchArchiveFiles } = require('../controllers/PublicControllers');

const router = express.Router();

router.get('/fetch-settings', fetchSettings);
router.get('/fetch-archive', fetchArchiveFiles);

module.exports = router;

