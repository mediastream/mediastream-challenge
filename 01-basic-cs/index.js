'use strict'

const assert = require('assert')

const database = require('./database.json')

const hats = database.reduce((acc, user) => {
  user.hats.forEach((hat) => {
    if (!acc[hat.id]) {
      acc[hat.id] = 0
    }
    acc[hat.id]++
  })

  return acc
}, {})

const total = Object.entries(hats)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 3)
  .reduce((acc, [, count]) => (acc += count), 0)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: TODO
 *   - space complexity: TODO
 */
