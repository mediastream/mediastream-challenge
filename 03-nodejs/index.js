'use strict';

// console.log(`
// 3.
// ---

// We need to create a route that downloads the entire database to a .csv file.
// The endpoint must be set to: GET /users

// Make sure to have an instance of MongoDB running at: mongodb://localhost

// Run the database seed with:
// $ node utils/seed.js

// -> Warning: It contains hundreds of entities and our production server is quite small
// `);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { parse } = require('json2csv')
const fs = require('fs')

const HEADERS = ['nombre', 'email']

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge')
    .then(() => console.log(`DB connected`))
    .catch(err => console.log(`Error: ${err}`))

const User = require('./models/User');

// Setup Express.js app
const app = express();

app.get('/users', (req, res) => {
    User.find().exec((err, users) => {
        if (err) throw err

        // let model = { name: users[0].name, email: users[0].email }

        if (users) {
            let outputCsv = users.map(u => {
                return {
                    name: u.name,
                    email: u.email
                }
            })

            try {
                const buildCsv = parse(outputCsv, HEADERS)
                // console.log(buildCsv)
                fs.writeFile('users.csv', buildCsv, err => {
                    if (err)
                        console.log(`Error al generar csv | detalles: ${err}`)
                    console.log('generado!')
                    res.send('csv generado! =)')
                })
            }
            catch (e) {
                console.error(e)
            }
        }
    })
})

// TODO

app.listen(3000, () => console.log(`Servidor ejecutándose en el puerto 3000`))
