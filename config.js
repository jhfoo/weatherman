module.exports = {
    log4js: {
        appenders: {
            screen: {
                type: "console"
            }
        },
        categories: {
            default: {
                appenders: ["screen"],
                level: "debug"
            }

        }
    },
    default: {
        service: {
            port: 8010
        }
    },
    production: {
        service: {
            port: 8080
        }
    }
}