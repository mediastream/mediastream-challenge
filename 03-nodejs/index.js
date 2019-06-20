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
//mongoose.Promise = Promise;
//mongoose.connect('mongodb://localhost/mediastream-challenge');
mongoose.connect('mongodb://localhost/mediastream-challenge',{ useNewUrlParser: true });
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
const { parse } = require('json2csv');
app.get("/users",(req,res)=>{
  User.find({},function(err,myData){
    var fields = ['name', 'email'];
    const opts = { fields };
    
    try {
      const csv_result = parse(myData, opts);
      res.setHeader('Content-disposition', 'attachment; filename=data.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv_result);    
    } catch (err) {
      console.error(err);
    }
  });
  

});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("conectados");
});
app.listen(3000);
