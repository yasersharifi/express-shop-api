const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller');
const hasAccess = require('./../../middleware/access-control.middleware');
const { checkLogin } = require('../../middleware/check-login.middleware');

router.get('/', checkLogin, (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'any', action: 'read' }), userController.findAll);
router.post('/', checkLogin, (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'any', action: 'create' }), userController.create);

module.exports = router;