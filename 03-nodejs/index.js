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
mongoose.connect('mongodb://localhost/mediastream-challenge',{useMongoClient:true});
const User = require('./models/User');

// Setup Express.js app
const app = express();

app.use(morgan('combined')) //Since morgan was already here, log requests

app.get('/users', (req,res,next) => {
  // Let the client know we are sending a csv, and that we want them to download it.
  res.set({
    'Content-Type': 'text/csv; charset=utf-8',
    'Content-disposition': 'attachment; filename=users.csv'    
  });
  return new Promise(function(resolve,reject){
    // Using a cursor to write to the response stream on
    // each read document ensures better performance.
    // Testing on my pc used less RAM than what a small server would have,
    // and processor wasn't stressed.
    User.find({}).cursor().map(({name, email})=>{
      // Since we have access to each read document,
      // let's format it manually.
      const csvString = `${name},${email}\r\n`; 
      return csvString;
    })
    .on('data', function(registry){
      res.write(registry);
    })
    .on('end',function(){
      resolve()
    })
    .on('error',function(err){
      reject(err)
    })
  }).then(() => {
    res.end();
  }).catch((err)=>{
    res.sendStatus(500).send(err);
  })
})

app.listen(3000);
