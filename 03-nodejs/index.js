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
const json2csv = require('json2csv'); // Use to transform json to a csv

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

/**
 * Get user csv
 * */
app.get('/users', function (req, res) {
    let query = {};

    // Search filter
    if (req.query.search) {
        query.$or = [
            { 'name': { $regex: new RegExp(req.query.search, 'i') } },
            { 'email': { $regex: new RegExp(req.query.search, 'i') } }
        ];
    }

    // Init query
    let usr = User.find(query);

    // Sort options
    if (req.query.sort) {
        usr.sort(req.query.sort);
    }

    // Exec query
    usr.exec(function(err, users) {
            if (err) {
                res.send(err);
            } else {
                json2csv({data: users, fields: ['name', 'email']}, function (err, csv) {
                    res.setHeader('Content-disposition', 'attachment; filename=users.csv');
                    res.set('Content-Type', 'text/csv');
                    res.status(200).send(csv);
                });
            }
        });
});

app.listen(3000);

/**
 * Uses:
 * ====
 *
 * Basic CSV list:
 * http://localhost:3000/users
 *
 * Search by name or email list:
 * http://localhost:3000/users?search=miss
 *
 * Order:
 * http://localhost:3000/users?search=miss&sort=name
 * or http://localhost:3000/users?search=miss&sort=-name (DESC)
 * **/
