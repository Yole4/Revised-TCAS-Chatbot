const db = require('../database/Connection');

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

module.exports = { fetchSettings, fetchArchiveFiles };