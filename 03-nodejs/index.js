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
const os = require('os');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const User = require('./models/User');
const { resolve } = require('path');

// Setup Express.js app
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
    try {
        res.status(200)
            .send(
                "Dowload users"
            );

    } catch (error) {
        next(error);
    }
});

app.get('/users', downloadListUsers);


function csvTransform(obj) {
    return `${Object.values(obj).join(", ")}${os.EOL}`
}

async function downloadListUsers(req, res, next) {
    try {
        const file = './tmp/test.csv';
        const stream = await User.find().stream({ transform: csvTransform })
        const write = await fs.createWriteStream("./tmp/test.csv");
        await stream.pipe(write).on("finish", () => {
            res.download(file)
        });

    } catch (e) {
        console.log("e", e)
    }
}
app.listen(3000);