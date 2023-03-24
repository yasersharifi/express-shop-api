const userRouter = require('./user/user.router');

function appRouter(app) {
    app.use('/users', userRouter);
}

module.exports = appRouter;