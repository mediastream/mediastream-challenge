'use strict'

const express = require('express')
const { Parser } = require('json2csv')
const User = require('./models/User')
const filename = 'data.csv'
// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/download-csv', async (req, res) => {
  const cursor = await User.find({})
  const data = cursor.map(value => transformDoc(value))

  const fields = [{ label: 'Name', value: 'name' }, { label: 'Email', value: 'email' }]

  const json2csv = new Parser({ fields })
  const csv = json2csv.parse(data)
  res.header('Content-Type', 'text/csv')
  res.attachment(filename)

  res.send(csv)
})

const transformDoc = ({ _doc }) => {
  const { name, email } = _doc
  return {
    name,
    email
  }
}
app.listen(3000)
