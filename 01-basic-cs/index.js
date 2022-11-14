'use strict'

const _ = require('lodash') // https://lodash.com/docs/4.17.4
const assert = require('assert')

const database = require('./database.json')

let hats = []
// approach with lodash
// _.map(database, user => { hats = _.concat(hats, user.hats) })

/**
 * adds every users' hats to an array
 */
database.forEach(user => { hats = hats.concat(user.hats) })

/**
 * Count repeated hats by id
 * { 'hatId': count }
 */
const hatsCounted = hats.reduce((prev, curr) => {
  const { id } = curr
  if (prev[id]) {
    prev[id]++
  } else {
    prev[id] = 1
  }
  return prev
}, {})

/**
 * map through the hatsCounted object to transform into an array of objects
 * [{ hatId: 'hatIdValue', count: 'countValue' }]
 */
const hatsWithCount = _.map(hatsCounted, (count, hatId) => ({ hatId, count }))

/**
 * sort hatsWithCount by hat count in descending order
 */
const sortedHatsByCount = [...hatsWithCount].sort((a, b) => b.count - a.count)

/**
 * Slice the first 3 items from sortedHatsByCount
 * Reduce to the count value sum
 *
 * this could be splitted into the slice first and then the reduce but
 * I think it's still readable like this
 */
const topThreeSum = sortedHatsByCount.slice(0, 3).reduce((prev, curr) => prev + curr.count, 0)

const total = topThreeSum

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`)

console.log('Success!')

/**
 * Time and space complexity in O() notation is:
 *   - time complexity: O(n^2)
 *   - space complexity: O(n)
 */
