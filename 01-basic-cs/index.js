'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

let total = 0 // TODO

const r = []
let firstHighedSelling = 0
let secondHighedSelling = 0
let thirdHighedSelling = 0
const regenerateTopTree = (valueToCompare) => {
  if (valueToCompare > firstHighedSelling) {
    firstHighedSelling = valueToCompare
  } else if (valueToCompare > secondHighedSelling) {
    secondHighedSelling = valueToCompare
  } else if (valueToCompare > thirdHighedSelling) {
    thirdHighedSelling = valueToCompare
  }
}
_.map(database, (row) => {
  _.map(row.hats, (sell) => {
    r[sell.id] = ++r[sell.id] || 1
    regenerateTopTree(r[sell.id])
  })
})
total = firstHighedSelling + secondHighedSelling + thirdHighedSelling
// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(N)
 *   - space complexity: O(N)
 */
