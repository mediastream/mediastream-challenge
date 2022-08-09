const User = require('../../models/User')
const generateCsvFile = require('../../utils/generateCsvFile')

const fetchUsers = async () => await User.find().lean().select('-__v')

module.exports = async (req, res) => {
  try {
    const data = await fetchUsers()
    const csv = await generateCsvFile(data)
    res.setHeader('Content-disposition', `attachment; filename=exportUsers-${Date.now()}.csv`)
    res.setHeader('Content-type', 'text/csv')
    return res.status(200).send(csv)
  } catch (error) {
    return res.status(500).send({ status: 'error' })
  }
}
