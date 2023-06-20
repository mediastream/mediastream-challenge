'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

app.get('/', async (req, res) => {
  let skip = 0
  const limit = 100
  const fields = ['name', 'email']

  let users = await User.find().skip(skip).limit(limit).select(['-_id', ...fields]).lean()

  let csvContent = `${fields.join(',')}\n`

  while (users.length > 0) {
    users.forEach(function (item, index) {
      const dataString = fields.map((head) => item[head]).join(',')
      csvContent += index < users.length ? `${dataString}\n` : dataString
    })

    skip += limit
    users = await User.find().skip(skip).limit(limit).select(['-_id', ...fields]).lean()
  }

  res.writeHead(200, {
    'Content-Type': 'text/csv',
    'Content-Disposition': 'attachment; filename=users.csv'
  })
  res.end(csvContent, 'binary')
})

app.listen(3000)
