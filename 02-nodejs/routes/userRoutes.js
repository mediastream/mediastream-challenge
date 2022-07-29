const express = require('express')
const userRouter = express.Router()
const User = require('../models/User')
const convertJSONtoCSV = require('../utils/convertToCSV.js')

userRouter.get('/', async (req, res) => {
  const users = await User.find().select('-__v')
  const jsonUsers = JSON.parse(JSON.stringify(users))
  const convertedData = convertJSONtoCSV(jsonUsers)
  res.set({
    'Content-Type': 'text/csv',
    'Content-Disposition': 'attachment'
  })
  res.status(200).send(convertedData)
})

module.exports = userRouter
