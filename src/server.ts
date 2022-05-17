import * as path from 'path';

require('dotenv').config(path.join('..', '/.env'));

const app = require('./app');

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})