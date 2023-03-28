const Yup = require('../../utils/Yup');

const createUserSchema = Yup.object().shape({
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().label('Password'),
});

async function validateLoginUser(data) {
    return await createUserSchema.validate(data, { abortEarly: false });
}

module.exports = { validateLoginUser }