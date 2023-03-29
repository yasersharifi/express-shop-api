const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller');
const { checkLogin } = require('../../middleware/check-login.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/is-admin', checkLogin, userController.isAdmin);

module.exports = router;