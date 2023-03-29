const Yup = require('../../utils/Yup');

const schema = Yup.object().shape({
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().label('Password'),
});

async function validateRegisterUser(data) {
    return await schema.validate(data, { abortEarly: false });
}

module.exports = { validateRegisterUser }