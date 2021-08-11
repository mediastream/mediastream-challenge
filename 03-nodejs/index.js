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
const Json2csvParser = require('json2csv').Parser;
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const fs = require("fs");
//const ws = fs.createWriteStream("usuarios.csv");

// Setup database
//mongoose.Promise = Promise;
//mongoose.connect('mongodb://localhost/mediastream-challenge/users',{useMongoClient:true});
/*const url = 'mongodb://localhost';
var MongoClient = require('mongodb').MongoClient;
 
mongodb.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) throw err;
  
      client
        .db("mediastream-challenge")
        .collection("users")
        .find({})
        .toArray((err, data) => {
          if (err) throw err;
  
          //console.log(data);
          const fields = ['name', 'email'];
          fastcsv
            .write(data, { fields })
            .on("finish", function() {
              console.log("users.csv correcto!");
            })
            .pipe(ws);
  
          client.close();
        });
    }
  );*/
  mongoose.Promise = Promise;
  mongoose.connect('mongodb://localhost/mediastream-challenge',{useMongoClient:true});
  const User = require('./models/User');
  // Setup Express.js app
  const app = express();
  
  // TODO
  app.get('/users', function (req, res) {
      const fields = ['name', 'email'];
      const json2csvParser = new Json2csvParser({ fields });
      User.find({}, function (err, users) {
          if (err) {
              res.status(422).send(err.errors);
              console.log("Fallida");
          } else {
              const data = json2csvParser.parse(users);
              res.attachment('usuarios.csv');
              console.log("Descarga Completa");
              res.status(200).send(data);
          }
      });
  });
  
  app.listen(1000);