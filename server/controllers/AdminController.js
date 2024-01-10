const db = require('../database/Connection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const mime = require('mime-types');
require('dotenv').config();
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../components/validator and sanitizer/ValidatorAndSanitizer');
const { processFile } = require('../components/scan document/ScanDocument');

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

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

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
                    const insertNew = `INSERT INTO department (name, description, status, date) VALUES (?,?,?,?)`;
                    db.query(insertNew, [sanitizeName, addDepartmentData.description, sanitizeStatus, currentDate], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "Department", `You have been successfully added ${sanitizeName} on Department List.`, currentDate], (error, results) => {
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

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

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
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "Department", `${sanitizeName} was been updated!`, currentDate], (error, results) => {
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

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

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
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                db.query(insertNot, [sanitizeUserId, "Department", `You have been successfully deleted ${sanitizeName}`, currentDate], (error, results) => {
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

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

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
                    const insertNewCourse = `INSERT INTO courses (course, status, acronym, date) VALUES (?,?,?,?)`;
                    db.query(insertNewCourse, [sanitizeCourse, sanitizeStatus, sanitizeAcro, currentDate], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "Course", `You have been successfully added ${sanitizeCourse} from the course list.`, currentDate], (error, results) => {
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

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

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
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "Course", `${sanitizeCourse} has been successfully updated!`, currentDate], (error, results) => {
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

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

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
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                db.query(insertNot, [sanitizeUserId, "Course", `You have been successfully deleted ${sanitizeCourse}`, currentDate], (error, results) => {
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

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

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
                    const insertSY = `INSERT INTO school_year (school_year, status, date) VALUES (?,?,?)`;
                    db.query(insertSY, [sanitizeSY, sanitizeStatus, currentDate], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                            db.query(insertNot, [sanitizeUserId, "School Year", `You've been successfully added ${sanitizeSY}`, currentDate], (error, results) => {
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

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

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
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                db.query(insertNot, [sanitizeUserId, "School Year", `You've successfully deleted ${sanitizeSY}`, currentDate], (error, results) => {
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

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

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
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                db.query(insertNot, [sanitizeUserId, "Users", `You've been successfully deleted ${sanitizeEmail} account.`, currentDate], (error, results) => {
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

// scann document
const scanDocument = async (req, res) => {
    const originalFileName = req.file.originalname;

    const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
    const uniqueFilePath = `assets/archive files/${uniqueFileName}`;

    fs.rename(req.file.path, uniqueFilePath, (err) => {
        if (err) {
            res.status(401).json({ message: "Error moving the upload file!" });
        }

        else {
            const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
            if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                return res.status(401).send({ message: "Invalid File Name!" });
            }
            else {
                if (req.file.size > 5242880) {
                    res.status(401).json({ message: "File is too large!" });
                }
                else {
                    // Check if the uploaded file has a PDF or DOCX extension
                    const mimeType = mime.lookup(sanitizedFileName);
                    if (mimeType !== 'application/pdf') {
                        res.status(401).json({ message: "Invalid file type! Accept only PDF File!" })
                    }
                    else {

                        processFile(uniqueFilePath)
                            .then(pageTexts => {

                                let isFound = false;
                                let foundPage = [], foundAbstract = [];

                                pageTexts.forEach((pageText, pageNum) => {
                                    const pageNumber = pageNum;
                                    const contentEveryPage = pageText.replace(/\s+/g, ' ');

                                    if ((contentEveryPage).toLowerCase().includes("abstract")) {
                                        foundPage.push(pageNumber);
                                        foundAbstract.push(contentEveryPage);
                                        isFound = true;
                                        return true;
                                    }
                                });

                                if (isFound) {
                                    const splitFoundAbstract = foundAbstract[0].split(/abstract/i);

                                    // console.log("\n",splitFoundAbstract, foundPage);
                                    res.status(200).json({ foundAbstract: splitFoundAbstract[1], pageNumber: foundPage[0] + 1, fileName: uniqueFilePath });
                                } else {
                                    // Remove the file
                                    fs.unlink(uniqueFilePath, (err) => {
                                        if (err) {
                                            console.error('Error deleting file:', err);
                                        }
                                    });
                                    res.status(401).json({ message: "No Abstract Found! Please check your PDF file and upload again!" });
                                }
                            })
                            .catch(error => {
                                res.status(401).json({ message: "Something went wrong!" });
                                console.error('Error extracting text from PDF', error);
                            });
                    }
                }
            }
        }

    });
}

// add project 
const addProject = async (req, res) => {
    const { foundAbstract, pageNumber, fileName, department, course, schoolYear, projectTitle, members, userId, userType, fullname, chatbotInfo } = req.body;

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

    const validationRules = [
        { validator: validator.isLength, options: { min: 1 } },
    ];

    const submitFoundAbstract = sanitizeAndValidate(foundAbstract, validationRules);
    const submitPageNumber = sanitizeAndValidate(pageNumber, validationRules);
    const submitFileName = sanitizeAndValidate(fileName, validationRules);
    const submitDepartment = sanitizeAndValidate(department, validationRules);
    const submitCourse = sanitizeAndValidate(course, validationRules);
    const submitSchoolYear = sanitizeAndValidate(schoolYear, validationRules);
    const submitProjectTitle = sanitizeAndValidate(projectTitle, validationRules);
    const submitMembers = sanitizeAndValidate(members, validationRules);
    const sanitizeId = sanitizeAndValidate(userId, validationRules);

    if (!submitFoundAbstract || !submitPageNumber || !submitFileName || !submitDepartment || !submitCourse || !submitSchoolYear || !submitProjectTitle || !submitMembers || !sanitizeId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
        const uniqueFilePath = `assets/banner image/${uniqueFileName}`;

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
                        const insertNew = `INSERT INTO archive_files (abstract, page_number, file_path, department, course, school_year, project_title, members, image_banner, date, confirmation, request_name, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?, ?)`;
                        db.query(insertNew, [submitFoundAbstract, submitPageNumber, submitFileName, submitDepartment, submitCourse, submitSchoolYear, submitProjectTitle, submitMembers, uniqueFilePath, currentDate, userType === "Admin" ? 1 : 0, fullname, sanitizeId], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side error!" });
                            } else {
                                const documentId = results.insertId;

                                const insertChatbotInformation = chatbotInfo.map(item => {
                                    return new Promise((resolve, reject) => {
                                        const insertQuery = 'INSERT INTO chatbot_keywords (keyword, information, date, project_id, status) VALUES (?, ?, ?, ?, ?)';
                                        db.query(insertQuery, [item.keywords, item.information, currentDate, documentId, userType === "Admin" ? 1 : 0], (error, results) => {
                                            if (error) {
                                                reject(error);
                                            } else {
                                                resolve(results);
                                            }
                                        })
                                    })
                                })

                                Promise.all(insertChatbotInformation).then(() => {
                                    // insert notification
                                    const insertNotification = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ? ,?)`;
                                    db.query(insertNotification, [sanitizeId, "Add Project", userType === "Admin" ? `You've successfully added ${submitProjectTitle} to archive` : `${submitProjectTitle} status pending`, currentDate], (error, results) => {
                                        if (error) {
                                            res.status(401).json({ message: "Server side error!" });
                                        } else {
                                            // insert admin notification
                                            if (userType === "Admin") {
                                                res.status(200).json({ message: `${submitProjectTitle} has been successfully added!` });
                                            } else {
                                                const adminNot = `INSERT INTO notifications (user_id, notification_type, content, date, url) VALUES (?, ?, ? ,?, ?)`;
                                                db.query(adminNot, [1, "Request Project", `${fullname} requested to upload new document`, currentDate, documentId], (error, results) => {
                                                    if (error) {
                                                        res.status(401).json({ message: "Server side error!" });
                                                    } else {
                                                        res.status(200).json({ message: `${submitProjectTitle} has been successfully requested!` });
                                                    }
                                                })
                                            }
                                        }
                                    });
                                }).catch(insertError => {
                                    console.log("Something wrong on inserting data", error);
                                    res.status(401).json({ message: "Something went wrong on inserting data!" });
                                })
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

// update archive status
const updateArchiveStatus = async (req, res) => {
    const { updateFileData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeEditId = sanitizeAndValidate(updateFileData.editId.toString(), validationRules);
    const sanitizeProjectTitle = sanitizeAndValidate(updateFileData.projectTitle, validationRules);
    const sanitizeStatus = sanitizeAndValidate(updateFileData.status, validationRules);

    if (!sanitizeUserId || !sanitizeEditId || !sanitizeProjectTitle || !sanitizeStatus) {
        res.status(401).json({ message: "Server side error!" });
    } else {
        // update status
        const updateStatus = `UPDATE archive_files SET status = ? WHERE id = ?`;
        db.query(updateStatus, [sanitizeStatus, sanitizeEditId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                res.status(200).json({ message: `Status Updated!` });
            }
        })
    }
}

// delete archive
const deleteArchive = async (req, res) => {
    const { deleteArchiveData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeDeleteId = sanitizeAndValidate(deleteArchiveData.deleteId.toString(), validationRules);
    const sanitizeProjectTitle = sanitizeAndValidate(deleteArchiveData.projectTitle, validationRules);

    if (!sanitizeUserId || !sanitizeDeleteId || !sanitizeProjectTitle) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // delete archive
        const updateArchive = `UPDATE archive_files SET isDelete = ? WHERE id = ?`;
        db.query(updateArchive, ["Deleted", sanitizeDeleteId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                res.status(200).json({ message: `${sanitizeProjectTitle} has been successfully deleted!` });
            }
        })
    }
}

// get all requested users
const getUserRequest = async (req, res) => {
    const getRequest = `
        SELECT users.id, users.image, users.fullname, user_file_request.*, archive_files.project_title
        FROM user_file_request
        INNER JOIN users ON user_file_request.user_request_id = users.id
        INNER JOIN archive_files ON user_file_request.project_id = archive_files.id
        WHERE user_file_request.isDelete = ?`;
    db.query(getRequest, ["not"], (error, results) => {
        if (error) {
            res.status(500).json({ message: "Server side error!" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: results });
            } else {
                res.status(404).json({ message: "No request found!" });
            }
        }
    });
}

// get user request by id
const getRequestId = async (req, res) => {
    const { userId, archiveId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1 } },
    ];

    const projectId = (archiveId - 1000).toString();
    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeProjectId = sanitizeAndValidate(projectId, validationRules);

    // fetch
    const fetchStatus = `SELECT * FROM user_file_request WHERE user_request_id = ? AND project_id = ? AND isDelete = ?`;
    db.query(fetchStatus, [sanitizeUserId, sanitizeProjectId, "not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results[0] });
        }
    });
}

// add new user request
const addRequest = async (req, res) => {
    const { archiveId, userId, fullname, projectTitle } = req.body;

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

    const validationRules = [
        { validator: validator.isLength, options: { min: 1 } },
    ];

    const sanitizeArchiveId = sanitizeAndValidate(archiveId, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeFullName = sanitizeAndValidate(fullname, validationRules);
    const sanitizeProjectTitle = sanitizeAndValidate(projectTitle, validationRules);

    if (!sanitizeArchiveId || !sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        // insert to request
        const insertRequest = `INSERT INTO user_file_request (user_request_id, project_id, date) VALUES (?, ?, ?)`;
        db.query(insertRequest, [sanitizeUserId, sanitizeArchiveId, currentDate], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insertNotification = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                db.query(insertNotification, ["1", "Request Document", `${sanitizeFullName} requested to view the document of ${sanitizeProjectTitle}`, currentDate], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: "Request send successfully!" });
                    }
                });
            }
        });
    }
}

// request response
const requestResponse = async (req, res) => {
    const { userId, acceptId, userRequestId, currentStatus, fullname, projectTitle } = req.body;

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

    const validationRules = [
        { validator: validator.isLength, options: { min: 1 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeAcceptId = sanitizeAndValidate(acceptId, validationRules);
    const sanitizeUserRequestId = sanitizeAndValidate(userRequestId, validationRules);
    const sanitizeCurrentStatus = sanitizeAndValidate(currentStatus, validationRules);
    const sanitizeFullname = sanitizeAndValidate(fullname, validationRules);
    const sanitizeProjectTitle = sanitizeAndValidate(projectTitle, validationRules);

    if (!sanitizeUserId || !sanitizeAcceptId || !sanitizeUserRequestId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // update status
        const acceptStatus = `UPDATE user_file_request SET status = ? WHERE id = ?`;
        db.query(acceptStatus, [sanitizeCurrentStatus, sanitizeAcceptId], (error, resulsts) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification for the admin
                let admiNContent = '', userContent = '', successMessage = '';
                if (sanitizeCurrentStatus === "Approved") {
                    successMessage = `${sanitizeProjectTitle} has been approved`;
                    userContent = `Your request on ${sanitizeProjectTitle} was been approved by the admin!`;
                    admiNContent = `You have approved ${sanitizeFullname} to view the document on the ${sanitizeProjectTitle}.`
                } else {
                    admiNContent = `You have been set the status of ${sanitizeFullname} to Pending`;
                    userContent = `Your request on ${sanitizeProjectTitle} was been Disapproved by Admin`;
                    successMessage = `${sanitizeProjectTitle} has been successfully set to Pending`;
                }
                const insertNotification = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                db.query(insertNotification, [sanitizeUserId, "Request Document", admiNContent, currentDate], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        // insert notification for the user
                        const insertNotUser = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?, ?, ?, ?)`;
                        db.query(insertNotUser, [sanitizeUserRequestId, "User Request", userContent, currentDate], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side error!" });
                            } else {
                                // success message
                                res.status(200).json({ message: successMessage });
                            }
                        });
                    }
                });
            }
        });
    }
}

// accept document 
const acceptDocument = async (req, res) => {
    const { acceptId, projectTitle, userUploadId } = req.body;

    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const currentDate = test.toLocaleString('en-US', options);

    const handleAccept = `UPDATE archive_files SET confirmation = ? WHERE id = ?`;
    db.query(handleAccept, [1, acceptId], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            // accept chatbot keywords
            const acceptChatbot = `UPDATE chatbot_keywords SET status = ? WHERE project_id = ?`;
            db.query(acceptChatbot, [1, acceptId], (error, results) => {
                if (error) {
                    res.status(401).json({ message: "Server side error!" });
                } else {
                    // insert to user notification
                    const userNot = `INSERT INTO notifications (user_id, notification_type, content, date) VALUES (?,?,?,?)`;
                    db.query(userNot, [userUploadId, "Accept Request", `Your Request on ${projectTitle} has been approved by admin!`, currentDate], (error, results) => {
                        if (error) {
                            res.status(401).json({message: "Server side error!"});
                        }else{
                            res.status(200).json({ message: `${projectTitle} Accepted!` });
                        }
                    })
                }
            })
        }
    })
}

module.exports = {
    fetchDepartment, addDepartment, editDepartment, deleteDepartment, fetchCourse, addCourse, editCourse, deleteCourse, fetchSchoolYear, addSY, editSY, deleteSY,
    fetchUsers, deleteUser, updateSettings, updateSystemCover, updateSystemLogo, scanDocument, addProject, updateArchiveStatus, deleteArchive, getUserRequest, getRequestId, addRequest, requestResponse,
    acceptDocument
};