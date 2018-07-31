'use strict';

const express = require('express');
const mongoose = require('mongoose');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
const limit = process.env.limit || 0;

console.log(limit<1?'\x1b[32mServing all results\x1b[m':(`\x1b[32mServing up to \x1b[1m${limit} results\x1b[m`));

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
