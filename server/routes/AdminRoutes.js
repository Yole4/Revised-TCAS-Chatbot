const express = require('express');
const {verifyToken} = require('../auth/Authentication');
const multer = require('multer');

const { addNewArchiveFile, fetchDepartment, addDepartment, editDepartment, deleteDepartment, fetchCourse, editCourse, deleteCourse, addCourse, fetchSchoolYear, addSY, editSY, deleteSY, fetchUsers } = require('../controllers/AdminController');

const router = express.Router();

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

module.exports = router;