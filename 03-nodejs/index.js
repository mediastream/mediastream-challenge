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
const Json2csvParser = require('json2csv').Parser;

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
app.get("/users",(req,res) => {
	User.find({},(err,users) =>{
		if(err)
			throw err;
		else{
			var fields = ['_id', '__v', 'name', 'email'];
			var json2csvParser = new Json2csvParser({fields});
			var csv = json2csvParser.parse(users);
			res.setHeader('Content-disposition', 'attachment; filename=users.csv');
			res.setHeader('Content-Type', 'text/csv');
			res.status(200).json(csv);
		}
	})
})

app.listen(3000);
