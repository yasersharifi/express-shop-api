const serializeYupErr = require('@utils/serializeYepErr');

function handleError(app) {
    app.use((req, res, next) => {
        const error = new Error();
        error.message = 'Not Found !';
        error.status = 404;
    
        next(error);
    });
    
    app.use((error, req, res, next) => {
        // serialize Yup Errors
        if (error.name === 'ValidationError') {
            const yupError = serializeYupErr(error);
            return res.status(error.status || 500).json({ errors: yupError });
        }
    
        return res.status(error.status || 500).json({ error });
    });
}

module.exports = handleError;