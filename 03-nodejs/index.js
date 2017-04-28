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
const path = require('path');
const morgan = require('morgan');

// Declaring routes
const index = require('./routes/index');
const users = require('./routes/users');

// Setup Express.js app
const app = express();

// Routes
app.use('/', index);
app.use('/users', users);

// Seting up logger
app.use(morgan('dev'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(3000);
