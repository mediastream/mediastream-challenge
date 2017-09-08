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
const fs = require("fs")
const os = require("os")

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
app.get("/users", (req,res,next)=>{

  var stream = User.find().cursor();
  var writeStream = fs.createWriteStream('out.csv');

  writeStream.write("id,name,email");
  stream.on("data",function(user){
    let string = [user.id,user.name,user.email].join(",") + os.EOL;
    writeStream.write(string);
  }).on("close",function(){
    writeStream.end();
  });
  next("ok");
})

app.listen(3000);
