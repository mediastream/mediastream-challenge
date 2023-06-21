'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

let total = 0 // TODO

const hats = _.flatMap(database, 'hats')
if (hats.length > 0) {
  const countHatsById = _.countBy(hats, 'id')
  const topHatsIds = _.chain(countHatsById)
    .entries()
    .orderBy(['1', '0'], ['desc', 'asc'])
    .take(3)
    .map('0')
    .value()
  total = _.sum(_.values(_.pick(countHatsById, topHatsIds)))
} else {
  console.log('no hats in db')
}
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity:   O(n)
 *   - space complexity:  O(n)

 */
