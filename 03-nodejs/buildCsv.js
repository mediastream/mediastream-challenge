const events = require('events')

const buildCsvExecutor = ({ User, lastId, csvArray = [], eventEmitter }) => {
  const query = lastId
    ? { _id: { $gt: lastId } }
    : {}
  User.find(
    query
  ).limit(500).then(found => {
    if (found.length === 0) {
      eventEmitter.emit('csv', csvArray)
      return
    }
    found.forEach(item => {
      csvArray.push(Object.values(item.toObject()))
    })
    const lastId = found[found.length - 1]
    buildCsvExecutor({ User, lastId, csvArray, eventEmitter })
  })
}

module.exports = User => {
  const eventEmitter = new events.EventEmitter()
  return new Promise(resolve => {
    eventEmitter.addListener('csv', csvArray => {
      resolve(csvArray)
    })
    buildCsvExecutor({ User, lastId: null, eventEmitter })
  })
}