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
const through = require('through');
const csv = require('csv');
const cons = require("consolidate");

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1:27017/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();
app.engine("html", cons.swig);
app.set("view engine", "html");
app.set("views", __dirname + "/views");

app.use(morgan('dev'));

app.get("/", (req, res) => {
		res.render("index", {titulo : "Users"});
});

app.get("/users", (req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=users.csv');
    res.set('Content-Type', 'text/csv');
    res.write('name,email\n');
    let modelStream = User.find().stream();
    modelStream.
        pipe(through(write, end)).
        pipe(csv.stringify()).
        pipe(res);

    function end() {
        res.end();
    }
    function write(doc) {
        let myObject = doc.toObject({getters:true, virtuals:false});
        this.queue([
            myObject.name,
            myObject.email
        ]);
    }
});

// TODO
app.listen(3000);
