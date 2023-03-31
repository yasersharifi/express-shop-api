require('module-alias/register');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.static(__dirname));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


module.exports = app;