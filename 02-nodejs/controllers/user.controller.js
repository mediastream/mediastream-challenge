const { parseAsync } = require('json2csv')
const User = require('../models/User')

const fields = [
  {
    label: 'Nombre',
    value: 'name'
  },
  {
    label: 'Email',
    value: 'email'
  }]

const fileDownloadCSV = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(400).json(err)
    }

    parseAsync(users, { fields })
      .then((csv) => {
        res.setHeader('Content-disposition', 'attachment; filename=users-report.csv')
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
