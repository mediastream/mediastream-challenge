'use strict'

const express = require('express')

const User = require('./models/User')
const { Transform } = require('stream')

// Setup Express.js app
const app = express()

app.get('/users', (req, res) => {
  const filename = 'users-db.csv'
  const users = User.find().batchSize(30).cursor()

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  res.setHeader('Content-Type', 'text/csv')

  res.write('id, email, name\n')

  const streamCSV = new Transform({
    objectMode: true,
    transform (user, _, done) {
      const row = `${user.id},${user.email},${user.name}\n`
      done(null, row)
    }
  })

  streamCSV.pipe(res)
  users.pipe(streamCSV)
})

app.listen(3000)
