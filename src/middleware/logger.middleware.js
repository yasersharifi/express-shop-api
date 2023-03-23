const morgan = require('morgan');

function logger(app) {
    // log request url with morgan
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

module.exports = logger;