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
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO

//1 - create the GET Users endpont
app.get('/users', function(req, res) {
  //Set the response header to download csv file
  usersCall((err, results) => {
    if (err) {
      res.send('error');
    }
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="' + 'users-' + Date.now() + '.csv"'
    );
    res.send(formatCSVOutput(results));
  });
});

const usersCall = function(cb) {
  User.find()
    .limit(2)
    .exec(function(err, users) {
      cb(err, users);
    });
};

const formatCSVOutput = function(users) {
  const output = [];

  let headers = ['id', 'name', 'email'];
  output.push(headers);

  users.forEach(d => {
    const row = [];
    row.push(`${d._id}`);
    row.push(`${d.name}`);
    row.push(`${d.email}`);
    output.push(row.join());
  });

  return output.join('\n');
};

app.listen(3000);
