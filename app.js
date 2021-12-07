const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const utils = require('./resources/js/utils');
const middlewares = require('./middlewares');

const oauth = require('./routes/oauth');

app.use('*/css', express.static(path.join(__dirname, 'public/css')));
app.use(cookieParser());

app.use('/', oauth);
app.use(middlewares.authorized);

app.get('/', (req, res) => {
    res.send('hola')
})

app.get('/login', (req, res) => {
    res.sendFile('/views/profile.html', { root: __dirname });
    let payload = queryString.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        code_verifier: req.query.state,
        grant_type: 'authorization_code'
    });

    let options = {
        host: 'myanimelist.net',
        path: '/v1/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    httpsRequest(options, payload)
        .then((data) => {
            data = JSON.parse(data);

            res.cookie('tk', data.access_token, {signed: true});
            res.redirect('/');
            // res.json('owo');
        })
        .catch((e) => {
            res.send(e);
        });
})

module.exports = app;