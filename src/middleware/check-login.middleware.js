const jwt = require('jsonwebtoken');

function checkLogin(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            if (token) {
                const tokenDecode = jwt.verify(token, process.env.JWT_KEY);
                req.user = tokenDecode;
                return next();
            }
        } 

        const error = new Error();
        error.message = 'Auth Failed !';
        error.status = 401;
        next(error);
    } catch(err) {
        next(err);
    }
}

module.exports = { checkLogin };