const userRouter = require('./user/user.router');

function appRouter(app) {
    app.use('/user', userRouter);
}

module.exports = appRouter;