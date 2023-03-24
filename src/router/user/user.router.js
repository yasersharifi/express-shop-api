const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller');
const hasAccess = require('./../../middleware/access-control.middleware');

router.get('/', (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'any', action: 'read' }), userController.findAll);
router.post('/', (req, res, next) => hasAccess(req, res, next, { resource: 'users', possession: 'any', action: 'create' }), userController.create);

module.exports = router;