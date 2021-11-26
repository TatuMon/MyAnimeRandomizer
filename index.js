require('dotenv').config({path:__dirname+'/.env'});

const express = require('express');
const app = express();
const path = require('path');
const utils = require('./utils');

app.use('*/css', express.static(path.join(__dirname, 'public/css')));

app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname })
})

app.get('/api/authdata', (req, res) => {
    let client_id = process.env.CLIENT_ID;
    let codeVerifier = utils.codeVerifier();


    res.json({
        client_id: client_id,
        code_verifier: codeVerifier,
        code_challenge: codeVerifier
    });
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})