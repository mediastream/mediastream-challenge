'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hats = _.flatMap(database, 'hats')
const countById = _(hats)
  .countBy('id')
  .value()

const orderHats = _(countById)
  .toPairs()
  .orderBy(pair => pair[1], 'desc')
  .take(3)
  .value()

const total = orderHats.reduce((a, [, value]) => a + value, 0)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n)
 *   - space complexity: O(n)
 */
