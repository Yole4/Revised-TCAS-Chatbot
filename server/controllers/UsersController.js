const db = require('../database/Connection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const mime = require('mime-types');
require('dotenv').config();
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../validator and sanitizer/ValidatorAndSanitizer');

const { OAuth2Client } = require('google-auth-library');

const createToken = (id, email, fullname, userType, image) => {
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ id, email, fullname, userType, image }, secretKey);
    return token;
};

// initailize GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// verify token
const protected = async (req, res) => {
    const { user } = req;

    res.status(200).json({ user: user });
};

// register user
const registerUser = async (req, res) => {
    const registerData = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeFullname = sanitizeAndValidate(registerData.fullname, validationRules);
    const sanitizeEmail = sanitizeAndValidate(registerData.email, validationRules);
    const sanitizePassword = sanitizeAndValidate(registerData.password, validationRules);
    const sanitizeConfirmPassword = sanitizeAndValidate(registerData.confirmPassword, validationRules);

    if (!sanitizeFullname || !sanitizeEmail || !sanitizePassword || !sanitizeConfirmPassword) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_${originalFileName}`;
        const uniqueFilePath = `assets/image upload/${uniqueFileName}`;

        const typeMime = mime.lookup(originalFileName);

        if (typeMime === 'image/png' || typeMime === 'image/jpeg') {
            fs.rename(req.file.path, uniqueFilePath, (renameErr) => {
                if (renameErr) {
                    return res.status(401).json({ message: "Error to upload file" });
                } else {
                    const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                    if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                        return res.status(401).json({ message: "Invalid File Name!" });
                    } else {
                        try {
                            const findUsername = `SELECT * FROM users WHERE email = ?`;
                            db.query(findUsername, [registerData.email], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    if (results.length > 0) {
                                        res.status(401).json({ message: "Email already exist!" });
                                    } else {
                                        if (registerData.password === registerData.confirmPassword) {
                                            if (registerData.password.length >= 7) {
                                                // register user
                                                const hashedPassword = crypto.createHash('sha256').update(registerData.password).digest('hex');
                                                const registerUser = `INSERT INTO users (email, fullname, password, user_type, image) VALUES (?,?,?,?,?)`;
                                                db.query(registerUser, [registerData.email, registerData.fullname, hashedPassword, "Researcher", uniqueFilePath], (error, results) => {
                                                    if (error) {
                                                        res.status(401).json({ message: "Server side error!" });
                                                    } else {
                                                        // user register response
                                                        // create token
                                                        const userId = results.insertId;

                                                        const token = createToken(userId, registerData.email, registerData.fullname, "Researcher", uniqueFilePath);
                                                        // send to client
                                                        res.status(200).json({ message: "Register Success!", token: token, id: userId });
                                                    }
                                                });
                                            } else {
                                                res.status(401).json({ message: "Password must have at least 7 characters!" });
                                            }
                                        } else {
                                            res.status(401).json({ message: "Password and Confirm password is not equal!" });
                                        }
                                    }
                                }
                            });
                        } catch (error) {
                            console.log(error);
                            res.status(401).json({ message: error });
                        }
                    }
                }
            });
        } else {
            return res.status(401).json({ message: "Invalid Image Type!" });
        }
    }
};

// login users
const loginUser = async (req, res) => {
    const { loginInfo } = req.body;

    try {
        if (!loginInfo.email || !loginInfo.password) {
            res.status(401).json({ message: "Invalid Input!" });
        } else {
            // select email
            const checkEmail = `SELECT * FROM users WHERE email = ?`;
            db.query(checkEmail, [loginInfo.email], (error, results) => {
                if (error) {
                    res.status(401).json({ message: "Server side error!" });
                } else {
                    if (results.length > 0) {
                        // get password
                        const dbPassword = results[0].password;
                        // hash user input password
                        const hashedPassword = crypto.createHash('sha256').update(loginInfo.password).digest('hex');

                        // check if password is valid
                        if (dbPassword === hashedPassword) {
                            // success login
                            // create token
                            // get user id
                            const userId = results[0].id;
                            const email = results[0].email;
                            const fullname = results[0].fullname;
                            const userType = results[0].user_type;
                            const image = results[0].image;
                            const token = createToken(userId, email, fullname, userType, image);

                            // send to client
                            res.status(200).json({ message: "Login Success!", token: token, id: userId });
                        } else {
                            res.status(401).json({ message: "Invalid Email or Password!" });
                        }
                    } else {
                        res.status(401).json({ message: "Invalid Email or Password!" });
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error });
    }
};

// login using google
const loginGoogle = async (req, res) => {
    try {
        const { userLoginData } = req.body;
        const ticket = await googleClient.verifyIdToken({
            idToken: userLoginData,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const user = {
            googleId: payload.sub,
            email: payload.email,
            name: `${payload.given_name} ${payload.family_name}`,
            picture: payload.picture,
        };

        // login here
        const isGoogleIdExist = `SELECT * FROM users WHERE google_id = ?`;
        db.query(isGoogleIdExist, [user.googleId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {

                    const fetchData = {
                        id: results[0].id,
                        email: results[0].email,
                        fullname: results[0].fullname,
                        userType: results[0].user_type,
                        image: results[0].image
                    };

                    const token = createToken(fetchData.id, fetchData.email, fetchData.fullname, fetchData.userType, fetchData.image);

                    // send to client
                    res.status(200).json({ message: "Login Success!", token: token, id: fetchData.id });

                } else {
                    res.status(401).json({ message: 'Email is not yet registered!' });
                }
            }
        })
    } catch (error) {
        res.status(401).json({ message: 'Google login failed' });
        console.log(error);
    }
}

// register using google
const registerGoogle = async (req, res) => {
    try {
        const { userRegisterData } = req.body;

        const ticket = await googleClient.verifyIdToken({
            idToken: userRegisterData,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const user = {
            googleId: payload.sub,
            email: payload.email,
            name: `${payload.given_name} ${payload.family_name}`,
            picture: payload.picture,
        };

        // register here
        const isGoogleIdExist = `SELECT * FROM users WHERE google_id = ?`;
        db.query(isGoogleIdExist, [user.googleId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "Email Already Registered!" });
                } else {
                    // register
                    const insertNewEmail = `INSERT INTO users (google_id, email, fullname, image, user_type) VALUES (?,?,?,?,?)`;
                    db.query(insertNewEmail, [user.googleId, user.email, user.name, user.picture, "Researcher"], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            const fetchData = {
                                id: results.insertId,
                                email: user.email,
                                fullname: user.name,
                                userType: "Researcher",
                                image: user.picture
                            }

                            const token = createToken(fetchData.id, fetchData.email, fetchData.fullname, fetchData.userType, fetchData.image);

                            // send to client
                            res.status(200).json({ message: "Register Success!", token: token, id: fetchData.id });
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.status(401).json({ message: 'Google register failed' });
        console.log(error);
    }
}

// auto image upload
const autoImageUpload = async (req, res) => {
    const { userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
        const uniqueFilePath = `assets/image upload/${uniqueFileName}`;

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
                        const insert = `UPDATE users SET image = ? WHERE id = ?`;
                        db.query(insert, [uniqueFilePath, sanitizeUserId], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side errors!" });
                            } else {
                                res.status(200).json({ message: "Profile image changed!" });
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

// get user credentials
const getUserCredentials = async (req, res) => {
    const { userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId.toString(), validationRules);

    if (!sanitizeUserId) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const fetchUserCredentials = `SELECT * FROM users WHERE id = ? AND isDelete = ?`;
        db.query(fetchUserCredentials, [userId, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                res.status(200).json({ message: results[0] });
            }
        });
    }
}

// change password
const changePassword = async (req, res) => {
    const { userId, changePasswordInfo } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeEmail = sanitizeAndValidate(changePasswordInfo.email, validationRules);
    const sanitizeNewPassword = sanitizeAndValidate(changePasswordInfo.newPassword, validationRules);
    const sanitizeConfirmPassword = sanitizeAndValidate(changePasswordInfo.confirmPassword, validationRules);

    if (!sanitizeUserId || !sanitizeEmail || !sanitizeNewPassword || !sanitizeConfirmPassword) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        if (sanitizeEmail.length >= 5) {
            if (sanitizeNewPassword === sanitizeConfirmPassword) {
                if (sanitizeNewPassword.length >= 7 && sanitizeNewPassword.length <= 20) {
                    // select password
                    const select = `SELECT * FROM users WHERE id = ? AND isDelete = ?`;
                    db.query(select, [sanitizeUserId, 'not'], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            if (results.length > 0) {
                                // get db password
                                const dbPassword = results[0].password;

                                // hash new Password
                                const hashedNewPassword = crypto.createHash('sha256').update(sanitizeNewPassword).digest('hex');

                                // check email if already exist
                                const checkEmail = `SELECT * FROM users WHERE email = ? AND id != ?`;
                                db.query(checkEmail, [sanitizeEmail, sanitizeUserId], (error, results) => {
                                    if (error) {
                                        res.status(401).json({ message: "Server side error!" });
                                    } else {
                                        if (results.length > 0) {
                                            res.status(401).json({ message: "Email Already Exist!" });
                                        } else {
                                            if (dbPassword.length === 0) {
                                                // new pass
                                                const insertNewPassword = `UPDATE users SET password = ? WHERE id = ?`;
                                                db.query(insertNewPassword, [hashedNewPassword, sanitizeUserId], (error, results) => {
                                                    if (error) {
                                                        res.status(401).json({ message: "Server side error!" });
                                                    } else {
                                                        res.status(200).json({ message: "User credentials updated successfully!" });
                                                    }
                                                })
                                            }
                                            else {
                                                // hash current password
                                                const hashedPassword = crypto.createHash('sha256').update(changePasswordInfo.currentPassword).digest('hex');

                                                // check the current password and new password
                                                if (dbPassword === hashedPassword) {
                                                    const update = `UPDATE users SET password = ? WHERE id = ?`;
                                                    db.query(update, [hashedNewPassword, sanitizeUserId], (error, results) => {
                                                        if (error) {
                                                            res.status(401).json({ message: "Server side error!" });
                                                        } else {
                                                            res.status(200).json({ message: "User credentials updated successfully!" });
                                                        }
                                                    });
                                                } else {
                                                    res.status(401).json({ message: "Invalid Current Password!" });
                                                }
                                            }
                                        }
                                    }
                                })
                            } else {
                                res.status(401).json({ message: "Something went wrong!" });
                            }
                        }
                    });
                } else {
                    res.status(401).json({ message: "New password must have 7 to 20 characters!" });
                }
            } else {
                res.status(401).json({ message: "New password and confirm password not match!" });
            }
        } else {
            res.status(401).json({ message: "Email must have 5 to 20 characters!" });
        }
    }
}

// update profile name
const updateProfileName = async (req, res) => {
    const { changeProfileInfo, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);
    const sanitizeFullname = sanitizeAndValidate(changeProfileInfo, validationRules);

    if (!sanitizeUserId || !sanitizeFullname) {
        res.status(401).json({ message: "Server side error!" });
    } else {
        const updateName = `UPDATE users SET fullname = ? WHERE id = ?`;
        db.query(updateName, [sanitizeFullname, sanitizeUserId], (error, results) => {
            if (error) {
                res.status(401).json({message: "Server side error!"});
            }else{
                res.status(200).json({message: "Update Success!"});
            }
        })
    }
}

module.exports = { protected, registerUser, loginUser, loginGoogle, registerGoogle, autoImageUpload, getUserCredentials, changePassword, updateProfileName };