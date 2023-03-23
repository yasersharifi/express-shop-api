const homeRouter = require('./home/home.router');

function appRouter(app) {
    app.use('/', homeRouter);
}

module.exports = appRouter;