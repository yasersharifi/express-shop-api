const fs = require("fs");
const path = require("path");
const YAML = require('yaml');

// login user path
const loginAuth = fs.readFileSync(path.join(__dirname, 'login-auth.yaml'), 'utf8');
const loginAuthParse = YAML.parse(loginAuth);

const registerAuth = fs.readFileSync(path.join(__dirname, 'register-auth.yaml'), { encoding: 'utf8'});
const registerAuthParse = YAML.parse(registerAuth);

const authPaths = {
    ...loginAuthParse,
    ...registerAuthParse,
};

module.exports = authPaths;
