const options = require("./options.json");
const paths = require("./paths");
const definitions = require("./definitions");

const swaggerDocument = {
    ...options,
    ...paths,
    ...definitions,
};

module.exports = swaggerDocument;