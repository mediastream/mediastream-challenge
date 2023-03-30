const Router = require('express').Router
const user = require('../controllers/user')

const router = Router()

router.get('/ping', (_, res) => res.status(200).end())

router.get('/users', user.getAll)

module.exports = router
