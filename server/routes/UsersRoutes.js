const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const multer = require('multer');

const router = express.Router();

const {protected, loginUser, registerUser, loginGoogle, registerGoogle, autoImageUpload, getUserCredentials, changePassword, updateProfileName} = require('../controllers/UsersController');

// auto image upload
const imageUpload = multer({
    dest: 'assets/image upload/',
});

router.get('/protected', verifyToken, protected);
router.post('/login', loginUser);
router.post('/register', imageUpload.single('image'), registerUser);
router.post('/login-google', loginGoogle);
router.post('/register-google', registerGoogle);
router.post('/image-upload', imageUpload.single('image'), verifyToken, autoImageUpload);
router.post('/get-user-credentials', verifyToken, getUserCredentials);
router.post('/change-password', verifyToken, changePassword);
router.post('/update-profile', verifyToken, updateProfileName);

module.exports = router;

