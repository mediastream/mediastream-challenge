'use strict';

const BATCH_SIZE = 10;
const SEPARATOR = ',';
const FILENAME = "users_file.csv";

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
const fs = require('fs');
const _ = require('lodash');
const async = require('async');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
app.get('/users', downloadUsers);

function errorFunc(res, err) {
    console.error('error = ' + err);
    res.send('error');
}

function downloadUsers(req, res) {
    let fileExists = false;
    let writer = null;
    async.series(
        {
            checkIfExists: function (callback) {
                fs.stat(FILENAME, function (err, stats) {
                    if (!err) {
                        fileExists = true;
                    }
                    callback();
                });
            },
            deleteFile: function (callback) {
                if (fileExists) {
                    fs.unlink(FILENAME, callback);
                } else {
                    callback();
                }
            },
            createFile: function (callback) {
                writer = fs.createWriteStream(FILENAME, {flags: 'w'});
                writer.write('name' + SEPARATOR + 'email\n');
                callback();
            }
        },
        function (err) {
            if (err) {
                errorFunc(res, err);
            }
            let reader = User.find({}, "name email").stream();

            reader.on('error', function (err) {
                errorFunc(res, err);
            });

            reader.on('data', function (doc) {
                writeBatch(writer, doc);
            });

            reader.on('end', function () {
                console.log('end event');
            });
            reader.on('close', function () {
                console.log('close event');
                res.send('Users written in ' + FILENAME + '\n');
            });
            reader.on('exit', function (code, signal) {
                console.log('exit event, code: ' + code + ', signal: ' + signal);
                res.send('exit');
            });
        }
    );
};

app.listen(3000);

function writeBatch(outStream, _users) {
    let users = _users;
    if (!_.isArray(users)) {
        users = [_users];
    }
    _.forEach(users, function (user) {
        outStream.write(user.name + SEPARATOR + user.email + '\n');
    });
}