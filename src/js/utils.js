const braces = require('braces');

let codeVerifier = () => {
    let nums = braces.expand('{0..9}');
    let uppers = braces.expand('{A..Z}');
    let lowers = braces.expand('{a..z}');
    let others = ['-', '_', '.', '~'];

    let chars = nums.concat(uppers, lowers, others);

    let code = '';
    for (let i = 0; i < 128; i++) {
        let char = chars[randomBetween(0, 65)]
        code += char;
    }

    return code
}

let randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    codeVerifier: codeVerifier,
    randomBetween: randomBetween
}