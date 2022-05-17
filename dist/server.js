"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: __dirname + '/.env' });
const app = require('./app');
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
