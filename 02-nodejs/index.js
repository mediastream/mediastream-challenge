'use strict'

const express = require('express')

const User = require('./models/User')
const csv = require('./utils/csv')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/users', async function (req, res) {
  const resp = await User.find({}).select({ _id: 0, name: 1, email: 1 })
  csv.downloadResource(res, 'users.csv', ['name', 'email'], resp)
}
)

app.listen(3000)
