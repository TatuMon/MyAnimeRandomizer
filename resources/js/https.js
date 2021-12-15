const https = require('https');

const httpsRequest = (options, payload) => {
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

const httpsAsync = async (options, payload) => {
    return await httpsRequest(options, payload)
}

module.exports = {
    httpsRequest: httpsAsync,
}