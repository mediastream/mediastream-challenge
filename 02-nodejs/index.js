'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()
const port = 3000

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).lean()

    if (!users) throw new Error("Users doesn't exists")

    const columns = 'Id,Name,Email\n'
    const userDataCsv = users.map(({ _id, name, email }) => `${_id}, ${name}, ${email}\n`).join('')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="users.csv"')
    res.send(columns + userDataCsv)
  } catch (error) {
    throw new Error(error)
  }
})

// TODO: everything else

app.listen(port, () => console.log('Server is Running at port: ', port))
