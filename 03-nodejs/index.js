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
const _ = require('lodash');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
app.use(morgan('combined'))
// TODO
app.get("/users", function(req,res){

	User.find({}, function(err, users) {
		  if (err) throw err;
		  
		res.writeHead(200, {"Content-Disposition" : "attachment;filename=users.csv"});
		res.write("Nombre, Email\n");
		_.map(users).map(function(x) {
			res.write(x.name + "," + x.email + "\n");
		});

		res.end();
	});

});

app.listen(3000);
