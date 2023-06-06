'use strict'

const express = require('express')
const path = require('path')

const { downloadUsers } = require('./controllers')

// Setup Express.js app
const app = express()

app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/users', downloadUsers)

// TODO: everything else

app.listen(3000)
