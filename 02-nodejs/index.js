'use strict'
const express = require('express')
const { Transform } = require('stream')
const User = require('./models/User')

// Setup Express.js app
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res, next) => {
  try {
    const batchSize = 100
    const cursor = User.find().batchSize(batchSize).cursor()
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="users.csv"')

    const transformStream = new Transform({
      objectMode: true,
      transform (user, _, done) {
        const row = `${user.id},${user.name},${user.email}\n`
        done(null, row)
      }
    })

    res.flushHeaders()
    transformStream.pipe(res)

    for await (const user of cursor) {
      transformStream.write(user)
    }

    transformStream.end()
  } catch (err) {
    next(err)
  }
})

app.listen(3000)
