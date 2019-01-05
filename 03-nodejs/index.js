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


// Setup database

//This method is not deprecated
mongoose.createConnection('mongodb://127.0.0.1:27017/mediastream-challenge', {
  useMongoClient: true
  
})
mongoose.Promise = Promise;
//this method is deprecated
// mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO


app.get('/', function (req, res) {
  User.find({},(error, users) => {
    console.error(error)
    let fields = ['id', 'name', 'email'];
    res.set("Content-Disposition", "attachment;filename=user.csv");
    res.set("Content-Type", "application/octet-stream");
    res.send(json2csv({ data: users, fields: fields }))
  })
});



app.listen(3000);


