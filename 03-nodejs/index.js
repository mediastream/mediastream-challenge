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
const { Parser } = require('json2csv');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
app.use(morgan('tiny'))

app.get("/users", async function (req, res) {
    
    const listUsers = await getUsers();
    const fields = ['name', 'email'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(listUsers);

    res.setHeader('Content-disposition', 'attachment; filename=listUsers.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
});

app.listen(3000);

/**
 * retorna la lista de usuarios
 */
async function getUsers() {

    const listUsers = await User.find({}, function(err, users){

        if( err ) {
            console.log(err);
            return;
        }
    
        return users;
    });

    return listUsers;
}
