const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const appRouter = require('./router');
const logger = require('./middleware/logger.middleware');
const setupCORS = require('./middleware/setup-cors.middleware');

const app = express();

// log request
logger(app);

// set header & CORS
setupCORS(app);

// handle application routers
appRouter(app)


module.exports = app;