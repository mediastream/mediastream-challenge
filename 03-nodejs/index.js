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
const csv = require('express-csv');
const _ = require('lodash'); // https://lodash.com/docs/4.17.4

const router = express.Router();

router.get('/', function(req, res) {
  User.find({}, 'name email', (error, users) => {
    if (error) res.status(500).send(error);
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=\"' + 'users-' + Date.now() + '.csv\"'
    );
    const headers = _.keys(users[0]._doc);
    const usersData = _.map(
      users,
      (user) => _.values(user._doc)
    );
    const data = [headers, ...usersData];
    res.status(200).csv(data);
  });
});

app.use('/users', router);

app.listen(3000);
