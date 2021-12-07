const database = require('./database.json')
const hatsSelled = {}
const assert = require('assert')
const _ = require('lodash')
database.forEach((seller) => {
  seller.hats.forEach(hat => {
    hatsSelled[hat.id] !== undefined ? hatsSelled[hat.id] = ++hatsSelled[hat.id] : hatsSelled[hat.id] = 1
  })
})
const matrix = _.toPairs(hatsSelled)
const sortedPairs = _.sortBy(matrix, function (p) { return -p[1] })
const total = sortedPairs[2][1] + sortedPairs[1][1] + sortedPairs[0][1]
// Throws error on failure
assert.equal(total, 23)
console.log(sortedPairs[2][1] + ' ' + sortedPairs[1][1] + ' ' + sortedPairs[0][1] + ' ' + total + ' Success!')
