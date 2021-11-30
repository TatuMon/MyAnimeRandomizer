const express = require('express');
const app = express();

const path = require('path')
const utils = require('./utils');

const oauth = require('./routes/oauth');

app.use('*/css', express.static(path.join(__dirname, 'public/css')));
app.use('/', oauth);

app.get('/', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname })
})

module.exports = app;