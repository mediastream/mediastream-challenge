const User = require('../models/User')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const path = require('path')

const csvWriter = createCsvWriter({
  path: 'bd.csv',
  header: [
    { id: '_id', title: '_id' },
    { id: 'name', title: 'name' },
    { id: 'email', title: 'email' }
  ]
})
exports.users = async (req, res, next) => {
  const find = User.find({}).lean().cursor()
  find.eachAsync(async (user) => {
    await csvWriter.writeRecords([user])
    console.log(user.email)
  })
    .then(() => {
      console.log('CSV File generated')
      res.download(path.join(__dirname, '../../bd.csv'), 'bd.csv', (error) => {
        if (error) {
          console.error('Download error in CSV File:', error)
          res.status(500).send('Download error in CSV File:')
        } else {
          console.log('CSV file download OK.')
        }
      })
    })
    .catch((error) => {
      console.error('Error to generate CSV file:', error)
      res.status(500).send('Error to generate CSV file:')
    })
}
