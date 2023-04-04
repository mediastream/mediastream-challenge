'use strict'

const express = require('express')

const User = require('./models/User')

// Setup Express.js app
const app = express()

// TODO: everything else
app.get('/users', async (req, res) => {
  try {
    res.setHeader('Content-disposition', 'attachment; filename=users.csv')
    res.set('Content-Type', 'text/csv')

    const limit = 1000
    const fields = ['name', 'email']
    let page = 1

    res.write(`${fields.join(',')}\n`)
    let users = []

    do {
      const startIndex = (page - 1) * limit

      users = await User.find()
        .select(fields.join(' '))
        .skip(startIndex)
        .limit(limit)
        .lean()

      users.forEach((doc) => {
        const row = fields.map((field) => doc[field])
        res.write(`${row.join(',')}\n`)
      })

      page++
    } while (users.length > 0)

    res.end()
  } catch (e) {
    console.error(e)
    res.status(500).send('Server error')
  }
})

app.listen(3000)
