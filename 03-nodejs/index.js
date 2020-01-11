'use strict';

console.log(`
    Please MongoDB running at: mongodb://localhost
    and on navigators writte http://localhost:3000/users
`);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const indexRoutes=require('./indexRoutes/routes')

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
app.use(morgan('dev'));
app.use('/',indexRoutes); 

// TODO

app.listen(3000);

