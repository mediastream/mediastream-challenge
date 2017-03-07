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

At the end please describe how did you get to the answer with details?
Example: 
I knew it before the test. 
or
I found it in stack overflow
`);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const json2csv = require('json2csv');
const fs = require('fs');
const path= require('path');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO

app.listen(3000);
app.get('/users', function (req, res){
    User.find({}, function(err, users){
        if(err){
            console.log(err);
        } else{
            try {
                var result = json2csv({data: users, fields: ['name', 'email']});
                fs.writeFile(__dirname+'/file.csv', result, function(err) {
                    if (err) throw err;
                    console.log('file saved');
                    res.download(__dirname + '/file.csv', 'file.csv');
                });
            } catch (err) {
                // Errors are thrown for bad options, or if the data is empty and no fields are provided.
                // Be sure to provide fields if it is possible that your data array will be empty.
                console.error(err);
            }
        }
    })
});

console.log(`Primero se consulta la BD y se extraen todos los resultados, luego a través de una librería llamada `+
            `json2csv se convierten los resultados de Formato JSON a csv, por último se escriben en un archivo llamado`+
            `file.csv y se coloca en la respuesta para la descarga.`);