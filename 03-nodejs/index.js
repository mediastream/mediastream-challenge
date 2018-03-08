'use strict';

/*console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);*/

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const json2csv = require('json2csv');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
});


// Setup Express.js app
const app = express();

// TODO

app.route('/users')
	.get((req, res) => {
		
		User.find({}, (err, users) => {
			
			if(err) {
				console.log(err);
				res.status(500).send('Internal error');
				return;
			}

			try {

				const csv = json2csv({data: users, fields: ['_id', '__v', 'name', 'email']});
				
				res.setHeader('Content-disposition', 'attachment; filename=db.csv');
				res.set('Content-Type', 'text/csv');

				res.status(200).send(csv);

			} catch(err) {
				console.log(err);
				res.status(500).send('Internal error');
			}

		})

		//res.send('hola');
	});

app.listen(3000);
