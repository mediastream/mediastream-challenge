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

//Module to convert json data to csv
var json2csv = require('json2csv');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

/* single row
{ _id: 58cf22c602b82b2d2ad6ee4d,
    __v: 0,
    name: 'Courtney Johns',
    email: 'Ruben_Krajcik55@hotmail.com' }
*/
const fields = ['_id','__v','name','email']
const outputFields = ['ID', 'Version', 'Name', 'Email']

// TODO
app.get('/users',function(req, res){
    User.find({}).then((jsonData)=>{ // Mongoose query to User model, return jsonData.
        let csvOpt = { // csv options for json2csv module: data and format fields (input and output).
            data: jsonData,
            fields: fields,
            fieldNames: outputFields
        };
        var csvData = json2csv(csvOpt); // function that convert json data to csv. 
        console.log('success')
        res.attachment('users.csv'); // set filename output, also the attachment method set the Content-Type header based on the extension of the file
        res.status(200).send(csvData); // send code 200 and the csv file.

    })    
})

app.listen(3000);
