'use strict';

console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Setup database
mongoose.Promise = Promise;
const connectionString = 'mongodb://localhost/mediastream-challenge';
mongoose.connect(connectionString, {
    useMongoClient: true,
});
const User = require('./models/User');

// Setup Express.js app
const app = express();
// Setup csv
const csvwriter = require('csvwriter'); //https://www.npmjs.com/package/csvwriter
// Loggin
const loggerFormat = '[:date[web]] ":method :url" :status :response-time';
var logger = require('./api_logs/logger').logger;

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

app.use(require("morgan")("combined", {
    "stream": logger.stream
}));

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
}));

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode >= 400
    },
    stream: process.stdout
}));

// I needed count for test...
app.get("/health", function (req, res) {

    let countUsers = 0;

    let response = {
        msg: 'OK',
        data: {}
    };

    try {
        
        User.count({})
            .then((count) => {
                countUsers = count;
                response.data["count_users"] = countUsers;
                res.status(200).json(response);
            }).catch((err) => {
                response.msg = 'NO_OK';
                res.status(404).json(response);
            });

    } catch (error) {
        logger.error('error - /health', error);
        response.msg = 'NO_OK';
        res.status(404).json(response);
    }

});

// users endpoint
app.get('/users', (req, res) => {

    let response = {
        msg: 'OK',
        data: {}
    };

    try {
        mongoDbCSV(res);
    } catch (error) {
        logger.error('error - /users', error);
        response.msg = "NO_OK";
        return res.status(400).json(response);
    }
});

// test contection with db, if conection is not ready, connect again
function connectDb() {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(connectionString, {
            useMongoClient: true,
        });
    }
}

// process to mongodb -> csv
const mongoDbCSV = function (res) {
    return new Promise((resolve, reject) => {
        try {
            connectDb();

            let fields = 'name,email';
            let filename = 'db-users-mongodb-' + new Date().getTime() + '.csv';
            let stream = User.find({}).stream();

            res.set({
                'Content-Disposition': 'attachment; filename=\"' + filename + '\"',
                'Content-type': 'text/csv'
            });
            res.write(fields + '\n');

            stream.on('error', function (err) {
                res.write('Error:' + err);
                throw new Error(err);
            });

            stream.on('data', function (doc) {
                // convert the json to csv.
                csvwriter(JSON.stringify(doc), {
                    header: false,
                    fields: fields
                }, function (err, csv) {
                    if (err) {
                        res.write('Error:' + err);
                        throw new Error(err);
                    }
                    res.write(csv);
                });
            });

            stream.on('end', function () {
                // wait for any thing queued up to complete.
                setTimeout(function () {
                    res.end('');
                    resolve();
                }, 1000);
            });

        } catch (error) {
            reject(error);
        }
    })
};

// TODO

app.listen(3000);