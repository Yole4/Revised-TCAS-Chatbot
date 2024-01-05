const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const multer = require('multer');

const { addNewArchiveFile, fetchDepartment, addDepartment, editDepartment, deleteDepartment, fetchCourse, editCourse, deleteCourse, addCourse, fetchSchoolYear, addSY, editSY, deleteSY, fetchUsers, deleteUser, updateSettings, updateSystemLogo, updateSystemCover } = require('../controllers/AdminController');

const router = express.Router();

const settingsUpload = multer({
    dest: 'assets/settings image/',
});

router.post('/add-new-archive', verifyToken, addNewArchiveFile);
router.get('/fetch-department', verifyToken, fetchDepartment);
router.post('/add-department', verifyToken, addDepartment);
router.post('/edit-department', verifyToken, editDepartment);
router.post('/delete-department', verifyToken, deleteDepartment);
router.get('/fetch-course', verifyToken, fetchCourse);
router.post('/edit-course', verifyToken, editCourse);
router.post('/delete-course', verifyToken, deleteCourse);
router.post('/add-course', verifyToken, addCourse);
router.get('/fetch-sy', verifyToken, fetchSchoolYear);
router.post('/add-sy', verifyToken, addSY);
router.post('/edit-sy', verifyToken, editSY);
router.post('/delete-sy', verifyToken, deleteSY);
router.get('/get-users', verifyToken, fetchUsers);
router.post('/delete-user', verifyToken, deleteUser);
router.post('/update-settings', verifyToken, updateSettings);
router.post('/update-system-logo', verifyToken, settingsUpload.single('logo'), updateSystemLogo);
router.post('/update-system-cover', verifyToken, settingsUpload.single('cover'), updateSystemCover);

module.exports = router;