import * as https from 'https';

const httpsRequest = (options: object, payload: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        let request = https.request(options, (res: any) => {
            let data = '';
            res.on('data', (chunk: string) => data += chunk);
            res.on('end', () => resolve(data));
            res.on('error', (e: any) => reject(e));
        })
        request.end(payload);
    });
}

const httpsAsync = async (options: object, payload: any) => {
    return await httpsRequest(options, payload)
}

module.exports = {
    httpsRequest: httpsAsync,
}