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
const json2csv = require('express-json2csv');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

app.use(json2csv);
app.get('/users', (req, res) => {
  let user = mongoose.model('User');
  let query = user.find({}).select('name email -_id');
  query.exec({}, (err, users) => {
    if (err) {
      return res.status(500).send(err);
    }
    let columns = [{
      prop: 'name',
      label: 'name'
    }, {
      prop: 'email',
      label: 'email'
    }];
    res.csv('users', users, columns, {includeHeader: true});
  });
});

app.listen(3000);
