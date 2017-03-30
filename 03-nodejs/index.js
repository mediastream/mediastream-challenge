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

var UserController = require('./controllers/users');

var router = express.Router();

router.get('/', function(req, res) {
  res.send("Hello world!");
});

app.use(router);

var users = express.Router();

users.route('/users')
	.get(UserController.findAllUsers);

app.use(users);

app.listen(3001, function() {
  console.log("Node server running on http://localhost:3001");
});
