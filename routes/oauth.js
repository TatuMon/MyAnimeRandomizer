const express = require('express');
const router = express.Router();
const utils = require('../resources/js/utils');
const queryString = require('qs');
const { httpsRequest } = require('../resources/js/https')

router.get('/oauth/auth', (req, res) => {
    let client_id = process.env.CLIENT_ID;
    let codeVerifier = utils.codeVerifier();


    res.json({
        client_id: client_id,
        code_verifier: codeVerifier,
        code_challenge: codeVerifier
    });
})

router.get('/oauth/login', (req, res) => {
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

            //res.cookie('tk', `${data.access_token}`, {signed: true});
            res.redirect('/');
        })
        .catch((e) => {
            res.send(e);
        });
})

module.exports = router;