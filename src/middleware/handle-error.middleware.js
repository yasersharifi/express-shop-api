const serializeYupErr = require('@utils/serializeYepErr');

function handleError(app) {
    app.use((req, res, next) => {
        const error = new Error();
        error.status = 404;
        error.message = 'Not Found !';
    
        next(error);
    });
    
    app.use((error, req, res, next) => {
        // serialize Yup Errors
        if (error.name === 'ValidationError') {
            const yupError = serializeYupErr(error);

            return res.status(400).json({ 
                status: 400,
                statusText: 'error',
                errors: yupError 
            });
        }
    
        return res.status(error.status || 500).json({
            statusText: 'error',
            ...error,
        });
    });
}

module.exports = handleError;
