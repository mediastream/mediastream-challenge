'use strict'

const express = require('express')

const User = require('./models/User')

const app = express()
app.get('/', (req, res) => {
  res.send("Please use the following route to download CSV file: '/users'")
})
app.get('/users', (req, res) => {
  const cursor = User.find().cursor()
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="users.csv"')
  res.write('name,email\n')

  cursor.on('data', (user) => {
    res.write(`${user.name},${user.email}\n`)
  })

  cursor.on('end', () => {
    res.end()
  })
})

app.listen(3001, () => console.log('listen'))
