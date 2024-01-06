const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const { chatRequest } = require('../controllers/ChatbotController');

const router = express.Router();

router.post('/chat-request', verifyToken, chatRequest);

module.exports = router;

