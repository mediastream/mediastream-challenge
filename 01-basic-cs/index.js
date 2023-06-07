'use strict'

const _ = require('lodash')
const assert = require('assert')

const database = require('./database.json')

// get all hats
const hats = database.map((item) => item.hats).flat()

// count hats by id
const count = _.countBy(hats, 'id')

// get top 3 hats
const hatsOrdered = _.sortBy(count).reverse().slice(0, 3)

const total = _.sum(hatsOrdered)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n log n) due _.sortBy (sort algorithm)
 *   - space complexity:  O(n) due the arrays and count
 */
