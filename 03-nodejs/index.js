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
const json2csv = require('json2csv');
var fs = require('fs');
// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();



/**
* Retorno de base de usuarios
*/

app.get('/users', function(req, res){

  var fields = ['id', 'name', 'email']

  User.find({}, (er, response) => {

    if (er) {
      return res.status(500).send({msg:'Error al buscar listado de usuarios!'})
    }else{

      var csv = json2csv({ data: response, fields: fields });

      fs.writeFile('./03-nodejs/utils/allUsers.csv', csv, function(err) {
        if (err) throw err;
        console.log('Archivo csv guardado');
        res.download(__dirname +'/utils/allUsers.csv', 'allUsers.csv', (err) =>{
          if (err) {
            console.log(err);
          }else {
            console.log('Descarga correcta');
          }
        });
      });
      
    }
  })
});

app.listen(3000);
