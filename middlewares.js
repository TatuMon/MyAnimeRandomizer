

//TODO: Check if user has token. Kinda like a auth middleware
const authorized = (req, res, next) => {
    if(!(req.signedCookies['tk'])){
        res.render('connect');
        return;
    }

    next();
}

module.exports = {
    authorized: authorized,
}