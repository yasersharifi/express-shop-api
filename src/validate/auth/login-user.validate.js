const Yup = require('@utils/Yup');

const createUserSchema = Yup.object().shape({
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().label('Password'),
});

async function validateLoginUser(req, res, next) {
    try {
        await createUserSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = validateLoginUser;
