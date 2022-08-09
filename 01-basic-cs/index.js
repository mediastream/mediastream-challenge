'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hatSells = _.flatten(database.map((user) => _.get(user, 'hats')))

const hatSellsId = hatSells.map((hat) => _.get(hat, 'id'))

const qtyHatsSold = Object.values(hatSellsId.reduce((prev, cur) => {
  prev[cur] = (prev[cur] || 0) + 1
  return prev
}, {}))

const total = qtyHatsSold.sort((a, b) => b - a).slice(0, 3).reduce((sum, curr) => sum + curr, 0)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n)
 *   - space complexity: O(n)
 */
