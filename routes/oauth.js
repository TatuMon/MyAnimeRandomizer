const express = require('express');
const router = express.Router();

const utils = require('../utils');

router.get('/oauth/auth', (req, res) => {
    let client_id = process.env.CLIENT_ID;
    let codeVerifier = utils.codeVerifier();


    res.json({
        client_id: client_id,
        code_verifier: codeVerifier,
        code_challenge: codeVerifier
    });
})

module.exports = router;