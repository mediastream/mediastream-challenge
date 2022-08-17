'use strict'

const express = require('express')
const userRouter = require('./routes/user.router')
// Setup Express.js app
const app = express()

// TODO: everything else
app.use('/users', userRouter)

app.listen(3000)
