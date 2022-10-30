'use strict'
// importar controlador
const userController = require('./controllers/userController')
const express = require('express')

// Setup Express.js app
const app = express()

app.get('/users', userController.download)

app.listen(3000)
