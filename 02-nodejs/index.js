'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()
const routes = require('./routes')
// TODO: everything else

app.use('/', routes)

const listener = app.listen(3000, () => {
  console.log(`Server listening on port ${listener.address().port}.`)
})
