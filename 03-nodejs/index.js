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

console.log(`
Respuesta:
Se agrega la libreria csv-express para poder generar los registros y poder exportarlos en el
formato solicitado en el enunciado.
Cuando se realiza la peticion a la WebAPI, esta realiza la busqueda de todos los datos a traves de Mongoose,
una vez recopilada toda la informacion, genera la estructura necesaria con la recopilazion de los datos y, una vez
culminada dicha operacion, se procede a generar el archivo con los datos seteados segun formato.
`);

const express = require('express');
const csv = require('csv-express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
app.get('/users', function(req, res) {
    User.find({}, function(error, response) {
        if (error) {
            res.send(error);
        }
        let export_csv = [];
        export_csv.push(['Id', 'Name', 'Email']);
        response.forEach((row) => {
            export_csv.push([row._id, row.name, row.email]);
        });
        res.csv(export_csv);
    });
});

app.listen(3000);
