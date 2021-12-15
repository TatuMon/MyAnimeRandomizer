const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const utils = require('./resources/js/utils');
const middlewares = require('./middlewares');
const oauthRouter = require('./routes/oauth');

app.use('*/css', express.static(path.join(__dirname, 'public/css')));
app.use(cookieParser());

app.use(oauthRouter);
app.use(middlewares.authorized);

app.get('/', (req, res) => {
    res.sendFile('/views/profile.html', { root: global.basePath });
})

module.exports = app;