const https = require('https');

let httpsRequest = (options, payload) => {
    return new Promise((resolve, reject) => {
        let request = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
            res.on('error', (e) => reject(e));
        })
        request.end(payload);
    });
}

module.exports = {
    httpsRequest: httpsRequest,
}