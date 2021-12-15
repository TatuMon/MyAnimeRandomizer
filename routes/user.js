const express = require('express');
const router = express.Router();
const { httpsRequest } = require('../resources/js/https')

router.use('/user/*', (req, res, next) => {
    res.status(404).send('UPS! Wrong route')
})

module.exports = router;