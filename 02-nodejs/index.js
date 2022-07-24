'use strict'

const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const morgan = require('morgan')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/users', async (req, res) => {
  const users = await User.find()
  const data = [
    ['ID', 'Name', 'Email'],
    ...users.map(({ _id, name, email }) => [_id, name, email])
  ]

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/csv')
  data.forEach(item => {
    res.write(item.map(field => {
      return '"' + field.toString().replace(/"/g, '""') + '"'
    }).toString() + '\r\n')
  })
  res.end()
})

const start = async () => {
  try {
    await mongoose.createConnection('mongodb://localhost:27017')
    app.listen(3000, () => console.log('Server started on port 3000'))
    app.use(morgan('tiny'))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
