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
const fastCsv = require('fast-csv');

// Setup database
mongoose.Promise = Promise;
mongoose.createConnection('mongodb://127.0.0.1:27017/mediastream-challenge', {
  useMongoClient: true
})
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO

const next = promise => {
  promise.then(doc => {
    if (doc) {
      console.log(doc);
      next(cursor.next());
    }
  })
}


const getusers = (req, res) => {
  const cursor = User.find({}).limit(100);

  const transformer = (doc)=> {
    return {
        Id: doc._id,
        Name: doc.name,
        Email: doc.email
    };
  }

  res.setHeader('Content-disposition', 'attachment; filename=users.csv');
  res.writeHead(200, { 'Content-Type': 'text/csv' });

  res.flushHeaders();

  var csvStream = fastCsv.createWriteStream({headers: true}).transform(transformer)
  cursor.cursor().pipe(csvStream).pipe(res);
}


app.use(morgan('stream'));
app.get('/', (req, res) => res.redirect('/users'));
app.get('/users', getusers)


app.listen(3000);