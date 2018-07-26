const express = require('express')
const router = express.Router()
const User = require('../models/User')

const {csvfication} = require('../utils/csv')

router.get('/users', (req, res) => {

  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-disposition': 'attachment; filename=users.csv'
  })

  User.find({}, (err, users) => {
    if (err) throw err

    csvfication(
      ['name', 'email'],
      users,
      data => [data.name, data.email],
      csvData => {
        res.write(csvData)
        res.end()
      }
    )
  })

})

module.exports = router
