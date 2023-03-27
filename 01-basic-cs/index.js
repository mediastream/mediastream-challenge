'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')
const database = require('./database.json')

// Flatten the 'hats' arrays from all users into a single array of hats and then count them by name
const hats = _.countBy(_.flatMap(database, 'hats'), 'name')

// Sort the hats by their count, then take the last three, and add up their counts
const total = _.reduce(_.slice(_.sortBy(hats), -3), (ac, cv) => ac + cv)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n)
 *   - space complexity: O(n)
 */
