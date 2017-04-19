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
const csv = require('csv-express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const _ = require('lodash')
// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');



// Setup Express.js app
const app = express();
app.get('/users', (req, res) => {	
	User.find({}, (err, users) => {
		var usersList = []
		_.each(users, (user) => {
			usersList.push({id: user._id, name: user.name, email: user.email})
		})
		res.csv(usersList, true)
	})
})
// TODO

app.listen(3000);
