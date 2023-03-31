const Yup = require('./../../utils/Yup');

const createUserSchema = Yup.object().shape({
    fullName: Yup.string().required().label('Full Name'),
    email: Yup.string().email().required().label('Email'),
    mobile: Yup.string().required().label('Mobile'),
    role: Yup.string().required().oneOf(['user', 'admin']).label('Role'),
    password: Yup.string().required().min(8).label('Password'),
});

async function validateCreateUser(req, res, next) {
    try {
        await createUserSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = validateCreateUser;