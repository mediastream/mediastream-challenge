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

var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['id', 'name', 'email'];
var fieldNames = ['ID', 'Name', 'E-Mail'];

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://test:test@ds033656-a0.mlab.com:33656,ds033656-a1.mlab.com:33656/test?replicaSet=rs-ds033656');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO

app.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    var csv = json2csv({
      data: users,
      fields: fields
    });
    res.attachment('usersList.csv');
    res.status(200).send(csv);
  });
});

app.listen(3000);
