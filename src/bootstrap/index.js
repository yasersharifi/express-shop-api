const runMiddleware = require('./run-middleware');
const appRouter = require('./../router');
const logger = require('./../middleware/logger.middleware');
const setupCORS = require('./../middleware/setup-cors.middleware');
const handleError = require('./../middleware/handle-error.middleware');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

function bootstrap(app) {
    // run all middleware
    runMiddleware(app, [    
        logger,
        setupCORS,
        appRouter,
        handleError,
    ]);
    
    app.listen(PORT, HOST, () => {
        console.log(`Server Running On http://${HOST}:${PORT}`);
    });
}

module.exports = bootstrap;