'use strict'

const express = require('express')
const fastCsv = require('fast-csv')

const User = require('./models/User')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res) => {
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename=users.csv')

  const allUsers = await User.find({})
  fastCsv
    .write(allUsers.map(u => u.toObject()), { headers: true })
    .pipe(res)
})

app.listen(3000)
