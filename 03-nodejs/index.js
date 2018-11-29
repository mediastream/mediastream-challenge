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
const Json2csvParser = require('json2csv').Parser;

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

app.get('/users', function (req, res) {
    const fields = ['name', 'email'];
    const json2csvParser = new Json2csvParser({ fields });
    User.find({}, function (err, users) {
        if (err) {
            res.status(422).send(err.errors);
        } else {
            const data = json2csvParser.parse(users);
            res.attachment('users.csv');
            res.status(200).send(data);
        }
    });
});

app.listen(3000);
