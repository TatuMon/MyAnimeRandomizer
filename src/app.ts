/////  IMPORTS  /////
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

const expressLayouts = require('express-ejs-layouts');

const app = express();
const utils = require('./js/utils');
const middlewares = require('./middlewares');
const { httpsRequest } = require('./js/https')

const oauthRouter = require('./routes/oauth');
const userRouter = require('./routes/user');
/////  IMPORTS  /////

//View engine settings
app.use(expressLayouts);
app.set('layout', path.join(__dirname, '/views/layouts/default'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//Static files
app.use('/lib/bootstrap/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/lib/bootstrap/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/lib/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

//Cookies!
app.use(cookieParser(process.env.COOKIE_SECRET));

//Routes that don't need access token
app.get('/about', (req, res) => {
    res.render('about');
})
app.use(oauthRouter);

//From now on, you need the access token to use these routes
app.use(middlewares.authorized);

app.use(userRouter);
app.get('/', async (req, res) => {
    let accessToken = req.signedCookies['tk'];

    let options = {
        host: 'api.myanimelist.net',
        path: '/v2/users/@me',
        headers: {
            'Authorization' : `Bearer ${accessToken}`
        }
    }

    let data: Record<string, any> = JSON.parse(await httpsRequest(options));

    res.render('profile', {name :  data.name})
});

app.get('*', (req, res) => {
    res.redirect('/');
})

module.exports = app;