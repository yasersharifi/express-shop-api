const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('@model/user.model');
const { validateChangePasswordUser } = require('@validate/user/change-password-user.validate.js');

class UserController {

    async create(req, res, next) {
        try {
            const body = req.body;

            const { password: plainPassword, ...userData } = body;

            // hash password
            const salt = 10;
            const password = await bcrypt.hash(plainPassword, salt);

            const newUser = await userModel.create({ ...userData, password });

            const { password: skipPass, ...returnUser } = newUser['dataValues'] ?? {};

            return res
                .status(201)
                .json({
                    status: 'success',
                    data: returnUser,
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

    async update(req, res, next) {
        try {
            // find user
            const { id: userId } = req.params;
            const findUser = await userModel.findOne(userId);
            
            if (findUser) {
                const { 
                    fullName = findUser.fullName, 
                    mobile = findUser.mobile, 
                    role = findUser.role, 
                } = req.body;
                
                findUser.fullName = fullName;
                findUser.mobile = mobile;
                findUser.role = role;

                // update data
                const updateUser = await findUser.save();
                const { password, ...user } = updateUser['dataValues'];
                return res
                        .status(200)
                        .json({
                            status: 200,
                            data: user,
                        })
            } else {
                const error = new Error();
                error.status = 401;
                error.message = "Can't Find User for update !";
                return next(error);
            }
        } catch (err) {
            next(err);
        }
    }

    //change user info with own
    async changeInfo(req, res, next) {
        try {
            // validate body data
            await validateUpdateUser(req.body);

            // find user
            const { userId } = req.user;
            console.log({userId})
            const user = await userModel.findOne(userId);
            console.log({user})
            
            if (user) {
                const { 
                    fullName = user.fullName, 
                    mobile = user.mobile, 
                    role = user.role, 
                } = req.body;
                
                user.fullName = fullName;
                user.mobile = mobile;
                user.role = role;

                // update data
                const updateUser = await user.save();
                return res
                        .status(200)
                        .json({
                            status: 200,
                            data: updateUser,
                        })
            } else {
                const error = new Error();
                error.status = 401;
                error.message = "Can't Find User for update !";
                return next(error);
            }
        } catch (err) {
            next(err);
        }
    }

    async changePassword(req, res, next) {
        try {
            console.log('first')
            // validate body data
            await validateChangePasswordUser(req.body);

            // find user
            const { userId } = req.user;
            console.log({req})
            const user = await userModel.findOne(userId);

            if (user) {
                const { currentPassword, password } = req.body;

                const isMatch = await bcrypt.compare(currentPassword, user.password);

                if (isMatch) {
                    user.password = password;
    
                    // update data
                    const updateUser = await user.save();
                    return res
                            .status(200)
                            .json({
                                status: 200,
                                data: updateUser,
                            })
                } else {
                    const error = new Error();
                    error.status = 401;
                    error.message = "Current Password Is Not Correct !";
                    return next(error);
                }
            } else {
                const error = new Error();
                error.status = 401;
                error.message = "Can't Find User for Change Password !";
                return next(error);
            }
        } catch (err) {
            console.log({err})
            next(err);
        }
    }

    // import users from xlsx
    async importFromXlsx(req, res, next) {
        console.log({ req: req.file })
    }
}

module.exports = new UserController();