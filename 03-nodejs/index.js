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
const path = require('path')
const {createObjectCsvWriter: createCsvWriter} = require('csv-writer');
const User = require('./models/User');

// // Setup database
const uri = 'mongodb://localhost/mediastream-challenge'
mongoose.Promise = Promise;
mongoose.connect(uri);


// Setup Express.js app
const app = express();
app.get('/users', function(req, res) {
    User
    .find({}, null, {limit:100})
    .then(data =>{
        const csvWriter = createCsvWriter({
            path: path.join(__dirname,'file.csv'),
            header: [
                {id: '_id', title: 'ID'},
                {id: 'name', title: 'NAME'},
                {id: 'email', title: 'EMAIL'}
            ]
        });
        csvWriter.writeRecords(data)  
            .then(() => {
                res.download(path.join(__dirname,'file.csv'), "Data.csv")
            })
            
    })
    .catch(error => res.send('Lo siento ha ocurrido un error'));
  });
// TODO 

app.listen(3000);