const fs = require("fs");
const path = require("path");
const YAML = require('yaml');

// user definition
const userDefinition = fs.readFileSync(path.join(__dirname, 'user.yaml'), 'utf8');
const userDefinitionParse = YAML.parse(userDefinition);

// unauthorized definition
const unauthorizedDefinition = fs.readFileSync(path.join(__dirname, 'unauthorized.yaml'), 'utf8');
const unauthorizedDefinitionParse = YAML.parse(unauthorizedDefinition);

// forbidden definition
const forbiddenDefinition = fs.readFileSync(path.join(__dirname, 'forbidden.yaml'), 'utf8');
const forbiddenDefinitionParse = YAML.parse(forbiddenDefinition);

// bad request definition
const badRequestDefinition = fs.readFileSync(path.join(__dirname, 'bad-request.yaml'), 'utf8');
const badRequestDefinitionParse = YAML.parse(badRequestDefinition);

const definitions = {
    definitions: {
        ...userDefinitionParse,
        ...unauthorizedDefinitionParse,
        ...forbiddenDefinitionParse,
        ...badRequestDefinitionParse,
    },
};

module.exports = definitions;
