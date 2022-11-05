'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

// space complexity 1 : database.length = O(n)
const database = require('./database.json')

// All hat ids sold with their quantity
const hatsSold = {}

// space complexity 2: 3
const top3 = [0, 0, 0]

// n = 50
// m = 117
// n is repited  50 + 117 times
// Time complexity 1: O(n+m)

// totalHatsSold is 28, max numbers of hats in hatsSold is 50 = n
// space complexity 3 = O(n)
_.each(database, function (sell) { // O(n)
  _.each(sell.hats, function (hat) { // Ot(m)
    // Os(n)
    hatsSold[hat.id] = (hatsSold[hat.id] || 0) + 1
  })
})

// time complexity 2: O(n)
_.each(hatsSold, function (totalHat) {
  let min = top3[0]
  let index = 0

  // Get the min value of top 3 most selling hats
  if (top3[1] < min) {
    min = top3[1]
    index = 1
  } else if (top3[2] < min) {
    min = top3[2]
    index = 2
  }

  // Insert the total in top 3, if its greather than min value
  if (totalHat > min) {
    top3[index] = totalHat
  }
})

// Time complexity 3: O(3)
const total = _.reduce(top3, function (sum, n) {
  return sum + n
}, 0) // TODO

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n+m) + O(n) + O(3) = O(2n+m) = O(n+m)
 *   - space complexity: O(n) + O(3) + O(n) = O(2n) = O(n)
 */
