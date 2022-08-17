
const { Router } = require('express')
const fileDownloadCSV = require('../controllers/user.controller')

const userRouter = Router()
userRouter.get('/', fileDownloadCSV)

module.exports = userRouter
