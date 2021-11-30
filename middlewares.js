let authorized = (req, res, next) => {
    if(!(req.query.code)){

        res.sendFile('/views/connect.html', { root: __dirname });

    } else {

        next();

    }
}

module.exports.authorized = authorized