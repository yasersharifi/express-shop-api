const Yup = require('./../../utils/Yup');

const createUserSchema = Yup.object().shape({
    fullName: Yup.string().required().label('Full Name'),
    email: Yup.string().email().required().label('Email'),
    mobile: Yup.string().required().label('Mobile'),
    role: Yup.string().required().oneOf(['user', 'admin']).label('Role'),
    password: Yup.string().required().min(8).label('Role'),
});

async function validateCreateUser(data) {
    return await createUserSchema.validate(data, { abortEarly: false });
}

module.exports = { validateCreateUser }