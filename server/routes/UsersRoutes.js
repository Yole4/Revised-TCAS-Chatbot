const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const multer = require('multer');

const router = express.Router();

const {protected, loginUser, registerUser, loginGoogle, registerGoogle} = require('../controllers/UsersController');

// auto image upload
const imageUpload = multer({
    dest: 'assets/image upload/',
});

router.get('/protected', verifyToken, protected);
router.post('/login', loginUser);
router.post('/register', imageUpload.single('image'), registerUser);
router.post('/login-google', loginGoogle);
router.post('/register-google', registerGoogle);

module.exports = router;

