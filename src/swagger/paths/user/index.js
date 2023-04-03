const fs = require("fs");
const path = require("path");
const YAML = require('yaml');

// create user path
const createUser = fs.readFileSync(path.join(__dirname, 'create-user.yaml'), 'utf8');
const createUserParse = YAML.parse(createUser);

const userPaths = {
    ...createUserParse,
};

module.exports = userPaths;
