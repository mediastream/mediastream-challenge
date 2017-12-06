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
const JSONStream = require('JSONStream');
const path = require("path");

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
// let total = 0;

// End point that downloads the .csv file using a jquery request
// and parsing from JSON to CSV using papaparse.
app.get('/users', function (req, res) {
	res.sendFile(path.join(__dirname+'/backup.html'));
});
// End point that stream the database.
app.get('/backup', function (req, res) {
  User.find()
    .cursor()
    .pipe(JSONStream.stringify())
    .pipe(res.type('json'));
});

app.listen(3000);
