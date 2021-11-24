const express = require('express');
const app = express();
const path = require('path');

app.use('*/css', express.static(path.join(__dirname, 'public/css')));

app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname })
})

app.listen('3000', () => {
    console.log('Listening on port 3000');
})