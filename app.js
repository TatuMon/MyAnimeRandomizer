const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const utils = require('./resources/js/utils');
const middlewares = require('./middlewares');

const oauth = require('./routes/oauth');

app.use('*/css', express.static(path.join(__dirname, 'public/css')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(oauth);
app.use(middlewares.authorized);

app.get('/', (req, res) => {
    res.sendFile(path.join(global.basePath, 'views/profile.html'));
});

module.exports = app;