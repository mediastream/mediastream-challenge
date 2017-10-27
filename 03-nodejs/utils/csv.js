const csv = require('csv')

/**
 * @param {Array} headers Array of the headers of the csv
 * @param {Array} initData Array of objects
 * @param {Function} transform: data => []; must return an array with the elements of a row
 * @param {Function} cb callback 
 */
function csvfication(headers, initData, transform, cb) {

  if (!Array.isArray(initData))
    initData = [initData]

  csv.transform(
    initData,
    transform,
    (err, data) => {
      if (err) throw err
      if (headers) {
        if (!Array.isArray(headers))
          headers = [headers]

        headers = headers.map(h => String(h).toUpperCase())
        data.unshift(headers)
      }
      csv.stringify(data, (err, csvData) => {
        if (err) throw err
        cb(csvData)
      })
    }
  )
}

exports.csvfication = csvfication