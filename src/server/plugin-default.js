const assert = require('assert'),
    Router = require('restify-router').Router,
    router = new Router(),
    log4js = require('log4js'),
    logger = log4js.getLogger(),
    Config = require('./ConfigReader')('../../config'),
    store = require('./ReadingStore').getSingleton();

router.get('/getReadings', (req, res, next) => {
    logger.debug('Handling /getReadings');
    try {
        // validateParams(req, ['id', 'type']);

        res.send({
            status: 'OK',
            data: store.getAllReadings(),
        });
        return next();
    } catch (err) {
        logger.error(err);
        res.send({
            status: 'ERROR',
            message: err
        });
        return next();
    }
});

function validateParams(req, keys) {
    keys.forEach(key => {
        if (!req.query[key]) {
            throw 'Missing param: ' + key;
        }
    });
}

module.exports = router;