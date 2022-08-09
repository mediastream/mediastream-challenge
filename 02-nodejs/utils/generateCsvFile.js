const { stringify } = require('csv-stringify')

module.exports = (data) => new Promise((resolve, reject) => {
  stringify(data, { delimiter: ',', header: true }, (error, csv) => {
    if (error) {
      return reject(error)
    }
    return resolve(csv)
  })
})
