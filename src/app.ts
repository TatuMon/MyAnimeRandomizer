import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();
const utils = require('./js/utils');
const middlewares = require('./middlewares');
const { httpsRequest } = require('./js/https')

const oauth = require('./routes/oauth');
const user = require('./routes/user');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('*/css', express.static(path.join(__dirname, 'public/css')));
app.use(cookieParser(process.env.COOKIE_SECRET));

//The about page is open to anyone
app.get('/about', (req, res) => {
    res.render('about');
})

app.use(oauth);
app.use(middlewares.authorized);
app.use(user);

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