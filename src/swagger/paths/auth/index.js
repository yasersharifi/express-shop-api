const fs = require("fs");
const path = require("path");
const YAML = require('yaml');

// login user path
const loginAuth = fs.readFileSync(path.join(__dirname, 'login-auth.yaml'), 'utf8');
const loginAuthParse = YAML.parse(loginAuth);

const authPaths = {
    ...loginAuthParse,
};

module.exports = authPaths;
