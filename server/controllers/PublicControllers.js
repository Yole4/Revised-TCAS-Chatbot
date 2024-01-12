const db = require('../database/Connection');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../components/validator and sanitizer/ValidatorAndSanitizer');
const nodemailer = require('nodemailer');
require('dotenv').config();
const crypto = require('crypto');

const createToken = (id, email, fullname, userType, image) => {
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ id, email, fullname, userType, image }, secretKey);
    return token;
};

// fetch settings
const fetchSettings = async (req, res) => {
    const getSettings = `SELECT * FROM settings`;
    db.query(getSettings, (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results[0] });
        }
    });
}

// fetch archive files
const fetchArchiveFiles = async (req, res) => {
    const getArchive = `SELECT * FROM archive_files WHERE isDelete = ?`;
    db.query(getArchive, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    });
}

// find email or fullname
const findEmailFullname = async (req, res) => {
    const { emailFullname } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeEmailFullname = sanitizeAndValidate(emailFullname, validationRules);

    if (!sanitizeEmailFullname) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const select = `SELECT * FROM users WHERE email = ? OR fullname = ? AND isDelete = ?`;
        db.query(select, [sanitizeEmailFullname, sanitizeEmailFullname, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                res.status(200).json({ message: results });
            }
        })
    }
}

// send email
const sendEmail = async (req, res) => {
    const { email } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeEmail = sanitizeAndValidate(email, validationRules);

    if (!sanitizeEmail) {
        res.status(401).json({ message: "Invalid Input!" });
        return;
    }

    function generateVerificationCode() {
        // Generate a random decimal between 0 and 1
        const randomDecimal = Math.random();

        // Scale the random decimal to a 7-digit integer range
        const sevenDigitCode = Math.floor(randomDecimal * 9000000) + 1000000;

        return sevenDigitCode;
    }

    const codeGenerated = generateVerificationCode();

    const sendToken = jwt.sign({ codeGenerated }, process.env.SECRET_KEY, { expiresIn: '5m' });

    const selectEmail = `SELECT * FROM code_verification WHERE email = ?`;
    db.query(selectEmail, (sanitizeEmail), (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            if (results.length > 0) {
                // update
                const existId = results[0].id;

                const updateEmail = `UPDATE code_verification SET email = ?, code = ? WHERE id = ?`;
                db.query(updateEmail, [sanitizeEmail, sendToken, existId], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'shelomora60@gmail.com',
                                pass: 'clvqembmjluvefqr'
                            }
                        });

                        var mailOptions = {
                            from: 'shelomora60@gmail.com',
                            to: sanitizeEmail,
                            subject: 'TCAS Chatbot Verification Code!',
                            text: `${codeGenerated}`
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                res.status(401).json({ message: "Something went wrong on sending code to email!" });
                                console.log(error);
                            } else {
                                res.status(200).json({ message: "Verification code sent successfully!" });
                            }
                        });
                    }
                })
            } else {
                const insert = `INSERT INTO code_verification (email, code) VALUES (?,?)`;
                db.query(insert, [sanitizeEmail, sendToken], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'shelomora60@gmail.com',
                                pass: 'clvqembmjluvefqr'
                            }
                        });

                        var mailOptions = {
                            from: 'shelomora60@gmail.com',
                            to: sanitizeEmail,
                            subject: 'TCAS Chatbot Verification Code!',
                            text: `${codeGenerated}`
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                res.status(401).json({ message: "Something went wrong on sending code to email!" });
                                console.log(error);
                            } else {
                                res.status(200).json({ message: "Verification code sent successfully!" });
                            }
                        });
                    }
                })
            }
        }
    })
}

// confirm code
const confirmCode = async (req, res) => {
    const { confirmCode, email } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeConfirmCode = sanitizeAndValidate(confirmCode, validationRules);
    const sanitizeEmail = sanitizeAndValidate(email, validationRules);

    if (!sanitizeConfirmCode || !sanitizeEmail) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // select the email
        const selectEmail = `SELECT * FROM code_verification WHERE email = ?`;
        db.query(selectEmail, [sanitizeEmail], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {

                    jwt.verify(results[0].code, process.env.SECRET_KEY, (error, decode) => {
                        if (error) {
                            res.status(401).json({ message: "Confirmation Code Time Out!" });
                        } else {
                            const codeGenerated = decode.codeGenerated.toString();

                            if (sanitizeConfirmCode.toString() === codeGenerated) {
                                res.status(200).json({ message: "Verified!" });
                            } else {
                                res.status(401).json({ message: "Invalid Code!" });
                            }
                        }
                    })
                } else {
                    res.status(401).json({ message: "Invalid Email!" });
                }
            }
        })
    }
}

// new password
const newPassword = async (req, res) => {
    const { newPassword, email } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizePassword = sanitizeAndValidate(newPassword.password, validationRules);
    const sanitizeConfirmPassword = sanitizeAndValidate(newPassword.confirmPassword, validationRules);
    const sanitizeEmail = sanitizeAndValidate(email, validationRules);

    if (!sanitizePassword || !sanitizeConfirmPassword || !sanitizeEmail) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        if (sanitizePassword === sanitizeConfirmPassword) {
            if (sanitizePassword.length >= 7) {
                // update password
                const hashedPassword = crypto.createHash('sha256').update(sanitizePassword).digest('hex');

                const updatePassword = `UPDATE users SET password = ? WHERE email = ? AND isDelete = ?`;
                db.query(updatePassword, [hashedPassword, sanitizeEmail, "not"], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        const selectEmail = `SELECT * FROM users WHERE email = ? AND isDelete = ?`;
                        db.query(selectEmail, [sanitizeEmail, "not"], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side error!" });
                            } else {
                                if (results.length > 0) {
                                    // get password
                                    const userId = results[0].id;
                                    const email = results[0].email;
                                    const fullname = results[0].fullname;
                                    const userType = results[0].user_type;
                                    const image = results[0].image;
                                    const token = createToken(userId, email, fullname, userType, image);

                                    // send to client
                                    res.status(200).json({ message: "Login Success!", token: token, id: userId });
                                } else {
                                    res.status(401).json({ message: "Something Went Wrong!" });
                                }
                            }
                        })
                    }
                })
            } else {
                res.status(401).json({ message: "Password must have at least 7 characters!" });
            }
        } else {
            res.status(401).json({ message: "New Password and Confirm Password Not Match!" });
        }
    }
}

module.exports = { fetchSettings, fetchArchiveFiles, findEmailFullname, sendEmail, confirmCode, newPassword };