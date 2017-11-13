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
const csv      = require('csv-express');
// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
app.get('/', (req, res, next) => {

    User.find({}, (err, users) => {
        if (err) res.send(err);
        var userMap = [];
        users.forEach(element => {
            userMap.push({ 'id': element._id,
                'name' : element.name,
                'email': element.email });
        });

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename=archivo.csv');
        res.csv(userMap, true);

    });
    

});

// TODO

app.listen(3000);
