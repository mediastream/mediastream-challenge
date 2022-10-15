'use strict'
const express = require('express')
const { router } = require('./routes')

// Setup Express.js app
const app = express()

// TODO: everything else

app.use(router)

app.listen(3000)
