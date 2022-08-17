const { parseAsync } = require('json2csv')
const User = require('../models/User')

const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/mediastream-challenge')

const fileDownloadCSV = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(400).json(err)
    }

    parseAsync(users, { ...['name', 'email'] })
      .then((csv) => {
        res.set('Content-Type', 'text/csv')
        res.status(200).send(csv)
      })
      .catch((err) =>
        res.status(400).json({
          ok: false,
          message: err.message
        })
      )
  })
}

module.exports = fileDownloadCSV
