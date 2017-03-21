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

// TODO
app.get('/users', (req, res) => {
  // Setting headers to enable file download and content type
  res.set('Content-Type', 'text/csv');
  res.setHeader('Content-disposition', 'attachment; filename=users.csv');
  // Initial line, indicating columns in file
  res.write('email,name');
  User.find().then( data => {
    // Chunk to process in small parts of data
    _.chunk(data, 1000).forEach(chunk => chunk.forEach(row => {
      //Writting on each item
      res.write(row.email+','+row.name+'\n');
    }))
    // Closing response writting
    res.end();
  });
  
});

app.listen(3000);
