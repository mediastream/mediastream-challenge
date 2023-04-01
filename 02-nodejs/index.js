'use strict'

const express = require('express')
const csv = require('json2csv')
const { Readable } = require('stream')

const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/users', async (req, res) => {
  // find all the users in the database
  const users = await User.find({}).lean().exec()

  // convert the data to CSV format
  const csvData = csv.parse(users)
  // set the response headers
  res.setHeader('Content-disposition', 'attachment; filename=users.csv')
  res.set('Content-Type', 'text/csv')
  // stream the CSV data to the client
  const readStream = new Readable()
  readStream.push(csvData)
  readStream.push(null)
  readStream.pipe(res)
})

app.listen(3000)
