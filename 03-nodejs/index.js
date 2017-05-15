'use strict';

// console.log(`
// 3.
// ---

// We need to create a route that downloads the entire database to a .csv file.
// The endpoint must be set to: GET /users

// Make sure to have an instance of MongoDB running at: mongodb://localhost

// Run the database seed with:
// $ node utils/seed.js

// -> Warning: It contains hundreds of entities and our production server is quite small
// `);

const express = require('express');
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const csvWriter = require('csv-write-stream')
const writer = csvWriter()
const fs = require('fs');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

app.get('/users', function(req, res) {
	writer.pipe(fs.createWriteStream('out.csv'))
	User.find({}, function (err, users) {
		users.forEach(function(user) {
			writer.write({name: user.name, email: user.email})
		})
		writer.end()
	})
})

app.listen(3000, function() {
  console.log('Node app is running on port.. 3000');
});
