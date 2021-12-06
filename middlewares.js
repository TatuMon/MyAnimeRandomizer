const { httpsRequest } = require('./resources/js/https');
const queryString = require('qs'); 

//TODO: Check if user has token. Kinda like a auth middleware
let authorized = (req, res, next) => {

    if(!(req.signedCookies[''])){

        res.sendFile('/views/connect.html', { root: __dirname });

    }

}

module.exports = {
    authorized: authorized,
}