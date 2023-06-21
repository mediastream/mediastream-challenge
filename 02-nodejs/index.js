'use strict'

const express = require('express')

const userRoutes = require('./routes/user')

// Setup Express.js app
const app = express()

// TODO: everything else
app.use('/api', userRoutes)

app.listen(3000, () => console.log('server init'))
