const log4js = require('log4js'),
    logger = log4js.getLogger();

var MemStore = {};

class ReadingStore {
    constructor() {
    }
    saveReading(DeviceId, reading) {
        MemStore[DeviceId] = reading;
    }
    getReading(DeviceId) {
        if (MemStore[DeviceId])
            return MemStore[DeviceId];
        else
            return null;
    }
}

module.exports = ReadingStore;