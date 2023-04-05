'use strict'

const express = require('express')

// Setup Express.js app
const app = express()

const userRouter = require('./routes/usersRoutes')
app.use('/', userRouter)

app.listen(3000)
