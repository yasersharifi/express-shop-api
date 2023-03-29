const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const { validateCreateUser } = require('../validate/user/create-user.validate');
const { validateLoginUser } = require('../validate/user/login-user.validate');
const { validateRegisterUser } = require('../validate/user/register-user.validate.js');
const jwt = require('jsonwebtoken');

class UserController {

    async create(req, res, next) {
        try {
            const body = req.body;

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

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // step1: validate body data
            await validateLoginUser({ email, password });

            // step2: find user by email
            const user = await userModel.findOneByEmail(email);
            if (!user) {
                const error = new Error();
                error.message = 'Email or Password Incorrect';
                error.status = 401;
                return next(error);
            }

            // step3: compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const payload = {
                    fullName: user.fullName,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role,
                }
                const token = jwt.sign(payload, process.env.JWT_KEY, {
                    expiresIn: '6h',
                });
                return res
                        .status(200)
                        .json({
                            status: 'success',
                            token,
                        })
            } else {
                const error = new Error();
                error.message = 'Email or Password Incorrect';
                error.status = 401;
                return next(error);
            }
            
        } catch (err) {
            next(err);
        }
    }

    async register(req, res, next) {
        const { email, password } = req.body;

        try {
            // validate body data
            await validateRegisterUser({ email, password });

            // hash password
            const salt = 10;
            const passwordHash = await bcrypt.hash(password, salt);

            // save user in db
            const newUser = await userModel.create({ email, password: passwordHash });

            return res
                .status(200)
                .json({
                    status: 'success',
                    data: newUser,
                })
        } catch (err) {
            next(err);
        }


    }

    async isAdmin(req, res, next) {
        console.log({req: req.user})
        try {
            const { role } = req.user;
            if (role === 'admin') {
                return res
                    .status(200)
                    .json({
                        status: 'success',
                        isAdmin: true,
                    });
            } else {
                return res
                .status(200)
                .json({
                    status: 'success',
                    isAdmin: false,
                });
            }
        } catch (err) {
            return res
                .status(200)
                .json({
                    status: 'success',
                    isAdmin: false,
                });
        }
    }
}

module.exports = new UserController();