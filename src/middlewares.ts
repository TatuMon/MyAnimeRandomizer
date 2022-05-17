import {NextFunction, Request, Response} from 'express';

//TODO: Check if user has token. Kinda like a auth middleware
function authorized(req: Request, res: Response, next: NextFunction): void {
    if (!(req.signedCookies['tk'])) {
        res.render('connect');
        return;
    }

    next();
}

module.exports = {
    authorized: authorized,
}