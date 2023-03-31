'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const getTopThreeSellingHats = () => {
  // Getting all hats from database
  const allHats = _.flatMap(database, 'hats')

  // Count all hats grouping by Id
  const countHatsById = _.countBy(allHats, 'id')

  // Make an object from array
  const collectionCountHats = _.map(countHatsById, (amount, id) => ({ id, amount }))

  // order objects with lodash by amount descending
  const orderedHatsByAmount = _.orderBy(collectionCountHats, 'amount', 'desc')

  // Get top three selling hats
  return _.take(orderedHatsByAmount, 3)
}

// Sum all three hats amounts for the total
const total = _.sumBy(getTopThreeSellingHats(), 'amount')

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n) for using orderBy and has is complexity.
 *   - space complexity: O(n) for creating new hats array
 */
