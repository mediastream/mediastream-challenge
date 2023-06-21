const express = require('express')
const router = express.Router()

const { users } = require('../controllers/user')

router.get('/users', users)

module.exports = router
