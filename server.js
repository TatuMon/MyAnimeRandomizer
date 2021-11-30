require('dotenv').config({path:__dirname+'/.env'});

const express = require('express');
const app = require('./app');

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})