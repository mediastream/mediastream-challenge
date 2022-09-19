const { parse } = require('json2csv')

const createCsvFile = (data) => {
  try {
    const fields = ['name', 'email']
    const opts = { fields }
    const csv = parse(data, opts)
    return csv
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  createCsvFile
}
