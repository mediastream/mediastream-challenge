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
const mongoose = require('mongoose');
const { createWriteStream } = require('fast-csv')

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://martin:1234567m@ds147520.mlab.com:47520/tests');
const User = require('./models/User');

// Setup Express.js app
const app = express();

app.use('/users', (_, res) => {
    const cursor = User.find().cursor()
  
    const filename = 'users.csv';
    const transformer = doc => ({
        id: doc._id,
        name: doc.name
    })
    res.setHeader('Content-disposition', `attachment; filename=${filename}`)
    res.writeHead(200, { 'Content-Type': 'text/csv' })
  
    res.flushHeaders()
  
    cursor.pipe(createWriteStream({ headers: true }).transform(transformer)).pipe(res)
})

app.listen(3000);
