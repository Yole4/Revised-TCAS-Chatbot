const db = require('../database/Connection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const mime = require('mime-types');
require('dotenv').config();
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../validator and sanitizer/ValidatorAndSanitizer');

// add new archive file
const addNewArchiveFile = async (req, res) => {

}

// fetch department
const fetchDepartment = async (req, res) => {
    const getDepartment = `SELECT * FROM department WHERE isDelete = ?`;
    db.query(getDepartment, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    })
}

// add department
const addDepartment = async (req, res) => {
    const { addDepartmentData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeName = sanitizeAndValidate(addDepartmentData.name, validationRules);
    const sanitizeStatus = sanitizeAndValidate(addDepartmentData.status, validationRules);

    if (!sanitizeUserId || !sanitizeName || !sanitizeStatus) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // check if the department already exist
        const isDepartmentExist = `SELECT * FROM department WHERE name = ? AND isDelete = ?`;
        db.query(isDepartmentExist, [sanitizeName, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: `${sanitizeName} Already Exist!` });
                } else {
                    // insert new department
                    const insertNew = `INSERT INTO department (name, description, status) VALUES (?,?,?)`;
                    db.query(insertNew, [sanitizeName, addDepartmentData.description, sanitizeStatus], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "Department", `You have been successfully added ${sanitizeName} on Department List.`], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${sanitizeName} has been successfully added!` });
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

// edit department
const editDepartment = async (req, res) => {
    const { editDepartmentData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeEditId = sanitizeAndValidate(editDepartmentData.editId.toString(), validationRules);
    const sanitizeName = sanitizeAndValidate(editDepartmentData.name, validationRules);
    const sanitizeStatus = sanitizeAndValidate(editDepartmentData.status, validationRules);

    if (!sanitizeUserId || !sanitizeEditId || !sanitizeName || !sanitizeStatus) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // check if the department name is already exist
        const isDepartmentExist = `SELECT * FROM department WHERE name = ? AND isDelete = ? AND id != ?`;
        db.query(isDepartmentExist, [sanitizeName, "not", sanitizeEditId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: `${sanitizeName} is Already Exist!` });
                } else {
                    // update department
                    const updateDepartment = `UPDATE department SET name = ?, status = ?, description = ? WHERE id = ?`;
                    db.query(updateDepartment, [sanitizeName, sanitizeStatus, editDepartmentData.description, sanitizeEditId], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "Department", `${sanitizeName} was been updated!`], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${sanitizeName} has been successfully updated!` });
                                }
                            });
                        }
                    })
                }
            }
        })
    }
}

// delete department
const deleteDepartment = async (req, res) => {
    const { deleteData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeDeleteId = sanitizeAndValidate(deleteData.deleteId.toString(), validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeName = sanitizeAndValidate(deleteData.name, validationRules);

    if (!sanitizeDeleteId || !sanitizeUserId || !sanitizeName) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // delete the department
        const deleteDepartment = `UPDATE department SET isDelete = ? WHERE id = ?`;
        db.query(deleteDepartment, ["Deleted", sanitizeDeleteId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notiifcation
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?,?,?)`;
                db.query(insertNot, [sanitizeUserId, "Department", `You have been successfully deleted ${sanitizeName}`], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: `${sanitizeName} has been successfully deleted!` });
                    }
                })
            }
        })
    }
}

// fetch course
const fetchCourse = async (req, res) => {
    const getCourse = `SELECT * FROM courses WHERE isDelete = ?`;
    db.query(getCourse, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    })
}

// add course
const addCourse = async (req, res) => {
    const { courseData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeCourse = sanitizeAndValidate(courseData.course, validationRules);
    const sanitizeStatus = sanitizeAndValidate(courseData.status, validationRules);
    const sanitizeAcro = sanitizeAndValidate(courseData.acro, validationRules);

    if (!sanitizeUserId || !sanitizeCourse || !sanitizeStatus || !sanitizeAcro) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // check if the course already exist
        const isCourseExist = `SELECT * FROM courses WHERE course = ? AND isDelete = ?`;
        db.query(isCourseExist, [sanitizeCourse, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: `${sanitizeCourse} already exist!` });
                } else {
                    // insert new course
                    const insertNewCourse = `INSERT INTO courses (course, status, acronym) VALUES (?,?,?)`;
                    db.query(insertNewCourse, [sanitizeCourse, sanitizeStatus, sanitizeAcro], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "Course", `You have been successfully added ${sanitizeCourse} from the course list.`], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${sanitizeCourse} has been successfully added!` });
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

// edit course
const editCourse = async (req, res) => {
    const { editCourseData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeEditId = sanitizeAndValidate(editCourseData.editId.toString(), validationRules);
    const sanitizeCourse = sanitizeAndValidate(editCourseData.course, validationRules);
    const sanitizeStatus = sanitizeAndValidate(editCourseData.status, validationRules);
    const sanitizeAcro = sanitizeAndValidate(editCourseData.acro, validationRules);

    if (!sanitizeUserId || !sanitizeEditId || !sanitizeCourse || !sanitizeStatus || !sanitizeAcro) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // check if the course already exist
        const isCourseExist = `SELECT * FROM courses WHERE course = ? AND isDelete = ? AND id != ?`;
        db.query(isCourseExist, [sanitizeCourse, "not", sanitizeEditId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: `${sanitizeCourse} already exist!` });
                } else {
                    // update course
                    const updateCourse = `UPDATE courses SET course = ?, status = ?, acronym = ? WHERE id = ?`;
                    db.query(updateCourse, [sanitizeCourse, sanitizeStatus, sanitizeAcro, sanitizeEditId], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "Course", `${sanitizeCourse} has been successfully updated!`], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${sanitizeCourse} has been successfully updated!` });
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

// delete course
const deleteCourse = async (req, res) => {
    const { deleteCourseData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeCourse = sanitizeAndValidate(deleteCourseData.course, validationRules);
    const sanitizeDeleteId = sanitizeAndValidate(deleteCourseData.deleteId.toString(), validationRules);

    if (!sanitizeUserId || !sanitizeCourse || !sanitizeDeleteId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // delete course
        const deleteCourse = `UPDATE courses SET isDelete = ? WHERE id = ?`;
        db.query(deleteCourse, ["Deleted", sanitizeDeleteId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?,?,?)`;
                db.query(insertNot, [sanitizeUserId, "Course", `You have been successfully deleted ${sanitizeCourse}`], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: `${sanitizeCourse} has been successfully deleted!` });
                    }
                })
            }
        })
    }
}

// fetch school year
const fetchSchoolYear = async (req, res) => {
    const getSY = `SELECT * FROM school_year WHERE isDelete = ?`;
    db.query(getSY, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    })
}

// add school year
const addSY = async (req, res) => {
    const { addSYData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeSY = sanitizeAndValidate(addSYData.sy, validationRules);
    const sanitizeStatus = sanitizeAndValidate(addSYData.status, validationRules);

    if (!sanitizeUserId || !sanitizeSY || !sanitizeStatus) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // check if the s.y. is already exist
        const SYExist = `SELECT * FROM school_year WHERE school_year = ? AND isDelete = ?`;
        db.query(SYExist, [sanitizeSY, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: `${sanitizeSY} already exist!` });
                } else {
                    // insert new s.y.
                    const insertSY = `INSERT INTO school_year (school_year, status) VALUES (?,?)`;
                    db.query(insertSY, [sanitizeSY, sanitizeStatus], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "School Year", `You've been successfully added ${sanitizeSY}`], (error, results) => {
                                if (error) {
                                    res.status(401).json({ messagte: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${sanitizeSY} has been successfully added!` });
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

// edit school year
const editSY = async (req, res) => {
    const { editSYData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeEditId = sanitizeAndValidate(editSYData.editId.toString(), validationRules);
    const sanitizeSY = sanitizeAndValidate(editSYData.sy, validationRules);
    const sanitizeStatus = sanitizeAndValidate(editSYData.status, validationRules);

    if (!sanitizeUserId || !sanitizeEditId || !sanitizeSY || !sanitizeStatus) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // check the s.y. if already exist
        const syExist = `SELECT * FROM school_year WHERE school_year = ? AND isDelete = ? AND id != ?`;
        db.query(syExist, [sanitizeSY, "not", sanitizeEditId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: `${sanitizeSY} already exist!` });
                } else {
                    // update sy
                    const updateSY = `UPDATE school_year SET school_year = ?, status = ? WHERE id = ?`;
                    db.query(updateSY, [sanitizeSY, sanitizeStatus, sanitizeEditId], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            res.status(200).json({ message: `${sanitizeSY} has been successfully updated!` });
                        }
                    })
                }
            }
        })
    }
}

// delete school year
const deleteSY = async (req, res) => {
    const { deleteSYData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeDeleteId = sanitizeAndValidate(deleteSYData.deleteId.toString(), validationRules);
    const sanitizeSY = sanitizeAndValidate(deleteSYData.sy, validationRules);

    if (!sanitizeUserId || !sanitizeDeleteId || !sanitizeSY) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // delete sy
        const deleteSY = `UPDATE school_year SET isDelete = ? WHERE id = ?`;
        db.query(deleteSY, ["Deleted", sanitizeDeleteId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?,?,?)`;
                db.query(insertNot, [sanitizeUserId, "School Year", `You've successfully deleted ${sanitizeSY}`], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: `${sanitizeSY} has been successfully deleted!` });
                    }
                })
            }
        })
    }
}

// fetch all users
const fetchUsers = async (req, res) => {
    const getUsers = `SELECT * FROM users WHERE isDelete = ? AND user_type = ?`;
    db.query(getUsers, ["not", "Researcher"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    })
}

// delete users
const deleteUser = async (req, res) => {
    const { deleteUserData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeDeleteId = sanitizeAndValidate(deleteUserData.deleteId.toString(), validationRules);
    const sanitizeEmail = sanitizeAndValidate(deleteUserData.email, validationRules);

    if (!sanitizeUserId || !sanitizeDeleteId || !sanitizeEmail) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // delete user
        const deleteUser = `UPDATE users set isDelete = ? WHERE id = ?`;
        db.query(deleteUser, ["Deleted", sanitizeDeleteId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notiification
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?,?,?)`;
                db.query(insertNot, [sanitizeUserId, "Users", `You've been successfully deleted ${sanitizeEmail} account.`], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        // success
                        res.status(200).json({ message: `${sanitizeEmail} has been successfully deleted!` });
                    }
                })
            }
        })
    }
}

// update system settings
const updateSettings = async (req, res) => {
    const { updateSettingsData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeEditId = sanitizeAndValidate(updateSettingsData.editId.toString(), validationRules);
    const sanitizeSystemName = sanitizeAndValidate(updateSettingsData.systemName, validationRules);
    const sanitizeShortName = sanitizeAndValidate(updateSettingsData.shortName, validationRules);
    const sanitizeSystemEmail = sanitizeAndValidate(updateSettingsData.systemEmail, validationRules);
    const sanitizeSystemNumber = sanitizeAndValidate(updateSettingsData.systemNumber, validationRules);
    const sanitizeSystemLocation = sanitizeAndValidate(updateSettingsData.systemLocation, validationRules);

    if (!sanitizeUserId || !sanitizeEditId || !sanitizeSystemName || !sanitizeShortName || !sanitizeSystemEmail || !sanitizeSystemNumber || !sanitizeSystemLocation || updateSettingsData.welcomeContent === null || updateSettingsData.about === null) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // update settings
        const update = `UPDATE settings SET system_name = ?, system_short_name = ?, welcome_content = ?, about_us = ?, email = ?, contact_number = ?, address = ? WHERE id = ?`;
        db.query(update, [sanitizeSystemName, sanitizeShortName, updateSettingsData.welcomeContent, updateSettingsData.about, sanitizeSystemEmail, sanitizeSystemNumber, sanitizeSystemLocation, sanitizeEditId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                res.status(200).json({ message: "Settings Updated Successfully!" });
            }
        })
    }
}

// update system logo
const updateSystemLogo = async (req, res) => {
    const { editId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeEditId = sanitizeAndValidate(editId, validationRules);

    if (!sanitizeEditId) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
        const uniqueFilePath = `assets/settings image/${uniqueFileName}`;

        const typeMime = mime.lookup(originalFileName);

        if ((typeMime === 'image/png') || (typeMime === 'image/jpeg')) {
            fs.rename(req.file.path, uniqueFilePath, (err) => {
                if (err) {
                    res.status(401).json({ message: "Error to upload file" });
                } else {
                    const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                    if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                        return res.status(401).send({ message: "Invalid File Name!" });
                    }
                    else {
                        const insert = `UPDATE settings SET system_logo = ? WHERE id = ?`;
                        db.query(insert, [uniqueFilePath, sanitizeEditId], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side errors!" });
                            } else {
                                res.status(200).json({ message: "System Logo Changed!" });
                            }
                        });
                    }
                }
            });
        }
        else {
            res.status(401).json({ message: "Invalid Image Type!" });
        }
    }
}

// update system cover
const updateSystemCover = async (req, res) => {
    const { editId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeEditId = sanitizeAndValidate(editId, validationRules);

    if (!sanitizeEditId) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
        const uniqueFilePath = `assets/settings image/${uniqueFileName}`;

        const typeMime = mime.lookup(originalFileName);

        if ((typeMime === 'image/png') || (typeMime === 'image/jpeg')) {
            fs.rename(req.file.path, uniqueFilePath, (err) => {
                if (err) {
                    res.status(401).json({ message: "Error to upload file" });
                } else {
                    const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                    if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                        return res.status(401).send({ message: "Invalid File Name!" });
                    }
                    else {
                        const insert = `UPDATE settings SET system_cover = ? WHERE id = ?`;
                        db.query(insert, [uniqueFilePath, sanitizeEditId], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side errors!" });
                            } else {
                                res.status(200).json({ message: "System Cover Changed!" });
                            }
                        });
                    }
                }
            });
        }
        else {
            res.status(401).json({ message: "Invalid Image Type!" });
        }
    }
}

module.exports = {
    addNewArchiveFile, fetchDepartment, addDepartment, editDepartment, deleteDepartment, fetchCourse, addCourse, editCourse, deleteCourse, fetchSchoolYear, addSY, editSY, deleteSY,
    fetchUsers, deleteUser, updateSettings, updateSystemCover, updateSystemLogo
};