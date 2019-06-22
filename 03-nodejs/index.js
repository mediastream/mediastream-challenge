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
const fs = require('fs');
const util = require('util');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({  
    path: 'out.csv',
    header: [
      {id: '_id', title: 'ID'},
      {id: 'name', title: 'Name'},
      {id: 'email', title: 'Email'}
    ]
  });

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
const users = mongoose.model('User')

app.get('/users', (req, res) => {
    
    users.find({}, async function(err, user) {
        if(err) {
            console.log(err)
        } else {
            // Option async/await
            const out = await csvWriter.writeRecords(user)
            const readFile = util.promisify(fs.readFile)
            const file = await readFile('out.csv', 'utf8')
            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(file);
            /*
            // Option Promise
            csvWriter.writeRecords(user)
            .then(() => {
                fs.readFile("out.csv", 'utf8', function(err, contents) {
                    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
                    res.set('Content-Type', 'text/csv');
                    res.status(200).send(contents);
                })
            });
            */
        }
    })

})

app.listen(3000);
