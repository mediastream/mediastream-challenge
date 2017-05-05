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
const jsonToCvsStream = require("json2csv-stream");
const parser = new jsonToCvsStream();

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
app.get('/users', function (req, res) {  
    let limit       = 100000;
    let offset      = 0;
    let skip        = 0;
    let filename    = 'users.csv'; 
    let chunkList = [];
    let total       = 0;   
    
        let headers = {
            'Content-Type': 'text/csv',
            'Content-disposition': 'attachment;filename=' + filename
        }
        res.writeHead(200, headers);
            let query   = User.find();          
            let mongoStream = query.stream({transform: JSON.stringify});   
            //run streams
         return  mongoStream.pipe(parser).pipe(res);  
 })

app.listen(3000);
