const express = require('express');
const app = express();

const path = require('path')
const utils = require('./utils');
const middlewares = require('./middlewares');

const oauth = require('./routes/oauth');

app.use('*/css', express.static(path.join(__dirname, 'public/css')));
app.use('/', oauth);
app.use((req, res, next) => middlewares.authorized(req, res, next));

app.get('/', (req, res) => {
    //res.sendFile('views/animelist.html', { root : __dirname });
    res.send('awawensia');
})

module.exports = app;