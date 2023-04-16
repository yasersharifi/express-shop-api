const jwt = require('jsonwebtoken');

function checkLogin(req, res, next) {
    try {
        if (req?.headers?.authorization) {
            const authorization = req.headers.authorization;
            const token = authorization.split(' ')[1];
            if (token) {
                const tokenDecode = jwt.verify(token, process.env.JWT_KEY);
                req.user = tokenDecode;
                return next();
            }
        } 
        console.log({authorization: req.headers.authorization}, req.headers);
        const error = new Error();
        error.message = 'unAuthorized!';
        error.status = 401;
        return next(error);
    } catch(err) {
        return next(err);
    }
}

module.exports = { checkLogin };
