'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

// Find the total sum of the top-3 most selling hats. You can use lodash/underscore (recommended)

const hats = _.chain(database)
  .map('hats')
  .flatten()
  .value()

const groupedHats = _(hats).groupBy('id').values().map(
  (group) => ({ ...group[0], qty: group.length })
).value()

// Sort by qty
const sortedHats = _.sortBy(groupedHats, 'qty').reverse()

// Get the top 3 and sum the qty
const total = _.sumBy(_.take(sortedHats, 3), 'qty')

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: Logarithm Time O(log n)
 *   - space complexity: O(n^2)
 */
