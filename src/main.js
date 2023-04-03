require('module-alias/register');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const app = express();

app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //still working on it


module.exports = app;