const express = require('express')
const router = express.Router()
const { usersCSV } = require('../controllers/usersController')

// GET download users-csv file
router.get('/export-csv', usersCSV)

module.exports = router
