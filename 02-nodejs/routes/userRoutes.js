const express = require('express')
const UserController = require('../controllers/UserController')
const userRoutes = express.Router()

userRoutes.get('/users', UserController.index)

module.exports = userRoutes
