'use strict'

const express = require('express')
const User = require('./models/User')
const app = express()

app.get('/users', (request, response) => {
  const cursor = User.find().cursor()
  response.setHeader('Content-Type', 'text/csv')
  response.setHeader('Content-Disposition', 'attachment; filename="users.csv"')
  response.write('name,email\n')
  cursor.on('data', (user) => response.write(`${user.name},${user.email}\n`))
  cursor.on('end', () => response.end())
})

app.listen(3000)
