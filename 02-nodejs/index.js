'use strict'

const fs = require('fs')
const { Transform } = require('stream')
const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res, next) => {
  try {
    const batchSize = 100

    const cursor = User.find().batchSize(batchSize).cursor()

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="users.csv"')

    const csvStream = fs.createWriteStream('users.csv')

    csvStream.write('id, name, email\n')

    const transformStream = new Transform({
      objectMode: true,
      transform (user, _, done) {
        const row = `${user.id},${user.name},${user.email}\n`
        done(null, row)
      }
    })

    transformStream.pipe(res)

    cursor.pipe(transformStream)
  } catch (err) {
    return next(err)
  }
})
// TODO: everything else

app.listen(3000)
