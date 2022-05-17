"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const utils = require('../js/utils');
const queryString = require('qs');
const { httpsRequest } = require('../js/https');
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
});
router.get('/oauth/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    let data = JSON.parse(yield httpsRequest(options, payload));
    res.cookie('tk', `${data.access_token}`, { signed: true, httpOnly: true })
        .redirect('/');
}));
module.exports = router;
