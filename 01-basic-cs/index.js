'use strict'
const assert = require('assert')

const database = require('./database.json')
const { getHats, orderArray, topNSum } = require('./utils/hats-utils')

let total = 0 // TODO

const arrHats = getHats(database)
const arrOrderHats = orderArray(arrHats, 'id', 'desc')
total = topNSum(arrOrderHats, 3)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n)
 *   - space complexity: O(n)
 */
