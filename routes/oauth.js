const express = require('express');
const router = express.Router();
const utils = require('../src/js/utils');
const queryString = require('qs');
const { httpsRequest } = require('../src/js/https')
const cookieParser = require('cookie-parser');

router.use(cookieParser(process.env.COOKIE_SECRET));

router.get('/oauth/auth', (req, res) => {
    let client_id = process.env.CLIENT_ID;
    let codeVerifier = utils.codeVerifier();

    res.json({
        client_id: client_id,
        code_verifier: codeVerifier,
        code_challenge: codeVerifier
    });
})

router.get('/oauth/login', async (req, res) => {
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

    let data = JSON.parse(await httpsRequest(options, payload))
    res.cookie('tk', `${data.access_token}`, {signed: true, httpOnly: true})
       .redirect('/');
})

module.exports = router;