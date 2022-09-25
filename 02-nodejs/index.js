'use strict'

const express = require('express')
const document2CSV = require('./utils/document2CSV')

const User = require('./models/User')

// Setup Express.js app
const app = express()

app.use('/users', async (req, resp) => {
  resp.setHeader('Content-disposition', 'attachment; filename=report.csv')
  resp.set('Content-Type', 'text/csv')

  const stream = User.find().cursor({ batchSize: 500 })
  stream.on('data', (doc) => {
    resp.write(`${document2CSV(doc)}\n`)
  })
  stream.on('end', () => {
    resp.end()
  })
})

app.listen(3000)
