const userPaths = require('./user');
const authPaths = require('./auth');

const paths = {
    paths: {
        ...userPaths,
        ...authPaths,
    },
};

module.exports = paths;
