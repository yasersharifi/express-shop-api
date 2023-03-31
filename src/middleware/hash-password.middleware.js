const bcrypt = require('bcrypt');

async function hashPassword(req, res, res) {
    try {
        const { password } = req.body;
        const salt = 10;
        const passwordHash = await bcrypt.hash(password, salt);
        req.body.password = passwordHash;
        next();
    } catch (err) {
        next(err);
    }
} 

module.exports = hashPassword;