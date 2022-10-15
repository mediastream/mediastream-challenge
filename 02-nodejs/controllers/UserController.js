const fastCsv = require('fast-csv')
const User = require('../models/User')

const index = async (req, res) => {
  const transformer = (doc) => {
    return {
      Id: doc._id,
      Name: doc.name,
      Email: doc.email
    }
  }

  const filename = 'export.csv'

  res.setHeader('Content-disposition', `attachment; filename=${filename}`)
  res.writeHead(200, { 'Content-Type': 'text/csv' })

  res.flushHeaders()

  const csvStream = fastCsv.format({ headers: true }).transform(transformer)
  const result = await User.find().cursor().pipe(csvStream).pipe(res)

  return res.status(200).json(result)
}
module.exports = { index }
