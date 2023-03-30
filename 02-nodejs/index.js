'use strict'

const stream = require('node:stream')
const express = require('express')
const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/users', async (req, res) => {
  const filename = 'users.csv'
  const users = await User.find()

  const data = users.map(user => `${user._id},${user.name},${user.email}`)
  data.unshift('_id,name,email')
  const csv = Buffer.from(data.join('\n'), 'utf8')

  const readStream = new stream.PassThrough()
  readStream.end(csv)

  res.set('Content-Type', 'text/csv')
  res.set('Content-Disposition', `attachment; filename="${filename}"`)
  readStream.pipe(res)
})

app.listen(3000)
