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
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
const csv = require('express-csv');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
router.get('/users', (req, res) => {
  User.find().then(response => {
    let titles = Object.keys(response[0]._doc);
    response = response.map(user => titles.map(key => user[key]));
    res.status(200).csv([titles].concat(response));
  });
});

app.use('/', router);


app.listen(3000);
