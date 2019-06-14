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

app.use(morgan('tiny'));

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.setHeader('Content-Type', 'text/csv');
    res.write(`"id","name","email"\r\n`);
    users.forEach(user => {
      res.write(`"${user._id}","${user.name}","${user.email}"\r\n`);
    });
    res.status(200);
    res.end();
  } catch (e) {
    next(e);
  }
});

app.listen(3000, () => {
  console.log(`Server listening on https://localhost:3000`);
});
