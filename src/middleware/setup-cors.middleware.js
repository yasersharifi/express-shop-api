function setupCORS(app) {
    app.use((req, res, next) => {
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
            res.status(200).json({});
        }
    
        next();
    });
}

module.exports = setupCORS;