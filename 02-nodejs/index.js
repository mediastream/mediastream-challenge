'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res) => {
  try {
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="users.csv"'
    })

    await User.find() // get all records
      .lean() // get POJO https://mongoosejs.com/docs/tutorials/lean.html#faster-mongoose-queries-with-lean
      .cursor() // "stream" deprecated, so using cursor to iterate one at a time
      .on('data', ({ name, email }) => (res.write(`${name},${email}\n`))) // write data
      .on('end', () => res.end())
  } catch (error) {
    res.status(500).json({ message: 'Internal error', error }).end()
  }
}
)

app.listen(3000)
