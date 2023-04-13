const fs = require("fs");
const path = require("path");
const YAML = require('yaml');

// create user path
const createUser = fs.readFileSync(path.join(__dirname, 'create-user.yaml'), 'utf8');
const createUserParse = YAML.parse(createUser);

// find all user
const findAllUser = fs.readFileSync(path.join(__dirname, 'find-all-user.yaml'), 'utf8');
const findAllUserParse = YAML.parse(findAllUser);

const userPaths = {
    '/users': {
        ...findAllUserParse,
        ...createUserParse,
    }
};

module.exports = userPaths;
