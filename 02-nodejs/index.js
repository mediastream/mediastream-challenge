'use strict';

const express = require('express');
const fastcsv = require('fast-csv');

const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO: everything else

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('name email').lean();

    if (users.length > 0) {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
      const csvStream = fastcsv.format({ headers: true });

      csvStream.pipe(res);

      users.forEach((user) => {
        csvStream.write(user);
      });

      csvStream.end();
    } else {
      res.status(404).send('No data to export');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(3000);
