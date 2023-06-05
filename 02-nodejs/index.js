'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else

app.get('/users', async (req, res) => {
  const usersDb = await User.find({}).exec()
  res.header('Content-Type', 'text/csv')
  res.attachment('users.csv')
  res.send(usersDb)
})

app.listen(3000)
