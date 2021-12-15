require('dotenv').config({path:__dirname+'/.env'});

const app = require('./app');

global.basePath = __dirname;

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})