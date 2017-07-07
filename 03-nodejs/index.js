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

app.get('/users', function(req, res) {
  User.find(function(err, users) {
  	const csv = new Array();
  	csv.push(['id', 'name', 'email', '\n']);
  	users.forEach(user => csv.push([user.id, user.name, user.email, '\n']));
  	res.attachment('users.csv');
    res.send(new Buffer(csv.join('')));
  });
})


// TODO

app.listen(3000);
