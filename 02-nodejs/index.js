'use strict'

const express = require('express')

const userController = require('./controllers/user.controller')

// Setup Express.js app
const app = express()

// TODO: everything else

app.get('/users', userController.download)

app.listen(3000)
