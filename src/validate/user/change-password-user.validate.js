const Yup = require('../../utils/Yup');

const schema = Yup.object().shape({
    currentPassword: Yup.string().required().label('Current Password'),
    password: Yup.string().required().label('Password'),
});

async function validateChangePasswordUser(data) {
    return await schema.validate(data, { abortEarly: false });
}

module.exports = { validateChangePasswordUser }