const multer = require("multer");
const path = require("path");

const uploadPath = path.resolve(__dirname, "../uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9.]/g, "_"));
    }
});

module.exports = multer({ storage });