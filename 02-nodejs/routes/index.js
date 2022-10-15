const express = require('express')

const userRoutes = require('./userRoutes')

const router = express.Router()

router.use(userRoutes)

module.exports = { router }
