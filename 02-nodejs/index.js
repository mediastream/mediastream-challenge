'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/', async (req, res) => {
  const users = await User.find()
  const keys = Object.keys(users[0])
  const dataCsv = users.map(user => keys.map(key => user[key]))
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="users.csv"')
  res.write('\ufeff')
  res.write(keys.join(','))
  res.write('\n')
  dataCsv.forEach(row => {
    res.write(row.join(','))
    res.write('\n')
  })
  res.end()
})

app.listen(3000)
