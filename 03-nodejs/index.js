'use strict';

console.log("
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
");

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Library to export CSV
const json2csv = require('json2csv');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

//I put the route directly here to be simple and not create another routes folder and have to import the reference.
//Thi is not a recommended behavior, but enough for the exercise.
app.get('/users', function(req, res) {

	User.find({}, function(err, users) {
	    if (err)
	    	console.log(err);

	    const fields = ['_id','name','email'];

	    try {
			  const result = json2csv({ data: users, fields: fields });
			  
			  res.setHeader('Content-disposition', 'attachment; filename=users.csv');
		      res.set('Content-Type', 'text/csv');
		      res.status(200).send(result);

			} 
		catch (err) {
			  console.error(err);
			}
	});
});

app.listen(3000);
