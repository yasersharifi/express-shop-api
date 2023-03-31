const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller');
const hasAccess = require('./../../middleware/access-control.middleware');
const { checkLogin } = require('../../middleware/check-login.middleware');
const multer = require('multer');
const { 
    validateCreateUser,
    validateUpdateUser 
} = require('@validate/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
});

const uploadSingleImage = upload.single('file');


// get all user
router.get('/', checkLogin, (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'any', action: 'read' }), userController.findAll);

// create new user
router.post(
    '/', 
    checkLogin, 
    (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'any', action: 'create' }), 
    validateCreateUser,
    userController.create
);

// update user with admin
router.put(
    '/:id', 
    checkLogin, 
    (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'any', action: 'update' }), 
    validateUpdateUser,
    userController.update
);

// update user with own
router.put('/change-info', checkLogin, (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'own', action: 'update' }), userController.changeInfo);

// change password user with own
router.put('/change-password', checkLogin, (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'own', action: 'update' }), userController.changePassword);

// import users from xlsx file
router.post(
    '/import-from-xlsx', 
    checkLogin, 
    (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'any', action: 'create' }), 
    function (req, res) {

        uploadSingleImage(req, res, function (err) {
    
            if (err) {
                return res.status(400).send({ message: err.message })
            }
    
            // Everything went fine.
            const file = req.file;
            res.status(200).send({
                filename: file.filename,
                mimetype: file.mimetype,
                originalname: file.originalname,
                size: file.size,
                fieldname: file.fieldname
            })
        })
    },
    userController.importFromXlsx
);

module.exports = router;