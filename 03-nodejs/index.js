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
var fs = require('fs');
var nice = require('nice-json2csv');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://developer:developer@ds137207.mlab.com:37207/videoplayer');
const User = require('./models/User');

// Setup Express.js app
const app = express();

app.get('/', function (req, res) {
    res.send('GET request to the homepage')
});

app.get('/users',(req, res)=>{    
    const rows = [];
     User.find({}).select('name email').exec((err,data)=>{
        if(err){
            res.json({success: false, message: err});
          }else{
                
            for(let i = 0; i<data.length; i++){
                rows.push(data[i]);
            }
            console.log(nice.convert(rows,['name','email'])); 
            res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
            res.set('Content-Type', 'text/csv');            
            res.status(200).send(nice.convert(rows,['name','email']));  
          }
     });     
});

app.listen(3000);
console.log("Running at Port 3000");
