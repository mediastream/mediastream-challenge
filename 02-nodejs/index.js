'use strict'

const express = require('express')
const User = require('./models/User')
const fs = require('fs')
const { Transform } = require('stream')

const app = express()

app.get('/users', async (req, res, next) => {
  try {
    const result = User.find().batchSize(30).cursor()
    const fileName = 'db-users.csv'

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Type', 'text/csv')

    const fileStream = fs.createWriteStream(fileName)

    fileStream.write('id, email, name\n')

    const streamCSV = new Transform({
      objectMode: true,
      transform (user, _, done) {
        const row = `${user.id},${user.email},${user.name.toUpperCase()}\n`
        done(null, row)
      }
    })

    streamCSV.pipe(res)

    result.pipe(streamCSV)
  } catch (err) {
    return next(err)
  }
})

app.listen(3000)
