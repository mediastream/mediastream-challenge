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

// csvwriter
const csvwriter = require('csvwriter')

// Setup database
// refactor due deprecation on mongoose >= 4.11
mongoose.createConnection('mongodb://localhost/mediastream-challenge', {
  useMongoClient: true
})

mongoose.Promise = Promise;

const User = require('./models/User');

// Setup Express.js app
const app = express();

app.listen(3000);

// redirect to the download route
app.get('/', function (req, res) {
  res.send('ready')
});

// download route
app.get('/users', function (req, res) {

  const fields = 'name,email';
  const filename = 'users.csv';

  // stream now cursor since deprecation on this version of mongoose
  const stream = User.find({}).cursor()

  // handle error
  stream.on('error', err => res.send(`Error creating the stream, error: ${err}`).status(400))

  // handle data
  stream.on('data', users => {
    csvwriter(JSON.stringify(users), { header: false, fields }, function (err, csv) {
      if (err) res.send('Error:' + err);

      res.set({ 'Content-Disposition': 'attachment; filename=\"' + filename + '\"', 'Content-type': 'text/csv' })
      res.write(fields + '\n')
      res.send(csv);
    });
  })

  // close stream
  stream.on('end', function () {
    setTimeout(function () {
      res.end('');
    }, 1000);
  });

});


