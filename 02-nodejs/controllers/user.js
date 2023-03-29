const user = require('../models/user')
const stream = require('node:stream')

const getAll = async (_, res) => {
  try {
    const result = await user.getAll()

    const csvArray = result.map(item => `${item._id},${item.name},${item.email}`)
    csvArray.unshift('id,name,email')
    const csvData = Buffer.from(csvArray.join('\n'), 'utf8')

    const readStream = new stream.PassThrough()
    readStream.end(csvData)

    res.set('Content-Type', 'text/csv')
    res.set('Content-Disposition', 'attachment; filename="users.csv"')
    readStream.pipe(res)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: 'Could not retrieve users'
    })
  }
}

module.exports = {
  getAll
}
