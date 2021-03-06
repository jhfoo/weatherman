const assert = require('assert'),
    restify = require('restify'),
    Router = require('restify-router').Router,
    router = new Router(),
    CorsMiddleware = require('restify-cors-middleware'),
    socketio = require('socket.io'),
    Config = require('./ConfigReader')('../../config'),
    log4js = require('log4js').configure(Config.log4js),
    ReadingStore = require('./ReadingStore'),
    store = ReadingStore.getSingleton();

// primary init: setup logger
const logger = log4js.getLogger();

// secondary init
const server = restify.createServer();
const io = socketio.listen(server.server);

const cors = CorsMiddleware({
    origins:['*']
});

// router.add('/', require('./plugin-default'));
// router.applyRoutes(server);
require('./plugin-default').applyRoutes(server);

// config REST service
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser({
    mapParams: false
}));
server.use(cors.preflight);
server.use(cors.actual);

// start REST service
server.listen(Config.service.port, () => {
    logger.debug('%s listening on %s', server.name, server.url);
});

io.sockets.on('connection', (socket) => {
    logger.debug('socket.io connection established');

    socket.on('NewReading', (data) => {
        logger.debug('NewReading event: ' + JSON.stringify(data, null, 2));
        try {
            assert(data.DeviceId);
            assert(data.DeviceType);
            assert(data.TempC);
            assert(data.humidity);
            assert(data.DateTime);
            store.saveReading(data.DeviceId + ':' + data.DeviceType, data);
        } catch (err) {
            logger.error(err);
        }
    });

    socket.on('disconnect', (socket) => {
        logger.debug('socket.io connection closed');
    });
});