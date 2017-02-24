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
const mongodb = require('mongodb');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
const router = expres.Router();

router.get(__dir+"database.csv",function (req,res){
  var MongoClient = mongodb.MongoClient;

  MongoClient.connect("mongodb://localhost",function(err,db){
    if (err){
      console.log('Unable to connect ' + err);
    }else{
      var collection = db.collection('users');
      collection.find({}).toArray(function(err,result){
        if(err){
          result.send(err);

        } else if (result.length){
          res.render('users',{"name":result,"email":email});
        }else{
          res.send("No documents found");
        }
        db.close();
      });
    }
  })
})


app.listen(3000);
