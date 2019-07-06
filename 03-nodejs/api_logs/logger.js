const winston = require('winston');
const fs = require('fs');
require('winston-daily-rotate-file');

let logDirectory = __dirname + '/logs';

console.log(logDirectory)

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
};

var logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: logDirectory + '/api.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});


module.exports = {
    logger
};