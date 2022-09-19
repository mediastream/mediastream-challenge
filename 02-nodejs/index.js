'use strict'

const express = require('express')

// eslint-disable-next-line no-unused-vars
const User = require('./models/User')

// Setup Express.js app
const app = express()
const routes = require('./routes')
// TODO: everything else

app.use('/', routes)

const listener = app.listen(3000, () => {
  console.log(`Server listening on port ${listener.address().port}.`)
})
