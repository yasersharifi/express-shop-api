const Yup = require('../../utils/Yup');

const schema = Yup.object().shape({
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().label('Password'),
});

async function validateRegisterUser(req, res, next) {
    try {
        await schema.validate(data, { abortEarly: false });
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = validateRegisterUser;