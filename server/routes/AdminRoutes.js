const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const multer = require('multer');

const { fetchDepartment, addDepartment, editDepartment, deleteDepartment, fetchCourse, editCourse, deleteCourse, addCourse, fetchSchoolYear, addSY, editSY, deleteSY, fetchUsers, deleteUser, updateSettings, updateSystemLogo, updateSystemCover, scanDocument, addProject, updateArchiveStatus, deleteArchive, getUserRequest, getRequestId, addRequest, requestResponse, acceptDocument } = require('../controllers/AdminController');

const router = express.Router();

const settingsUpload = multer({
    dest: 'assets/settings image/',
});

const documentUpload = multer({
    dest: 'assets/archive files/',
});

const uploadBannerImage = multer({
    dest: 'assets/banner image/',
});

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
router.post('/scan-document', verifyToken, documentUpload.single('archiveFile'), scanDocument);
router.post('/add-project', verifyToken, uploadBannerImage.single('bannerImage'), addProject);
router.post('/update-archive-status', verifyToken, updateArchiveStatus);
router.post('/delete-archive', verifyToken, deleteArchive);
router.get('/get-users-request', verifyToken, getUserRequest);
router.post('/request-id', verifyToken, getRequestId);
router.post('/user-request', verifyToken, addRequest);
router.post('/request-response', verifyToken, requestResponse);
router.post('/accept-document', verifyToken, acceptDocument);

module.exports = router;