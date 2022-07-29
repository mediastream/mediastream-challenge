'use strict'

const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

dotenv.config()
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => { console.log('connected to database succesfully') })
  .catch((err) => { console.log(err.message) })

const app = express()
app.use(express.json())
app.use('/users', userRoutes)

app.listen(3000, () => {
  console.log('server listening at http://localhost:3000')
})
