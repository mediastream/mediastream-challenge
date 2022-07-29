const convertToCSV = (data) => {
  let str = ''

  let headers = ''
  for (const key in data[0]) {
    if (headers !== '') headers += ','
    headers += key
  }

  str += headers + '\r\n'

  for (let i = 0; i < data.length; i++) {
    let line = ''
    for (const index in data[i]) {
      if (line !== '') line += ','
      const initialValue = data[i][index]
      const finalValue = typeof initialValue === 'string' ? `"${initialValue}"` : initialValue
      line += finalValue
    }
    str += line + '\r\n'
  }

  return str
}

module.exports = convertToCSV
