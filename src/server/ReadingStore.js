const log4js = require('log4js'),
    logger = log4js.getLogger();

var MemStore = {};
var singleton = null;

class ReadingStore {
    constructor() {
    }
    static getSingleton() {
        if (singleton === null) {
            singleton = new ReadingStore();
        }

        return singleton;
    }
    saveReading(DeviceId, reading) {
        MemStore[DeviceId] = reading;
    }
    getAllReadings() {
        return Object.values(MemStore);
    }
    getReading(DeviceId) {
        if (MemStore[DeviceId])
            return MemStore[DeviceId];
        else
            return null;
    }
}

module.exports = ReadingStore;