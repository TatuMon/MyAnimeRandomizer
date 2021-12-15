

//TODO: Check if user has token. Kinda like a auth middleware
const authorized = (req, res, next) => {
    if(!(req.signedCookies['tk'])){
        res.sendFile('/views/connect.html', { root: global.basePath });
        return;
    }

    next();
}

module.exports = {
    authorized: authorized,
}