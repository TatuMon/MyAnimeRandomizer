const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const utils = require('./resources/js/utils');
const middlewares = require('./middlewares');
const { httpsRequest } = require('./resources/js/https')

const oauth = require('./routes/oauth');
const user = require('./routes/user');

app.set('view engine', 'ejs');

app.use('*/css', express.static(path.join(__dirname, 'public/css')));
app.use(cookieParser(process.env.COOKIE_SECRET));
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

    data = JSON.parse(await httpsRequest(options));

    res.render('profile', {name :  data.name})
});

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('*', (req, res) => {
    res.redirect('/');
})

module.exports = app;