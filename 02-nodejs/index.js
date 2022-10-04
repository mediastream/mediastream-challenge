'use strict'

const express = require('express')
const Papa = require('papaparse')

const User = require('./models/User')

const query = User.find({})

// Setup Express.js app
const app = express()

app.get('/users', function routeHandler (req, res) {
  query.lean().exec((err, users) => {
    console.log(users[0])
    if (err) return handleError(err)
    const csvFile = Papa.unparse(users)
    res.setHeader('Content-disposition', 'attachment; filename=data.csv')
    res.set('Content-Type', 'text/csv')
    res.status(200).send(csvFile)
  })
})

app.get('/', function (req, res) {
  res.send('home page')
})

const server = app.listen(3000, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('app listening at http://%s:%s', host, port)
})
//http://localhost:3000/users