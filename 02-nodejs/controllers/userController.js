const downloadResource = require('../utils/csv')
const User = require('../models/User')

const controller = {}

controller.download = async (req, res) => {
  const fields = [
    {
      label: 'ID',
      value: '_id'
    },
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Email',
      value: 'email'
    }
  ]
  const data = await User.find().lean()

  return downloadResource(res, 'users.csv', fields, data)
}

module.exports = controller
