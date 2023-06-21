'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hats = _(database)
  .map((item) => item.hats) // O(n)
  .flatten() // O(m)
  .countBy('id') // O(m)
  .orderBy([], ['desc']) // O(m)

const total = hats
  .slice(0, 3) // O(1)
  .sum() // O(1)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * RESPONSE:
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n + m)
 *   - space complexity: O(n)
 */
