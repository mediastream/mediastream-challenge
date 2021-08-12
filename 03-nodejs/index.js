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
console.log(`Visit: http://localhost:3000/user
`)

// TODO
app.get('/user' , async (req , res) => {
    try {
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment;filename=user.csv");

        const users = await User.find();        
        const csvHeader = "_id,name,email\n";

        res.status(200);

        res.write(csvHeader);

        users.forEach(user => {
            res.write(`${user._id},${user.name},${user.email}\n`);
        })
        res.end();

    } catch (error) {
        console.log(error);
        res.send("Export Failed");
    }
})

app.listen(3000);
