'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const total = _.chain(database)
  .flatMap('hats')
  .sortBy('price')
  .groupBy('id')
  .values()
  .map(_.size)
  .sortBy(_.identity)
  .takeRight(3)
  .sumBy(_.identity)
  .value()

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)
console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n)
 *   - space complexity: O(n)
 */
