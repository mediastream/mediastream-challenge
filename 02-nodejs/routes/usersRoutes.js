const express = require('express')
const router = express.Router()
const User = require('../models/User')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const fs = require('fs')
const path = require('path')

// crea una ruta para users
router.get('/users', async (req, res) => {
  const pageSize = 100
  let records = []
  let cursor = null
  // busca datos desde la DB de 100 en 100
  while (true) {
    const query = cursor ? { _id: { $gt: cursor } } : {}
    const pageRecords = await User.find(query)
      .sort({ _id: 1 })
      .limit(pageSize)

    records = records.concat(pageRecords)
    if (pageRecords.length < pageSize) {
      break
    }
    cursor = pageRecords[pageRecords.length - 1]._id
  }
  // crea archivo csv
  const csvWriter = createCsvWriter({
    path: path.join(__dirname, 'users.csv'),
    header: [
      { id: 'id', title: 'ID' },
      { id: 'name', title: 'Name' },
      { id: 'email', title: 'Email' }
    ]
  })
  // inserta datos de usuarios en csv y lo agregar al response
  await csvWriter.writeRecords(records)
  const file = path.join(__dirname, 'users.csv')
  res.download(file, 'users.csv', () => {
    fs.unlinkSync(file)
  })
})

module.exports = router
