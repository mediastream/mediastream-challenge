'use strict'

const express = require('express')

const User = require('./models/User')
const Parser = require('json2csv').Parser

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/users', async (req, res) => {
  try {
    User.find().then((records) => {
      const users = []

      records.forEach((user) => {
        const { id, name, email } = user
        users.push({ id, name, email })
      })

      const headers = ['Id', 'Name', 'Email']
      const parser = new Parser({ headers })
      const data = parser.parse(users)

      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=users.csv')
      res.status(200).end(data)
    })
  } catch (error) {
    res.status(400).send(error?.message)
  }
})

app.listen(3000)
