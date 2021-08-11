'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
app.get('/users', async (req, res) => {
	var users = await User.find({});
	const csvWriter = createCsvWriter({
	  path: "users.csv",
	  header: [
	    { id: "_id", title: "_id" },
	    { id: "__v", title: "__v" },
	    { id: "name", title: "name" },
	    { id: "email", title: "email" },
	  ]
	});
	csvWriter
	  .writeRecords(users)
	  .then(() =>{
	    const file = 'users.csv';
		res.download(file);
		}
	  );
});

app.listen(3000);
