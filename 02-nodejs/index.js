'use strict'

const express = require('express')
const csv = require('fast-csv')
const { Transform } = require('stream')

const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/users', async (req, res) => {
  try {
    // Get all users from DB and select only the id, name and email
    const dbUsers = await User.find({}).lean().select('-__v')

    // Setup the headers to download
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment filename=users.csv')

    // Create a transform stream and in the _transform function add each register to the transform stream
    const transformStream = new Transform({ objectMode: true })
    transformStream._transform = function (user, _, done) {
      this.push(user)
      done()
    }

    // Finally use csv.write to generate the cvs file from our dbUsers
    // and through the pipe connect it to the transform stream
    csv.write(dbUsers, { headers: true })
      .pipe(transformStream)
      .pipe(res)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error while download the CSV file')
  }
})

app.listen(3000)
