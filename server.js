require('dotenv').config({path:__dirname+'/.env'});

const path = require('path');
const express = require('express');
const app = require('./app');

global.basePath = __dirname;
global.resources = path.join(__dirname, '/src')

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})