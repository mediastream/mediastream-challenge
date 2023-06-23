'use strict'

const express = require('express')
const json2csv = require('json2csv').parse
const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/', (req, res) => {
  res.send('Hello mediastream-challenge')
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find().lean()
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

app.get('/download/csv', async (req, res) => {
  const users = await User.find().lean()
  const csv = json2csv(users)
  res.attachment('users.csv')
  res.send(csv)
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
