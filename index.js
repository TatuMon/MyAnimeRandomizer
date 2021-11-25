const express = require('express');
const app = express();
const path = require('path');

app.use('*/css', express.static(path.join(__dirname, 'public/css')));

app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname })
})

app.get('/api/authdata', (req, res) => {
    let client_id = process.env.CLIENT_ID;
    res.json({ client_id: client_id });
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})