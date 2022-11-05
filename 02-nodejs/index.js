'use strict'

const express = require('express')

const UserRoutes = require('./routes/users.routes')

// Setup Express.js app
const app = express()
app.use('/users', UserRoutes)

// TODO: everything else

app.listen(3000)
