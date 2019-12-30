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

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
app.get('/users', (req, res) => {

    User.find((err, usuarios) => {

        if (err) {
            res.status(500).json({
                status: 500,
                err
            });
        } else {
            fs.writeFile('./userDatabase.cvs', usuarios, (err) => {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        err
                    });
                } else {
                    res.status(200).send('base de datos descargada');
                }
            });
        }
    });
});

app.listen(3000);