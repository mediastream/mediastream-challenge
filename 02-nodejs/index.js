
'use strict'
const Parser = require('json2csv').Parser

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()
// TODO: everything else
const fields = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Email',
    value: 'email'
  }
]
app.get('/', async (req, res) => {
  try {
    const users = await User.find({}).lean()
    const json2csv = new Parser({ fields })
    const csv = json2csv.parse(users)
    res.header('Content-Type', 'text/csv')
    res.attachment('users.csv')
    res.send(csv)
  } catch (error) {
    res.status(400).json({ error: error })
  }
})
app.listen(3000)
