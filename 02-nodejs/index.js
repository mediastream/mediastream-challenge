'use strict'

const express = require('express')
const { createObjectCsvWriter } = require('csv-writer')
const json2csv = require('json-2-csv')
const User = require('./models/User')

// Setup Express.js app
const app = express()

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})

    const csv = await json2csv.json2csvAsync(users)

    const csvWriter = createObjectCsvWriter({
      path: 'users.csv',
      header: [
        { id: 'name', title: 'Nombre' },
        { id: 'email', title: 'Correo electrónico' }
      ]
    })

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv')

    await csvWriter.writeRecords(users)
    res.send(csv)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error interno del servidor')
  }
})

app.listen(3000)
