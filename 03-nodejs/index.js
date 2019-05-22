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
const routes = express.Router();

routes.get('/users', async (req, res) => {
  let hasHeader = false;
  res.setHeader('Content-disposition', 'attachment; filename=users.csv');
  res.contentType('csv');
  
  await User.find().stream().on('data', item => {
    if(!hasHeader) {
      hasHeader = true;
      res.write('Name, E-mail' + '\n');
    }
    res.write(`${item.name},${item.email}` + '\n');
  }).on('close', () => {
    res.end()
  }).on('error', () => {
    res.status(500).send('ERROR DOWNLOADING CSV.');
  });
});

//APPLY APP TO USE ROUTES
app.use(morgan('dev'));
app.use(routes);
app.listen(3000);
