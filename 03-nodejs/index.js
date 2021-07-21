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

const Csv = require("json2csv").Parser;

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
app.use(morgan('tiny'));

app.get('/users', async (req, res) => {
    User.find({}, function(err, users) {
    var userMap = [];
    users.forEach(function(user) {
        userMap.push({id: user.id, nombre: user.name, email: user.email});
    });
    const csvFields = ['id', 'nombre', 'email'];
    const csv = new Csv({ csvFields });
    const data = csv.parse(userMap);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    res.send(data);
  });
});

app.listen(3000);
