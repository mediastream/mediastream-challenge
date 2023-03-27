'use strict'

const express = require('express')
const User = require('./models/User')
const fastCsv = require('fast-csv')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res) => {
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename=users.csv')

  const cursor = User.find().cursor()

  const csvStream = fastCsv.format({ headers: true })

  csvStream.pipe(res)

  cursor.on('data', (user) => {
    csvStream.write(user.toObject())
  })

  cursor.on('close', () => {
    csvStream.end()
  })
})

app.listen(3000)
