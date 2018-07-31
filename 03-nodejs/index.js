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

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
const limit = process.env.limit || 0;

console.log(limit<1?'\x1b[32mStarted without limits\x1b[m':(`\x1b[32mStarted with max ${limit} results\x1b[m`));

app.get('/users', async function (req, res) {
    let users = await User.find().limit(+limit);
    let result = 'NAME,EMAIL';
    for (const i in users) {
        let user = users[i];
        result += `\n${user.name},${user.email}`;
    }

    res.set("Content-Disposition", "attachment;filename=Users.csv");
    res.end(result);
});


app.listen(3000);
