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
const mongoose = require('mongoose');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');
const buildCsv = require('./buildCsv')

// Setup Express.js app
const app = express();

app.get('/users', (req, res) => {
  buildCsv(User).then(csvArray => { // I used a recursive function to send many small request to the database server
    const csv = csvArray.join('\n')
    res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  })
})

/*
 I did not use await since it seems that you are not using it
 I could have done it with 

app.get('/users', async (req, res) => {
  const csvArray = await buildCsv(User)
  const csv = csvArray.join('\n')
  res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csv);
})

Also I prefer pure mongo
*/
app.listen(3000);
