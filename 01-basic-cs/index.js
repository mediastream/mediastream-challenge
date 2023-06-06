'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const topHats = _.chain(database)
  .flatMap('hats')
  .countBy('name')
  .toPairs()
  .orderBy([1], ['desc'])
  .take(3)
  .fromPairs()
  .value()

const total = _.sum(Object.values(topHats))

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n)
 *   - space complexity: O(n)
 */
