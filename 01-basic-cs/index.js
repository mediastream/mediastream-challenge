'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')
const soldHats = _.flatMap(database, n => n.hats)
const total = _.chain(soldHats)
  .countBy('id')
  .orderBy(null, 'desc')
  .slice(0, 3)
  .sum()
  .value()

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n)
 *   - space complexity: O(n), both because of the first iteration we are making to map the sold hats.
 */
