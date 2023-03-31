const Yup = require('@utils/Yup');

const schema = Yup.object().shape({
    fullName: Yup.string().required().label('Full Name'),
    mobile: Yup.string().required().label('Mobile'),
    role: Yup.string().required().oneOf(['user', 'admin']).label('Role'),
});

async function validateUpdateUser(req, res, next) {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = validateUpdateUser