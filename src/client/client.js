const socketio = require('socket.io-client'),
    Config = require('../server/ConfigReader')('../../config'),
    log4js = require('log4js').configure(Config.log4js);
    
// primary init: setup logger
const logger = log4js.getLogger();

const socket = socketio('http://localhost:' + Config.service.port);
socket.on('connect', () => {
    console.log('Connected!');
    socket.emit('NewReading', {value:100});
    socket.close();
})