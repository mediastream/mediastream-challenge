'use strict'

const express = require('express')
const jsonToCsv = require('json-to-csv-stream')
const fs = require('fs')

const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/users', async (req, res) => {
  try {
    User
      .find()
      .cursor({ transform: JSON.stringify })
      .pipe(jsonToCsv())
      .pipe(fs.createWriteStream('./users.csv'))
  } catch (e) {
    console.error(e)
  }

  res.send('<h2>Users successfully saved to users.csv file</h2>')
})

app.listen(3000, 'localhost', () => console.log('Listening on port 3000'))
