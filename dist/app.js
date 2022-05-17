"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const utils = require('./js/utils');
const middlewares = require('./middlewares');
const { httpsRequest } = require('./js/https');
const oauth = require('./routes/oauth');
const user = require('./routes/user');
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '/views'));
app.use('*/css', express_1.default.static(path_1.default.join(__dirname, 'public/css')));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
//The about page is open to anyone
app.get('/about', (req, res) => {
    res.render('about');
});
app.use(oauth);
app.use(middlewares.authorized);
app.use(user);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let accessToken = req.signedCookies['tk'];
    let options = {
        host: 'api.myanimelist.net',
        path: '/v2/users/@me',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    let data = JSON.parse(yield httpsRequest(options));
    res.render('profile', { name: data.name });
}));
app.get('*', (req, res) => {
    res.redirect('/');
});
module.exports = app;
