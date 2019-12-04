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

const fs = require('fs');
const { parse } = require('json2csv');
app.get("/users",(req,res)=>{
  User.find({},(err,data)=>{
    let fields = ["nombre", "email"];
    const obj = { fields };
    try {
      const f = parse(data, obj);
      const buf = new Buffer(f)
      fs.writeFile('./users.csv', buf, (err2) => {
      if (err2) console.log(err)
        console.log('csv guardado en users.csv');
        res.send('csv guardado en users.csv');           
    });
    } catch (err) {
      console.error(err);
    }
  });
});    
  


app.listen(3000);
