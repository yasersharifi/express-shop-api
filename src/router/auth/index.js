const express = require('express');
const router = express.Router();
const authController = require('@controller/auth.controller');
const { checkLogin } = require('@middleware/check-login.middleware');
const hashPassword = require('@middleware/hash-password.middleware');
const { 
    validateLoginUser,
    validateRegisterUser,
} = require('@validate/auth');

// user register
router.post(
    '/register',
    validateRegisterUser,
    hashPassword,
    authController.register
);

// check user login
router.post(
    '/login',
    validateLoginUser,
    authController.login
);

// check user is admin
router.post(
    '/is-admin', 
    checkLogin, 
    authController.isAdmin
);

module.exports = router;