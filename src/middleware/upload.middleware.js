const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, './uploads/');
        cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.imagetype === 'image/png') {
//         cb(null, true);
//     }
//     else {
//         cb(null, false);
//     }
// };

const upload = multer({
    storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // }
    // fileFilter: fileFilter
});

module.exports = upload;