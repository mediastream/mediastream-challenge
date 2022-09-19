const { createCsvFile } = require('./utils/csv')

process.on('message', (data) => {
  const csv = createCsvFile(data.message)
  process.send({ message: csv })
})
