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
const fs = require('fs');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

app.get('/users/', function (req, res) {
  User.find((err, users) => {
    if (err) return res.status(500).send(err);

    const csv = json2csv({ data: users, fields: ['id', 'name', 'email'] });
    fs.writeFile('users.csv', csv, (err) => {
      if (err) return res.status(500).send(err);

      res.download('users.csv');
    });
  });
});

app.listen(3000);
