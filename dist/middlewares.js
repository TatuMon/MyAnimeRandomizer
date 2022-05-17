"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: Check if user has token. Kinda like a auth middleware
function authorized(req, res, next) {
    if (!(req.signedCookies['tk'])) {
        res.render('connect');
        return;
    }
    next();
}
module.exports = {
    authorized: authorized,
};
