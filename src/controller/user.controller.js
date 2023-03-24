const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const { validateCreateUser } = require('../validate/user/create-user.validate');

class UserController {
    async findAll(req, res, next) {
        try {
            const users = await userModel.findAll();

            return res
            .status(200)
            .json({
                status: 'success',
                data: users,
            })
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const body = req.body

            // validate
            await validateCreateUser(body);

            const { password: plainPassword, ...userData } = body;

            // hash password
            const salt = 10;
            const password = await bcrypt.hash(plainPassword, salt);

            const newUser = await userModel.create({ ...userData, password });

            return res
            .status(201)
            .json({
                status: 'success',
                data: newUser,
            })

        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();