const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const { chatRequest, fetchChatbotMessages } = require('../controllers/ChatbotController');

const router = express.Router();

router.post('/chat-request', verifyToken, chatRequest);
router.post('/get-chatbot-messages', verifyToken, fetchChatbotMessages);

module.exports = router;

