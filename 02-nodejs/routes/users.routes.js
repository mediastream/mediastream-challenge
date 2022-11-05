const express = require('express')
const router = express.Router()
const UserService = require('../services/user.service')

router.get('/', async function (req, res) {
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment;filename=users.csv')

  await UserService.createUserCSV(req, res)
})

module.exports = router
