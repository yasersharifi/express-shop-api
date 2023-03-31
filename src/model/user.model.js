const User = require('@entity/user.entity');

class UserModel {
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

    async findAll() {
        return await User.findAll({
            attributes: {
                exclude: ['password']
            },
            order: [
                ['id', 'DESC']
            ]
        });
    }

    async findOne(userId) {
        return await User.findOne({
            where: {
                id: userId,
            },
        })
    }

    async findOneByEmail(email) {
        return await User.findOne({
            where: {
                email,
            },
        })  
    }
}

module.exports = new UserModel();