'use strict';

/**
 * Created by Edgardo Barría Melián - 19/02/2018
 * edgardo.barriam@gmail.com
 */

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
const csv = require('csv');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

app.get('/users', (req, res) => {
  User.find({}).then((result) => {
      
    var users = []
    result.forEach((user) => {
      users.push({
        name: user.name,
        email: user.email
      });
    });
    
    csv.stringify(users,(error, data) => {
      res.send(data);
    });
  }, (error) => {
    res.status(500).send(error);
  });
});

app.listen(3000);