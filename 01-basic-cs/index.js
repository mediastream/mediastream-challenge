'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')
const total = _.chain(database)
  .flatMap('hats') // Get all the hats
  .groupBy('id') // Group all records by Id
  .orderBy('length', 'desc') // Order by lenght from top to bottom
  .slice(0, 3) // Get top three
  .flatMap() // Flatten all to get all records
  .size() // Count
  .value()

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n*log(n))
 *   - space complexity: O(n)
 */
