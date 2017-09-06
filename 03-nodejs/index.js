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
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.send('use GET /users');
});

app.get('/users', function (req, res) {
	res.statusCode = 200;
	res.setHeader('Content-type', 'application/csv');
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Header to force download
	res.setHeader('Content-disposition', 'attachment; filename=users.csv');

	res.write("NAME,EMAIL\n");

	User.find({}).cursor()
		.on('data', function(user) {
			res.write('"' + user.name + '","' + user.email + "\"\n");
		})
		.on('end', function() {
			res.end();
		});	
});

app.listen(3000);
