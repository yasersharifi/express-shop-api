const userModel = require('@model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

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
                    userId: user.id,
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
                            status: 200,
                            statusText: 'success',
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
            // save user in db
            const newUser = await userModel.create({ email, password });

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

module.exports = new AuthController();
