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
const fastcsv = require("fast-csv");
const fs = require("fs");

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User')

const ws = fs.createWriteStream("mongodb_fastcsv.csv");

// Setup Express.js app
const app = express();

app.get('/users', async function (req, res) {
  var users = await User.find({});
  fastcsv
  .write(users, { headers: true, transform: function(row){
    return {
        Name: row.name,
        Email: row.email
    };
} })
  .on("finish", function() {
    console.log("mongodb_fastcsv.csv");
  })
  .pipe(ws);
})

// TODO

app.listen(3000);