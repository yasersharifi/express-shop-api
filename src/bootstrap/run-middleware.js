function runMiddleware(app, allMiddleware) {
    for (let fn of allMiddleware) {
        fn(app)
    }
}

module.exports = runMiddleware;