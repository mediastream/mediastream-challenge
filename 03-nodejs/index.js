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
const json2csv = require('json2csv');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
app.use('/users', (req, res) => {
    let fields = ['_id', 'name', 'email'];
    User.find({}, (err, users) => {
        let csv = json2csv({data: users, fields: fields});
        res.setHeader('Content-disposition', 'attachment; filename=users.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
    });
});
// TODO

app.listen(3000);
