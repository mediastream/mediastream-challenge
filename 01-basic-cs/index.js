'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

const hatsByQuantity = {}

// Assuming most selling hats means most quantity
database.forEach((seller) => {
  // Add each hat into object tracking total quantity for each
  seller.hats.forEach((hat) => {
    if (!hatsByQuantity[hat.id]) {
      hatsByQuantity[hat.id] = 1
    } else {
      hatsByQuantity[hat.id] += 1
    }
  })
})

const soldQty = Object.values(hatsByQuantity)
const mostSold = soldQty.sort((a, b) => b - a).slice(0, 3)
const total = _.sum(mostSold)

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n)
 *   - space complexity: O(n)
 */
