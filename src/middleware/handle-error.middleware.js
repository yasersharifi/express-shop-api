function handleError(app) {
    app.use((req, res, next) => {
        const error = new Error();
        error.message = 'Not Found !';
        error.status = 404;
    
        next(error);
    });
    
    app.use((error, req, res, next) => {
        console.log(error);
    
        res.status(error.status || 500).json({ error });
    });
}

module.exports = handleError;