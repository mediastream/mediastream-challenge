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
const json2csv = require('json2csv');
const fs = require('fs');
const _ = require('lodash');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
let usersInformation = {}

function saveCSVFile () {
  let fields = ['_id', 'name', 'email'];
  const csv = json2csv({ data: usersInformation, fields: fields });
  fs.writeFile('file.csv', csv, (err) => {
    if (err) throw err;
    console.log('file saved');
  });
}

function getTotalUsers () {
  return User.count()
  .then((count) => {
    return count
  })
}

function getUsers (skip, limit) {
  return Promise.all([
    User
      .count()
      .exec(),
    User
      .find({})
      .skip(Number(skip))
      .limit(Number(limit))
      .lean()
      .exec()
  ])
  .then((results) => {
    let count = results[0]
    let users = results[1]
    let moreResults = (count - (Number(skip) + Number(limit)) > 0)
    let nextSkip = Number(skip) + Number(limit)
    let response = {
      users: users
    }
    if (moreResults) {
      response.skip = nextSkip
      response.limit = limit
    }
    return response
  })
}

function obtainUsers (skip, limit) {
  return getUsers(skip,limit)
  .then((response) => {
    if (response.users) usersInformation = _.concat(usersInformation, response.users)    
    if (response.skip && response.limit) obtainUsers(response.skip, response.limit)
    else saveCSVFile()
  })
}
console.log('process started')
obtainUsers(0,500)
app.listen(3000);
