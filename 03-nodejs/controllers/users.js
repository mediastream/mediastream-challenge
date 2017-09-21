'use strict';

const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('../models/User');

const handler = (req, res) => {
  /**
   * CSV generated filename
   * @type {String}
   */
  const filename = `users-at-${+moment()}.csv`;

  /**
   * The cursor for the User model
   * @type {Cursor}
   */
  const cursor = User.find({})
    .limit(1000)
    .cursor({ batchSize: 500 });

  // Setting required headers
  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.set('Content-Type', 'text/csv');

  /**
   * Holds the CSV default header
   * @type {String}
   */
  const header = 'name,email\n';

  // Set the response to OK
  res.status(200);
  res.write(header);

  // Iterates over the response
  cursor
    .eachAsync(user => {
      // This is simply for this test, we could use a csv formatter
      const line = `"${user.name}","${user.email}"\n`;
      res.write(line);
    })
    .then(() => res.end());
};

// GET users.
router.get('/', handler);

module.exports = router;
