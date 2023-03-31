'use strict'

const express = require('express')

const User = require('./models/User')

const csvWriter = require('csv-write-stream')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res, next) => {
  try {
    res.type('csv') // Set response content type
    res.attachment('users.csv') // Set filename for download
    const writer = csvWriter({ headers: ['name', 'email'] }) // Create a CSV writer with headers
    writer.pipe(res) // Pipe output to the response
    const cursor = User.find().cursor() // Create a cursor for streaming
    cursor.on('data', (user) =>
      writer.write({ name: user.name, email: user.email })
    ) // Format each user as a CSV row
    cursor.on('end', () => writer.end()) // End the CSV writer when the cursor is exhausted
  } catch (err) {
    next(err)
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000)
console.log('Listening on port 3000')
