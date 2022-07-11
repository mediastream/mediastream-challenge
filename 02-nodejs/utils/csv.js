const { parse } = require('json2csv')

const downloadResource = (res, fileName, fields, data) => {
  const csv = parse(data, { fields, quote: '' })
  res.header('Content-Type', 'text/csv')
  res.attachment(fileName)
  return res.send(csv)
}

module.exports = { downloadResource }
