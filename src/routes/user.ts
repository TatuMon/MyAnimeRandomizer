import {Router} from 'express';
const router = Router();
const { httpsRequest } = require('../js/https')

router.use('/user/*', (req, res, next) => {
    res.status(404).send('UPS! Wrong route')
})

module.exports = router;