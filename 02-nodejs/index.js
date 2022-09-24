'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/users', async (req, res) => {
  const filename = 'users.csv'
  await User.find().lean().exec({}, (err, items) => {
    if (err) res.send(err)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment filename=' + filename)
    res.attachment('users.csv').send(items)
  })
})

app.listen(3000)
