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
const fs = require('fs');
const path = require('path');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

app.get('/users', (req, res) => {
    const filename = path.join(__dirname, `${Date.now()}.csv`)
    res.on('finish', () => {
      fs.unlink(filename);
    })
    res.on('error', err => {
      fs.unlink(filename)
    })
    function paginateUsersFrom(from = null) {
      const criteria = (from && { _id: { '$gt': from }}) || {}
      return User.find(criteria).limit(50)
      .then(users => {
        if(!users || users.length < 1) {
          res.sendFile(filename);
        } else {
          fs.appendFile(filename,
          users.reduce((string, user) => string += `"${user.name}","${user.email}"\n`,''),
          function(err) {
            if(!err) {
              const lastUser = users[users.length - 1]
              paginateUsersFrom(lastUser._id)
            } else {
              res.send(500, err)
            }
          })
        }
      })
    }
    paginateUsersFrom()
})

app.listen(3000);
