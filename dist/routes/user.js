"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { httpsRequest } = require('../js/https');
router.use('/user/*', (req, res, next) => {
    res.status(404).send('UPS! Wrong route');
});
module.exports = router;
