const { parseAsync } = require('json2csv')

const downloadResource = async (res, fileName, fields, data) => {
  res.header('Content-Type', 'text/csv')
  res.attachment(fileName)
  const csv = await parseAsync(data, { fields })
  return res.send(csv)
}

module.exports = downloadResource
