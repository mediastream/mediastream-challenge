'use strict';

const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../models/User');
const router = express.Router();

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');


// GET users.
router.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/csv',
    'Content-Disposition': 'attachment; filename=users.csv'
  });

  User.find().sort({ _id : 1 }).limit(100).csv(res);
});


module.exports = router;