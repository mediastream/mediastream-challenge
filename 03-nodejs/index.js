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

const stream = require('stream');

app.get('/users', async (req, res, next) => {
  try {
    let objToCsvStream = new stream.Transform({objectMode: true});
    objToCsvStream._transform = function(chunk, encoding, callback) {
      let transChunk = `${Object.values(chunk._doc)}\n`;
      this.push(transChunk);
      callback();
    };

    let userCursor = await User.find().cursor();

    const fileName = 'Users.csv'
    res.set('Content-disposition', `attachment; filename=${fileName}`)
    res.set('Content-Type', 'application/octet-stream');
    res.status(200);
    
    userCursor.pipe(objToCsvStream).pipe(res);
  } catch(err) {
    console.error(err);
  }
});


app.listen(3000);
