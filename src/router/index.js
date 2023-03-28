const userRouter = require('./user/user.router');
const authRouter = require('./user/auth.router');

function appRouter(app) {
    app.use('/users', userRouter);
    app.use('/auth', authRouter);
}

module.exports = appRouter;