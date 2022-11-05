const User = require('../models/User')
const { parse } = require('json2csv')

const UserService = {
  createUserCSV: async function (req, res) {
    res.write('"name","email"\n')

    await User.find({})
      .lean()
      .cursor()
      .on('data', user => {
        res.write(`"${user.name}","${user.email}"\n`)
      })
      .on('end', () => {
        console.log('users to csv done!')
        res.end()
      })
  }
}

module.exports = UserService
