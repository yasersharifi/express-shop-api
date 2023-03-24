const User = require('./../entity/user.entity');

class UserModel {
    async findAll() {
        return await User.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
    }

    async create(user) {
        const { fullName, email, mobile, role = 'user', password } = user;

        const userModel = new User();

        userModel.fullName = fullName;
        userModel.email = email;
        userModel.mobile = mobile;
        userModel.role = role;
        userModel.password = password;

        const { password: userPass, ...newUser} = await userModel.save();

        return newUser;
    }
}

module.exports = new UserModel();